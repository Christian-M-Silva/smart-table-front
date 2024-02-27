import InputComponent from '@/components/Atomos/InputComponent/InputComponent.vue';
import axios from "axios";
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import ModalConfirm from "@/components/Molecules/ModalConfirm/ModalConfirm.vue";
import ModalSharing from "@/components/Molecules/ModalSharing/ModalSharing.vue";
import ModalResponseApi from "@/components/Molecules/ModalResponseApi/ModalResponseApi.vue";
import { infoToken } from "@/interfaces/interfaces"
import utils from "@/mixins/utils";
export default defineComponent(
  {
    mixins: [utils],
    components: {
      ModalConfirm,
      ModalSharing,
      ModalResponseApi,
      InputComponent
    },

    created() {
      this.userName = Cookies.get('nameUser') as string
      this.lastRows = this.quantityLastRow

      const infoTokenString = Cookies.get('infoToken')
      this.infoToken = this.decryptObject(infoTokenString as string, process.env.VUE_APP_SECRET_KEY as string)
    },

    data() {
      return {
        openModalConfirmRemove: false,
        lastRows: 0,
        infoToken:  {} as infoToken,
        userName: '',
        configAxios: {
          timeout: 20000
        }
      }
    },

    methods: {
      async deleteUser() {
        await axios.delete(`${this.baseUrl}/user/${this.infoToken.email}`, this.configAxios).then(res => {
          this.exit()
        }).catch((erro => {
          if (erro.code !== 'ECONNABORTED') {
            this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
          }
          this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
          this.isLoading = false
          this.openModalResponseAPI = !this.openModalResponseAPI
        }))
      },

      async saveEdits() {
        const dataUpdate = {
          entity: this.userName,
          quantityLastRow: this.lastRows
        }
        await axios.put(`${this.baseUrl}/user/${this.infoToken.email}`, dataUpdate, this.configAxios).then(res => {
          Cookies.set('nameUser', res.data.entity)
          Cookies.set('quantityLastRow', res.data.quantityLastRow)
          this.$router.push({ name: 'home', params: { tableId: Cookies.get('tableId') } })
        }).catch((erro => {
          if (erro.code !== 'ECONNABORTED') {
            this.messageAxios = erro.response.data.code ? 'Erro na requisição' : erro.response.data.errors[0].message
          }
          this.responseStatus = erro.code === 'ECONNABORTED' ? erro.code : erro.response.status
          this.isLoading = false
          this.openModalResponseAPI = !this.openModalResponseAPI
        }))
      }
    },
  }
)