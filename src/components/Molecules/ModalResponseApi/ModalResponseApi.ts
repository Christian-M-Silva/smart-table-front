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
        },

        messageAxios: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            code: 0,
            colorCode: '',
            openModal: false,
            axiosMessage: ''
        }
    },

    watch: {
        isOpenModal() {
            this.openModal = true
            this.axiosMessage = this.messageAxios
            if (this.responseApi.status) {
                this.code = this.responseApi.status
            } else {
                this.code = this.responseApi.response.status
            }
            switch (this.code) {
                case 200:
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Requisição feita com sucesso'
                    this.colorCode = 'text-lime-700'
                    break;
                case 201:
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Dado criado e salvo com sucesso'
                    this.colorCode = 'text-lime-700'
                    break;
                case 422:
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Não foi possível processar as instruções, tente alterar o dado enviado'
                    this.colorCode = 'text-red-600'
                    break;
                case 404:
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Dado não encontrado'
                    this.colorCode = 'text-amber-400'
                    break;
            }
        }
    }

})