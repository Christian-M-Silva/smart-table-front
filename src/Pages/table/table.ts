import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";
import { ColumnsTableCreate, InputsEditTable, vModelSelect } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
import axios from "axios";
import packAxios from "@/mixins/packAxios";

export default defineComponent({
    components: {
        ModalCreateTable,
        ModalConfirm
    },

    mixins: [packAxios],

    data() {
        return {
            loading: false,
            rows: [] as any[],
            columns: [] as ColumnsTableCreate[],
            showTable: false,
            nameTable: '',
            isModalEditInput: false,
            arrayInputs: [] as InputsEditTable[],
            isNotFullScreen: true,
            confirm: '',
            isOpenModalConfirm: false,
            IsOpenAgain: false,
            dataUpdate: [] as any[],
            weekDays: [] as vModelSelect[],
            nextUpdate: ''
        }
    },

    methods: {
        createTable(rows: any, columns: any, nameTable: string, vModelWeekDays: vModelSelect[], nextUpdate: string) {
            this.loading = true
            this.nameTable = nameTable
            this.columns = columns
            this.rows = rows
            this.showTable = true
            this.weekDays = vModelWeekDays
            this.loading = false
            this.nextUpdate = nextUpdate
        },

        openModalEdit(evt: Event, row: any, index: number) {
            this.isModalEditInput = true
            let inputs = [] as InputsEditTable[]
            for (const key in row) {
                inputs.push({
                    label: key,
                    value: row[key],
                    index: index
                });
            }
            inputs.sort((a, b) => {
                if (a.label === 'date') {
                    return -1;
                } else if (b.label === 'date') {
                    return 1;
                } else {
                    return 0;
                }
            })
            this.arrayInputs = inputs
        },

        editValue(index: number, value: string, label: string) {
            for (const key in this.rows[index]) {
                if (key === label) {
                    this.rows[index][key] = value
                }
            }
        },

        fullscreen(props: any) {
            this.isNotFullScreen = !this.isNotFullScreen
            props.toggleFullscreen()
        },

        cancel() {
            this.$router.push({ name: 'home', params: { tableId: Cookies.get('tableId') } })
        },

        clearTable() {
            this.rows.forEach(el => {
                Object.keys(el).forEach((prop) => {
                    if (prop !== "date") {
                        el[prop] = ""
                    }
                });

            })
        },

        async finalize() {
            const tableId = Cookies.get('tableId')
            const data = {
                rows: this.rows,
                columns: this.columns,
                nameTable: this.nameTable,
                tableId,
                weekDays: this.weekDays,
                nextUpdate: this.nextUpdate
            }
            console.log("🚀 ~ file: table.ts:68 ~ confirm ~ data", data)
            this.isLoading = true
            this.messageAxios = ''
            await axios.post(`${this.baseUrl}/table`, data).then((res => {
                console.log("🚀 ~ file: table.ts:110 ~ awaitaxios.post ~ res:", res)
                this.responseStatus = res.status
            })).catch((erro => {
                console.log("🚀 ~ file: table.ts:112 ~ awaitaxios.post ~ erro:", erro)
                this.messageAxios = erro.response.data.errors[0].message
                this.responseStatus = erro.response.status
            }))
            this.isLoading = false
        },

        editTable() {
            this.dataUpdate = this.rows
            this.IsOpenAgain = !this.IsOpenAgain
        }
    },
})