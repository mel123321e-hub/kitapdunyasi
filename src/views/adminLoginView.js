/**
 * adminLoginView.js - Admin Giriş Paneli
 * SRP: Şifre korumalı admin girişi için arayüz sunar.
 */
import { el } from '../utils/dom.js';

export const renderAdminLogin = (onSubmit) => {
    return el('div', { className: 'container py-20 flex justify-center' }, [
        el('div', { className: 'bg-white p-10 rounded-2xl shadow-xl border max-w-sm w-full' }, [
            el('div', { className: 'text-center mb-8' }, [
                el('span', { style: { fontSize: '4rem' } }, '🛡️'),
                el('h1', { className: 'text-2xl font-bold mt-4' }, 'Yönetici Girişi'),
                el('p', { className: 'text-gray-500 text-sm' }, 'Lütfen devam etmek için şifrenizi girin.')
            ]),
            el('div', { className: 'space-y-4' }, [
                el('input', { 
                    type: 'password', 
                    id: 'admin-password',
                    placeholder: 'Şifre',
                    className: 'w-full p-3 border rounded-lg outline-none focus:border-primary'
                }),
                el('button', { 
                    className: 'btn btn-primary w-full py-3',
                    onClick: () => onSubmit(document.getElementById('admin-password').value)
                }, 'Giriş Yap'),
                el('p', { className: 'text-center text-xs text-gray-400' }, 'Varsayılan Şifre: admin')
            ])
        ])
    ]);
};
