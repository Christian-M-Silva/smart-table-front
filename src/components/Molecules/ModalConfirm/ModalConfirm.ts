import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            openModal: false,
        }
    },

    methods:{
        confirm() {
           this.$emit('confirm')
        },

        negative() {
           this.$emit('negative')
        }
    },

    props: {
        isOpenModalConfirm: {
            type: Boolean,
            required: true
        },
        messageConfirmation: {
            type: String,
            default: "Tem certeza?"
        }
    },

    watch: {
        isOpenModalConfirm() {
            this.openModal = true
        }
    },
})