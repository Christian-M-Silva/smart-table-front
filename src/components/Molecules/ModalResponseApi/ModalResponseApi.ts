import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isOpenModal: {
            type: Boolean,
            required: true
        },
        responseApi: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            code: 0,
            colorCode:'',
            message: '',
            openModal: false,
        }
    },

    watch: {
        isOpenModal() {
            this.openModal = true
            if (this.responseApi.status) {
                this.code = this.responseApi.status
            }else{
                this.code = this.responseApi.response.status
            }
            switch (this.code) {
                case 201:
                    this.message = 'Dado criado e salvo com sucesso'
                    this.colorCode = 'text-lime-600'
                    break;
                case 422:
                    this.message = this.responseApi.response.data.errors[0].message
                    this.colorCode = 'text-red-600'
                    break;
            }
        }
    }

})