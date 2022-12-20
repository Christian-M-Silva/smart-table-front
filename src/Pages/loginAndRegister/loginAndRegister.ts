import { defineComponent } from "vue";

export default defineComponent(
    {

        data(){
           return{
            action: "Login",
            entity: '',
            password: '',
            classAnimation: 'slide-in-right'
           }
        },
    
        methods: {
            registerOrLogin(){
                if (this.action === 'Login') {
                    return alert("logado")
                } 

                return alert("registrar")
            },
        },

        watch: {
            action(value):string{
                if (value === "Login") {
                    return this.classAnimation = "slide-in-right"
                }

                return this.classAnimation = "slide-in-left"
            }
        }
    }
)