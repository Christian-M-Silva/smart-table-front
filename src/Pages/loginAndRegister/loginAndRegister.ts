import { defineComponent } from "vue";
import { Actions } from "@/types/types";

export default defineComponent(
    {
        data() {
            return {
                action: '' as Actions,
                entity: '',
                password: '',
                classAnimation: 'slide-in-right'
            }
        },

        methods: {
            registerOrLogin() {
                if (this.action === "Cadastrar") {
                     alert("registrado")
                     return this.action = "Login"
                }

                this.$router.push({name: 'home'})
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