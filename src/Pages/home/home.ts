
import axios from "axios";
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import packAxios from "@/mixins/packAxios";
import { RowsTableHome } from "@/interfaces/interfaces"
import utils from "@/mixins/utils";

export default defineComponent(
  {
    components: {
      ModalResponseApi
    },

    created() {
      // this.getTables()
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
        rows: [] as RowsTableHome[],
        search: '',
        selected: [] as RowsTableHome[],
      }
    },

    methods: {
      async getTables() {
        this.messageAxios = ''
        this.isLoading = true
        await axios.get(`${this.baseUrl}table/${Cookies.get('tableId')}`).then((res => {
          console.log("🚀 ~ file: home.ts:53 ~ awaitaxios.get ~ res:", res)
        })).catch((erro => {
          this.messageAxios = erro.response.data.error
          this.response = erro
        }))
        this.isLoading = false
        this.openModalResponseAPI = !this.openModalResponseAPI
      },

      download() {
        alert("Download this archive")
      },

      goTo(evt: Event, row: object, index: number) {
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ index", index)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ row", row)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ evt", evt)

      },

      newTable() {
        this.$router.push({ name: 'tables' })
      },

      removeTable() {
        this.selected.forEach(async el => {
          console.log("🚀 ~ file: home.ts:134 ~ removeTable ~ el:", el.id)
          this.messageAxios = ''
          this.isLoading = true
          await axios.delete(`${this.baseUrl}table/${Cookies.get('tableId')}/${el.id}`).then((res => {
            console.log("🚀 ~ file: home.ts:53 ~ awaitaxios.get ~ res:", res)
          })).catch((erro => {
            this.messageAxios = erro.response.data.error
            this.response = erro
            this.openModalResponseAPI = !this.openModalResponseAPI
          }))
        });
        this.isLoading = false
      },
    },

    mixins: [packAxios, utils],

    watch: {
      async search(newValue) {
        if (newValue.length > 0) {
          const tableId = Cookies.get('tableId')
          this.isLoading = true

          await axios.get(`${this.baseUrl}table/search/${tableId}/${this.search}`).then((res => {
            console.log("🚀 ~ file: home.ts:53 ~ awaitaxios.get ~ res:", res)
          })).catch((erro => {
            console.error(erro)
          }))
          this.isLoading = false
        }
      }
    },
  }
)