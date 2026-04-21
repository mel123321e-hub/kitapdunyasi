/**
 * customerModel.js - Müşteri ve Adres Zinciri
 * SRP: Müşteri verilerini ve karmaşık adres JOIN (5 tablo) işlemlerini yapar.
 */
import { getEntityData, saveEntityData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';
import { DATA } from './data.js';

export const getCustomers = () => getEntityData('customers');

export const getCustomer = (id) => getCustomers().find(c => c.id === id);

export const createCustomer = (customer) => {
    const customers = getCustomers();
    const newId = generateId('customers');
    const newCustomer = { ...customer, id: newId };
    saveEntityData('customers', [...customers, newCustomer]);
    return newCustomer;
};

export const updateCustomer = (id, data) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers[index] = { ...customers[index], ...data };
        saveEntityData('customers', customers);
        return customers[index];
    }
    return null;
};

export const deleteCustomer = (id) => {
    const customers = getCustomers();
    saveEntityData('customers', customers.filter(c => c.id !== id));
};

/**
 * 5 tablo JOIN: Address -> Street -> City -> State -> Country
 */
export const resolveAddressChain = (addressId) => {
    const addresses = DATA.addresses; // Şimdilik adresler statik kabul edilebilir veya crudModel'e eklenebilir
    const addr = addresses.find(a => a.id === addressId);
    if (!addr) return null;

    const street = DATA.streets.find(s => s.id === addr.streetId);
    const city = street ? DATA.cities.find(c => c.id === street.cityId) : null;
    const state = city ? DATA.states.find(s => s.id === city.stateId) : null;
    const country = state ? DATA.countries.find(c => c.id === state.countryId) : null;

    return {
        fullAddress: `${street?.name || ''} No:${addr.houseNo || ''} ${addr.zipCode || ''}`,
        city: city?.name,
        state: state?.name,
        country: country?.name
    };
};
