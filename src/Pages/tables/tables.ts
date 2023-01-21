import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import { ColumnsTableCreate, inputs } from "@/interfaces/interfaces";

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
            arrayInputs: [] as inputs[]
        }
    },

    methods: {
        createTable(rows: any, columns: any, isLoading: boolean, nameTable: string) {
            this.loading = isLoading
            this.columns = columns
            this.rows = rows
            this.showTable = true
            this.loading = false
            this.nameTable = nameTable
        },

        openModalEdit(evt: Event, row: any, index: number) {
            this.isModalEditInput = true
            let inputs = [] as inputs[]
            for (const key in row) {
                inputs.push({
                    label: key,
                    value: row[key],
                    index: index
                });
            }
            this.arrayInputs = inputs
        },

        editValue(index:number, value:string, label:string){
            for (const key in this.rows[index]) {
                if (key === label) {
                    this.rows[index][key] = value
                }
            }
        }
    },
})