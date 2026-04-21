/**
 * bookModel.js - Kitap veri işlemleri
 * SRP: Sadece kitap verilerine erişim ve filtreleme yapar.
 */
import { getEntityData, saveEntityData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

export const getBooks = () => getEntityData('books');

export const getBook = (id) => getBooks().find(b => b.id === id);

export const searchBooks = (query) => {
    const books = getBooks();
    if (!query) return books;
    const q = query.toLowerCase();
    const authors = getEntityData('authors');
    const publishers = getEntityData('publishers');
    
    return books.filter(b => {
        const author = authors.find(a => a.id === b.authorId);
        const publisher = publishers.find(p => p.id === b.publisherId);
        return b.title.toLowerCase().includes(q) || 
               (author && author.name.toLowerCase().includes(q)) ||
               (publisher && publisher.name.toLowerCase().includes(q));
    });
};

export const filterByCategory = (category) => {
    const books = getBooks();
    if (!category) return books;
    return books.filter(b => b.category === category);
};

export const sortBooks = (books, sortBy) => {
    const list = [...books];
    switch (sortBy) {
        case 'price-asc': return list.sort((a, b) => a.price - b.price);
        case 'price-desc': return list.sort((a, b) => b.price - a.price);
        case 'date-desc': return list.sort((a, b) => b.date.localeCompare(a.date));
        case 'alpha': return list.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
        default: return list;
    }
};

export const getBookCategories = () => {
    return [...new Set(getBooks().map(b => b.category))];
};

// CRUD Operations
export const createBook = (book) => {
    const books = getBooks();
    const newId = generateId('books');
    const newBook = { ...book, id: newId };
    saveEntityData('books', [...books, newBook]);
    return newBook;
};

export const updateBook = (id, data) => {
    const books = getBooks();
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...data };
        saveEntityData('books', books);
        return books[index];
    }
    return null;
};

export const deleteBook = (id) => {
    const books = getBooks();
    const filtered = books.filter(b => b.id !== id);
    saveEntityData('books', filtered);
    
    // Side effects: clean cart, favs, reviews (handled by controller usually, but model can provide cleanup logic if shared)
};
