/**
 * publisherView.js - Yayınevi Sayfası
 * SRP: Bir yayınevine ait bilgileri ve kitaplarını gösterir.
 */
import { el } from '../utils/dom.js';
import { renderBookCard } from './components.js';

export const renderPublisher = (publisher, books, { onAddToCart, onToggleFav, onBookClick }) => {
    return el('div', { className: 'container py-10' }, [
        el('div', { className: 'bg-white p-6 rounded-lg shadow-sm border mb-8' }, [
            el('h1', { className: 'text-3xl font-bold' }, publisher.name),
            el('p', { className: 'text-gray-500 mt-1' }, `📍 Merkez: ${publisher.city}`),
            el('p', { className: 'text-sm text-primary mt-2 font-bold' }, `${books.length} adet yayınlanmış eser`)
        ]),
        el('h2', { className: 'text-2xl font-bold mb-6' }, 'Yayınevi Katalogu'),
        el('div', { className: 'book-grid' }, 
            books.map(book => renderBookCard(book, onAddToCart, onToggleFav, onBookClick))
        )
    ]);
};
