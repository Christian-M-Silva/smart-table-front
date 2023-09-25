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
        data() {
            return {
                message: ''
            }
        },
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
            const axios = require('axios');
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
                    this.message = "Feche essa tela para prosseguir"
                    console.log("🚀 ~ file: saveAuth.ts:46 ~ .then ~ res:", res)
                    const refreshToken = res.data.refresh_token;
                    const idToken = res.data.id_token;
                    const idTokenPayload = JSON.parse(window.atob(idToken.split('.')[1]));
                    const userEmail = idTokenPayload.email;
                    const expireToken =  DateTime.now().plus({ seconds: res.data.expires_in })
                    this.processToken(refreshToken, userEmail, expireToken)
                })
                .catch((error: any) => {
                    console.log("🚀 ~ file: saveAuth.ts:137 ~ created ~ error:", error)
                    this.message = 'Ocorreu um erro ao efetuar essa requisição'
                });

        },
    }
)