import { defineComponent } from "vue";
import { Actions } from "@/types/types";
import { DataUser } from "@/interfaces/interfaces";
import utils from "@/mixins/utils";
import axios from "axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

export default defineComponent(
    {
        mixins: [utils],
        setup() {
            return { v$: useVuelidate() }
        },
        data() {
            return {
                action: '' as Actions,
                classAnimation: 'slide-in-right',
                entity: '',
                password: '',
                email: ''
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
                        console.log(res)
                        return this.action = "Login"
                    })).catch((erro => {
                        return console.error(erro)
                    }))
                }else{
                    return alert("logado")
                    this.$router.push({ name: 'home' })
                }
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
                entity: { required: helpers.withMessage('Esse campo é obrigatório', required) },
                password: { required: helpers.withMessage('Esse campo é obrigatório', required) },
                email: { required: helpers.withMessage('Esse campo é obrigatório', required), email: helpers.withMessage('O valor não está no formato de email', email) }
            }
        }
    }
)