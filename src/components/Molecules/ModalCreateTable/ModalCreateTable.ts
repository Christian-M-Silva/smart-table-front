import { defineComponent } from "vue";
import { vModelSelect, ColumnsTableCreate } from "@/interfaces/interfaces";

export default defineComponent({
    props:{
        openModalAgain: {
            type: Boolean,
            default: false,
        },
        updateData: Object
    },

    data() {
        return {
            createTableModal: false,
            erroInput: false,
            inputs: [
                {
                    vModel: 'Indicador e Volante',
                    name: 'nameTable',
                    type: 'text',
                    title: 'Nome da tabela',
                },
                {
                    vModel: '6',
                    type: 'number',
                    name: 'numberRow',
                    title: 'Quantidade de linhas da tabela'
                },
                {
                    vModel: '2023-02-03',
                    name: 'dayBegin',
                    type: 'date',
                    title: 'Dia inicial da tabela'
                },
                {
                    vModel: [{ label: "Quarta", value: '3' }, { label: "Sábado", value: '6' }],
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

            rows: [] as any[],

            columns: [] as ColumnsTableCreate[],

            namesColumns: ['INDICADOR', 'VOLANTE'] as string[]
        }
    },

    methods: {
        addNameColumn() {
            this.namesColumns.includes(this.nameColumns.toUpperCase()) || /\s/g.test(this.nameColumns) || this.nameColumns.length === 0 ? this.erroInput = true : this.namesColumns.push(this.nameColumns.toUpperCase().trim())
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

                //PEGA OS DIAS DA SEMANA E ATRIBUI PARA UM ARRAY CHAMADO weekDays
                const vModelWeekDays = this.inputs.filter(input => input.name === 'weekDays')[0].vModel as vModelSelect[]
                let weekDaysChosenByUser = [] as string[]
                vModelWeekDays.forEach(el => {
                    weekDaysChosenByUser.push(el.value)
                });


                //CRIA A NOVA DATA COM BASE NO QUE O USER PASSOU 
                let vModelDayBegin = this.inputs.filter(input => input.name === "dayBegin")[0].vModel as string
                const datePart = vModelDayBegin.split("-");
                const year = parseInt(datePart[0]);
                const month = parseInt(datePart[1]) - 1;
                const day = parseInt(datePart[2]);
                const currentDate = new Date(year, month, day);

                let rowsDate = []

                let date = currentDate

                while (rowsDate.length < quantityRow) { //aqui ele vai ver se a quantidade de linhas ou seja de datas armazenadas dentro do row, combina com a quantidade de linha, pois cada data é uma linha
                    
                    let dayWeek = date.getDay().toString() //aqui ele vai pegar o date e pegar o dia da semana que ele está se referindo

                    if (weekDaysChosenByUser.includes(dayWeek)) {// se retornar verdadeiro então rowsDate, recebe essa data atual já formatada
                        const dayRow = date.toLocaleDateString() //Transformar o date no formato DD/MM/AA

                        rowsDate.push(dayRow) //Add ao rowsDate esse dia
                    } //se retornar falso o rowsDate não recebe nada

                    date = new Date(date.setDate(date.getDate() + 1)) //ai fazemos a date somar mais um dia
                }

                this.createTableModal = false
                
                let nameTable = ''
                this.inputs.forEach(el => {
                    if (el.name === 'nameTable') {
                        nameTable = el.vModel as string
                    }
                });


                this.columns = this.namesColumns.map(el => ({
                    name: el.toLowerCase(),
                    field: el.toLowerCase(),
                    label: el,
                    align: "left"
                }))

                this.columns.unshift({
                    name: 'date',
                    field: 'date',
                    label: 'DATA',
                    align: "left"
                })

                this.rows = rowsDate.map(el => ({
                    date: el
                }))

                for (let index = 0; index < this.rows.length; index++) {
                    this.columns.forEach(el => {
                        if (el.name !== 'date') {
                            this.rows[index][el.field] = ''
                        }
                    });
                }
                this.$emit('confirm', this.rows, this.columns, nameTable, true)
                console.log("🚀 ~ file: ModalCreateTable.ts:152 ~ confirm ~ nameTable", nameTable)
                console.log("🚀 ~ file: ModalCreateTable.ts:152 ~ confirm ~ this.columns", this.columns)
                console.log("🚀 ~ file: ModalCreateTable.ts:152 ~ confirm ~ this.rows", this.rows)
            }
        },

        updateTable(newValue:any){
            console.log("🚀 ~ file: ModalCreateTable.ts:158 ~ updateTable ~ newValue", newValue)
        }
    },

    watch:{
        openModalAgain(){
            this.createTableModal = true
        },

        updateData(newValue){
            alert('aqui')
            this.updateTable(newValue)
        }
    },

    created() {
        this.createTableModal = this.$route.params.id ? false : true
    },
})