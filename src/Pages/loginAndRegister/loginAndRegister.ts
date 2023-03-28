import { Actions } from "@/types/types";
import axios from "axios";
import { DataUser } from "@/interfaces/interfaces";
import { defineComponent } from "vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import { required, email, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import utils from "@/mixins/packAxios";

export default defineComponent(
    {
        components: {
            ModalResponseApi,
        },

        mixins: [utils],

        setup() {
            return { v$: useVuelidate() }
        },

        data() {
            return {
                action: '' as Actions,
                email: '',
                classAnimation: 'slide-in-right',
                entity: '',
                modelSendEmail: false,
                openModal: false,
                password: '',
                response: {}
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

                    await axios.post(`${this.baseUrl}user`, dataUser).then((res => {
                        this.response = res
                        this.action = "Login"
                    })).catch((erro => {
                        this.response = erro
                    }))
                    this.openModal = !this.openModal
                } else {
                    this.$router.push({ name: 'home' })
                }
            },

            async sendEmail(){
                alert(this.email)
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
            }
        },

        created() {
            this.action = "Login"
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