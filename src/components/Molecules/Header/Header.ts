import { defineComponent } from "vue";
import utils from "@/mixins/utils";

export default defineComponent(
    {
        mixins: [utils],

       methods: {
        editUser(){
            if (this.isAuthenticate) {
                return this.$router.push({name: 'editUser'})
            }

            return this.$router.push({name: 'loginAndRegister'})
        },
        exit(){
            alert("exit")
            this.$router.push({name: 'loginAndRegister'})
        }
       }
    })