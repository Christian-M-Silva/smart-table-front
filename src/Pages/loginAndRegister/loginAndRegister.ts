import { defineComponent } from "vue";
import { Actions } from "@/types/types";
import { DataUser } from "@/interfaces/interfaces";
import utils from "@/mixins/utils";
import axios from "axios";

export default defineComponent(
    {
        mixins: [utils],
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
                    alert("registrado")
                    await axios.post(`${this.baseUrl}user`, dataUser).then((res => {
                        console.log(res)
                    })).catch((erro => {
                        console.error(erro)
                    }))
                    return this.action = "Login"
                }

                this.$router.push({ name: 'home' })
                return alert("logado")

            },
        },

        watch: {
            action(value): string {
                if (value === "Login") {
                    return this.classAnimation = "slide-in-right"
                }

                return this.classAnimation = "slide-in-left"
            }
        },

        created() {
            this.action = "Login"
        },
    }
)