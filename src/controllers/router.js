/**
 * router.js - Sayfa Yönlendirici
 * SRP: Uygulama state'ine göre doğru view'ı render eder.
 */
import { el } from '../utils/dom.js';
import { renderHeader } from '../views/headerView.js';
import { renderHome } from '../views/homeView.js';
import { renderBookDetail } from '../views/bookDetailView.js';
import { renderAuthorsList } from '../views/authorsListView.js';
import { renderAuthor } from '../views/authorView.js';
import { renderPublishersList } from '../views/publishersListView.js';
import { renderPublisher } from '../views/publisherView.js';
import { renderCart } from '../views/cartView.js';
import { renderFavs } from '../views/favView.js';
import { renderOrders } from '../views/ordersView.js';
import { renderCustomers } from '../views/customersView.js';
import { renderAdminLogin } from '../views/adminLoginView.js';
import { renderAdmin } from '../views/adminView.js';

import * as bookModel from '../models/bookModel.js';
import * as authorModel from '../models/authorModel.js';
import * as publisherModel from '../models/publisherModel.js';
import * as cartModel from '../models/cartModel.js';
import * as favModel from '../models/favModel.js';
import * as reviewModel from '../models/reviewModel.js';
import * as orderModel from '../models/orderModel.js';
import * as customerModel from '../models/customerModel.js';

import { initCartEvents } from './cartController.js';
import { initFavEvents } from './favController.js';
import { initAdminEvents } from './adminController.js';
import { initSearchEvents } from './searchController.js';

let state = {
    page: 'home',
    params: null,
    searchQuery: '',
    categoryFilter: null,
    sortBy: 'default',
    adminAuthed: false
};

const appContainer = document.getElementById('app');

export const navigate = (page, params = null) => {
    state.page = page;
    state.params = params;
    render();
    window.scrollTo(0, 0);
};

// Global navigate listener
window.addEventListener('kd-navigate', (e) => navigate(e.detail));

const handleHeaderActions = {
    onSearch: (query) => {
        state.searchQuery = query;
        state.page = 'home';
        render();
    },
    onNavigate: (page) => navigate(page),
    onToggleTheme: () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('kd_dark', document.body.classList.contains('dark'));
    }
};

const getCommonHandlers = () => ({
    onAddToCart: (book) => initCartEvents.add(book),
    onToggleFav: (id) => initFavEvents.toggle(id),
    onBookClick: (id) => navigate('book-detail', id)
});

export const render = () => {
    appContainer.innerHTML = '';
    appContainer.className = 'flex flex-col h-screen w-full bg-krem text-slate-800 font-sans overflow-hidden';

    // Render Header
    appContainer.appendChild(renderHeader(handleHeaderActions.onSearch, handleHeaderActions.onNavigate, handleHeaderActions.onToggleTheme));

    const mainContent = el('main', { className: 'flex-1 overflow-hidden' });
    appContainer.appendChild(mainContent);

    // Render Footer
    appContainer.appendChild(el('footer', { className: 'h-8 bg-slate-900 flex items-center px-6 justify-between text-[10px] text-slate-500 shrink-0' }, [
        el('div', {}, '© 2024 KitapDünyası — Tüm Hakları Saklıdır'),
        el('div', { className: 'flex gap-4' }, [
            el('span', { className: 'flex items-center gap-1' }, [
                el('span', { className: 'w-2 h-2 rounded-full bg-green-500' }),
                el('span', {}, 'Sistem Durumu: Aktif')
            ]),
            el('span', {}, 'MVC Architecture (SRP Compliant)')
        ])
    ]));

    const handlers = getCommonHandlers();

    switch (state.page) {
        case 'home':
            let books = bookModel.searchBooks(state.searchQuery);
            if (state.categoryFilter) books = books.filter(b => b.category === state.categoryFilter);
            books = bookModel.sortBooks(books, state.sortBy);
            mainContent.appendChild(renderHome(books, {
                ...handlers,
                onCategoryFilter: (cat) => { state.categoryFilter = cat; render(); },
                onSort: (sort) => { state.sortBy = sort; render(); }
            }));
            break;

        case 'book-detail':
            const book = bookModel.getBook(state.params);
            const reviews = {
                list: reviewModel.getReviewsByBook(state.params),
                avg: reviewModel.getAvgRating(state.params)
            };
            const buyers = orderModel.getOrdersByBook(state.params);
            mainContent.appendChild(renderBookDetail(book, reviews, buyers, {
                ...handlers,
                onAddReview: (bid, name, rate, comm) => {
                    reviewModel.addReview(bid, name, rate, comm);
                    render();
                }
            }));
            break;

        case 'authors':
            mainContent.appendChild(renderAuthorsList(authorModel.getAuthors(), (id) => navigate('author-detail', id)));
            break;

        case 'author-detail':
            mainContent.appendChild(renderAuthor(authorModel.getAuthor(state.params), authorModel.getBooksByAuthor(state.params), handlers));
            break;

        case 'publishers':
            mainContent.appendChild(renderPublishersList(publisherModel.getPublishers(), (id) => navigate('publisher-detail', id)));
            break;

        case 'publisher-detail':
            mainContent.appendChild(renderPublisher(publisherModel.getPublisher(state.params), publisherModel.getBooksByPublisher(state.params), handlers));
            break;

        case 'cart':
            mainContent.appendChild(renderCart(cartModel.getCart(), {
                onRemove: (id) => { cartModel.removeFromCart(id); render(); },
                onUpdateQty: (id, q) => { cartModel.updateQty(id, q); render(); },
                onCheckout: () => initCartEvents.checkout(() => {
                    cartModel.clearCart();
                    navigate('orders');
                })
            }));
            break;

        case 'favs':
            const favBooks = favModel.getFavs().map(id => bookModel.getBook(id)).filter(Boolean);
            mainContent.appendChild(renderFavs(favBooks, handlers));
            break;

        case 'orders':
            mainContent.appendChild(renderOrders(orderModel.getOrders()));
            break;

        case 'customers':
            mainContent.appendChild(renderCustomers(customerModel.getCustomers()));
            break;

        case 'admin-login':
            if (state.adminAuthed) navigate('admin');
            else mainContent.appendChild(renderAdminLogin((pw) => {
                if (initAdminEvents.login(pw)) {
                    state.adminAuthed = true;
                    navigate('admin');
                }
            }));
            break;

        case 'admin':
            if (!state.adminAuthed) navigate('admin-login');
            else {
                const stats = initAdminEvents.getStats();
                const top = initAdminEvents.getTopBooks();
                const dist = initAdminEvents.getCatDist();
                mainContent.appendChild(renderAdmin(stats, top, dist, initAdminEvents.exportJSON));
            }
            break;
    }
};
