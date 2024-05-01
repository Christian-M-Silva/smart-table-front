import { defineComponent, PropType } from "vue";
import { vModelSelect, ColumnsTableCreate, rowsTableCreateOrRead, TypeGetTable } from "@/interfaces/interfaces";
import { DateTime } from "luxon";
import Cookies from "js-cookie";
import ModalConfirm from "../ModalConfirm/ModalConfirm.vue";
import ModalError from "@/components/Molecules/ModalError/ModalError.vue";
import utils from "@/mixins/utils";
import axios from "axios";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from '@vuelidate/core'
const { withAsync } = helpers

export default defineComponent({
    setup() {
        return { v$: useVuelidate() }
    },

    components: {
        ModalConfirm,
        ModalError
    },

    mixins: [utils],

    props: {
        openModalAgain: {
            type: Boolean,
            default: false,
        },
        updateData: {
            type: Array as PropType<any>
        },

        fillModalData: Object as PropType<TypeGetTable>

    },

    data() {
        return {
            myLocale: {
                days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
                daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
                months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
                firstDayOfWeek: 0,
                format24h: true,
                pluralDay: 'dias'
            },
            createTableModal: false,
            erroInput: false,
            errorMessage: '',
            openModalError: false,
            dateFormatted: new Date().toLocaleDateString(),
            nameTable: "",
            nameTableHasFistTouch: false,
            inputs: [
                {
                    vModel: '2',
                    type: 'number',
                    name: 'numberRow',
                    title: 'Quantidade de linhas da tabela',
                    hasFistTouch: false
                },
                {
                    vModel: new Date().toISOString().split('T')[0].replaceAll('-', '/'),
                    name: 'dayBegin',
                    type: 'date',
                    title: 'Dia inicial da tabela',
                    hasFistTouch: false
                },
                {
                    vModel: [] as vModelSelect[],
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
                    ],
                    hasFistTouch: false
                },
            ],
            nameColumns: '',

            rows: [] as rowsTableCreateOrRead[],

            columns: [] as ColumnsTableCreate[],

            namesColumns: [] as string[],
            openModalConfirm: false,
            userConfirmation: null as ((value: boolean) => void) | null,
        }
    },

    methods: {
        addNameColumn() {
            this.namesColumns.includes(this.nameColumns.toUpperCase()) || this.nameColumns.length === 0 || this.nameColumns.toUpperCase() === "DATE" ? this.erroInput = true : this.namesColumns.push(this.nameColumns.toUpperCase().trim())
            this.nameColumns = ''
        },

        formattedDate(date: any) {
            const dateLuxon = DateTime.fromFormat(date, 'yyyy/MM/dd');
            const dateFormatted = dateLuxon.toFormat('dd/LL/yyyy');
            this.dateFormatted = dateFormatted

        },

        optionsDate(date: string) {
            return date >= new Date().toISOString().split('T')[0].replaceAll('-', '/')
        },

        fillModal() {
            this.nameTable = this.fillModalData?.nameTable as string
            const nameColumns = this.fillModalData?.cols.filter(el =>
                el.label !== 'DATA'
            )
            this.namesColumns = nameColumns?.map(el =>
                el.label
            ) ?? []
            this.inputs.forEach(el => {
                switch (el.name) {
                    case 'numberRow':
                        el.vModel = this.fillModalData?.rows.length.toString() as string
                        break;

                    case 'dayBegin':
                        el.vModel = DateTime.fromFormat(this.fillModalData?.rows[0].date as string, 'dd/MM/yyyy').toFormat('yyyy/LL/dd') as string
                        this.dateFormatted = DateTime.fromFormat(this.fillModalData?.rows[0].date as string, 'dd/MM/yyyy').toFormat('dd/LL/yyyy') as string
                        break;

                    case 'weekDays':
                        el.vModel = this.fillModalData?.daysWeek as vModelSelect[]
                        break;

                    default:
                        break;
                }
            })
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
                const datePart = vModelDayBegin.split("/");
                const year = parseInt(datePart[0]);
                const month = parseInt(datePart[1]) - 1;
                const day = parseInt(datePart[2]);
                const currentDate = new Date(year, month, day);
                let date = currentDate

                let rowsDate = this.createArrayData(date, weekDaysChosenByUser, quantityRow)
                const isGetLast = rowsDate.length <= this.quantityLastRow

                let nextUpdate = isGetLast ? rowsDate[rowsDate.length - 1] : rowsDate[rowsDate.length - (this.quantityLastRow + 1)]

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
                const isUpdate = !!this.$route.params.tableId

                this.$emit('confirm', this.rows, this.columns, this.nameTable, vModelWeekDays, nextUpdate, isUpdate)
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
            this.inputs.map(el => el.hasFistTouch = false)
            if (Object.keys(this.fillModalData as {}).length > 0) {
                this.fillModal()
            }
            this.createTableModal = true
        }
    },

    created() {
        this.createTableModal = this.$route.params.tableId ? false : true
    },

    validations: {
        nameTable: {
            asyncValidator: helpers.withMessage("O nome da tabela escolhido, já existe, escolha outro", withAsync(async (newValue: string, v: any) => {
                const data = {
                    tableName: v.nameTable,
                    tableId: Cookies.get('tableId')
                }

                let exist = false
                if (v.fillModalData.nameTable !== newValue && Cookies.get('tableId')) {
                    exist = await axios.post(`${v.baseUrl}/table/existTableWithThisName`, data, {
                        timeout: 20000
                    })
                        .then((res => {
                            return res.data
                        }))
                        .catch((err => {
                            v.createTableModal = false
                            v.errorMessage = err.code !== 'ECONNABORTED' ? "Ocorreu algum erro, recarregue a página" : 'Tempo muito longo de espera, verifique sua conexão com a internet ou tente novamente'
                            v.openModalError = !v.openModalError
                        }))
                }
                return !exist
            })),
            required: helpers.withMessage('Este campo é obrigatório', required)
        },
        inputs: {
            $each: helpers.forEach({
                vModel: {
                    required: helpers.withMessage('Este campo é obrigatório', required),
                    isLessThanOne: helpers.withMessage('O valor deve ser maior ou igual a 2', (value: string, input: any) => {
                        if (input.name === 'numberRow') {
                            if (Number(input.vModel) < 2) {
                                return false
                            }
                            return true
                        }
                        return true
                    })
                },
            })
        }
    }

})