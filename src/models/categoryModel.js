/**
 * categoryModel.js - Kategori ve Alt Kategori İşlemleri
 */
import { getEntityData, saveEntityData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

export const getCategories = () => getEntityData('categories');

export const createCategory = (category) => {
    const categories = getCategories();
    const newId = generateId('categories');
    const newCategory = { ...category, id: newId, subCategories: [] };
    saveEntityData('categories', [...categories, newCategory]);
    return newCategory;
};

export const updateCategory = (id, data) => {
    const categories = getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories[index] = { ...categories[index], ...data };
        saveEntityData('categories', categories);
        return categories[index];
    }
    return null;
};

export const deleteCategory = (id) => {
    const categories = getCategories();
    saveEntityData('categories', categories.filter(c => c.id !== id));
};

export const createSubCategory = (parentId, subCategory) => {
    const categories = getCategories();
    const index = categories.findIndex(c => c.id === parentId);
    if (index !== -1) {
        const newId = generateId('subCategories');
        const newSub = { ...subCategory, id: newId };
        categories[index].subCategories = [...(categories[index].subCategories || []), newSub];
        saveEntityData('categories', categories);
        return newSub;
    }
    return null;
};

export const updateSubCategory = (parentId, subId, data) => {
    const categories = getCategories();
    const cIndex = categories.findIndex(c => c.id === parentId);
    if (cIndex !== -1) {
        const sIndex = categories[cIndex].subCategories.findIndex(s => s.id === subId);
        if (sIndex !== -1) {
            categories[cIndex].subCategories[sIndex] = { ...categories[cIndex].subCategories[sIndex], ...data };
            saveEntityData('categories', categories);
            return categories[cIndex].subCategories[sIndex];
        }
    }
    return null;
};

export const deleteSubCategory = (parentId, subId) => {
    const categories = getCategories();
    const index = categories.findIndex(c => c.id === parentId);
    if (index !== -1) {
        categories[index].subCategories = categories[index].subCategories.filter(s => s.id !== subId);
        saveEntityData('categories', categories);
    }
};
