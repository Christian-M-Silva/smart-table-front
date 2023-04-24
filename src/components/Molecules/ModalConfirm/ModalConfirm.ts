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
    },

    watch: {
        isOpenModalConfirm() {
            this.openModal = true
        }
    },
})