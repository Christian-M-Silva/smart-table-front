import Cookies from "js-cookie";
import { defineComponent } from "vue";
import utils from "@/mixins/utils";

export default defineComponent(
    {
        data() {
            return {
                tableId: ''
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
            exit() {
                this.$router.push({ name: 'loginAndRegister' })
            }
        },

        created() {
            this.tableId = Cookies.get('tableId') as string
            if (!this.tableId) {
                this.$router.go(0)
            }
            this.authenticate()
        },
    })