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
import utils from "@/mixins/utils";
type inputsCreatePassword = Omit<BaseInputs, "name" | "options">[];



export default defineComponent(
    {
        components: {
            InputComponent,
            ModalError,
            ModalInputs,
            ModalResponseApi,
        },

        mixins: [utils],

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
            //http://localhost:8080/loginAndRegister?code=4%2F0Adeu5BUjGipq9n9e5lYrOb2mZqJxitDVK_S1C-G8_AZB34bZEHTh28N-pJ4Y7sqF85Yz-g&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=2&prompt=consent

            //http://localhost:8080/loginAndRegister?code=4%2F0Adeu5BV5a_RV2yNSjHmoUbw-lT6Jlq6WpFyRn_Wv-Hff1ibbqSweqPb23gMcPHmLlcT-0g&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=2&prompt=consent

            //https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FloginAndRegister&access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=480592212237-c2m76cn3vs1rro9dhgph56lmv0vkac22.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow

            async iniciarAutenticacao() {
                // 1. Construa a URL de autorização OAuth 2.0 com os parâmetros necessários.
                const authUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FsaveAuth&access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=480592212237-c2m76cn3vs1rro9dhgph56lmv0vkac22.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow&entity=${this.entity}`

                // 2. Abra uma janela pop-up com a URL de autorização e configure o tamanho da tela.
                const popupWidth = 600;
                const popupHeight = 400;
                const left = (window.innerWidth - popupWidth) / 2;
                const top = (window.innerHeight - popupHeight) / 2;
                const popup = window.open(
                    authUrl,
                    'popup',
                    `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
                );
                if (popup) {
                    const timer = setInterval(() => {
                        if (popup.closed) {
                            clearInterval(timer);

                            // 4. Lidar com o retorno após a autenticação.
                            // Implemente o código para processar o token de acesso aqui.
                        }
                    }, 1000);
                } else {
                    // Tratar o caso em que a janela pop-up não foi aberta com sucesso.
                    console.error('Não foi possível abrir a janela pop-up.');
                }


                // 3. Aguarde até que a janela pop-up seja fechada.
                // const timer = setInterval(() => {
                //     if (popup.closed) {
                //         clearInterval(timer);

                //         // 4. Lidar com o retorno após a autenticação.
                //         // Implemente o código para processar o token de acesso aqui.
                //     }
                // }, 1000);
            },
            // onClick() {
            //     window.location.href = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2FloginAndRegister&access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=480592212237-o9c4mt0kuhll7utqqf638e2m9nfvmeel.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow"
            // },

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
                    await axios.post(`${this.baseUrl}/user`, dataUser, {
                        timeout: 20000
                    }).then((res => {
                        this.responseStatus = res.status
                        this.action = "Login"
                    })).catch((erro => {
                        if (erro.code !== 'ECONNABORTED') {
                            this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
                        }
                        this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                        this.isLoading = false
                        this.openModalResponseAPI = !this.openModalResponseAPI
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
                    await axios.delete(`${this.baseUrl}/auth`, {
                        timeout: 20000
                    }).then(async () => {
                        await axios.post(`${this.baseUrl}/auth`, dataUser, {
                            timeout: 20000
                        }).then((res => {
                            Cookies.remove('authToken')
                            Cookies.remove('tableId')
                            this.responseStatus = res.status
                            Cookies.set('authToken', res.data.dataToken.token, { secure: true, sameSite: 'strict', expires: 30 })
                            this.$router.push({ name: 'home', params: { tableId: res.data.tableId } })
                        })).catch((erro => {
                            if (erro.code !== 'ECONNABORTED') {
                                this.messageAxios = 'Entidade ou senha errado'
                            }
                            this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                            this.isLoading = false
                        }))
                        this.openModalResponseAPI = !this.openModalResponseAPI
                    })
                        .catch((erro => {
                            if (erro.code === 'ECONNABORTED') {
                                this.responseStatus = erro.code
                                this.openModalResponseAPI = !this.openModalResponseAPI
                            }
                            console.error('Erro ao fazer Login')
                            this.isLoading = false
                            return
                        }))
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000)
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
                await axios.put(`${this.baseUrl}/user/changePassword/${this.$route.params.tableId}`, { password: inputs[0].vModel }, {
                    timeout: 20000
                }).then((res => {
                    this.responseStatus = res.status
                    setTimeout(() => {
                        this.$router.push({ name: 'loginAndRegister' })
                    }, 2000);
                })).catch((erro => {
                    if (erro.code !== 'ECONNABORTED') {
                        this.messageAxios = erro.response.data.error
                    }
                    this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                    this.isLoading = false
                }))
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000)
                this.openModalResponseAPI = !this.openModalResponseAPI

            },

            async sendEmail() {
                this.isLoading = true
                this.messageAxios = ''
                await axios.post(`${this.baseUrl}/user/sendEmailForgetPassword`, { email: this.email }, {
                    timeout: 20000
                }).then((res => {
                    this.messageAxios = res.data.message
                    this.responseStatus = res.status
                })).catch((erro => {
                    if (erro.code !== 'ECONNABORTED') {
                        this.messageAxios = erro.response.data.error
                    }
                    this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                    this.isLoading = false
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

        // mounted() {
        //     const script = document.createElement('script');
        //     script.src = 'https://accounts.google.com/gsi/client';
        //     script.async = true;
        //     script.defer = true;
        //     document.body.appendChild(script);
        // },


        async created() {
            await this.authenticate()
            if (this.isAuthenticate) {
                this.$router.push({ name: 'home', params: { tableId: this.tableId } })
            }
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