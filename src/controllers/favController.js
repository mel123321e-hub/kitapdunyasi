/**
 * favController.js - Favori İş Mantığı
 * SRP: Favori butonuna tıklandığında modelleri tetikler ve UI geri bildirimi verir.
 */
import { toggleFav } from '../models/favModel.js';
import { renderToast } from '../views/components.js';
import { render as refresh } from './router.js';

export const initFavEvents = {
    toggle: (bookId) => {
        const favs = toggleFav(bookId);
        const isActive = favs.includes(bookId);
        renderToast(isActive ? 'Favorilere eklendi ❤️' : 'Favorilerden çıkarıldı');
        refresh();
    }
};
