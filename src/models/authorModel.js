/**
 * authorModel.js - Yazar veri işlemleri
 * SRP: Sadece yazar verilerine erişim yapar.
 */
import { getEntityData, saveEntityData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

export const getAuthors = () => getEntityData('authors');

export const getAuthor = (id) => getAuthors().find(a => a.id === id);

export const getBooksByAuthor = (authorId) => {
    const books = getEntityData('books');
    return books.filter(b => b.authorId === authorId);
};

export const canDeleteAuthor = (authorId) => {
    return getBooksByAuthor(authorId).length === 0;
};

export const createAuthor = (author) => {
    const authors = getAuthors();
    const newId = generateId('authors');
    const newAuthor = { ...author, id: newId };
    saveEntityData('authors', [...authors, newAuthor]);
    return newAuthor;
};

export const updateAuthor = (id, data) => {
    const authors = getAuthors();
    const index = authors.findIndex(a => a.id === id);
    if (index !== -1) {
        authors[index] = { ...authors[index], ...data };
        saveEntityData('authors', authors);
        return authors[index];
    }
    return null;
};

export const deleteAuthor = (id) => {
    if (!canDeleteAuthor(id)) return false;
    const authors = getAuthors();
    saveEntityData('authors', authors.filter(a => a.id !== id));
    return true;
};
