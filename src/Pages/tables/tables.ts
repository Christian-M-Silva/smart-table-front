import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import { ColumnsTableCreate } from "@/interfaces/interfaces";

export default defineComponent({
    components:{
        ModalCreateTable,
    },
    data() {
        return {
            loading: false,
            rows: [] as any[],
            columns: [] as ColumnsTableCreate[],
            showTable: false,
            nameTable: ''
        }
    },

    methods: {
        createTable(rows:any, columns:any, isLoading:boolean, nameTable:string){
            this.loading = isLoading
            this.columns = columns
            this.rows = rows
            console.log("🚀 ~ file: tables.ts:20 ~ createTable ~ nameTable", nameTable)
            console.log("🚀 ~ file: tables.ts:16 ~ createTable ~ columns", columns)
            console.log("🚀 ~ file: tables.ts:16 ~ createTable ~ rows", rows)
            this.showTable = true
            this.loading = false
            this.nameTable = nameTable
        },

        addValueRow(evt:Event, row:any, index:Number){
            console.log("🚀 ~ file: tables.ts:33 ~ addValueRow ~ index", index)
            console.log("🚀 ~ file: tables.ts:33 ~ addValueRow ~ row", row)
            row.indicador = "Mudei"
            console.log("🚀 ~ file: tables.ts:33 ~ addValueRow ~ evt", evt)
            
        }
    },
})