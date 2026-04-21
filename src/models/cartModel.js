/**
 * cartModel.js - Sepet Yönetimi
 * SRP: Sepet veri yapısını LocalStorage üzerinde yönetir.
 */
import { safeGet, safeSet } from '../utils/storage.js';

const KEY = 'kd_cart';

export const getCart = () => safeGet(KEY, []);

export const addToCart = (book) => {
    const cart = getCart();
    const existing = cart.find(item => item.id === book.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...book, qty: 1 });
    }
    safeSet(KEY, cart);
    return cart;
};

export const removeFromCart = (bookId) => {
    const cart = getCart().filter(item => item.id !== bookId);
    safeSet(KEY, cart);
    return cart;
};

export const updateQty = (bookId, qty) => {
    const cart = getCart();
    const item = cart.find(i => i.id === bookId);
    if (item) {
        item.qty = Math.max(1, qty);
        safeSet(KEY, cart);
    }
    return cart;
};

export const clearCart = () => safeSet(KEY, []);
