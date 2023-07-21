import Cookies from "js-cookie";
import { defineComponent } from "vue";
import utils from "@/mixins/utils";
import axios from "axios";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";

export default defineComponent(
    {
        data() {
            return {
                tableId: '',
                toOrFrom: 'from'
            }
        },
        components: {
            ModalResponseApi
        },
        mixins: [utils],

        methods: {
            editUser() {
                if (this.isAuthenticate) {
                    return this.$router.push({ name: 'editUser' })
                }

                return this.$router.push({ name: 'loginAndRegister' })
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
                await axios.delete(`${this.baseUrl}/auth`).then(() => this.$router.push({ name: 'loginAndRegister' })).catch((erro => {
                    this.messageAxios = 'Falha ao sair'
                    this.responseStatus = erro.response.status
                    this.openModalResponseAPI = !this.openModalResponseAPI
                    console.error(erro)
                }))

            }
        },

        async created() {
            await new Promise(resolve => setTimeout(resolve, 500));
            this.tableId = Cookies.get('tableId') as string
            this.authenticate()
            this.toOrFrom = this.isAuthenticate ? 'from' : 'to'
        },

        watch: {
            isAuthenticate() {
                this.toOrFrom = this.isAuthenticate ? 'from' : 'to'
            }
        }
    })