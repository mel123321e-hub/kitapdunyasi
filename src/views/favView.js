/**
 * favView.js - Favoriler Ekranı
 * SRP: Favoriye eklenen kitapları listeler.
 */
import { el } from '../utils/dom.js';
import { renderBookCard } from './components.js';

export const renderFavs = (favBooks, { onAddToCart, onToggleFav, onBookClick }) => {
    return el('div', { className: 'container py-10' }, [
        el('h1', { className: 'text-3xl font-bold mb-8 flex items-center gap-2' }, [
            el('span', {}, '❤️'), 'Favorilerim'
        ]),
        favBooks.length > 0 ? el('div', { className: 'book-grid' }, 
            favBooks.map(book => renderBookCard(book, onAddToCart, onToggleFav, onBookClick))
        ) : el('div', { className: 'py-20 text-center bg-white rounded-xl' }, [
            el('p', { className: 'text-gray-500' }, 'Henüz favori kitabınız bulunmuyor.')
        ])
    ]);
};
