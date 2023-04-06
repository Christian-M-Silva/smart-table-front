import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isLoading: {
            type: Boolean,
            required: true
        },
    },

    data() {
        return {
            openModal: false,
        }
    },

    watch: {
        isLoading(newValue) {
            this.openModal = newValue
        }
    }

})