/**
 * cartView.js - Sepet Ekranı
 * SRP: Sepet içeriğini, miktar kontrollerini ve toplam tutarı render eder.
 */
import { el } from '../utils/dom.js';
import { formatPrice } from '../utils/format.js';

export const renderCart = (cartItems, { onRemove, onUpdateQty, onCheckout }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = subtotal > 200 || subtotal === 0 ? 0 : 29.90;

    return el('div', { className: 'container cart-grid' }, [
        // Sol: Ürünler
        el('div', {}, [
            el('h1', { className: 'text-2xl font-bold mb-6' }, 'Alışveriş Sepetim'),
            cartItems.length > 0 ? el('div', { className: 'cart-items' }, cartItems.map(item => el('div', { className: 'cart-item' }, [
                el('div', { className: 'cart-item-img' }, item.emoji),
                el('div', {}, [
                    el('h3', { className: 'font-bold' }, item.title),
                    el('p', { className: 'text-sm text-gray-500' }, formatPrice(item.price))
                ]),
                el('div', { className: 'qty-control' }, [
                    el('button', { className: 'qty-btn', onClick: () => onUpdateQty(item.id, item.qty - 1) }, '-'),
                    el('span', { className: 'w-8 text-center font-bold' }, String(item.qty)),
                    el('button', { className: 'qty-btn', onClick: () => onUpdateQty(item.id, item.qty + 1) }, '+')
                ]),
                el('div', { className: 'flex flex-col items-end gap-2' }, [
                    el('span', { className: 'font-bold text-primary' }, formatPrice(item.price * item.qty)),
                    el('button', { className: 'text-red-500 text-xs font-bold', onClick: () => onRemove(item.id) }, 'SİL')
                ])
            ]))) : el('div', { className: 'bg-white p-10 text-center rounded-lg' }, [
                el('p', { className: 'text-gray-500' }, 'Sepetiniz şu an boş.'),
                el('button', { className: 'btn btn-primary mt-4', onClick: () => window.dispatchEvent(new CustomEvent('kd-navigate', { detail: 'home' })) }, 'Alışverişe Başla')
            ])
        ]),

        // Sağ: Özet
        el('div', {}, [
            el('div', { className: 'cart-summary' }, [
                el('h2', { className: 'font-bold text-xl mb-4' }, 'Sipariş Özeti'),
                el('div', { className: 'space-y-3 pb-4 border-bottom mb-4' }, [
                    el('div', { className: 'flex justify-between' }, [
                        el('span', {}, 'Ürünler Toplamı'),
                        el('span', { className: 'font-bold' }, formatPrice(subtotal))
                    ]),
                    el('div', { className: 'flex justify-between' }, [
                        el('span', {}, 'Kargo Ücreti'),
                        el('span', { className: 'font-bold text-green-600' }, shipping === 0 ? 'BEDAVA' : formatPrice(shipping))
                    ])
                ]),
                el('div', { className: 'flex justify-between text-xl font-extrabold mb-6' }, [
                    el('span', {}, 'Toplam'),
                    el('span', { className: 'text-primary' }, formatPrice(subtotal + shipping))
                ]),
                el('button', { 
                    className: 'btn btn-primary w-full py-3',
                    disabled: cartItems.length === 0,
                    onClick: onCheckout
                }, 'ÖDEME ADIMINA GEÇ')
            ]),
            subtotal > 0 && subtotal < 200 ? el('p', { className: 'text-xs text-orange-600 mt-2 italic' }, [
                el('b', {}, formatPrice(200 - subtotal)), ' daha ekle kargo bedava olsun!'
            ]) : null
        ])
    ]);
};
