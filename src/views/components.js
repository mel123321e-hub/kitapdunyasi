/**
 * components.js - Ortak UI bileşenleri
 * SRP: Tekrar eden HTML yapılarını üretir.
 */
import { el } from '../utils/dom.js';
import { formatPrice } from '../utils/format.js';
import { isFav } from '../models/favModel.js';
import { getAuthor } from '../models/authorModel.js';

export const renderBookCard = (book, onAddToCart, onToggleFav, onClick) => {
    const author = getAuthor(book.authorId);
    const favActive = isFav(book.id);

    return el('div', { className: 'book-card' }, [
        el('div', { 
            className: 'book-img-wrapper',
            onClick: () => onClick(book.id)
        }, [
            el('span', {}, book.emoji),
            el('button', {
                className: `book-fav-btn ${favActive ? 'active' : ''}`,
                onClick: (e) => {
                    e.stopPropagation();
                    onToggleFav(book.id);
                }
            }, [
                el('span', {}, '❤️')
            ])
        ]),
        el('div', { 
            className: 'book-content',
            onClick: () => onClick(book.id)
        }, [
            el('span', { className: `category-badge cat-${book.category.replace(' ', '')}` }, book.category),
            el('h3', { className: 'book-title' }, book.title),
            el('p', { className: 'book-author' }, author?.name || 'Bilinmeyen Yazar'),
            el('div', { className: 'book-footer' }, [
                el('span', { className: 'book-price' }, formatPrice(book.price)),
                el('button', {
                    className: 'btn btn-primary',
                    style: { padding: '0.25rem 0.75rem', fontSize: '0.875rem' },
                    onClick: (e) => {
                        e.stopPropagation();
                        onAddToCart(book);
                    }
                }, 'Ekle')
            ])
        ])
    ]);
};

export const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(el('span', { 
            style: { 
                color: i <= rating ? '#f59e0b' : '#d1d5db',
                fontSize: '1.25rem'
            } 
        }, '★'));
    }
    return el('div', { className: 'stars' }, stars);
};

export const renderToast = (message) => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = el('div', { id: 'toast-container' });
        document.body.appendChild(container);
    }
    const toast = el('div', { className: 'toast' }, message);
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};

export const renderModal = (title, content, actions = []) => {
    const close = () => overlay.remove();
    const overlay = el('div', { className: 'modal-overlay', onClick: (e) => { if (e.target === overlay) close(); } }, [
        el('div', { className: 'modal-content' }, [
            el('h2', { className: 'font-bold text-xl mb-4' }, title),
            el('div', { className: 'mb-6' }, [content]),
            el('div', { className: 'flex justify-end gap-2' }, actions)
        ])
    ]);
    document.body.appendChild(overlay);
    return close;
};
