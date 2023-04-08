import { InputsModal } from "@/interfaces/interfaces";
import { defineComponent } from "vue";


export default defineComponent({
    props: {
        inputs: {
            type: Object as () => InputsModal,
            required: true,
        },
        isOpenModal: {
            type: Boolean,
            required: true,
        },
        titleModal: {
            type: String,
            default: 'Insira seus dados na tabela',
        },
        isCloseModal: Boolean
    },


    data() {
        return {
            modelOpenModal: false,
        }
    },

    created() {
        this.modelOpenModal = !!this.isOpenModal
    },

    watch:{
        isCloseModal(){
            this.modelOpenModal = false
        }
    }
})