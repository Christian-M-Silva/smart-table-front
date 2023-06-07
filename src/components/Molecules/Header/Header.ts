import Cookies from "js-cookie";
import { defineComponent } from "vue";
import utils from "@/mixins/utils";
import axios from "axios";

export default defineComponent(
    {
        data() {
            return {
                tableId: '',
                toOrFrom: 'from'
            }
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
                await axios.delete(`${this.baseUrl}/auth`).catch((erro => {
                    console.error(erro)
                }))
                this.$router.push({ name: 'loginAndRegister' })
            }
        },

        created() {
            this.tableId = Cookies.get('tableId') as string
            if (!this.tableId) {
                this.$router.go(0)
            }
            this.authenticate()
            this.toOrFrom = this.isAuthenticate ? 'from' : 'to'
        },

        watch: {
            isAuthenticate() {
                this.toOrFrom = this.isAuthenticate ? 'from' : 'to'
            }
        }
    })