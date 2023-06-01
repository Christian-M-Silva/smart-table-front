import { defineComponent, PropType } from "vue";
import { vModelSelect, ColumnsTableCreate, rowsTableCreateOrRead } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
import ModalConfirm from "../ModalConfirm/ModalConfirm.vue";
import utils from "@/mixins/utils";
import axios from "axios";
import packAxios from "@/mixins/packAxios";
import { helpers } from "@vuelidate/validators";
import { useVuelidate } from '@vuelidate/core'
const { withAsync } = helpers

export default defineComponent({
    setup() {
        return { v$: useVuelidate() }
    },
    components: {
        ModalConfirm
    },
    mixins: [utils, packAxios],
    props: {
        openModalAgain: {
            type: Boolean,
            default: false,
        },
        updateData: {
            type: Array as PropType<any>
        }
    },

    data() {
        return {
            createTableModal: false,
            erroInput: false,
            nameTable: "e",
            inputs: [
                {
                    vModel: '5',
                    type: 'number',
                    name: 'numberRow',
                    title: 'Quantidade de linhas da tabela'
                },
                {
                    vModel: '2001-07-13',
                    name: 'dayBegin',
                    type: 'date',
                    title: 'Dia inicial da tabela'
                },
                {
                    vModel: [{ label: "Domingo", value: '0' },],
                    type: 'select',
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

            rows: [] as rowsTableCreateOrRead[],

            columns: [] as ColumnsTableCreate[],

            namesColumns: ['1', '2', '3', '4', '5'] as string[],
            openModalConfirm: false,
            userConfirmation: null as ((value: boolean) => void) | null,
        }
    },

    methods: {
        addNameColumn() {
            this.namesColumns.includes(this.nameColumns.toUpperCase()) || /\s/g.test(this.nameColumns) || this.nameColumns.length === 0 || this.nameColumns.toUpperCase() === "DATE" ? this.erroInput = true : this.namesColumns.push(this.nameColumns.toUpperCase().trim())
            this.nameColumns = ''
        },

        removeItem(index: number) {
            this.namesColumns.splice(index, 1)
        },

        cancel() {
            if (this.updateData.length > 0) {
                return this.createTableModal = false
            }
            return this.$router.push({ name: 'home', params: { tableId: Cookies.get('tableId') } })
        },

        async confirm() {
            const isValidate = await this.v$.$validate()
            if (!isValidate) {
                return console.error("O nome da tabela escolhido, já existe, escolha outro")
            }
            const hasSomeInputInvalid = this.inputs.filter(input => input.vModel.length === 0)

            if (this.namesColumns.length > 0 && hasSomeInputInvalid.length === 0) {
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
                let date = currentDate

                let rowsDate = this.createArrayData(date, weekDaysChosenByUser, quantityRow + 1)

                let nextUpdate = rowsDate.pop()

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
                if (this.updateData.length > 0) {
                    const isLengthArraysDifferent = this.updateData.length > this.rows.length
                    const isLengthObjectInArraysDifferent = Object.keys(this.updateData[0]).length > Object.keys(this.rows[0]).length

                    if (isLengthArraysDifferent || isLengthObjectInArraysDifferent) {
                        this.openModalConfirm = true;
                        const userConfirmed = await this.waitForUserConfirmation();
                        this.openModalConfirm = false;

                        if (!userConfirmed) {
                            return
                        }
                    }


                    this.rows.forEach((el, index) => {
                        Object.keys(el).forEach((prop, indexObject) => {
                            if (this.updateData[index] && this.updateData[index].hasOwnProperty(prop) && prop !== "date") {
                                const propUpdateData = Object.keys(this.updateData[index])[indexObject]
                                el[prop] = this.updateData[index][propUpdateData]
                            }
                        });

                    })

                }

                this.createTableModal = false
                this.$emit('confirm', this.rows, this.columns, this.nameTable, vModelWeekDays, nextUpdate)
            }

        },

        waitForUserConfirmation() {
            return new Promise((resolve) => {
                this.userConfirmation = resolve;
            });
        },

        proceed() {
            this.userConfirmation?.(true)
        },

        notProceed() {
            this.userConfirmation?.(false)
        },
    },

    watch: {
        openModalAgain() {
            this.createTableModal = true
        },
    },

    created() {
        this.createTableModal = this.$route.params.tableId ? false : true
    },
    validations: {
        nameTable: {
            asyncValidator: withAsync( async (newValue: string, v: any) => {
                const exist = await axios.get(`${v.baseUrl}/table/existTableWithThisName/${v.nameTable}/${Cookies.get('tableId')}`).then((res => {
                    return res.data
                }))
                return !exist
            })
        }
    }

})