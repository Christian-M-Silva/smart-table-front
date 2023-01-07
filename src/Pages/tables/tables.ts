import { defineComponent } from "vue";

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
                        { label: "Domingo", value: "sunday" },
                        { label: "Segunda", value: "monday" },
                        { label: "Terça", value: "tuesday" },
                        { label: "Quarta", value: "wednesday" },
                        { label: "Quinta", value: "thursday" },
                        { label: "Sexta", value: "friday" },
                        { label: "Sábado", value: "saturday" }
                    ]
                },
            ],
            nameColumns: '',

            namesColumns: [ ] as string[ ] 
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
            const isInvalid = this.inputs.filter(input => input.vModel.length === 0 )
            if (this.namesColumns.length > 0 && isInvalid.length === 0) {
                console.log("🚀 ~ file: tables.ts:45 ~ data ~ inputs", this.inputs)
                console.log("🚀 ~ file: tables.ts:45 ~ data ~ nameColumns", this.nameColumns)

            }
        }
    },

    created() {
        this.createTableModal = this.$route.params.id ? false : true
    },
})