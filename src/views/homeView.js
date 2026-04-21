/**
 * homeView.js - Ana Sayfa (Kitap Listesi)
 * SRP: Kitap gridini ve filtrelerini render eder.
 */
import { el } from '../utils/dom.js';
import { renderBookCard } from './components.js';
import { getBookCategories } from '../models/bookModel.js';

export const renderHome = (books, { onAddToCart, onToggleFav, onBookClick, onCategoryFilter, onSort }) => {
    const categories = getBookCategories();

    return el('div', { className: 'container flex gap-6 p-6 h-full overflow-hidden' }, [
        // Sidebar
        el('aside', { className: 'w-56 shrink-0 flex flex-col gap-4 hidden lg:flex' }, [
            el('div', { className: 'bg-white rounded-lg border border-slate-200 p-4 shadow-sm' }, [
                el('h3', { className: 'text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3' }, 'Kategoriler'),
                el('ul', { className: 'space-y-2 text-sm' }, [
                    el('li', { 
                        className: 'flex items-center cursor-pointer hover:text-primary transition-colors',
                        onClick: () => onCategoryFilter(null)
                    }, [
                        el('span', { className: 'font-bold' }, 'Tümü')
                    ]),
                    ...categories.map(cat => el('li', {
                        className: 'flex items-center cursor-pointer hover:text-primary transition-colors',
                        onClick: () => onCategoryFilter(cat)
                    }, [
                        el('span', {}, cat)
                    ]))
                ])
            ]),
            el('div', { className: 'bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg p-4 text-white shadow-lg' }, [
                el('h4', { className: 'text-sm font-bold mb-1' }, 'Günün Fırsatı'),
                el('p', { className: 'text-[10px] opacity-80 mb-3' }, 'Haftaya özel tüm kitaplarda sürpriz indirimler!'),
                el('div', { className: 'bg-white/20 rounded h-1 w-full mb-3' }, [
                    el('div', { className: 'bg-white h-full w-3/4 rounded shadow-[0_0_10px_white]' })
                ]),
                el('button', { className: 'w-full bg-white text-indigo-700 text-xs font-bold py-2 rounded shadow-sm' }, 'İncele')
            ])
        ]),

        // Main Content Area
        el('div', { className: 'flex-1 flex flex-col gap-4 overflow-y-auto pr-2' }, [
            // Filtreler & Sıralama Bar
            el('div', { className: 'flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-slate-200 shrink-0' }, [
                el('div', { className: 'flex items-center gap-4 text-xs font-medium' }, [
                    el('span', { className: 'text-slate-400' }, 'Sırala:'),
                    el('select', { 
                        className: 'bg-transparent outline-none cursor-pointer text-slate-700 font-bold',
                        onChange: (e) => onSort(e.target.value)
                    }, [
                        el('option', { value: 'default' }, 'Önerilen'),
                        el('option', { value: 'price-asc' }, 'Fiyat: Düşükten Yükseğe'),
                        el('option', { value: 'price-desc' }, 'Fiyat: Yüksekten Düşüğe'),
                        el('option', { value: 'date-desc' }, 'En Yeniler'),
                        el('option', { value: 'alpha' }, 'İsim (A-Z)')
                    ])
                ]),
                el('div', { className: 'text-[10px] text-slate-400 font-bold uppercase tracking-wider' }, `${books.length} Kitap Bulundu`)
            ]),

            // Kitap Grid
            books.length > 0 
                ? el('div', { className: 'book-grid' }, 
                    books.map(book => renderBookCard(book, onAddToCart, onToggleFav, onBookClick))
                )
                : el('div', { className: 'py-20 text-center text-gray-400 bg-white rounded-lg border border-dashed border-slate-200' }, [
                    el('span', { style: { fontSize: '3rem', display: 'block' } }, '📭'),
                    el('p', { className: 'mt-4 font-bold text-xs uppercase tracking-widest' }, 'Aradığınız kriterlere uygun kitap bulunamadı.')
                ])
        ])
    ]);
};
