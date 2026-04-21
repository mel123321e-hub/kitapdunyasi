/**
 * storage.js - LocalStorage sarmalayıcı
 * SRP: LocalStorage işlemlerini güvenli (try/catch) şekilde yönetir.
 */

export const safeGet = (key, defaultValue = null) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
        console.error(`Storage error (get): ${key}`, e);
        return defaultValue;
    }
};

export const safeSet = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Storage error (set): ${key}`, e);
    }
};
