import { defineComponent } from "vue";

export default defineComponent(
    {
       methods: {
        exit(){
            alert("exit")
            this.$router.push({name: 'loginAndRegister'})
        }
       }
    })