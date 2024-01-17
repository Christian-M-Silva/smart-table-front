import { Actions } from "@/types/types";
import { defineComponent } from "vue";
import InputComponent from "@/components/Atomos/InputComponent/InputComponent.vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import ModalError from "@/components/Molecules/ModalError/ModalError.vue";
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import utils from "@/mixins/utils";
import Cookies from "js-cookie";

export default defineComponent(
    {
        components: {
            InputComponent,
            ModalResponseApi,
            ModalError
        },

        mixins: [utils],

        setup() {
            return { v$: useVuelidate() }
        },

        data() {
            return {
                action: 'Login' as Actions,
                classAnimation: 'slide-in-right',
                entity: '',
                errorMessage: '',
                openModalError: false,
            }
        },

        methods: {
            async startAuth() {  
                Cookies.set('entity', this.entity)
                Cookies.set('actions', this.action)
                // 1. Construa a URL de autorização OAuth 2.0 com os parâmetros necessários.
                const authUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FsaveAuth&access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=${process.env.VUE_APP_CLIENT_ID}&service=lso&o2v=2&flowName=GeneralOAuthFlow`

                // 2. Abra uma janela pop-up com a URL de autorização e configure o tamanho da tela.
                const popupWidth = 400;
                const popupHeight = 700;
                const left = (window.innerWidth - popupWidth) / 2;
                const popup = window.open(
                    authUrl,
                    'popup',
                    `width=${popupWidth},height=${screen.height},left=${left}`
                );
                
                if (popup) {
                    const timer = setInterval(() => {
                        if (popup.closed) {
                            clearInterval(timer);
                            const infoTokenString = Cookies.get('infoToken')
                            if (infoTokenString) {
                                const infoToken = this.decryptObject(infoTokenString, process.env.VUE_APP_SECRET_KEY as string)
                                return this.$router.push({ name: 'home', params: { tableId: Cookies.get('tableId') } })
                            }
                            // 4. Lidar com o retorno após a autenticação.
                            // Implemente o código para processar o token de acesso aqui.
                        }
                    }, 1000);
                } else {
                    // Tratar o caso em que a janela pop-up não foi aberta com sucesso.
                    this.errorMessage = `Ops, Ocorreu algum erro ao abrir a tela de fazer ${this.lowercase}`
                    this.openModalError = !this.openModalError
                }
            }
        },

        watch: {
            action(value): string {
                this.v$.$reset()
                this.entity = ''
                if (value === "Login") {
                    return this.classAnimation = "slide-in-right"
                }

                return this.classAnimation = "slide-in-left"
            },
        },

        computed: {
            lowercase () {
                return this.action.charAt(0).toLowerCase() + this.action.slice(1)
            }
        },

        async created() {
            await this.authenticate()
            if (Cookies.get('infoToken')) {
                this.$router.push({ name: 'home', params: { tableId: Cookies.get('tableId') } })
            }
            this.messageAxios = ''
            this.action = "Login"
        },

        validations() {
            return {
                entity: { required: helpers.withMessage('Esse campo é obrigatório', required) },
            }
        }
    }
)