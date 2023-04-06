import { defineComponent } from "vue";
import Loading from "@/components/Molecules/Loading/Loading.vue";

export default defineComponent(
    {
        components: {
            Loading
        },

        data() {
            return {
                baseUrl: 'http://127.0.0.1:3333/',
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