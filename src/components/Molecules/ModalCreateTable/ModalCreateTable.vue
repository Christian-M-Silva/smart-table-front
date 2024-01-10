<template>
  <div>
    <q-dialog v-model="createTableModal" persistent>
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-grey-7">
          <q-toolbar>
            <q-toolbar-title>
              <span :class="{ 'text-sm': $q.screen.xs }"
                >Insira os dados da sua tabela</span
              >
            </q-toolbar-title>
            <q-btn flat v-close-popup round dense>
              <q-icon name="close" :size="$q.screen.xs ? 'sm' : 'md'" />
            </q-btn>
          </q-toolbar>
        </q-header>

        <q-footer
          :class="[
            'bg-blue-grey-5 p-2 gap-2 flex text-white',
            $q.screen.xs ? 'column justify-center' : 'justify-end',
          ]"
        >
          <q-btn
            color="blue-grey-10"
            icon="close"
            label="Cancelar"
            @click="cancel"
          />
          <q-btn
            color="blue-grey-10"
            icon="check"
            label="Confirmar"
            @click="confirm"
          />
        </q-footer>

        <q-page-container style="max-height: 571px" class="scroll">
          <q-page padding class="mx-10">
            <div class="my-5">
              <span class="font-bold text-red-600">*NOME DA TABELA</span>
              <q-input v-model="nameTable" filled @blur="v$.nameTable.$touch" />
              <div>
                <div class="text-red-700 font-semibold">
                  <span v-if="v$.nameTable.asyncValidator.$invalid">
                    O nome da tabela escolhido, já existe, escolha outro
                  </span>
                  <span v-else-if="v$.nameTable.$error">
                    {{ v$.nameTable.required.$message }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="my-5"
              v-for="(input, index) in inputs"
              :key="input.title"
            >
              <span class="font-bold text-red-600"
                >*{{ input.title.toUpperCase() }}</span
              >
              <q-select
                v-if="input.options"
                v-model="input.vModel"
                :options="input.options"
                filled
                multiple
                @blur="input.hasFistTouch = true"
              />

              <q-input
                v-else-if="input.type !== 'date'"
                v-model="input.vModel"
                :type="input.type"
                :erros="v$.inputs.$each.$message[index]"
                filled
                @blur="input.hasFistTouch = true"
              />

              <q-input v-else filled v-model="dateFormatted" mask="##/##/####" readonly>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="input.vModel" :update="formattedDate(input.vModel)" today-btn :locale="myLocale">
                      <!-- <q-date v-model="input.vModel" :update="formattedDate(input.vModel)" :options="optionsDate" today-btn :locale="myLocale"> -->
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div v-if="input.hasFistTouch">
                <div
                  v-for="(error, index) of v$.inputs.$each.$message[index]"
                  :key="index"
                >
                  <div class="text-red-700 font-semibold">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span class="font-bold">NOME DAS COLUNAS DA TABELA</span>
              <q-input
                v-model="nameColumns"
                @keyup.enter="addNameColumn"
                type="text"
                filled
                :class="$q.screen.lt.sm ? 'mb-16' : 'mb-8'"
                hint="Clique Enter para adicionar o titulo da coluna, e clique no nome da coluna para remover ela. (É OBRIGATÓRIO PELO MENOS UMA COLUNA)"
              />

              <div class="flex gap-2 bg-slate-500 h-28 p-3 mt-5">
                <span
                  @click="removeItem(index)"
                  v-for="(name, index) in namesColumns"
                  :key="index"
                >
                  {{ name }}<span v-show="name">,</span>
                </span>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>

    <q-dialog v-model="erroInput" position="top">
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <span class="text-red-600 font-bold"
            >O nome não pode ser repetido, não pode ser "Date" e nem ter espaços
            vazios</span
          >
        </q-card-section>
      </q-card>
    </q-dialog>

    <modal-error
      :errorMessage="errorMessage"
      :isOpenModalErro="openModalError"
    />

    <modal-confirm
      :isOpenModalConfirm="openModalConfirm"
      @confirm="proceed"
      @negative="notProceed"
      messageConfirmation="A nova tabela suporta menos dados que a anterior, isso resultará em perda de dados, gostaria de prosseguir?"
    ></modal-confirm>
  </div>
</template>

<script src="./ModalCreateTable.ts"></script>
