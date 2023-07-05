import { defineComponent } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import packAxios from "@/mixins/packAxios";
import { TypeGetTable } from "@/interfaces/interfaces";
import { DateTime } from "luxon";

export default defineComponent(
    {
        mixins: [packAxios],

        data() {
            return {
                isAuthenticate: false,
                nameUser: ''
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
                    this.isAuthenticate = res.data.isAuthenticate
                    this.nameUser = res.data.entity
                })).catch((erro => {
                    console.error(erro)
                }))
            },

            createArrayData(date: Date, weekDaysChosenByUser: string[], quantityLoop: number) {
                let rowsDate = []
                quantityLoop++
                while (rowsDate.length < quantityLoop) { //aqui ele vai ver se a quantidade de linhas ou seja de datas armazenadas dentro do row, combina com a quantidade de linha, pois cada data é uma linha

                    let dayWeek = date.getDay().toString() //aqui ele vai pegar o date e pegar o dia da semana que ele está se referindo

                    if (weekDaysChosenByUser.includes(dayWeek)) {// se retornar verdadeiro então rowsDate, recebe essa data atual já formatada
                        const dayRow = date.toLocaleDateString() //Transformar o date no formato DD/MM/AA
                        rowsDate.push(dayRow) //Add ao rowsDate esse dia
                    } //se retornar falso o rowsDate não recebe nada

                    date = new Date(date.setDate(date.getDate() + 1)) //ai fazemos a date somar mais um dia
                }
                return rowsDate
            },

            async updateDates(data: TypeGetTable) {
                let dateUpdate = DateTime.fromFormat(data.nextUpdate, 'dd/MM/yyyy').toJSDate()
                const currentDate = new Date()
                if (dateUpdate < currentDate) {
                    const daysWeek = data.daysWeek.map(el => el.value)
                    let arrayDatesUpdates: string[]
                    while (dateUpdate < currentDate) {
                        arrayDatesUpdates = this.createArrayData(dateUpdate, daysWeek, data.rows.length)
                        data.nextUpdate = arrayDatesUpdates.pop() as string
                        dateUpdate = DateTime.fromFormat(data.nextUpdate, 'dd/MM/yyyy').toJSDate()
                    }
                    data.rows.map((el, index) => el.date = arrayDatesUpdates[index])
                    const [day, month, year] = data.nextUpdate.split('/');
                    const date = new Date(+year, +month - 1, +day).toISOString();
                    const nextUpdate = DateTime.fromISO(date);
                    const dataUpdate = {
                        rows: JSON.stringify(data.rows),
                        nextUpdate
                    }
                    await axios.put(`${this.baseUrl}/table/updateDates/${data.id}`, dataUpdate).then((res => {
                        console.log("🚀 ~ file: utils.ts:69 ~ awaitaxios.put ~ res:", res)
                    })).catch((erro => {
                        console.error(erro)
                    }))
                }
            }
        },
    }
)