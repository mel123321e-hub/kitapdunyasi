/**
 * publishersListView.js - Yayınevleri Listesi
 * SRP: Tüm yayınevlerini listeler.
 */
import { el } from '../utils/dom.js';

export const renderPublishersList = (publishers, onPublisherClick) => {
    return el('div', { className: 'container py-10' }, [
        el('h1', { className: 'text-3xl font-bold mb-8' }, 'Yayınevleri'),
        el('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' }, 
            publishers.map(pub => el('div', { 
                className: 'bg-white p-6 rounded-lg shadow-sm border hover:border-primary transition-all cursor-pointer flex justify-between items-center',
                onClick: () => onPublisherClick(pub.id)
            }, [
                el('div', {}, [
                    el('h3', { className: 'font-bold text-lg' }, pub.name),
                    el('p', { className: 'text-xs text-gray-400 mt-1' }, `📍 ${pub.city}`)
                ]),
                el('span', { style: { fontSize: '1.5rem' } }, '🏢')
            ]))
        )
    ]);
};
