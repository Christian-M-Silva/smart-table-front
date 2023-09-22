import { Actions } from "@/types/types";
import axios from "axios";
import Cookies from 'js-cookie'
import { DataUser, BaseInputs } from "@/interfaces/interfaces";
import { defineComponent } from "vue";
const { DateTime } = require('luxon');
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
        methods: {
            // async registerOrLogin() {
            //     let dataUser: DataUser
            //     dataUser = {
            //         entity: this.entity,
            //         password: this.password
            //     }
            //     this.messageAxios = ''

            //     if (this.action === "Cadastro") {
            //         const isValidate = await this.v$.$validate()
            //         if (!isValidate) {
            //             return console.error("Um dos dados dos inputs não está seguindo as regras estabelecidas")
            //         }

            //         this.isLoading = true
            //         await axios.post(`${this.baseUrl}/user`, dataUser, {
            //             timeout: 20000
            //         }).then((res => {
            //             this.responseStatus = res.status
            //             this.action = "Login"
            //         })).catch((erro => {
            //             if (erro.code !== 'ECONNABORTED') {
            //                 this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
            //             }
            //             this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
            //             this.isLoading = false
            //             this.openModalResponseAPI = !this.openModalResponseAPI
            //         }))
            //         setTimeout(() => {
            //             this.isLoading = false;
            //         }, 1000)
            //         this.openModalResponseAPI = !this.openModalResponseAPI
            //     } else {
            //         this.isLoading = true
            //         axios.interceptors.request.use((config) => {
            //             const token = Cookies.get('authToken')
            //             if (token) {
            //                 config.headers.Authorization = `Bearer ${token}`
            //             }
            //             return config
            //         })
            //         await axios.delete(`${this.baseUrl}/auth`, {
            //             timeout: 20000
            //         }).then(async () => {
            //             await axios.post(`${this.baseUrl}/auth`, dataUser, {
            //                 timeout: 20000
            //             }).then((res => {
            //                 Cookies.remove('authToken')
            //                 Cookies.remove('tableId')
            //                 this.responseStatus = res.status
            //                 Cookies.set('authToken', res.data.dataToken.token, { secure: true, sameSite: 'strict', expires: 30 })
            //                 this.$router.push({ name: 'home', params: { tableId: res.data.tableId } })
            //             })).catch((erro => {
            //                 if (erro.code !== 'ECONNABORTED') {
            //                     this.messageAxios = 'Entidade ou senha errado'
            //                 }
            //                 this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
            //                 this.isLoading = false
            //             }))
            //             this.openModalResponseAPI = !this.openModalResponseAPI
            //         })
            //             .catch((erro => {
            //                 if (erro.code === 'ECONNABORTED') {
            //                     this.responseStatus = erro.code
            //                     this.openModalResponseAPI = !this.openModalResponseAPI
            //                 }
            //                 console.error('Erro ao fazer Login')
            //                 this.isLoading = false
            //                 return
            //             }))
            //         setTimeout(() => {
            //             this.isLoading = false;
            //         }, 1000)
            //     }
            // },
            processToken(refreshToken:string, email: string, expireToken: object) {
                const infoToken = {
                    credentials: {
                        refreshToken,
                        type: 'authorized_user',
                        "client_id": process.env.VUE_CLIENT_ID,
                        "client_secret":process.env.VUE_CLIENT_SECRET
                      },
                      email,
                      expireToken
                } 
            }
        },
        created() {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const axios = require('axios'); // Certifique-se de que a biblioteca axios esteja instalada no seu projeto.

            const clientId = '480592212237-c2m76cn3vs1rro9dhgph56lmv0vkac22.apps.googleusercontent.com';
            const clientSecret = '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';
            const redirectUri = 'http://localhost:8080/saveAuth';

            const tokenUrl = 'https://oauth2.googleapis.com/token';

            const data = {
                code: code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            };

            axios.post(tokenUrl, data)
                .then((res: any) => {
                    console.log("🚀 ~ file: saveAuth.ts:46 ~ .then ~ res:", res)
                    const refreshToken = res.data.refresh_token;
                    const idToken = res.data.id_token;

                    // Agora você tem o token de acesso (accessToken) e o ID do usuário (idToken).
                    // Você pode usá-los para fazer chamadas à API do Google Calendar e obter informações do usuário.

                    // Para obter o e-mail do usuário, você pode decodificar o ID do usuário:
                    const idTokenPayload = JSON.parse(window.atob(idToken.split('.')[1]));
                    console.log("🚀 ~ file: saveAuth.ts:60 ~ .then ~ idTokenPayload:", idTokenPayload)
                    const userEmail = idTokenPayload.email;
                    console.log('Token de Acesso:', refreshToken);
                    console.log('E-mail do Usuário:', userEmail);
                    const expireToken =  DateTime.now().plus({ seconds: res.data.expires_in })
                    console.log("🚀 ~ file: saveAuth.ts:72 ~ .then ~ expireToken:", expireToken > DateTime.now()) //Ver se o token passou da validade é assim
                    this.processToken(refreshToken, userEmail, expireToken)
                    
                })
                .catch((error: any) => {
                    console.error('Erro ao obter token de acesso:', error);
                });

        },
    }
)