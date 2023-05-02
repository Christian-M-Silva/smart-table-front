
import axios from "axios";
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";
import ModalSharing from "@/components/Molecules/ModalSharing/ModalSharing.vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import packAxios from "@/mixins/packAxios";
import { RowsTableHome } from "@/interfaces/interfaces"
import utils from "@/mixins/utils";

export default defineComponent(
  {
    components: {
      ModalConfirm,
      ModalSharing,
      ModalResponseApi
    },

    created() {
      Cookies.set('tableId', this.$route.params.tableId as string)
      this.getTables()
      this.authenticate()
      this.rows.push(
        {
          id: '7287287287287',
          name: "Nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          id: '7287287287286',
          name: "nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          id: '7287287287281',
          name: "Nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          id: '7287287287282',
          name: "nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          id: '7287287287283',
          name: "Nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          id: '728728728728444',
          name: "nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
      )
    },

    data() {
      return {
        openModalSharing: false,
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
        // TODO:Descomentar
        //   this.messageAxios = ''
        //   this.isLoading = true
        //   await axios.get(`${this.baseUrl}table/${Cookies.get('tableId')}`).then((res => {
        //     console.log("🚀 ~ file: home.ts:53 ~ awaitaxios.get ~ res:", res)
        //   })).catch((erro => {
        //     this.messageAxios = erro.response.data.error
        //     this.responseApiStatus = erro.response.status
        //   }))
        //   this.isLoading = false
        //   this.openModalResponseAPI = !this.openModalResponseAPI
        //   this.selected = []
      },

      download() {
        // TODO:Descomentar
        // let tablesForDownload = []
        // this.selected.forEach(async el => {
        //   this.messageAxios = ''
        //   this.isLoading = true
        //   await axios.get(`${this.baseUrl}table/download/${Cookies.get('tableId')}/${el.id}`).then((res => {
        //     console.log("🚀 ~ file: home.ts:53 ~ awaitaxios.get ~ res:", res)
        //     tablesForDownload.push(res.data)
        //   })).catch((erro => {
        //     this.messageAxios = erro.response.data.error
        //     this.responseApiStatus = erro.response.status
        //     this.openModalResponseAPI = !this.openModalResponseAPI
        //   }))
        // });
        // this.isLoading = false
        // this.getTables()
      },

      goTo(evt: Event, row: RowsTableHome, index: number) {
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ index", index)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ row", row.id)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ evt", evt)
        this.$router.push({ name: 'table', params:{tableId: row.id} })
      },

      newTable() {
        this.$router.push({ name: 'table' })
      },

      removeTable() {
        this.selected.forEach(async el => {
          this.messageAxios = ''
          this.isLoading = true
          await axios.delete(`${this.baseUrl}table/${Cookies.get('tableId')}/${el.id}`).catch((erro => {
            this.messageAxios = erro.response.data.error
            this.responseStatus = erro.response.status
            this.openModalResponseAPI = !this.openModalResponseAPI
          }))
        });
        this.isLoading = false
        this.getTables()
      },
    },

    mixins: [packAxios, utils],

    watch: {
      async search(newValue) {
        if (newValue.length > 0) {
          const tableId = Cookies.get('tableId')
          this.isLoading = true

          await axios.get(`${this.baseUrl}table/search/${tableId}/${this.search}`).catch((erro => {
            console.error(erro)
          }))
          this.isLoading = false
        }
      }
    },
  }
)