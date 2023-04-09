import { Actions } from "@/types/types";
import axios from "axios";
import { DataUser, InputsModal } from "@/interfaces/interfaces";
import { defineComponent } from "vue";
import ModalError from "@/components/Molecules/ModalError/ModalError.vue";
import ModalInputs from "@/components/Molecules/ModalInputs/ModalInputs.vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import { required, email, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import packAxios from "@/mixins/packAxios";



export default defineComponent(
    {
        components: {
            ModalError,
            ModalInputs,
            ModalResponseApi,
        },

        mixins: [packAxios],

        setup() {
            return { v$: useVuelidate() }
        },

        data() {
            return {
                action: '' as Actions,
                closeModal: false,
                confirm: true,
                email: '',
                classAnimation: 'slide-in-right',
                entity: '',
                errorMessage: '',
                inputsModal: [] as InputsModal[],
                isReload: false,
                modelSendEmail: false,
                openModalError: false,
                openModalInputs: false,
                password: '',
            }
        },

        methods: {
            async registerOrLogin() {
                let dataUser: DataUser
                dataUser = {
                    entity: this.entity,
                    email: this.email,
                    password: this.password
                }

                if (this.action === "Cadastrar") {
                    const isValidate = await this.v$.$validate()
                    if (!isValidate) {
                        return console.error("Um dos dados dos inputs não está seguindo as regras estabelecidas")
                    }
                    this.messageAxios = ''

                    this.isLoading = true
                    await axios.post(`${this.baseUrl}user`, dataUser).then((res => {
                        this.response = res
                        this.action = "Login"
                    })).catch((erro => {
                        this.messageAxios = erro.response.data.errors[0].message
                        this.response = erro
                    }))
                    this.isLoading = false
                    this.openModalResponseAPI = !this.openModalResponseAPI
                } else {
                    this.messageAxios = ''

                    this.isLoading = true
                    await axios.post(`${this.baseUrl}auth`, dataUser).then((res => {
                        this.response = res
                        this.$router.push({ name: 'home' })
                    })).catch((erro => {
                        this.messageAxios = 'Entidade ou senha errado'
                        this.response = erro
                    }))
                    this.isLoading = false
                    this.openModalResponseAPI = !this.openModalResponseAPI
                }
            },

            async saveNewPassword(inputs: InputsModal[]) {
                const isIgualPassword = inputs[0].vModel === inputs[1].vModel
                if (!isIgualPassword) {
                    this.openModalError = !this.openModalError
                    return this.errorMessage = "As senhas não são as mesmas"
                }
                this.closeModal = !this.closeModal
                this.messageAxios = ''

                this.isLoading = true
                await axios.put(`${this.baseUrl}user/changePassword/${this.$route.params.tableId}`, { password: inputs[0].vModel }).then((res => {
                    this.response = res
                    setTimeout(() => {
                        this.$router.push({ name: 'loginAndRegister' })
                    }, 2000);
                })).catch((erro => {
                    this.messageAxios = erro.response.data.error
                    this.response = erro
                }))
                this.isLoading = false
                this.openModalResponseAPI = !this.openModalResponseAPI

            },

            async sendEmail() {
                this.isLoading = true
                this.messageAxios = ''
                await axios.post(`${this.baseUrl}user/sendEmailForgetPassword`, { email: this.email }).then((res => {
                    this.messageAxios = res.data.message
                    this.response = res
                })).catch((erro => {
                    this.messageAxios = erro.response.data.error
                    this.response = erro
                }))
                this.isLoading = false
                this.openModalResponseAPI = !this.openModalResponseAPI
                this.modelSendEmail = false
            },
        },

        watch: {
            action(value): string {
                this.v$.$reset()
                this.entity = ''
                this.email = ''
                this.password = ''
                if (value === "Login") {
                    return this.classAnimation = "slide-in-right"
                }

                return this.classAnimation = "slide-in-left"
            },
        },

        created() {
            this.action = "Login"
            this.openModalInputs = !!this.$route.params.tableId
            this.inputsModal = [
                {
                    title: 'Digite sua nova Senha',
                    isRequired: false,
                    type: 'password',
                    vModel: '',
                    isPwd: true
                },
                {
                    title: 'Confirme a nova senha digitada',
                    isRequired: false,
                    type: 'password',
                    vModel: '',
                    isPwd: true
                }
            ]
        },

        validations() {
            return {
                email: { required: helpers.withMessage('Esse campo é obrigatório', required), email: helpers.withMessage('O valor não está no formato de email', email) },
                entity: { required: helpers.withMessage('Esse campo é obrigatório', required) },
                password: { required: helpers.withMessage('Esse campo é obrigatório', required) },
            }
        }
    }
)