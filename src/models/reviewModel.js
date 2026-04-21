/**
 * reviewModel.js - Yorumlar ve Puanlama
 * SRP: Kitap yorumlarını LocalStorage üzerinde yönetir.
 */
import { safeGet, safeSet } from '../utils/storage.js';

const KEY = 'kd_reviews';

export const getAllReviews = () => safeGet(KEY, []);

export const getReviewsByBook = (bookId) => {
    return getAllReviews().filter(r => r.bookId === bookId);
};

export const addReview = (bookId, userName, rating, comment) => {
    const reviews = getAllReviews();
    const newReview = {
        id: 'REV' + Date.now(),
        bookId,
        userName,
        rating: Number(rating),
        comment,
        date: new Date().toISOString()
    };
    reviews.push(newReview);
    safeSet(KEY, reviews);
    return newReview;
};

export const getAvgRating = (bookId) => {
    const reviews = getReviewsByBook(bookId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
};
