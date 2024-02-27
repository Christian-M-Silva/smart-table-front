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