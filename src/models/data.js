/**
 * data.js - 11 SAP Tablosu (Hardcoded JSON)
 * SRP: Uygulamanın statik veri kaynağıdır.
 */

export const DATA = {
    // 1. Ülkeler
    countries: [
        { id: 'TR', name: 'Türkiye' }
    ],

    // 2. İller (States)
    states: [
        { id: '26', countryId: 'TR', name: 'Eskişehir' },
        { id: '34', countryId: 'TR', name: 'İstanbul' },
        { id: '06', countryId: 'TR', name: 'Ankara' },
        { id: '35', countryId: 'TR', name: 'İzmir' },
        { id: '07', countryId: 'TR', name: 'Antalya' },
        { id: '16', countryId: 'TR', name: 'Bursa' }
    ],

    // 3. İlçeler (Cities)
    cities: [
        { id: '2601', stateId: '26', name: 'Tepebaşı' },
        { id: '2602', stateId: '26', name: 'Odunpazarı' },
        { id: '3401', stateId: '34', name: 'Kadıköy' },
        { id: '3402', stateId: '34', name: 'Beşiktaş' },
        { id: '0601', stateId: '06', name: 'Çankaya' },
        { id: '3501', stateId: '35', name: 'Konak' },
        { id: '0701', stateId: '07', name: 'Finike' },
        { id: '1601', stateId: '16', name: 'Nilüfer' }
    ],

    // 4. Cadde/Sokak (Streets)
    streets: [
        { id: 'S1', cityId: '2601', name: 'Atatürk Bulv.' },
        { id: 'S2', cityId: '2602', name: 'Cumhuriyet Cad.' },
        { id: 'S3', cityId: '3401', name: 'Bağdat Cad.' },
        { id: 'S4', cityId: '3402', name: 'Barbaros Bulv.' },
        { id: 'S5', cityId: '0601', name: 'Tunalı Hilmi' },
        { id: 'S6', cityId: '3501', name: 'Kordon' },
        { id: 'S7', cityId: '0701', name: 'Sahil Yolu' },
        { id: 'S8', cityId: '1601', name: 'Fethiye Cad.' }
    ],

    // 5. Adresler
    addresses: [
        { id: 'A1', streetId: 'S1', houseNo: '10', zipCode: '26100' },
        { id: 'A2', streetId: 'S2', houseNo: '24', zipCode: '26200' },
        { id: 'A3', streetId: 'S3', houseNo: '150', zipCode: '34710' },
        { id: 'A4', streetId: 'S4', houseNo: '5', zipCode: '34350' },
        { id: 'A5', streetId: 'S5', houseNo: '88', zipCode: '06700' },
        { id: 'A6', streetId: 'S6', houseNo: '12', zipCode: '35220' },
        { id: 'A7', streetId: 'S7', houseNo: '1', zipCode: '07700' },
        { id: 'A8', streetId: 'S8', houseNo: '101', zipCode: '16110' }
    ],

    // 6. Yazarlar
    authors: [
        { id: 'AUTH1', name: 'Orhan Pamuk', bio: 'Nobel ödüllü yazar.', image: '📖' },
        { id: 'AUTH2', name: 'Elif Şafak', bio: 'Uluslararası alanda tanınan romancı.', image: '✒️' },
        { id: 'AUTH3', name: 'Sabahattin Ali', bio: 'Edebiyatımızın ulu çınarı.', image: '📜' },
        { id: 'AUTH4', name: 'Doğan Cüceloğlu', bio: 'Değerli psikolog ve yazar.', image: '🧠' },
        { id: 'AUTH5', name: 'Aziz Nesin', bio: 'Usta mizahçı.', image: '🎭' },
        { id: 'AUTH6', name: 'İlber Ortaylı', bio: 'Tarih profesörü.', image: '🏺' },
        { id: 'AUTH7', name: 'Ahmet Ümit', bio: 'Polisiye romanların usta ismi.', image: '🔍' },
        { id: 'AUTH8', name: 'Paulo Coelho', bio: 'Dünyaca ünlü Brezilyalı yazar.', image: '✨' },
        { id: 'AUTH9', name: 'Fyodor Dostoyevski', bio: 'Rus edebiyatının dev ismi.', image: '❄️' },
        { id: 'AUTH10', name: 'Antoine de Saint-Exupéry', bio: 'Fransız yazar ve pilot.', image: '✈️' }
    ],

    // 7. Yayınevleri
    publishers: [
        { id: 'PUB1', name: 'Yapı Kredi Yayınları', city: 'İstanbul' },
        { id: 'PUB2', name: 'Can Yayınları', city: 'İstanbul' },
        { id: 'PUB3', name: 'İş Bankası Kültür', city: 'İstanbul' },
        { id: 'PUB4', name: 'Kronik Kitap', city: 'Ankara' },
        { id: 'PUB5', name: 'Kırmızı Kedi', city: 'İstanbul' },
        { id: 'PUB6', name: 'Doğan Kitap', city: 'İstanbul' },
        { id: 'PUB7', name: 'Epsilon', city: 'İstanbul' },
        { id: 'PUB8', name: 'Remzi Kitabevi', city: 'İstanbul' }
    ],

    // 8. Kitaplar
    books: [
        { id: 'B1', title: 'Masumiyet Müzesi', authorId: 'AUTH1', publisherId: 'PUB1', date: '20080101', price: 125, desc: 'Aşk ve takıntı üzerine muazzam bir roman.', emoji: '💍', category: 'Roman', stock: 15, pages: 592 },
        { id: 'B2', title: 'İstanbul Hatıralar', authorId: 'AUTH1', publisherId: 'PUB1', date: '20030101', price: 145, desc: 'Pamuk\'un çocukluğu ve İstanbul\'un tarihi.', emoji: '🌉', category: 'Anı', stock: 8, pages: 400 },
        { id: 'B3', title: 'Benim Adım Kırmızı', authorId: 'AUTH1', publisherId: 'PUB1', date: '19980101', price: 165, desc: 'Osmanlı nakkaşları ve bir cinayet.', emoji: '🎨', category: 'Roman', stock: 12, pages: 504 },
        { id: 'B4', title: 'Aşk', authorId: 'AUTH2', publisherId: 'PUB6', date: '20090307', price: 95, desc: 'Mevlana ve Şems üzerine modern bir hikaye.', emoji: '🌹', category: 'Roman', stock: 20, pages: 420 },
        { id: 'B5', title: '10 Minutes 38 Seconds', authorId: 'AUTH2', publisherId: 'PUB6', date: '20190501', price: 110, desc: 'Efsanevi bir İstanbul hikayesi.', emoji: '⏱️', category: 'Roman', stock: 10, pages: 312 },
        { id: 'B6', title: 'Kürk Mantolu Madonna', authorId: 'AUTH3', publisherId: 'PUB2', date: '19430101', price: 45, desc: 'Raif Efendi ve Maria Puder\'in ölümsüz aşkı.', emoji: '🧣', category: 'Klasik', stock: 50, pages: 160 },
        { id: 'B7', title: 'İçimizdeki Çocuk', authorId: 'AUTH4', publisherId: 'PUB8', date: '19920101', price: 88, desc: 'Kendimizi tanıma yolculuğu.', emoji: '🧒', category: 'Psikoloji', stock: 25, pages: 256 },
        { id: 'B8', title: 'İnsan İnsana', authorId: 'AUTH4', publisherId: 'PUB8', date: '19910101', price: 82, desc: 'İletişim sanatı üzerine.', emoji: '🤝', category: 'Psikoloji', stock: 18, pages: 280 },
        { id: 'B9', title: 'Simyacı', authorId: 'AUTH8', publisherId: 'PUB2', date: '19880101', price: 75, desc: 'Kendi efsanesini yaşayan çobanın hikayesi.', emoji: '⚗️', category: 'Roman', stock: 40, pages: 188 },
        { id: 'B10', title: 'On Bir Dakika', authorId: 'AUTH8', publisherId: 'PUB2', date: '20030101', price: 78, desc: 'Cinsellik ve aşk arayışı.', emoji: '⌛', category: 'Roman', stock: 14, pages: 250 },
        { id: 'B11', title: 'Türklerin Tarihi', authorId: 'AUTH6', publisherId: 'PUB4', date: '20150101', price: 135, desc: 'Orta Asya\'dan Avrupa kapılarına.', emoji: '🏹', category: 'Tarih', stock: 30, pages: 416 },
        { id: 'B12', title: 'Osmanlı\'yı Yeniden Keşfetmek', authorId: 'AUTH6', publisherId: 'PUB4', date: '20060101', price: 115, desc: 'Tarihimize yeni bir bakış.', emoji: '🕌', category: 'Tarih', stock: 22, pages: 280 },
        { id: 'B13', title: 'Suç ve Ceza', authorId: 'AUTH9', publisherId: 'PUB3', date: '18660101', price: 105, desc: 'Raskolnikov\'un büyük vicdan azabı.', emoji: '🔨', category: 'Klasik', stock: 35, pages: 712 },
        { id: 'B14', title: 'Karamazov Kardeşler', authorId: 'AUTH9', publisherId: 'PUB3', date: '18800101', price: 160, desc: 'Bir aile trajedisi ve felsefi sorgulama.', emoji: '⛪', category: 'Klasik', stock: 15, pages: 840 },
        { id: 'B15', title: 'Yaşar Ne Yaşar Ne Yaşamaz', authorId: 'AUTH5', publisherId: 'PUB5', date: '19770101', price: 65, desc: 'Bürokrasi ve toplum hicvi.', emoji: '📝', category: 'Mizah', stock: 45, pages: 320 },
        { id: 'B16', title: 'Beyoğlu Rapsodisi', authorId: 'AUTH7', publisherId: 'PUB6', date: '20030101', price: 92, desc: 'İstanbul\'un kalbinde bir cinayet.', emoji: '🎷', category: 'Polisiye', stock: 28, pages: 448 },
        { id: 'B17', title: 'Sefiller', authorId: 'AUTH9', publisherId: 'PUB3', date: '18620101', price: 155, desc: 'Jean Valjean\'ın kefaret yolculuğu.', emoji: '🥖', category: 'Klasik', stock: 20, pages: 1200 },
        { id: 'B18', title: 'Küçük Prens', authorId: 'AUTH10', publisherId: 'PUB2', date: '19430101', price: 38, desc: 'Yalnızca kalplerimizle görebiliriz.', emoji: '🤴', category: 'Klasik', stock: 100, pages: 96 },
        { id: 'B19', title: 'Havada Bulut', authorId: 'AUTH3', publisherId: 'PUB2', date: '19540101', price: 55, desc: 'Öykü tadında bir yaşam dökümü.', emoji: '☁️', category: 'Anı', stock: 12, pages: 180 },
        { id: 'B20', title: 'İçimdeki Ses', authorId: 'AUTH4', publisherId: 'PUB8', date: '20000101', price: 85, desc: 'Kendi sesimizi bulmak.', emoji: '🗣️', category: 'Psikoloji', stock: 19, pages: 220 }
    ],

    // 9. Müşteriler
    customers: [
        { id: 'C1', name: 'Ayşe Yılmaz', phone: '0532 111 22 33', addressId: 'A1' },
        { id: 'C2', name: 'Mehmet Demir', phone: '0533 222 33 44', addressId: 'A2' },
        { id: 'C3', name: 'Fatma Kaya', phone: '0532 333 44 55', addressId: 'A3' },
        { id: 'C4', name: 'Ali Öztürk', phone: '0535 444 55 66', addressId: 'A4' },
        { id: 'C5', name: 'Zeynep Arslan', phone: '0536 555 66 77', addressId: 'A5' },
        { id: 'C6', name: 'Emre Şahin', phone: '0537 666 77 88', addressId: 'A6' },
        { id: 'C7', name: 'Elif Çelik', phone: '0538 777 88 99', addressId: 'A7' },
        { id: 'C8', name: 'Burak Aydın', phone: '0539 888 99 00', addressId: 'A8' }
    ],

    // 10. Siparişler
    orders: [
        { id: 'ORD1', customerId: 'C1', date: '20240410', status: 'T' },
        { id: 'ORD2', customerId: 'C2', date: '20240411', status: 'K' },
        { id: 'ORD3', customerId: 'C3', date: '20240412', status: 'H' },
        { id: 'ORD4', customerId: 'C4', date: '20240413', status: 'T' },
        { id: 'ORD5', customerId: 'C5', date: '20240414', status: 'T' },
        { id: 'ORD6', customerId: 'C6', date: '20240415', status: 'K' },
        { id: 'ORD7', customerId: 'C1', date: '20240416', status: 'H' },
        { id: 'ORD8', customerId: 'C8', date: '20240417', status: 'H' },
        { id: 'ORD9', customerId: 'C7', date: '20240418', status: 'T' }
    ],

    // 11. Sipariş Kalemleri
    orderItems: [
        { orderId: 'ORD1', bookId: 'B1', qty: 1, price: 125 },
        { orderId: 'ORD1', bookId: 'B6', qty: 2, price: 45 },
        { orderId: 'ORD2', bookId: 'B4', qty: 1, price: 95 },
        { orderId: 'ORD3', bookId: 'B18', qty: 5, price: 38 },
        { orderId: 'ORD4', bookId: 'B11', qty: 1, price: 135 },
        { orderId: 'ORD5', bookId: 'B9', qty: 1, price: 75 },
        { orderId: 'ORD5', bookId: 'B13', qty: 1, price: 105 },
        { orderId: 'ORD6', bookId: 'B16', qty: 1, price: 92 },
        { orderId: 'ORD7', bookId: 'B7', qty: 1, price: 88 },
        { orderId: 'ORD8', bookId: 'B2', qty: 1, price: 145 },
        { orderId: 'ORD9', bookId: 'B3', qty: 1, price: 165 },
        { orderId: 'ORD4', bookId: 'B20', qty: 1, price: 85 }
    ],

    // 12. Kategoriler
    categories: [
        { id: 'CAT1', name: 'Roman', description: 'Geniş kapsamlı kurgu eserler', subCategories: [{ id: 'SUB1', name: 'Dünya Klasikleri' }, { id: 'SUB2', name: 'Türk Edebiyatı' }] },
        { id: 'CAT2', name: 'Klasik', description: 'Zamanın ötesindeki başyapıtlar', subCategories: [] },
        { id: 'CAT3', name: 'Psikoloji', description: 'İnsan zihni ve davranışları', subCategories: [] },
        { id: 'CAT4', name: 'Tarih', description: 'Geçmişin izleri', subCategories: [] },
        { id: 'CAT5', name: 'Polisiye', description: 'Gizem ve macera', subCategories: [] },
        { id: 'CAT6', name: 'Anı', description: 'Yaşanmışlıklar', subCategories: [] },
        { id: 'CAT7', name: 'Mizah', description: 'Güldüren öyküler', subCategories: [] }
    ]
};
