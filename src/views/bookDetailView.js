/**
 * bookDetailView.js - Kitap Detay Sayfası
 * SRP: Kitabın tüm detaylarını, yorumlarını ve "kimler aldı" bilgisini render eder.
 */
import { el } from '../utils/dom.js';
import { formatPrice, formatDate } from '../utils/format.js';
import { getAuthor } from '../models/authorModel.js';
import { getPublisher } from '../models/publisherModel.js';
import { renderStars } from './components.js';

export const renderBookDetail = (book, reviews, buyers, { onAddToCart, onToggleFav, onAddReview }) => {
    const author = getAuthor(book.authorId);
    const publisher = getPublisher(book.publisherId);
    
    return el('div', { className: 'container detail-container' }, [
        el('div', { className: 'detail-grid' }, [
            // Sol: Resim/Emoji
            el('div', { className: 'detail-img' }, book.emoji),

            // Sağ: Bilgiler
            el('div', { className: 'detail-info' }, [
                el('span', { className: `category-badge cat-${book.category.replace(' ', '')} w-fit` }, book.category),
                el('h1', { className: 'text-3xl font-bold mt-2' }, book.title),
                el('p', { className: 'text-xl text-gray-600 mt-1' }, author?.name),
                
                el('div', { className: 'rating-summary' }, [
                    renderStars(Math.round(reviews.avg)),
                    el('span', { className: 'text-sm text-gray-500' }, `(${reviews.list.length} değerlendirme)`)
                ]),

                el('p', { className: 'text-gray-700 mt-4 leading-relaxed' }, book.desc),

                el('div', { className: 'mt-6 space-y-2 text-sm text-gray-600 border-t pt-4' }, [
                    el('p', {}, [el('b', {}, 'Yayınevi: '), publisher?.name]),
                    el('p', {}, [el('b', {}, 'Yayın Tarihi: '), formatDate(book.date)]),
                    el('p', {}, [el('b', {}, 'Sayfa Sayısı: '), book.pages]),
                    el('p', {}, [el('b', {}, 'Stok Durumu: '), `${book.stock} Adet`])
                ]),

                el('div', { className: 'action-row' }, [
                    el('div', { className: 'text-4xl font-extrabold text-primary' }, formatPrice(book.price)),
                    el('button', { 
                        className: 'btn btn-primary flex-1',
                        onClick: () => onAddToCart(book)
                    }, 'Sepete Ekle'),
                    el('button', { 
                        className: 'btn bg-white border border-gray-300',
                        onClick: () => onToggleFav(book.id)
                    }, '❤️')
                ])
            ])
        ]),

        // SAP FK Çözümleme: Kimler Aldı?
        el('div', { className: 'mt-12 bg-white p-6 rounded-lg shadow-sm border' }, [
            el('h3', { className: 'text-lg font-bold mb-4' }, '📊 Bu Kitabı Kimler Satın Aldı? (SAP OrderItems Join)'),
            buyers.length > 0 ? el('table', { className: 'sap-table' }, [
                el('thead', {}, [
                    el('tr', {}, [
                        el('th', {}, 'Müşteri'),
                        el('th', {}, 'Tarih'),
                        el('th', {}, 'Adet'),
                        el('th', {}, 'Durum')
                    ])
                ]),
                el('tbody', {}, buyers.map(b => el('tr', {}, [
                    el('td', {}, b.customerName),
                    el('td', {}, formatDate(b.date)),
                    el('td', {}, String(b.qty)),
                    el('td', {}, b.status === 'T' ? 'Teslim Edildi' : (b.status === 'K' ? 'Kargoda' : 'Hazırlanıyor'))
                ])))
            ]) : el('p', { className: 'text-gray-500 italic' }, 'Henüz bu kitap için sipariş bulunmuyor.')
        ]),

        // Yorumlar Section
        el('div', { className: 'reviews-section' }, [
            el('div', { className: 'flex justify-between items-center mb-6' }, [
                el('h2', { className: 'text-2xl font-bold' }, 'Okur Yorumları'),
                el('button', { 
                    className: 'btn btn-primary text-sm',
                    onClick: () => {
                        const name = prompt('Adınız:');
                        const rating = prompt('Puanınız (1-5):');
                        const comment = prompt('Yorumunuz:');
                        if (name && rating && comment) onAddReview(book.id, name, rating, comment);
                    }
                }, 'Yorum Yap')
            ]),
            el('div', {}, reviews.list.map(r => el('div', { className: 'review-card' }, [
                el('div', { className: 'flex justify-between mb-2' }, [
                    el('span', { className: 'font-bold' }, r.userName),
                    renderStars(r.rating)
                ]),
                el('p', { className: 'text-gray-700' }, r.comment),
                el('span', { className: 'text-xs text-gray-400 mt-2 block' }, new Date(r.date).toLocaleDateString('tr-TR'))
            ])))
        ])
    ]);
};
