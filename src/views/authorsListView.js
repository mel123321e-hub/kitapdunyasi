/**
 * authorsListView.js - Tüm Yazarlar Listesi
 * SRP: Sistemdeki tüm yazarları grid halinde listeler.
 */
import { el } from '../utils/dom.js';

export const renderAuthorsList = (authors, onAuthorClick) => {
    return el('div', { className: 'container py-10' }, [
        el('h1', { className: 'text-3xl font-bold mb-8' }, 'Değerli Yazarlarımız'),
        el('div', { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' }, 
            authors.map(author => el('div', { 
                className: 'bg-white p-6 rounded-lg shadow-sm border hover:border-primary transition-all cursor-pointer text-center',
                onClick: () => onAuthorClick(author.id)
            }, [
                el('div', { className: 'text-4xl mb-4' }, author.image),
                el('h3', { className: 'font-bold text-lg' }, author.name),
                el('p', { className: 'text-sm text-gray-500 mt-2 line-clamp-2' }, author.bio)
            ]))
        )
    ]);
};
