import { defineComponent, PropType } from "vue";

import { ButtonInput } from "@/interfaces/interfaces";

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
            isVisibility: Boolean,
            bgColor: {
                type: String,
                default: "white"
            },
            button: {
                type: Object as PropType<ButtonInput>,
            }
        },
        methods: {
            showPassword() {
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
