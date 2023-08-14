import Cookies from "js-cookie";
import { defineComponent } from "vue";
import utils from "@/mixins/utils";
import axios from "axios";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";

export default defineComponent(
    {
        data() {
            return {
                toOrFrom: 'from',
                openModalConfirmExit: false,
            }
        },
        components: {
            ModalResponseApi,
            ModalConfirm
        },
        mixins: [utils],

        methods: {
            editUser() {
                if (this.isAuthenticate) {
                    return this.$router.push({ name: 'editUser' })
                }

                return this.$router.push({ name: 'loginAndRegister' })
            },
            goToHome() {
                this.$router.push({ name: 'home', params: { tableId: Cookies.get('tableId') } })
            },
            checkAuthenticated() {
                if (this.isAuthenticate) {
                    return this.openModalConfirmExit = !this.openModalConfirmExit
                }
                this.exit()
            },
            async exit() {
                axios.interceptors.request.use((config) => {
                    const token = Cookies.get('authToken')
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                    }
                    return config
                })
                Cookies.remove('tableId')
                this.isLoading = true
                await axios.delete(`${this.baseUrl}/auth`, {
                    timeout: 20000
                }).then(() => this.$router.push({ name: 'loginAndRegister' })).catch((erro => {
                    if (erro.code !== 'ECONNABORTED') {
                        this.messageAxios = 'Falha ao sair'
                    }
                    this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                    this.openModalResponseAPI = !this.openModalResponseAPI
                    this.isLoading = false
                }))
            },
        },

        created() {
            this.authenticate()
            this.toOrFrom = this.isAuthenticate ? 'from' : 'to'
        },

        watch: {
            isAuthenticate() {
                this.toOrFrom = this.isAuthenticate ? 'from' : 'to'
            }
        }
    })