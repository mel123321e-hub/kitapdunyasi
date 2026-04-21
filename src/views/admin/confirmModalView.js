/**
 * confirmModalView.js - Reusable Confirmation Modal
 */
export const renderConfirmModal = (props) => {
    return {
        template: `
            <div class="modal-backdrop" v-on:click.self="$emit('cancel')">
                <div class="modal-content modal-confirm">
                    <div class="modal-header">
                        <h2 class="text-red-600">Onay Gerekiyor</h2>
                        <button class="modal-close" v-on:click="$emit('cancel')">&times;</button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="confirm-icon text-4xl mb-2">⚠️</div>
                        <p class="text-slate-600">{{ message }}</p>
                    </div>
                    <div class="modal-footer justify-center">
                        <button class="action-btn" v-on:click="$emit('cancel')">İptal</button>
                        <button class="btn-primary bg-red-600 hover:bg-red-700 text-white border-none" v-on:click="$emit('confirm')">🗑️ Evet, Sil</button>
                    </div>
                </div>
            </div>
        `,
        props: ['message']
    };
};
