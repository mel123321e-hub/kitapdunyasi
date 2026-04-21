/**
 * validator.js - Form Doğrulama
 */

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePhone = (phone) => {
    // 0532 000 0000 formatı kontrolü veya 11 hane
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11;
};

export const formatPhone = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 4) return v;
    if (v.length <= 7) return `${v.slice(0, 4)} ${v.slice(4)}`;
    if (v.length <= 11) return `${v.slice(0, 4)} ${v.slice(4, 7)} ${v.slice(7)}`;
    return `${v.slice(0, 4)} ${v.slice(4, 7)} ${v.slice(7, 11)}`;
};

export const validateRequired = (val, min = 1) => {
    if (!val) return false;
    return String(val).trim().length >= min;
};

export const validateNumber = (val, min = 0, max = Infinity) => {
    const n = parseFloat(val);
    return !isNaN(n) && n >= min && n <= max;
};
