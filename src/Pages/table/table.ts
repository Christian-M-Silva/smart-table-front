import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";
import { ColumnsTableCreate, InputsEditTable, vModelSelect, rowsTableCreateOrRead, PropsFullScreen } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
import axios from "axios";
import packAxios from "@/mixins/packAxios";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import { DateTime } from 'luxon';

export default defineComponent({
    components: {
        ModalCreateTable,
        ModalConfirm,
        ModalResponseApi
    },

    mixins: [packAxios],

    data() {
        return {
            loading: false,
            rows: [] as rowsTableCreateOrRead[],
            columns: [] as ColumnsTableCreate[],
            showTable: false,
            nameTable: '',
            isModalEditInput: false,
            arrayInputs: [] as InputsEditTable[],
            isNotFullScreen: true,
            confirm: '',
            isOpenModalConfirm: false,
            IsOpenAgain: false,
            dataUpdate: [] as rowsTableCreateOrRead[],
            weekDays: [] as vModelSelect[],
            nextUpdate: ''
        }
    },

    methods: {
        createTable(rows: rowsTableCreateOrRead[], columns: ColumnsTableCreate[], nameTable: string, vModelWeekDays: vModelSelect[], nextUpdate: string) {
            this.loading = true
            this.nameTable = nameTable
            this.columns = columns
            this.rows = rows
            this.showTable = true
            this.weekDays = vModelWeekDays
            this.loading = false
            this.nextUpdate = nextUpdate
        },

        openModalEdit(evt: Event, row: rowsTableCreateOrRead, index: number) {
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

        fullscreen(props: PropsFullScreen) {
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
            const idTable = Cookies.get('tableId')
            const [day, month, year] = this.nextUpdate.split('/');
            const date = new Date(+year, +month - 1, +day).toISOString();
            const nextUpdate = DateTime.fromISO(date);
            const rows = JSON.stringify(this.rows)
            const cols = JSON.stringify(this.columns)
            const daysWeek = JSON.stringify(this.weekDays)

            const data = {
                rows,
                cols,
                nameTable: this.nameTable,
                idTable,
                daysWeek,
                nextUpdate 
            }
            this.isLoading = true
            this.messageAxios = ''
            await axios.post(`${this.baseUrl}/table`, data).then((res => {
                this.responseStatus = res.status
                setTimeout(() => {
                    this.$router.push({ name: 'home', params: { tableId: idTable } })
                }, 1000);
            })).catch((erro => {
                console.error(erro)
                this.responseStatus = erro.response.status
            }))
            this.isLoading = false
            this.openModalResponseAPI = !this.openModalResponseAPI
        },

        editTable() {
            this.dataUpdate = this.rows
            this.IsOpenAgain = !this.IsOpenAgain
        }
    },
})