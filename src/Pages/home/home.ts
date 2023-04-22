
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
          name: "Nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          name: "nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          name: "Nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          name: "nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          name: "Nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
        {
          name: "nome",
          createdAt: 'Criado',
          updateAt: 'Atualizado',
        },
      )
    },

    data() {
      return {
        search: '',
        entity: 'Christian',
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

        rows: [] as RowsTableHome[],

        selected: []
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
        alert("removeTable")
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