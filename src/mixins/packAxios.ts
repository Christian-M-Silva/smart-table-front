import { defineComponent } from "vue";
import Loading from "@/components/Molecules/Loading/Loading.vue";
export default defineComponent(
    {
        components: {
            Loading
        },

        data() {
            return {
                baseUrl: process.env.VUE_APP_API_URL,
                openModalResponseAPI: false,
                messageAxios: '',
                response: {},
                isLoading: false
            }
        },

        methods: {
            console(value: any) {
                console.log("🚀 ~ file: utils.ts:13 ~ console ~ value:", value)
            }
        }
    }
)