/**
 * customersView.js - Müşteri Portföyü ve Adres Zinciri
 * SRP: Müşterileri ve SAP adres JOIN zincirini görselleştirir.
 */
import { el } from '../utils/dom.js';
import { resolveAddressChain } from '../models/customerModel.js';

export const renderCustomers = (customers) => {
    return el('div', { className: 'container py-10' }, [
        el('h1', { className: 'text-3xl font-bold mb-8' }, 'Müşteri Portföyü'),
        el('div', { className: 'grid gap-6' }, customers.map(cust => {
            const addr = resolveAddressChain(cust.addressId);
            return el('div', { className: 'bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row gap-6 justify-between' }, [
                el('div', {}, [
                    el('h3', { className: 'text-xl font-bold text-primary' }, cust.name),
                    el('p', { className: 'text-gray-500 font-mono mt-1' }, cust.phone)
                ]),
                el('div', { className: 'flex-1 md:text-right' }, [
                    el('p', { className: 'text-sm font-bold' }, '📍 Sevk Adresi (SAP Address Chain)'),
                    el('p', { className: 'text-sm text-gray-600 mt-1' }, [
                        el('span', { className: 'italic' }, addr.fullAddress),
                        el('br', {}),
                        el('span', { className: 'font-mono uppercase text-xs bg-gray-100 px-1' }, `${addr.city} / ${addr.state} / ${addr.country}`)
                    ])
                ])
            ]);
        }))
    ]);
};
