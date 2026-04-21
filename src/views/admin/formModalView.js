/**
 * formModalView.js - Reusable Form Modal
 */
export const renderFormModal = (props) => {
    return {
        template: `
            <div class="modal-backdrop" v-on:click.self="$emit('close')">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>{{ title }}</h2>
                        <button class="modal-close" v-on:click="$emit('close')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn" v-on:click="$emit('close')">İptal</button>
                        <button class="btn-primary px-6" v-on:click="$emit('save')">💾 Kaydet</button>
                    </div>
                </div>
            </div>
        `,
        props: ['title']
    };
};
