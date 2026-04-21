/**
 * adminController.js - Admin İşlemleri
 * SRP: Giriş kontrolü, istatistik hesaplama ve veri export işlerini yapar.
 */
import { DATA } from '../models/data.js';
import { getAllReviews } from '../models/reviewModel.js';
import { getFavs } from '../models/favModel.js';
import { renderToast } from '../views/components.js';
import { getEntityData } from '../models/crudModel.js';

export const initAdminEvents = {
    login: (password) => {
        if (password === 'admin') {
            renderToast('Giriş başarılı. Merhaba Admin!');
            return true;
        }
        renderToast('Hatalı şifre!');
        return false;
    },

    getStats: () => {
        const books = getEntityData('books');
        const authors = getEntityData('authors');
        const orders = getEntityData('orders');
        const orderItems = getEntityData('orderItems');
        const customers = getEntityData('customers');
        const reviews = getAllReviews();
        
        const totalRevenue = orderItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
        
        return {
            totalBooks: books.length,
            totalAuthors: authors.length,
            totalOrders: orders.length,
            totalRevenue,
            avgPrice: books.length ? books.reduce((acc, b) => acc + b.price, 0) / books.length : 0,
            totalStock: books.reduce((acc, b) => acc + b.stock, 0),
            totalReviews: reviews.length,
            totalFavs: getFavs().length,
            avgOrderValue: orders.length ? totalRevenue / orders.length : 0,
            totalCustomers: customers.length,
            deliveredOrders: orders.filter(o => o.status === 'T').length
        };
    },

    getTopBooks: () => {
        const orderItems = getEntityData('orderItems');
        const books = getEntityData('books');
        const sales = {};
        orderItems.forEach(item => {
            sales[item.bookId] = (sales[item.bookId] || 0) + item.qty;
        });
        return Object.entries(sales)
            .map(([id, count]) => ({ 
                title: books.find(b => b.id === id)?.title || 'Bilinmeyen Kitap', 
                sales: count 
            }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);
    },

    getCatDist: () => {
        const books = getEntityData('books');
        const dist = {};
        books.forEach(b => {
            dist[b.category] = (dist[b.category] || 0) + 1;
        });
        return Object.entries(dist).map(([cat, count]) => ({ cat, count }));
    },

    exportJSON: () => {
        const currentData = {
            books: getEntityData('books'),
            authors: getEntityData('authors'),
            publishers: getEntityData('publishers'),
            customers: getEntityData('customers'),
            orders: getEntityData('orders'),
            categories: getEntityData('categories'),
            orderItems: getEntityData('orderItems'),
            reviews: getAllReviews(),
            favs: getFavs()
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "kitap_dunyasi_live_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        renderToast('Veri dışa aktarıldı.');
    }
};
