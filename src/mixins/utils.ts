import { defineComponent } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import packAxios from "@/mixins/packAxios";

export default defineComponent(
    {
        mixins: [packAxios],

        data() {
            return {
                isAuthenticate: false
            }
        },

        async created() {
            console.log("🚀 ~ file: utils.ts:19 ~ axios.interceptors.request.use ~ Cookies.get('authToken'):", Cookies.get('authToken'))

            axios.interceptors.request.use((config) => {
                const token = Cookies.get('authToken')
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            })

            await axios.get(`${this.baseUrl}auth/isAuthenticate`).then((res => {
                this.isAuthenticate = res.data
                console.log("🚀 ~ file: home.ts:72 ~ awaitaxios.get ~ res:", res)
            })).catch((erro => {
                console.log("🚀 ~ file: home.ts:73 ~ awaitaxios.get ~ erro:", erro)
            }))
        },
    }
)