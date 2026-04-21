/**
 * publisherModel.js - Yayınevi veri işlemleri
 * SRP: Sadece yayınevi verilerine erişim yapar.
 */
import { getEntityData, saveEntityData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

export const getPublishers = () => getEntityData('publishers');

export const getPublisher = (id) => getPublishers().find(p => p.id === id);

export const getBooksByPublisher = (publisherId) => {
    const books = getEntityData('books');
    return books.filter(b => b.publisherId === publisherId);
};

export const canDeletePublisher = (publisherId) => {
    return getBooksByPublisher(publisherId).length === 0;
};

export const createPublisher = (publisher) => {
    const publishers = getPublishers();
    const newId = generateId('publishers');
    const newPublisher = { ...publisher, id: newId };
    saveEntityData('publishers', [...publishers, newPublisher]);
    return newPublisher;
};

export const updatePublisher = (id, data) => {
    const publishers = getPublishers();
    const index = publishers.findIndex(p => p.id === id);
    if (index !== -1) {
        publishers[index] = { ...publishers[index], ...data };
        saveEntityData('publishers', publishers);
        return publishers[index];
    }
    return null;
};

export const deletePublisher = (id) => {
    if (!canDeletePublisher(id)) return false;
    const publishers = getPublishers();
    saveEntityData('publishers', publishers.filter(p => p.id !== id));
    return true;
};
