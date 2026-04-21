/**
 * authorView.js - Yazar Profil Sayfası
 * SRP: Yazar bilgilerini ve o yazara ait kitapları listeler.
 */
import { el } from '../utils/dom.js';
import { renderBookCard } from './components.js';

export const renderAuthor = (author, books, { onAddToCart, onToggleFav, onBookClick }) => {
    return el('div', { className: 'container py-10' }, [
        el('div', { className: 'bg-white p-8 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-8 items-center' }, [
            el('div', { style: { fontSize: '5rem', background: '#f8fafc', padding: '2rem', borderRadius: '50%' } }, author.image),
            el('div', {}, [
                el('h1', { className: 'text-4xl font-bold' }, author.name),
                el('p', { className: 'text-xl text-gray-500 mt-2' }, author.bio),
                el('div', { className: 'mt-4 flex gap-4' }, [
                    el('div', { className: 'bg-primary/10 text-primary px-4 py-2 rounded-lg' }, [
                        el('span', { className: 'font-bold' }, String(books.length)), ' Eser'
                    ])
                ])
            ])
        ]),
        el('h2', { className: 'text-2xl font-bold mb-6' }, `${author.name} Eserleri`),
        el('div', { className: 'book-grid' }, 
            books.map(book => renderBookCard(book, onAddToCart, onToggleFav, onBookClick))
        )
    ]);
};
