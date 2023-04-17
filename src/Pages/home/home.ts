
import axios from "axios";
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import packAxios from "@/mixins/packAxios";
import { RowsTableHome } from "@/interfaces/interfaces"

export default defineComponent(
  {
    mixins: [packAxios],
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
      find() {
        alert("Search " + this.search)
      },

      async getTables() {
        this.messageAxios = ''
        await axios.get(`${this.baseUrl}table/${Cookies.get('tableId')}`).then((res => {
          console.log("🚀 ~ file: home.ts:53 ~ awaitaxios.get ~ res:", res)
        })).catch((erro => {
          this.messageAxios = erro.response.data.error
          this.response = erro
        }))
      },

      newTable() {
        this.$router.push({ name: 'tables' })
      },

      removeTable() {
        alert("removeTable")
      },

      goTo(evt: Event, row: object, index: number) {
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ index", index)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ row", row)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ evt", evt)

      },

      download() {
        alert("Download this archive")
      },
    },

    created() {
      // this.getTables()
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
  }
)