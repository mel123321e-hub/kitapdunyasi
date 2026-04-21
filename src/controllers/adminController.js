/**
 * adminController.js - Admin İşlemleri
 * SRP: Giriş kontrolü, istatistik hesaplama ve veri export işlerini yapar.
 */
import { DATA } from '../models/data.js';
import { getAllReviews } from '../models/reviewModel.js';
import { getFavs } from '../models/favModel.js';
import { renderToast } from '../views/components.js';

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
        const reviews = getAllReviews();
        const totalRevenue = DATA.orderItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
        
        return {
            totalBooks: DATA.books.length,
            totalAuthors: DATA.authors.length,
            totalOrders: DATA.orders.length,
            totalRevenue,
            avgPrice: DATA.books.reduce((acc, b) => acc + b.price, 0) / DATA.books.length,
            totalStock: DATA.books.reduce((acc, b) => acc + b.stock, 0),
            totalReviews: reviews.length,
            totalFavs: getFavs().length,
            avgOrderValue: totalRevenue / DATA.orders.length,
            totalCustomers: DATA.customers.length,
            deliveredOrders: DATA.orders.filter(o => o.status === 'T').length
        };
    },

    getTopBooks: () => {
        const sales = {};
        DATA.orderItems.forEach(item => {
            sales[item.bookId] = (sales[item.bookId] || 0) + item.qty;
        });
        return Object.entries(sales)
            .map(([id, count]) => ({ 
                title: DATA.books.find(b => b.id === id)?.title, 
                sales: count 
            }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);
    },

    getCatDist: () => {
        const dist = {};
        DATA.books.forEach(b => {
            dist[b.category] = (dist[b.category] || 0) + 1;
        });
        return Object.entries(dist).map(([cat, count]) => ({ cat, count }));
    },

    exportJSON: () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(DATA));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "kitap_dunyasi_sap_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        renderToast('Veri dışa aktarıldı.');
    }
};
