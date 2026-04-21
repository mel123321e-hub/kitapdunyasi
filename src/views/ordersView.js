/**
 * ordersView.js - Sipariş Geçmişi
 * SRP: Tüm siparişleri ve içeriklerini listeler.
 */
import { el } from '../utils/dom.js';
import { formatDate, formatPrice } from '../utils/format.js';
import { getBook } from '../models/bookModel.js';
import { getOrderItems } from '../models/orderModel.js';
import { getCustomer } from '../models/customerModel.js';

export const renderOrders = (orders) => {
    return el('div', { className: 'container py-10' }, [
        el('h1', { className: 'text-3xl font-bold mb-8' }, 'Sipariş Geçmişi'),
        el('div', { className: 'space-y-6' }, orders.map(order => {
            const items = getOrderItems(order.id);
            const customer = getCustomer(order.customerId);
            const total = items.reduce((acc, i) => acc + (i.price * i.qty), 0);

            return el('div', { className: 'bg-white p-6 rounded-xl shadow-sm border' }, [
                el('div', { className: 'flex flex-wrap justify-between items-center border-b pb-4 mb-4 gap-4' }, [
                    el('div', {}, [
                        el('p', { className: 'text-xs text-gray-400 font-mono' }, `NO: #${order.id}`),
                        el('p', { className: 'font-bold' }, customer?.name || 'Müşteri')
                    ]),
                    el('div', { className: 'text-right' }, [
                        el('p', { className: 'text-sm text-gray-500' }, formatDate(order.date)),
                        el('span', { 
                            className: 'text-xs px-2 py-1 rounded font-bold uppercase',
                            style: { 
                                background: order.status === 'T' ? '#dcfce7' : '#fef9c3',
                                color: order.status === 'T' ? '#15803d' : '#a16207'
                            }
                        }, order.status === 'T' ? 'Teslim Edildi' : (order.status === 'K' ? 'Kargoda' : 'Hazırlanıyor'))
                    ])
                ]),
                el('div', { className: 'space-y-3' }, items.map(item => {
                    const book = getBook(item.bookId);
                    return el('div', { className: 'flex justify-between items-center text-sm' }, [
                        el('span', {}, `${book?.title} x${item.qty}`),
                        el('span', { className: 'font-mono' }, formatPrice(item.price * item.qty))
                    ]);
                })),
                el('div', { className: 'mt-4 pt-4 border-t flex justify-between font-bold' }, [
                    el('span', {}, 'Toplam Tutar'),
                    el('span', { className: 'text-primary' }, formatPrice(total))
                ])
            ]);
        }))
    ]);
};
