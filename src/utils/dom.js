/**
 * dom.js - DOM manipülasyon yardımcıları
 * SRP: Sadece DOM eleman üretimi ve event bağlama işlerini yapar.
 */

/**
 * HTML elemanı oluşturur
 * @param {string} tag - Tag adı
 * @param {Object} props - Attribute'lar
 * @param {Array|string} children - Çocuk elemanlar
 */
export const el = (tag, props = {}, children = []) => {
    const element = document.createElement(tag);
    
    // Attribute ve event setleme
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.toLowerCase().substring(2), value);
        } else if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key === 'dataset' && typeof value === 'object') {
            Object.assign(element.dataset, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Çocukları ekleme
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (Array.isArray(children)) {
        children.forEach(child => {
            if (child) {
                element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
            }
        });
    }

    return element;
};

/**
 * Event delegasyonu veya basit binder
 */
export const on = (selector, event, handler) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.addEventListener(event, handler));
};
