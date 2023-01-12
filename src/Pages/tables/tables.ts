import { defineComponent } from "vue";
import { vModelSelect } from "@/interfaces/interfaces";

export default defineComponent({
    data() {
        return {
            createTableModal: false,
            inputs: [
                {
                    vModel: '',
                    name: 'nameTable',
                    type: 'text',
                    title: 'Nome da tabela',
                },
                {
                    vModel: '',
                    type: 'number',
                    name: 'numberRow',
                    title: 'Quantidade de linhas da tabela'
                },
                {
                    vModel: '',
                    name: 'dayBegin',
                    type: 'date',
                    title: 'Dia inicial da tabela'
                },
                {
                    vModel: [],
                    name: 'weekDays',
                    title: 'Dias da Semana que a tabela vai ter que repetir',
                    options: [
                        { label: "Domingo", value: '0' },
                        { label: "Segunda", value: '1' },
                        { label: "Terça", value: '2' },
                        { label: "Quarta", value: '3' },
                        { label: "Quinta", value: '4' },
                        { label: "Sexta", value: '5' },
                        { label: "Sábado", value: '6' }
                    ]
                },
            ],
            nameColumns: '',

            namesColumns: [] as string[]
        }
    },

    methods: {
        addNameColumn() {
            this.namesColumns.includes(this.nameColumns.toUpperCase()) ? alert("Esse nome já tem " + this.nameColumns) : this.namesColumns.push(this.nameColumns.toUpperCase())
            this.nameColumns = ''
        },

        removeItem(index: number) {
            this.namesColumns.splice(index, 1)
        },

        cancel() {
            this.$router.push({ name: "home" })
        },

        confirm() {
            const isInvalid = this.inputs.filter(input => input.vModel.length === 0)

            if (this.namesColumns.length > 0 && isInvalid.length === 0) {
                // PEGAR A QUANTIDADE DE LINHA PASSADO PELO USER
                const quantityRow = Number(this.inputs.filter(input => input.name === 'numberRow')[0].vModel)

                //PEGA OS DIAS DA SEMANA E ATRIBUI PARA UM ARRAY CHAMADO weekDays INICIO -----------
                const vModelWeekDays = this.inputs.filter(input => input.name === 'weekDays')[0].vModel as vModelSelect[]
                let weekDaysChosenByUser = [] as string[]
                vModelWeekDays.forEach(el => {
                    weekDaysChosenByUser.push(el.value)
                });


                //CRIA A NOVA DATA COM BASE NO QUE O USER PASSOU INICIO ***********************
                let vModelDayBegin = this.inputs.filter(input => input.name === "dayBegin")[0].vModel as string
                const datePart = vModelDayBegin.split("-");
                const year = parseInt(datePart[0]);
                const month = parseInt(datePart[1]) - 1;
                const day = parseInt(datePart[2]);
                const currentDate = new Date(year, month, day);

                let rows = [] //Valor a ser passado no array, aqui dentro ele vai pegar todos os dias que tem que aparecer na tabela

                console.log("🚀 ~ file: tables.ts:68 ~ confirm ~ quantityRow", quantityRow)
                console.log("🚀 ~ file: tables.ts:73 ~ confirm ~ weekDaysChosenByUser", weekDaysChosenByUser)
                console.log("🚀 ~ file: tables.ts:86 ~ confirm ~ currentDate", currentDate.getDay())

                //AQUI VOU COLOCAR A LÓGICA QUE ESTOU ARRUMANDO ACIMA

                let date = currentDate //Fazemos o date receber o currentDate

                while (rows.length < quantityRow) { //aqui ele vai ver se a quantidade de linhas ou seja de datas armazenadas dentro do row, combina com a quantidade de linha, pois cada data é uma linha
                    let dayWeek = date.getDay().toString() //aqui ele vai pegar o date e pegar o dia da semana que ele está se referindo

                    if (weekDaysChosenByUser.includes(dayWeek)) {// se retornar verdadeiro então rows, recebe essa data atual já formatada
                        const dayRow = date.toLocaleDateString() //Transformar o date no formato DD/MM/AA

                        rows.push(dayRow) //Add ao rows esse dia
                    } //se retornar falso o rows não recebe nada

                    date = new Date(date.setDate(date.getDate() + 1)) //ai fazemos a date somar mais um dia
                }
                console.log("🚀 ~ file: tables.ts:105 ~ confirm ~ rows", rows)
            }
        }
    },

    created() {
        this.createTableModal = this.$route.params.id ? false : true
    },
})