import { defineComponent } from "vue";

export default defineComponent(
    {
        inheritAttrs: false,
        data() {
            return {
                isPwd: true
            }
        },
        props: {
            title: String,
            erros: Array,
            isVisibility: Boolean
        },
        methods:{
            showPassword(){
                this.isPwd = !this.isPwd
                this.$emit('show-password', this.isPwd)
            }
        },
        computed: {
            propsComputed() {
                const props = {
                    ...this.$attrs,
                    ...this.$props,
                }
                return props
            }
        },
    })
