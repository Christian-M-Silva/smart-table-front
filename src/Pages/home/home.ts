import { defineComponent } from "vue";
import { Rows } from "@/interfaces/interfaces"
export default defineComponent(
  {
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

        rows: [] as Rows[],

        selected: []
      }
    },

    methods: {
      find() {
        alert("Search " + this.search)
      },

      newTable() {
        alert("Nova tabela")
      },

      removeTable() {
        alert("removeTable")
      },

      goTo(evt:Event, row:object, index:number){
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ index", index)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ row", row)
        console.log("🚀 ~ file: home.ts:67 ~ goTo ~ evt", evt)
        
      },

      download(){
        alert("Download this archive")
      },
    },

    created() {
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