/**
 * cartController.js - Sepet İş Mantığı
 * SRP: Sepetle ilgili kullanıcı etkileşimlerini yönetir.
 */
import { addToCart } from '../models/cartModel.js';
import { renderToast, renderModal } from '../views/components.js';
import { render as refresh } from './router.js';
import { el } from '../utils/dom.js';

export const initCartEvents = {
    add: (book) => {
        addToCart(book);
        renderToast(`${book.title} sepete eklendi!`);
        refresh(); // Header'daki sayacı güncellemek için
    },

    checkout: (onSuccess) => {
        const close = renderModal(
            'Siparişi Tamamla',
            'Sepetinizdeki ürünleri onaylıyor musunuz? SAP ABAP sistemi üzerinden sipariş kaydı oluşturulacaktır.',
            [
                el('button', { className: 'btn bg-gray-200', onClick: () => close() }, 'İptal'),
                el('button', { 
                    className: 'btn btn-primary', 
                    onClick: () => {
                        close();
                        renderToast('Siparişiniz başarıyla alındı!');
                        onSuccess();
                    }
                }, 'Onayla')
            ]
        );
    }
};
