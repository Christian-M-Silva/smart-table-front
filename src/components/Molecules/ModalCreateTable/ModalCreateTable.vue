<template>
  <div>
    <q-dialog v-model="createTableModal">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-grey-7">
          <q-toolbar>
            <q-toolbar-title>Insira os dados da sua tabela</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-blue-grey-5 p-2 gap-2 flex justify-end text-white">
          <q-btn
            color="blue-grey-10"
            icon="check"
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

        <q-page-container style="max-height: 577px" class="scroll">
          <q-page padding class="mx-10">
            <div class="my-5" v-for="input in inputs" :key="input.title">
              <span class="font-bold">{{ input.title.toUpperCase() }}</span>
              <q-select
                v-if="input.options"
                v-model="input.vModel"
                :options="input.options"
                filled
                :rules="[(val) => val.length > 0 || 'Esse campo é obrigatório']"
                multiple
              />
              <q-input
                v-else
                v-model="input.vModel"
                :type="input.type"
                :rules="[(val) => !!val || 'Esse campo é obrigatório']"
                filled
              />
            </div>

            <div>
              <span class="font-bold">NOME DAS COLUNAS DA TABELA</span>
              <q-input
                v-model="nameColumns"
                @keyup.enter="addNameColumn"
                type="text"
                filled
                hint="Clique Enter para adicionar o titulo da coluna, e clique no nome da coluna para remover ela"
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
         <span class="text-red-600 font-bold">O nome não pode ser repetido e nem ter espaços vazio</span>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script  src="./ModalCreateTable.ts"></script>