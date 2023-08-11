import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isOpenModal: {
            type: Boolean,
            required: true
        },
        responseApiStatus: {
            type: [Number, String],
            required: true
        },

        messageAxios: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            colorCode: '',
            openModal: false,
            axiosMessage: ''
        }
    },

    watch: {
        isOpenModal() {
            this.openModal = true
            this.axiosMessage = this.messageAxios

            switch (this.responseApiStatus) {
                case 200:
                    this.colorCode = 'text-lime-700'
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Operação Concluída com Sucesso!'
                    break;
                case 201:
                    this.colorCode = 'text-lime-700'
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Dado criado e salvo com sucesso'
                    break;
                case 400:
                    this.colorCode = 'text-amber-300'
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'A sintaxe do seu dado está errado'
                    break;
                case 401:
                    this.colorCode = 'text-amber-500'
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Não autorizado'
                    break;
                case 404:
                    this.colorCode = 'text-amber-400'
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Dado não encontrado'
                    break;
                case 'ECONNABORTED':
                    this.colorCode = 'text-amber-400'
                    console.error('Tempo muito longo de espera');
                    this.axiosMessage = 'Tempo muito longo de espera, verifique sua conexão com a internet ou tente novamente';
                    break;
                case 422:
                    this.colorCode = 'text-red-500'
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Não foi possível processar as instruções, tente alterar o dado enviado'
                    break;
                case 500:
                    this.colorCode = 'text-red-600'
                    console.error('Erro ao trazer os dados')
                    this.axiosMessage = this.axiosMessage.length > 0 ? this.axiosMessage : 'Houve algum erro no servidor ao processar esse dado, tente novamente, mais tarde'
                    break;
            }
        }
    }

})