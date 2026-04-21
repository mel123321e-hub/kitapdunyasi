/**
 * orderModel.js - Sipariş veri işlemleri
 */
import { getEntityData, saveEntityData } from './crudModel.js';

export const getOrders = () => getEntityData('orders');

export const getOrder = (id) => getOrders().find(o => o.id === id);

export const updateOrderStatus = (id, status) => {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() };
        saveEntityData('orders', orders);
        return orders[index];
    }
    return null;
};

export const getCustomerOrders = (customerId) => {
    return getOrders().filter(o => o.customerId === customerId);
};
