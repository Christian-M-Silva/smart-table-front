import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isOpenModalErro: {
            type: Boolean,
            required: true
        },

        errorMessage: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            openModal: false,
        }
    },

    watch: {
        isOpenModalErro() {
            this.openModal = true
        }
    },
})