/**
 * headerView.js - Üst Menü ve Navigasyon
 * SRP: Logo, arama kutusu ve ikonların render edilmesinden sorumludur.
 */
import { el } from '../utils/dom.js';
import { getCart } from '../models/cartModel.js';
import { getFavs } from '../models/favModel.js';

export const renderHeader = (onSearch, onNavigate, onToggleTheme) => {
    const cartCount = getCart().reduce((acc, item) => acc + item.qty, 0);
    const favCount = getFavs().length;

    return el('header', {}, [
        el('div', { className: 'container' }, [
            el('div', { className: 'header-inner' }, [
                // Logo
                el('a', { 
                    href: '#', 
                    className: 'logo',
                    onClick: (e) => { e.preventDefault(); onNavigate('home'); }
                }, [
                    el('div', { className: 'logo-icon' }, 'K'),
                    el('span', {}, 'KitapDünyası')
                ]),

                // Arama
                el('form', { 
                    className: 'search-bar',
                    onSubmit: (e) => {
                        e.preventDefault();
                        const input = e.target.querySelector('input');
                        onSearch(input.value);
                    }
                }, [
                    el('input', { 
                        type: 'text', 
                        name: 'q',
                        placeholder: 'Kitap, yazar veya yayınevi ara...',
                        onInput: (e) => onSearch(e.target.value)
                    }),
                    el('button', { type: 'submit', className: 'search-btn' }, [
                        el('span', { style: { color: '#94a3b8' } }, '🔍')
                    ])
                ]),

                // İkonlar
                el('div', { className: 'header-icons' }, [
                    el('button', { className: 'icon-btn', onClick: () => onNavigate('favs') }, [
                        el('span', {}, '❤️'),
                        el('span', { className: 'icon-text' }, 'Favoriler'),
                        favCount > 0 ? el('span', { className: 'badge' }, String(favCount)) : null
                    ]),
                    el('button', { className: 'icon-btn', onClick: () => onNavigate('cart') }, [
                        el('span', {}, '🛒'),
                        el('span', { className: 'icon-text' }, 'Sepetim'),
                        cartCount > 0 ? el('span', { className: 'badge' }, String(cartCount)) : null
                    ]),
                    el('button', { 
                        className: 'icon-btn', 
                        style: { borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem', borderRadius: '0' },
                        onClick: onToggleTheme 
                    }, [
                        el('span', {}, '🌓'),
                        el('span', { className: 'icon-text' }, 'Temu Değiş')
                    ])
                ])
            ])
        ]),
        // Alt Nav
        el('nav', { className: 'sub-nav' }, [
            el('div', { className: 'container sub-nav-inner' }, [
                el('a', { href: '#', className: 'sub-nav-link', onClick: (e) => { e.preventDefault(); onNavigate('home'); } }, 'Kitaplar'),
                el('a', { href: '#', className: 'sub-nav-link', onClick: (e) => { e.preventDefault(); onNavigate('authors'); } }, 'Yazarlar'),
                el('a', { href: '#', className: 'sub-nav-link', onClick: (e) => { e.preventDefault(); onNavigate('publishers'); } }, 'Yayınevleri'),
                el('a', { href: '#', className: 'sub-nav-link', onClick: (e) => { e.preventDefault(); onNavigate('orders'); } }, 'Siparişler'),
                el('a', { href: '#', className: 'sub-nav-link', onClick: (e) => { e.preventDefault(); onNavigate('customers'); } }, 'Müşteriler'),
                el('a', { href: '#', className: 'sub-nav-link', onClick: (e) => { e.preventDefault(); onNavigate('admin-login'); } }, 'Admin')
            ])
        ])
    ]);
};
