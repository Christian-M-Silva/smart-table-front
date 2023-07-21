import { Actions } from "@/types/types";
import axios from "axios";
import Cookies from 'js-cookie'
import { DataUser, BaseInputs } from "@/interfaces/interfaces";
import { defineComponent } from "vue";
import InputComponent from "@/components/Atomos/InputComponent/InputComponent.vue";
import ModalError from "@/components/Molecules/ModalError/ModalError.vue";
import ModalInputs from "@/components/Molecules/ModalInputs/ModalInputs.vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import { required, email, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import packAxios from "@/mixins/packAxios";
type inputsCreatePassword = Omit<BaseInputs, "name" | "options">[];



export default defineComponent(
    {
        components: {
            InputComponent,
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
                inputsModal: [] as inputsCreatePassword,
                isReload: false,
                isPwd: true,
                typePassword: 'password',
                modelSendEmail: false,
                openModalError: false,
                openModalInputs: false,
                password: '',
            }
        },

        methods: {
            showPassword(isShowPassWord: boolean) {
                if (isShowPassWord) {
                    return this.typePassword = 'password'
                }
                return this.typePassword = 'text'
            },

            async registerOrLogin() {
                let dataUser: DataUser
                dataUser = {
                    entity: this.entity,
                    email: this.email,
                    password: this.password
                }
                this.messageAxios = ''

                if (this.action === "Cadastrar") {
                    const isValidate = await this.v$.$validate()
                    if (!isValidate) {
                        return console.error("Um dos dados dos inputs não está seguindo as regras estabelecidas")
                    }

                    this.isLoading = true
                    await axios.post(`${this.baseUrl}/user`, dataUser).then((res => {
                        this.responseStatus = res.status
                        this.action = "Login"
                    })).catch((erro => {
                        this.messageAxios = erro.response.data.errors[0].message
                        this.responseStatus = erro.response.status
                    }))
                    setTimeout(() => {
                        this.isLoading = false;
                      }, 1000)
                    this.openModalResponseAPI = !this.openModalResponseAPI
                } else {
                    this.isLoading = true
                    axios.interceptors.request.use((config) => {
                        const token = Cookies.get('authToken')
                        if (token) {
                            config.headers.Authorization = `Bearer ${token}`
                        }
                        return config
                    })
                    await axios.delete(`${this.baseUrl}/auth`).catch((erro => {
                        console.error(erro)
                    }))
                    await axios.post(`${this.baseUrl}/auth`, dataUser).then((res => {
                        Cookies.remove('authToken')
                        Cookies.remove('tableId')
                        this.responseStatus = res.status
                        Cookies.set('authToken', res.data.dataToken.token, { secure: true, sameSite: 'strict', expires: 30 })
                        this.$router.push({ name: 'home', params: { tableId: res.data.tableId } })
                    })).catch((erro => {
                        this.messageAxios = 'Entidade ou senha errado'
                        this.responseStatus = erro.response.status
                    }))
                    setTimeout(() => {
                        this.isLoading = false;
                      }, 1000)
                    this.openModalResponseAPI = !this.openModalResponseAPI
                }
            },

            async saveNewPassword(inputs: BaseInputs[]) {
                const isIgualPassword = inputs[0].vModel === inputs[1].vModel
                if (!isIgualPassword) {
                    this.openModalError = !this.openModalError
                    return this.errorMessage = "As senhas não são as mesmas"
                }
                this.closeModal = !this.closeModal
                this.messageAxios = ''

                this.isLoading = true
                await axios.put(`${this.baseUrl}/user/changePassword/${this.$route.params.tableId}`, { password: inputs[0].vModel }).then((res => {
                    this.responseStatus = res.status
                    setTimeout(() => {
                        this.$router.push({ name: 'loginAndRegister' })
                    }, 2000);
                })).catch((erro => {
                    this.messageAxios = erro.response.data.error
                    this.responseStatus = erro.response.status
                }))
                setTimeout(() => {
                    this.isLoading = false;
                  }, 1000)
                this.openModalResponseAPI = !this.openModalResponseAPI

            },

            async sendEmail() {
                this.isLoading = true
                this.messageAxios = ''
                await axios.post(`${this.baseUrl}/user/sendEmailForgetPassword`, { email: this.email }).then((res => {
                    this.messageAxios = res.data.message
                    this.responseStatus = res.status
                })).catch((erro => {
                    this.messageAxios = erro.response.data.error
                    this.responseStatus = erro.response.status
                }))
                setTimeout(() => {
                    this.isLoading = false;
                  }, 1000)
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

        async created() {
            this.messageAxios = ''
            this.action = "Login"
            this.openModalInputs = !!this.$route.params.tableId
            this.inputsModal = [
                {
                    title: 'Digite sua nova Senha',
                    isRequired: false,
                    type: 'password',
                    vModel: '',
                    isPwd: true,
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