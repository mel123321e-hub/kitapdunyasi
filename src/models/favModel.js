/**
 * favModel.js - Favoriler Yönetimi
 * SRP: Favori kitap listesini LocalStorage üzerinde yönetir.
 */
import { safeGet, safeSet } from '../utils/storage.js';

const KEY = 'kd_favs';

export const getFavs = () => safeGet(KEY, []);

export const toggleFav = (bookId) => {
    let favs = getFavs();
    if (favs.includes(bookId)) {
        favs = favs.filter(id => id !== bookId);
    } else {
        favs.push(bookId);
    }
    safeSet(KEY, favs);
    return favs;
};

export const isFav = (bookId) => getFavs().includes(bookId);
