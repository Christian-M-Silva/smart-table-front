import { defineComponent } from "vue";

export default defineComponent(
    {
        data() {
            return {
                baseUrl: 'http://127.0.0.1:3333/',
            }
        },

        methods:{
            console(value:any){
                console.log("🚀 ~ file: utils.ts:13 ~ console ~ value:", value)
            }
        }
    }
)