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

        methods: {
            async authenticate() {
                axios.interceptors.request.use((config) => {
                    const token = Cookies.get('authToken')
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                    }
                    return config
                })

                await axios.get(`${this.baseUrl}/auth/isAuthenticate`).then((res => {
                    this.isAuthenticate = res.data
                })).catch((erro => {
                    console.log("🚀 ~ file: home.ts:73 ~ awaitaxios.get ~ erro:", erro)
                }))
            },

            createArrayData(date: Date, weekDaysChosenByUser: string[], quantityLoop: number){
                let rowsDate = []
                while (rowsDate.length < quantityLoop) { //aqui ele vai ver se a quantidade de linhas ou seja de datas armazenadas dentro do row, combina com a quantidade de linha, pois cada data é uma linha

                    let dayWeek = date.getDay().toString() //aqui ele vai pegar o date e pegar o dia da semana que ele está se referindo

                    if (weekDaysChosenByUser.includes(dayWeek)) {// se retornar verdadeiro então rowsDate, recebe essa data atual já formatada
                        const dayRow = date.toLocaleDateString() //Transformar o date no formato DD/MM/AA

                        rowsDate.push(dayRow) //Add ao rowsDate esse dia
                    } //se retornar falso o rowsDate não recebe nada

                    date = new Date(date.setDate(date.getDate() + 1)) //ai fazemos a date somar mais um dia
                }
                return rowsDate
            }
        },
    }
)