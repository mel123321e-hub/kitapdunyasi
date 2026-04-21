/**
 * crudModel.js - Ortak CRUD Helper'ları
 */
import { DATA } from './data.js';
import { safeGet, safeSet } from '../utils/storage.js';

export const getEntityData = (entityType) => {
    const lsKey = `kd_${entityType}`;
    const stored = safeGet(lsKey);
    return stored || DATA[entityType];
};

export const saveEntityData = (entityType, data) => {
    const lsKey = `kd_${entityType}`;
    safeSet(lsKey, data);
};

export const resetEntityData = (entityType) => {
    const lsKey = `kd_${entityType}`;
    localStorage.removeItem(lsKey);
};
