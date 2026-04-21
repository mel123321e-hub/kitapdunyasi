/**
 * adminView.js - Admin Dashboard Component (Vue.js)
 * Fully functional CRUD for Books, Authors, Publishers, Customers, Orders, and Categories.
 */
import { createApp } from 'vue';
import * as bookModel from '../models/bookModel.js';
import * as authorModel from '../models/authorModel.js';
import * as publisherModel from '../models/publisherModel.js';
import * as customerModel from '../models/customerModel.js';
import * as orderModel from '../models/orderModel.js';
import * as categoryModel from '../models/categoryModel.js';
import { initAdminEvents } from '../controllers/adminController.js';

export const renderAdmin = (stats, topBooks, catDist, exportFn) => {
    const root = document.createElement('div');
    root.id = 'admin-app-container';
    root.className = 'h-full w-full overflow-hidden';

    const app = createApp({
        template: `
        <div class="admin-container p-6 space-y-8 animate-in h-screen overflow-y-auto" style="background-color: var(--bg-main);">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-black italic tracking-tighter" style="color: var(--primary);">ADMIN PANELİ</h1>
                    <p class="text-slate-500 text-sm">Yönetim ve İstatistik Merkezi</p>
                </div>
                <div class="flex gap-2">
                    <button class="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-amber-200 transition" v-on:click="exportData">📥 Veri Dışa Aktar</button>
                    <button class="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition" @click="signGrid">🏠 Siteye Dön</button>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-2 border-b overflow-x-auto pb-px" style="border-color: var(--border-light);">
                <button v-for="tab in tabs" :key="tab.id" 
                    @click="setTab(tab.id)"
                    :class="['px-4 py-3 text-sm font-bold transition-all whitespace-nowrap', activeTab === tab.id ? 'border-b-2' : 'opacity-60 hover:opacity-100']"
                    :style="activeTab === tab.id ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : { color: 'var(--text-muted)' }">
                    {{ tab.name }}
                </button>
            </div>

            <!-- Content Area -->
            <div class="mt-6 pb-20">
                <!-- Dashboard -->
                <div v-if="activeTab === 'dashboard'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div v-for="(val, label) in dashboardStats" :key="label" class="p-6 rounded-xl border shadow-sm" style="background-color: var(--bg-card); border-color: var(--border-light);">
                        <p class="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-60">{{ label }}</p>
                        <h4 class="text-2xl font-black" style="color: var(--text-main);">{{ val }}</h4>
                    </div>
                </div>

                <!-- CRUD Table -->
                <div v-else-if="activeTab !== 'categories'" class="rounded-xl border overflow-hidden shadow-sm" style="background-color: var(--bg-card); border-color: var(--border-light);">
                    <div class="p-4 border-b flex flex-wrap justify-between items-center bg-slate-50/50 gap-4" style="border-color: var(--border-light);">
                        <div class="relative flex-1 min-w-[200px] max-w-sm">
                            <input type="text" v-model="searchQuery" placeholder="Ara..." class="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-amber-400 outline-none">
                            <span class="absolute left-3 top-2.5 opacity-40">🔍</span>
                        </div>
                        <button v-if="activeTab !== 'orders'" class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg text-sm shadow-md transition" v-on:click="openAddModal">＋ Yeni Ekle</button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm whitespace-nowrap">
                            <thead class="bg-slate-50" style="background-color: var(--bg-main); color: var(--text-muted);">
                                <tr>
                                    <th v-for="col in columns[activeTab]" :key="col" class="px-6 py-4 font-bold border-b" style="border-color: var(--border-light);">{{ col }}</th>
                                    <th class="px-6 py-4 border-b text-right" style="border-color: var(--border-light);">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y" style="border-color: var(--border-light);">
                                <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                                    <td v-for="(val, key) in getRowData(item)" :key="key" class="px-6 py-4" style="color: var(--text-main);">
                                        <template v-if="key === 'status'">
                                            <span :class="getStatusClass(val)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">{{ getStatusLabel(val) }}</span>
                                        </template>
                                        <template v-else-if="key === 'price'">{{ val }} TL</template>
                                        <template v-else-if="key === 'image' || key === 'emoji'">
                                           <span class="text-2xl">{{ val }}</span>
                                        </template>
                                        <template v-else>{{ val }}</template>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-3 text-lg">
                                            <template v-if="activeTab === 'orders'">
                                                <select v-if="item.status !== 'T'" class="text-[11px] border rounded p-1.5 font-bold outline-none bg-white dark:bg-slate-800" v-on:change="updateStatus(item.id, $event.target.value)">
                                                    <option value="">Durum Güncelle</option>
                                                    <option v-if="item.status === 'H'" value="K">Kargoya Ver</option>
                                                    <option v-if="item.status === 'K'" value="T">Teslim Edildi</option>
                                                </select>
                                                <span v-else class="text-[10px] uppercase font-bold text-green-500">TAMAMLANDI</span>
                                            </template>
                                            <template v-else>
                                                <button v-on:click="openEditModal(item)" class="hover:text-amber-500 transition-colors" title="Düzenle">✏️</button>
                                                <button v-on:click="confirmDelete(item)" class="hover:text-red-500 transition-colors" title="Sil">🗑️</button>
                                            </template>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="totalPages > 1" class="p-6 border-t flex items-center justify-between text-xs font-bold" style="border-color: var(--border-light);">
                        <span style="color: var(--text-muted);">{{ activeData.length }} kayıttan {{ (currentPage-1)*itemsPerPage+1 }}-{{ Math.min(currentPage*itemsPerPage, activeData.length) }} arası gösteriliyor</span>
                        <div class="flex gap-2">
                            <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded disabled:opacity-30 hover:bg-slate-50 transition">◀</button>
                            <div class="flex gap-1">
                                <button v-for="p in totalPages" :key="p" @click="currentPage = p" :class="['px-3 py-1 rounded border transition', p === currentPage ? 'bg-amber-500 text-white border-amber-500' : 'hover:bg-slate-50']">{{ p }}</button>
                            </div>
                            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded disabled:opacity-30 hover:bg-slate-50 transition">▶</button>
                        </div>
                    </div>
                </div>

                <!-- Categories Specialized UI -->
                <div v-else class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-bold flex items-center gap-2" style="color: var(--text-main);">
                            <span class="p-2 bg-amber-100 rounded-lg">🏷️</span> Kategoriler
                        </h2>
                        <button class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg text-sm shadow-md transition" v-on:click="openAddModal">＋ Ana Kategori Ekle</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="cat in data.categories" :key="cat.id" class="p-6 rounded-2xl border shadow-sm flex flex-col group hover:shadow-md transition-all" style="background-color: var(--bg-card); border-color: var(--border-light);">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-black text-xl tracking-tight" style="color: var(--text-main);">{{ cat.name }}</h3>
                                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button @click="openEditModal(cat)" class="p-2 hover:bg-amber-50 rounded-xl transition" title="Düzenle">✏️</button>
                                    <button @click="confirmDelete(cat)" class="p-2 hover:bg-red-50 rounded-xl text-red-500 transition" title="Sil">🗑️</button>
                                </div>
                            </div>
                            <p class="text-sm opacity-60 mb-6 leading-relaxed">{{ cat.description }}</p>
                            
                            <div class="flex-1 space-y-2">
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Alt Kategoriler</p>
                                <div v-for="sub in cat.subCategories" :key="sub.id" class="flex justify-between items-center text-sm p-2 bg-slate-50/50 dark:bg-slate-800/20 rounded-lg border border-transparent hover:border-amber-200 transition-all group/sub">
                                    <span class="font-medium" style="color: var(--text-main);">{{ sub.name }}</span>
                                    <div class="flex gap-2 opacity-0 group-hover/sub:opacity-100 transition-opacity text-xs">
                                        <button @click="openEditSubModal(cat, sub)" class="text-amber-600 font-bold hover:underline">Edit</button>
                                        <button @click="confirmDeleteSub(cat.id, sub.id)" class="text-red-400 font-bold hover:underline">Sil</button>
                                    </div>
                                </div>
                                <div v-if="!cat.subCategories || cat.subCategories.length === 0" class="py-4 text-center text-slate-400 italic text-xs">Henüz alt kategori yok.</div>
                            </div>

                            <button @click="openAddSubModal(cat)" class="w-full mt-6 py-2 border-2 border-dashed border-amber-200 text-amber-500 rounded-xl font-bold text-sm hover:bg-amber-50 hover:border-amber-500 transition-all">+ Alt Kategori Ekle</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Complex Logic Modal (Form) -->
            <transition name="scale">
                <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-3xl w-full max-w-xl overflow-hidden border border-white/20">
                        <div class="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div>
                                <h2 class="text-2xl font-black text-slate-800 dark:text-white">{{ isEdit ? 'GÜNCELLE' : 'YENİ EKLE' }}</h2>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">{{ getTypeName(modals.type) }} Kaydı</p>
                            </div>
                            <button @click="showForm = false" class="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform">✕</button>
                        </div>
                        <div class="p-8 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div v-for="field in formFields" :key="field.key" class="flex flex-col gap-1.5">
                                <label class="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">{{ field.label }}</label>
                                <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" v-model="formData[field.key]" class="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none transition-all font-medium">
                                <textarea v-else-if="field.type === 'textarea'" v-model="formData[field.key]" class="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none transition-all font-medium min-h-[120px]"></textarea>
                                <select v-else-if="field.type === 'select'" v-model="formData[field.key]" class="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-amber-500 rounded-2xl outline-none transition-all font-medium appearance-none">
                                    <option value="">Seçiniz...</option>
                                    <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-8 border-t dark:border-slate-800 flex justify-end gap-4 bg-slate-50/50 dark:bg-slate-800/20">
                            <button @click="showForm = false" class="text-sm font-black text-slate-400 hover:text-slate-600 tracking-widest uppercase">Vazgeç</button>
                            <button @click="handleSave" class="bg-amber-500 hover:bg-amber-600 text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all tracking-widest uppercase">Onayla</button>
                        </div>
                    </div>
                </div>
            </transition>
            
            <!-- Toast Notification -->
            <transition name="slide-up">
                <div v-if="toast.show" class="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-4 bg-slate-900 border border-white/10 text-white rounded-2xl shadow-2xl z-[100]">
                    <div class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    <span class="font-bold text-sm tracking-wide">{{ toast.msg }}</span>
                </div>
            </transition>
        </div>
        `,
        data() {
            return {
                activeTab: 'dashboard',
                searchQuery: '',
                currentPage: 1,
                itemsPerPage: 10,
                showForm: false,
                isEdit: false,
                toast: { show: false, msg: '' },
                formData: {},
                modals: { type: '' },
                activeItem: null,
                parentCat: null,
                tabs: [
                    { id: 'dashboard', name: '📊 Özet' },
                    { id: 'books', name: '📚 Kitaplar' },
                    { id: 'authors', name: '✍️ Yazarlar' },
                    { id: 'publishers', name: '🏢 Yayınevleri' },
                    { id: 'customers', name: '👥 Müşteriler' },
                    { id: 'orders', name: '📦 Siparişler' },
                    { id: 'categories', name: '🏷️ Kategoriler' }
                ],
                data: {
                    books: [], authors: [], publishers: [], customers: [], orders: [], categories: []
                },
                columns: {
                    books: ['Tür', 'Başlık', 'Yazar', 'Fiyat', 'Stok'],
                    authors: ['Simg', 'Ad Soyad', 'Biyo'],
                    publishers: ['Kurum', 'Konum'],
                    customers: ['Müşteri', 'Telefon'],
                    orders: ['Sip No', 'Müşteri', 'Tarih', 'Durum'],
                    categories: ['Başlık', 'Açıklama']
                }
            };
        },
        computed: {
            dashboardStats() {
                const s = initAdminEvents.getStats();
                return {
                    'Top Kitap': s.totalBooks,
                    'Toplam Yazar': s.totalAuthors,
                    'Siparişler': s.totalOrders,
                    'Ciro (TL)': s.totalRevenue.toFixed(2),
                    'Stok Toplamı': s.totalStock,
                    'Müşteri Sayısı': s.totalCustomers,
                    'Okur Yorumu': s.totalReviews,
                    'Favorilenme': s.totalFavs
                };
            },
            activeData() {
                let items = this.data[this.activeTab] || [];
                if (this.searchQuery && this.searchQuery.length > 1) {
                    const q = this.searchQuery.toLowerCase();
                    items = items.filter(i => {
                        const values = Object.values(i).join(' ').toLowerCase();
                        return values.includes(q);
                    });
                }
                return items;
            },
            paginatedData() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                return this.activeData.slice(start, start + this.itemsPerPage);
            },
            totalPages() {
                return Math.ceil(this.activeData.length / this.itemsPerPage) || 1;
            },
            formFields() {
                const tab = this.modals.type;
                if (tab === 'book') return [
                    { key: 'title', label: 'Kitap Başlığı', type: 'text' },
                    { key: 'authorId', label: 'Yazar Seç', type: 'select', options: this.data.authors.map(a => ({ value: a.id, label: a.name + ' ' + (a.surname || '') })) },
                    { key: 'publisherId', label: 'Yayınevi Seç', type: 'select', options: this.data.publishers.map(p => ({ value: p.id, label: p.name })) },
                    { key: 'category', label: 'Kategori Adı', type: 'text' },
                    { key: 'price', label: 'Fiyat (TL)', type: 'number' },
                    { key: 'stock', label: 'Stok Adedi', type: 'number' },
                    { key: 'pages', label: 'Sayfa Sayısı', type: 'number' },
                    { key: 'emoji', label: 'Kapak Emojisi', type: 'text' },
                    { key: 'desc', label: 'Detaylı Açıklama', type: 'textarea' }
                ];
                if (tab === 'author') return [
                    { key: 'name', label: 'Ad', type: 'text' },
                    { key: 'surname', label: 'Soyad', type: 'text' },
                    { key: 'bio', label: 'Kısa Biyografi', type: 'textarea' },
                    { key: 'image', label: 'Profil Emojisi', type: 'text' }
                ];
                if (tab === 'publisher') return [
                    { key: 'name', label: 'Kurum Adı', type: 'text' },
                    { key: 'city', label: 'Merkez Şehir', type: 'text' }
                ];
                if (tab === 'customer') return [
                    { key: 'name', label: 'Ad Soyad', type: 'text' },
                    { key: 'phone', label: 'İletişim No', type: 'text' },
                    { key: 'email', label: 'E-posta', type: 'text' }
                ];
                if (tab === 'category' || tab === 'subCategory') return [
                    { key: 'name', label: 'Başlık', type: 'text' },
                    { key: 'description', label: 'Açıklama Metni', type: 'textarea' }
                ];
                return [];
            }
        },
        methods: {
            refresh() {
                this.data.books = bookModel.getBooks();
                this.data.authors = authorModel.getAuthors();
                this.data.publishers = publisherModel.getPublishers();
                this.data.customers = customerModel.getCustomers();
                this.data.orders = orderModel.getOrders();
                this.data.categories = categoryModel.getCategories();
            },
            setTab(t) {
                this.activeTab = t;
                this.currentPage = 1;
                this.searchQuery = '';
            },
            getTypeName(t) {
                const map = { book: 'Kitap', author: 'Yazar', publisher: 'Yayınevi', customer: 'Müşteri', order: 'Sipariş', category: 'Kategori', subCategory: 'Alt Kategori' };
                return map[t] || t;
            },
            getRowData(item) {
                const tab = this.activeTab;
                if (tab === 'books') return { emoji: item.emoji, title: item.title, author: this.getAuthorName(item.authorId), price: item.price, stock: item.stock };
                if (tab === 'authors') return { image: item.image, name: (item.name + ' ' + (item.surname || '')), bio: item.bio };
                if (tab === 'publishers') return { name: item.name, city: item.city };
                if (tab === 'customers') return { name: item.name, phone: item.phone };
                if (tab === 'orders') return { id: item.id, customer: this.getCustomerName(item.customerId), date: item.date, status: item.status };
                return item;
            },
            getAuthorName(id) {
                const a = authorModel.getAuthor(id);
                return a ? (a.name + ' ' + (a.surname || '')) : '-';
            },
            getCustomerName(id) {
                const c = customerModel.getCustomer(id);
                return c ? c.name : 'Misafir';
            },
            openAddModal() {
                this.isEdit = false;
                this.modals.type = this.activeTab === 'categories' ? 'category' : this.activeTab.slice(0,-1);
                this.formData = { price: 0, stock: 0, pages: 0, emoji: '📚', image: '👤' };
                this.showForm = true;
            },
            openEditModal(item) {
                this.isEdit = true;
                this.modals.type = this.activeTab === 'categories' ? 'category' : this.activeTab.slice(0,-1);
                this.formData = { ...item };
                this.showForm = true;
            },
            openAddSubModal(cat) {
                 this.isEdit = false;
                 this.modals.type = 'subCategory';
                 this.parentCat = cat;
                 this.formData = { name: '', description: '', categoryId: cat.id };
                 this.showForm = true;
            },
            openEditSubModal(cat, sub) {
                 this.isEdit = true;
                 this.modals.type = 'subCategory';
                 this.parentCat = cat;
                 this.formData = { ...sub, categoryId: cat.id };
                 this.showForm = true;
            },
            handleSave() {
                const type = this.modals.type;
                try {
                    if (type === 'book') this.isEdit ? bookModel.updateBook(this.formData.id, this.formData) : bookModel.createBook(this.formData);
                    else if (type === 'author') this.isEdit ? authorModel.updateAuthor(this.formData.id, this.formData) : authorModel.createAuthor(this.formData);
                    else if (type === 'publisher') this.isEdit ? publisherModel.updatePublisher(this.formData.id, this.formData) : publisherModel.createPublisher(this.formData);
                    else if (type === 'customer') this.isEdit ? customerModel.updateCustomer(this.formData.id, this.formData) : customerModel.createCustomer(this.formData);
                    else if (type === 'category') this.isEdit ? categoryModel.updateCategory(this.formData.id, this.formData) : categoryModel.createCategory(this.formData);
                    else if (type === 'subCategory') this.isEdit ? categoryModel.updateSubCategory(this.parentCat.id, this.formData.id, this.formData) : categoryModel.createSubCategory(this.parentCat.id, this.formData);
                    
                    this.showToast('Kayıt başarıyla saklandı.');
                    this.refresh();
                    this.showForm = false;
                } catch (e) {
                    this.showToast(e.message, 'error');
                }
            },
            confirmDelete(item) {
                if (confirm('Bu kaydı kalıcı olarak silmek istediğinize emin misiniz?')) {
                    const tab = this.activeTab;
                    let id = item.id;
                    if (tab === 'books') bookModel.deleteBook(id);
                    else if (tab === 'authors') authorModel.deleteAuthor(id);
                    else if (tab === 'publishers') publisherModel.deletePublisher(id);
                    else if (tab === 'customers') customerModel.deleteCustomer(id);
                    else if (tab === 'categories') categoryModel.deleteCategory(id);
                    this.refresh();
                    this.showToast('Silme başarılı.');
                }
            },
            confirmDeleteSub(catId, subId) {
                if (confirm('Alt kategoriyi silmek istediğinize emin misiniz?')) {
                    categoryModel.deleteSubCategory(catId, subId);
                    this.refresh();
                    this.showToast('Alt kategori silindi.');
                }
            },
            updateStatus(id, val) {
                if(!val) return;
                orderModel.updateOrderStatus(id, val);
                this.refresh();
                this.showToast('Sipariş durumu güncellendi.');
            },
            exportData() {
                initAdminEvents.exportJSON();
            },
            showToast(msg) {
                this.toast.msg = msg;
                this.toast.show = true;
                setTimeout(() => this.toast.show = false, 3000);
            },
            signGrid() {
                 window.dispatchEvent(new CustomEvent('kd-navigate', { detail: 'home' }));
            },
            nextPage() { if(this.currentPage < this.totalPages) this.currentPage++; },
            prevPage() { if(this.currentPage > 1) this.currentPage--; }
        },
        mounted() {
            this.refresh();
        }
    };
};
