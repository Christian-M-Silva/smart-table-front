import { defineComponent } from "vue";
import ModalCreateTable from "@/components/Molecules/ModalCreateTable/ModalCreateTable.vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";
import { ColumnsTableCreate, InputsEditTable, vModelSelect, rowsTableCreateOrRead, PropsFullScreen, TypeGetTable } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
import axios from "axios";
import packAxios from "@/mixins/utils";
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
            textLoad: '',
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
            nextUpdate: '',
            fillModalData: {} as TypeGetTable
        }
    },

    methods: {
        createTable(rows: rowsTableCreateOrRead[], columns: ColumnsTableCreate[], nameTable: string, vModelWeekDays: vModelSelect[], nextUpdate: string, isUpdate: boolean) {
            this.loading = true
            this.nameTable = nameTable
            this.columns = columns
            this.rows = rows
            this.showTable = true
            this.weekDays = vModelWeekDays
            this.loading = false
            this.nextUpdate = nextUpdate
            if (isUpdate) {
                this.fillModalData = {} as TypeGetTable
            }
        },

        openModalEdit(evt: Event, row: rowsTableCreateOrRead, index: number) {
            if (!this.isAuthenticate) {
                return
            }
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
            this.textLoad = "Salvando sua Tabela"
            this.messageAxios = ''

            try {
                const request = this.$route.params.tableId ? await axios.put(`${this.baseUrl}/table/${this.$route.params.tableId}`, data, {
                    // timeout: 20000
                }) : await axios.post(`${this.baseUrl}/table`, data, {
                    timeout: 20000
                })

                this.responseStatus = request.status;
                this.openModalResponseAPI = !this.openModalResponseAPI
                setTimeout(() => {
                    this.$router.push({ name: 'home', params: { tableId: idTable } })
                }, 1000);

            } catch (erro: any) {
                if (erro.code !== 'ECONNABORTED') {
                    const errorMessage = this.$route.params.tableId ? 'Erro ao atualizar a tabela' : 'Erro ao cadastrar a tabela'
                    this.messageAxios = errorMessage;
                    console.error(errorMessage)
                }
                this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                this.openModalResponseAPI = !this.openModalResponseAPI
                this.isLoading = false
            }
        },

        editTable() {
            this.dataUpdate = this.rows
            this.IsOpenAgain = !this.IsOpenAgain
        },

        async loadTable() {
            this.isLoading = true
            this.textLoad = "Trazendo sua tabela"
            await axios.get(`${this.baseUrl}/table/${this.$route.params.tableId}`, {
                timeout: 20000
              }).then((async res => {
                this.responseStatus = res.status
                this.fillModalData = res.data
                const nameTables = await this.updateDates(res.data);
                if (nameTables) {
                    this.loadTable()
                }
                this.createTable(res.data.rows, res.data.cols, res.data.nameTable, res.data.daysWeek, res.data.nextUpdate, false)
            })).catch((erro => {
                if (erro.code !== 'ECONNABORTED') {
                    this.messageAxios = 'Erro ao trazer os dados';
                    console.error('Erro ao trazer os dados')
                }
                this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
                this.openModalResponseAPI = !this.openModalResponseAPI
                this.isLoading = false
            }))
            setTimeout(() => {
                this.isLoading = false;
            }, 1000)
        }
    },

    mounted() {
        if (this.$route.params.tableId) {
            this.loadTable()
        }
    },
})