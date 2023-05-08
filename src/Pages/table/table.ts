import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import { ColumnsTableCreate, InputsEditTable, DataEnd, BaseInputs } from "@/interfaces/interfaces";

export default defineComponent({
    components: {
        ModalCreateTable,
    },
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
            dataUpdate: {} as DataEnd,
            inputsCreateTable: [] as BaseInputs[]
        }
    },

    methods: {
        createTable(rows: any, columns: any, nameTable: string, isLoading: boolean, inputsModel: BaseInputs[]) {
            this.loading = isLoading
            this.columns = columns
            this.rows = rows
            this.showTable = true
            this.nameTable = nameTable
            this.inputsCreateTable = inputsModel
            this.loading = false
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
            this.$router.push({ name: 'home' })
        },

        finalize() {
            const data = {
                rows: this.rows,
                columns: this.columns,
                nameTable: this.nameTable
            }
            console.log("🚀 ~ file: table.ts:68 ~ confirm ~ data", data)
        },

        showModalConfirm(value: string) {
            this.confirm = value
            this.isOpenModalConfirm = true
        },

        editTable() {
            this.dataUpdate = {
                rows: this.rows,
                columns: this.columns,
                nameTable: this.nameTable,
                inputsTable: this.inputsCreateTable
            }
        }
    },
})