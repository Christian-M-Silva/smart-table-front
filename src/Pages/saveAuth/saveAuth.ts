import axios from "axios";
import { defineComponent } from "vue";
import Cookies from "js-cookie";
import utils from "@/mixins/utils";
import { Actions } from "@/types/types";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";

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
                nameEmail: '',
                messageConfirmation: '',
                entity: null as string | null,
                action: 'Login' as Actions,
                userConfirmation: null as ((value: boolean) => void) | null,
            }
        },

        mixins: [utils],

        methods: {
            async registerOrLogin() {
                this.isLoading = true
                if (!process.env.VUE_APP_SECRET_KEY) {
                    this.isLoading = false
                    return this.message = 'É necessario a inclusão de um chave secreta, entre em contato com o suporte para resolver'
                }
                this.messageAxios = ''
                await axios.get(`${this.baseUrl}/user/isEmailRegister/${this.email}`, {
                    timeout: 20000
                }).then((async res => {
                    if (this.action == "Login") {
                        if (!res.data) {
                            this.messageConfirmation = 'Esse e-mail não existe gostaria de cadastrar ele?'
                            this.showModalConfirm = true
                            const userConfirmed = await this.waitForUserConfirmation();
                            this.showModalConfirm = false
                            if (!userConfirmed) {
                                this.isLoading = false;
                                this.message = "Esse e-mail não está cadastrado no sistema, feche essa tela e o cadastre primeiro, ou escolha um outro e-mail"
                                return
                            }
                            return this.register()
                        }
                        Cookies.set('nameUser', res.data.entity)
                        this.login(res.data.tableId, res.data.quantityLastRow)
                    } else {
                        if (res.data) {
                            this.messageConfirmation = 'Esse e-mail já existe gostaria de fazer login com ele?'
                            this.showModalConfirm = true
                            const userConfirmed = await this.waitForUserConfirmation();
                            this.showModalConfirm = false
                            if (!userConfirmed) {
                                this.isLoading = false;
                                return this.message = "Esse e-mail já existe escolha um e-mail que ainda não foi cadastrado"
                            }
                            Cookies.set('nameUser', res.data.entity)
                            return this.login(res.data.tableId, res.data.quantityLastRow)
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
            },
            async register() {
                this.entity = this.entity ?  this.entity : this.nameEmail
                Cookies.set('nameUser', this.entity)
                const dataUser = {
                    email: this.email,
                    entity: this.entity
                }
                this.messageAxios = ''
                await axios.post(`${this.baseUrl}/user`, dataUser, {
                    timeout: 20000
                }).then((res => {
                    this.saveTokenInCookie(res.data.tableId, res.data.quantityLastRow)
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
            async login(tableId: string, quantityLastRow: number){
                this.saveTokenInCookie(tableId, quantityLastRow)
                setTimeout(() => {
                    this.isLoading = false;
                    window.close()
                }, 1000)
            },
            saveTokenInCookie(tableId: string, quantityLastRow: number) {
                const infoToken = {
                    credentials: {
                        refresh_token: this.refreshToken,
                        type: 'authorized_user',
                    },
                    email: this.email
                }
                
                const cryptographyInfoToken = this.encryptObject(infoToken, process.env.VUE_APP_SECRET_KEY as string)
                Cookies.set('infoToken', cryptographyInfoToken, { expires: 4})
                Cookies.set('tableId', tableId)
                Cookies.set('quantityLastRow', quantityLastRow.toString())
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
            Cookies.remove('infoToken')
            Cookies.remove('nameUser')
            Cookies.remove('tableId')
            Cookies.remove('quantityLastRow')
            this.entity = Cookies.get('entity') ?? null
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
                    this.nameEmail = idTokenPayload.name
                    this.registerOrLogin()
                })
                .catch((error: any) => {
                    this.message = 'Ocorreu um erro ao efetuar essa requisição'
                });

        },
    }
)