/**
 * idGenerator.js - Otomatik ID Üretici
 */
import { DATA } from '../models/data.js';
import { safeGet } from './storage.js';

const PREFIXES = {
    books: 'KT',
    authors: 'YZ',
    publishers: 'YY',
    customers: 'MU',
    orders: 'SP'
};

const LS_KEYS = {
    books: 'kd_books',
    authors: 'kd_authors',
    publishers: 'kd_publishers',
    customers: 'kd_customers'
};

export const generateId = (entityType) => {
    const prefix = PREFIXES[entityType] || 'XX';
    const lsKey = LS_KEYS[entityType];
    
    // Veriyi al (LocalStorage veya Baseline)
    const stored = safeGet(lsKey);
    const data = stored || DATA[entityType];

    if (!data || data.length === 0) return `${prefix}11`;

    // Son ID'yi bul ve rakam kısmını büyüt
    const ids = data.map(item => {
        const numPart = item.id.replace(prefix, '');
        return parseInt(numPart, 10) || 0;
    });

    const maxId = Math.max(...ids);
    const nextId = maxId + 1;

    // Minimum sayıyı koruyarak (data.js genelde 10-20 arasındaysa devam eder)
    return `${prefix}${nextId < 10 ? '0' + nextId : nextId}`;
};
