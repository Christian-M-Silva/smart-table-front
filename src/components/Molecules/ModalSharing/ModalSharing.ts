import { defineComponent, PropType } from "vue";
import InputComponent from "@/components/Atomos/InputComponent/InputComponent.vue";
import { Network } from "@/interfaces/interfaces";

export default defineComponent({
    components: {
        InputComponent
    },
    data() {
        return {
            openModal: false,
            button: {
                color: 'grey-9',
                iconSize: 'xs',
                iconName: 'fas fa-link',
                label: 'Copiar Link',
            }
        }
    },

    methods: {
        copy(value: string) {
            navigator.clipboard.writeText(value)
        }
    },

    props: {
        isOpenModalConfirm: {
            type: Boolean,
            required: true
        },
        networks: {
            type: Array as PropType<Network[]>,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        copyText: Boolean
    },

    watch: {
        isOpenModalConfirm() {
            this.openModal = true
        }
    },
})