
import axios from "axios";
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";
import ModalSharing from "@/components/Molecules/ModalSharing/ModalSharing.vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import packAxios from "@/mixins/packAxios";
import { RowsTableHome, TypeGetTable, PropsRequest, ColumnsTableCreate, rowsTableCreateOrRead } from "@/interfaces/interfaces"
import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, AlignmentType, WidthType, TextRun, HeightRule } from "docx";
import utils from "@/mixins/utils";
import { saveAs } from "file-saver";
export default defineComponent(
  {
    mixins: [packAxios, utils],
    components: {
      ModalConfirm,
      ModalSharing,
      ModalResponseApi
    },

    created() {
      Cookies.set('tableId', this.$route.params.tableId as string)
      this.getTables()
      this.authenticate()
    },

    data() {
      return {
        loading: false,
        openModalSharing: false,
        zebraColor: false,
        pagination: {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 5,
          rowsNumber: 5
        },
        url: `${process.env.VUE_APP_URL}${this.$route.fullPath}`,
        networks: [
          { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#e12828', className: 'text-white' },
          { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366', className: 'text-white' },
        ],

        columns: [
          {
            name: 'name',
            field: 'name',
            required: true,
            label: 'NOME',
            align: 'left',
            sortable: true
          },
          {
            name: 'createdAt',
            align: 'left',
            label: 'DATA DE CRIAÇÃO',
            field: 'createdAt',
            sortable: true
          },
          {
            name: 'updateAt',
            align: 'left',
            label: 'DATA DE ATUALIZAÇÃO',
            field: 'updateAt',
            sortable: true
          },
        ],
        entity: 'Christian',
        openModalConfirm: false,
        rows: [] as RowsTableHome[],
        search: '',
        selected: [] as RowsTableHome[],
      }
    },

    methods: {
      async getTables() {
        this.loading = true
        await axios.get(`${this.baseUrl}/table/${Cookies.get('tableId')}?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}&search=${this.search}`).then((res => {
          this.pagination.rowsNumber = res.data.meta.total
          this.rows = res.data.data.map((el: TypeGetTable) => ({
            id: el.id,
            name: el.nameTable,
            createdAt: el.createdAt,
            updateAt: el.nextUpdate,
          }))
        })).catch((erro => {
          this.messageAxios = erro.response.data.error
          this.responseStatus = erro.response.status
          this.openModalResponseAPI = !this.openModalResponseAPI
        })).finally(() => setTimeout(() => {
          this.loading = false
        }, 1000))
        this.selected = []
      },

      onRequest(props: PropsRequest) {
        this.pagination = props.pagination
        this.getTables()
      },
      async download() {
        // TODO:Descomentar
        let tablesForDownload = [] as TypeGetTable[]
        this.messageAxios = ''
        this.isLoading = true
        try {
          for (const el of this.selected) {
            const res = await axios.get(`${this.baseUrl}/table/download/${Cookies.get('tableId')}/${el.id}`);
            tablesForDownload.push(res.data)
          }
        } catch (error: any) {
          this.messageAxios = error.response.data.error
          this.responseStatus = error.response.status
          this.openModalResponseAPI = !this.openModalResponseAPI
        }
        try {
          for (const el of tablesForDownload) {
            const columns = el.cols.map(el => new TableCell({
              shading: {
                fill: '111111',
              },
              children: [new Paragraph({
                children: [new TextRun({
                  text: el.label,
                  bold: true,
                  color: 'ffffff',
                  font: "Calibri (Corpo)",
                  allCaps: true,
                  size: 28,
                })],
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
              })],
            }))
            let rowsData = el.rows.map(row => {
              let tableCell: TableCell[] = [];
              const reorderedObject = this.reorderObjectProperties(el.cols, row);
              reorderedObject.forEach((el: [string, string]) => {
                if (el[0] === 'date') {
                  this.zebraColor = !this.zebraColor
                }
                tableCell.push(new TableCell({
                  shading: {
                    fill: this.zebraColor ? 'e8e8e8' : 'FFFFFF',
                  },
                  children: [new Paragraph({
                    children: [new TextRun({
                      text: el[1],
                      font: "Calibri (Corpo)",
                      size: 28
                    })],
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                  })],
                }));
              });

              return new TableRow({
                children: tableCell,
                height: { value: 400, rule: HeightRule.ATLEAST }
              });
            });
            const table = new Table({
              rows: [
                new TableRow({
                  children: columns,
                  tableHeader: true
                }),
                ...rowsData,
              ],
              alignment: AlignmentType.CENTER,
              width: {
                size: 4535,
                type: WidthType.PERCENTAGE,
              },
            });

            const title = new Paragraph({
              children: [new TextRun({
                text: el.nameTable,
                bold: true,
                font: "Calibri (Corpo)",
                allCaps: true,
                size: 40
              })],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            });
            const doc = new Document({
              sections: [{
                children: [title, table],
              }],
            });

            Packer.toBlob(doc).then((blob) => {
              saveAs(blob, el.nameTable);
            });
          }
        } catch (error) {
          console.error(error)
        }
        this.isLoading = false
        this.selected = []
      },

      goTo(evt: Event, row: RowsTableHome, index: number) {
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ index", index)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ row", row.id)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ evt", evt)
        this.$router.push({ name: 'table', params: { tableId: row.id } })
      },

      newTable() {
        this.$router.push({ name: 'table' })
      },

      reorderObjectProperties(cols: ColumnsTableCreate[], row: rowsTableCreateOrRead): [string, string][] {

        const reorderedArray: [string, string][] = [];

        cols.forEach((item) => {
          reorderedArray.push([item.name, row[item.name]]);
        })
        return reorderedArray;
      },

      async removeTable() {
        this.messageAxios = '';
        this.isLoading = true;

        try {
          for (const el of this.selected) {
            await axios.delete(`${this.baseUrl}/table/${Cookies.get('tableId')}/${el.id}`);
            this.getTables();
          }
        } catch (error: any) {
          this.messageAxios = error.response.data.error;
          this.responseStatus = error.response.status;
          this.openModalResponseAPI = true;
        }
        this.isLoading = false;
      },
    },
  }
)