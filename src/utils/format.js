/**
 * format.js - Veri formatlama yardımcıları
 * SRP: Sadece para birimi ve tarih formatlama işlerini yapar.
 */

/**
 * Fiyatı TR formatına dönüştürür (145,00 ₺)
 */
export const formatPrice = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(amount);
};

/**
 * SAP tarih formatını (YYYYMMDD) TR formatına (DD.MM.YYYY) dönüştürür
 */
export const formatDate = (sapDate) => {
    if (!sapDate || String(sapDate).length !== 8) return sapDate;
    const s = String(sapDate);
    return `${s.substring(6, 8)}.${s.substring(4, 6)}.${s.substring(0, 4)}`;
};
