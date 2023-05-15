import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import { ColumnsTableCreate, InputsEditTable } from "@/interfaces/interfaces";
import Cookies from "js-cookie";

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
            dataUpdate: [] as any[],
        }
    },

    methods: {
        createTable(rows: any, columns: any, nameTable: string, isLoading: boolean) {
            this.loading = isLoading
            this.columns = columns
            this.rows = rows
            this.showTable = true
            this.nameTable = nameTable
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
            this.dataUpdate = this.rows
            this.IsOpenAgain = !this.IsOpenAgain
        }
    },
})