import axios from "axios";
import { defineComponent } from "vue";
import Cookies from "js-cookie";
import utils from "@/mixins/utils";
import { Actions } from "@/types/types";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm";

export default defineComponent(
    {
        components: {
            ModalConfirm
        },
        data() {
            return {
                message: '',
                showModalConfirm: false,
                refreshToken: '',
                email: '',
                entity: '',
                action: 'Login' as Actions,
                userConfirmation: null as ((value: boolean) => void) | null,
            }
        },

        mixins: [utils],

        methods: {
            async registerOrLogin() {
                this.isLoading = true
                this.messageAxios = ''
                await axios.get(`${this.baseUrl}/user/isEmailRegister/${this.email}`, {
                    timeout: 20000
                }).then((async res => {
                    if (this.action == "Login") {
                        if (!res.data) {
                            //Chama o modal erro
                        }
                        //Faz login
                    } else {
                        if (res.data) {
                            this.showModalConfirm = true
                            const userConfirmed = await this.waitForUserConfirmation();
                            this.showModalConfirm = false
                            if (!userConfirmed) {
                                return this.message = "Esse e-mail já existe escolha um e-mail que ainda não foi cadastrado"
                            }
                            return this.login()
                        }
                        this.register()
                    }

                })).catch((erro => {
                    if (erro.code !== 'ECONNABORTED') {
                        this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
                    }
                    this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                    this.isLoading = false
                    this.openModalResponseAPI = !this.openModalResponseAPI
                }))

                // let dataUser: DataUser
                // dataUser = {
                //     entity: this.entity,
                //     password: this.password
                // }

                // if (this.action === "Cadastro") {
                //     const isValidate = await this.v$.$validate()
                //     if (!isValidate) {
                //         return console.error("Um dos dados dos inputs não está seguindo as regras estabelecidas")
                //     }

                // this.messageAxios = ''
                //     this.isLoading = true
                //     await axios.post(`${this.baseUrl}/user`, dataUser, {
                //         timeout: 20000
                //     }).then((res => {
                //         this.responseStatus = res.status
                //         this.action = "Login"
                //     })).catch((erro => {
                //         if (erro.code !== 'ECONNABORTED') {
                //             this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
                //         }
                //         this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                //         this.isLoading = false
                //         this.openModalResponseAPI = !this.openModalResponseAPI
                //     }))
                //     setTimeout(() => {
                //         this.isLoading = false;
                //     }, 1000)
                //     this.openModalResponseAPI = !this.openModalResponseAPI
                // } else {
                //     this.isLoading = true
                //     axios.interceptors.request.use((config) => {
                //         const token = Cookies.get('authToken')
                //         if (token) {
                //             config.headers.Authorization = `Bearer ${token}`
                //         }
                //         return config
                //     })
                //     await axios.delete(`${this.baseUrl}/auth`, {
                //         timeout: 20000
                //     }).then(async () => {
                //         await axios.post(`${this.baseUrl}/auth`, dataUser, {
                //             timeout: 20000
                //         }).then((res => {
                //             Cookies.remove('authToken')
                //             Cookies.remove('tableId')
                //             this.responseStatus = res.status
                //             Cookies.set('authToken', res.data.dataToken.token, { secure: true, sameSite: 'strict', expires: 30 })
                //             this.$router.push({ name: 'home', params: { tableId: res.data.tableId } })
                //         })).catch((erro => {
                //             if (erro.code !== 'ECONNABORTED') {
                //                 this.messageAxios = 'Entidade ou senha errado'
                //             }
                //             this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                //             this.isLoading = false
                //         }))
                //         this.openModalResponseAPI = !this.openModalResponseAPI
                //     })
                //         .catch((erro => {
                //             if (erro.code === 'ECONNABORTED') {
                //                 this.responseStatus = erro.code
                //                 this.openModalResponseAPI = !this.openModalResponseAPI
                //             }
                //             console.error('Erro ao fazer Login')
                //             this.isLoading = false
                //             return
                //         }))
                //     setTimeout(() => {
                //         this.isLoading = false;
                //     }, 1000)
                // }
            },
            async register() {
                const dataUser = {
                    email: this.email,
                    entity: this.entity
                }
                this.messageAxios = ''
                await axios.post(`${this.baseUrl}/user`, dataUser, {
                    timeout: 20000
                }).then((res => {
                    
                    this.saveTokenInCookie(res.data.tableId)
                    setTimeout(() => {
                        this.isLoading = false;
                        window.close()
                    }, 1000)
                })).catch((erro => {
                    if (erro.code !== 'ECONNABORTED') {
                        this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
                    }
                    this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                    this.isLoading = false
                    this.openModalResponseAPI = !this.openModalResponseAPI
                }))
            },
            async login(){
                alert('login')
            },
            saveTokenInCookie(tableId: string) {
                Cookies.remove('infoToken')
                const infoToken = {
                    credentials: {
                        refreshToken: this.refreshToken,
                        type: 'authorized_user',
                    },
                    email: this.email,
                    tableId
                }

                const cryptographyInfoToken = JSON.stringify(infoToken)
                Cookies.set('infoToken', cryptographyInfoToken, { expires: 4})
            },
            waitForUserConfirmation() {
                return new Promise((resolve) => {
                    this.userConfirmation = resolve;
                });
            },
    
            proceed() {
                this.userConfirmation?.(true)
            },
    
            notProceed() {
                this.userConfirmation?.(false)
            },
        },
        created() {
            this.entity = Cookies.get('entity') ?? ''
            this.action = Cookies.get('actions') as Actions ?? 'Login' as Actions
            Cookies.remove('entity')
            Cookies.remove('actions')
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const redirectUri = 'http://localhost:8080/saveAuth';
            const tokenUrl = 'https://oauth2.googleapis.com/token';
            const data = {
                code: code,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            };

            axios.post(tokenUrl, data)
                .then((res: any) => {
                    this.refreshToken = res.data.refresh_token;
                    const idToken = res.data.id_token;
                    const idTokenPayload = JSON.parse(window.atob(idToken.split('.')[1]));
                    this.email = idTokenPayload.email;
                    this.registerOrLogin()
                })
                .catch((error: any) => {
                    this.message = 'Ocorreu um erro ao efetuar essa requisição'
                });

        },
    }
)