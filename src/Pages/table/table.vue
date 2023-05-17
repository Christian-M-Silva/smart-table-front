<template>
  <div>
    <q-table
      card-class="bg-blue-grey-5"
      table-header-class="bg-blue-grey-6"
      table-class="bg-blue-grey-2"
      :class="[{ 'mx-32 my-5': isNotFullScreen }]"
      v-show="showTable"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      virtual-scroll
      :rows="rows"
      :columns="columns"
      row-key="date"
      @row-click="openModalEdit"
    >
      <template v-slot:top="props">
        <div class="row w-full justify-between mt-2">
          <h5>
            {{ nameTable }}
          </h5>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen(props)"
            class="q-ml-md"
          />
        </div>
      </template>
      <template v-slot:header-cell-date="props">
        <q-th style="background-color: #666666" :props="props">
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:body-cell-date="props">
        <q-td style="background-color: #666666">
          {{ props.row.date }}
        </q-td>
      </template>
      <template v-slot:bottom>
        <div class="row justify-between w-full items-center">
          <div class="row gap-2">
            <q-btn
              color="green"
              icon="check"
              label="FINALIZAR"
              @click="showModalConfirm('OK')"
            />
            <q-btn
              color="red"
              icon="close"
              label="CANCELAR"
              @click="showModalConfirm('CANCEL')"
            />
            <q-btn
              color="blue"
              icon="edit"
              label="EDITAR TABELA"
              @click="editTable"
            />
            <q-btn
              color="deep-orange"
              icon="delete"
              label="LIMPAR OS DADOS DA TABELA"
              @click="clearTable"
            />
          </div>
          <span>Total de linhas: {{ rows.length }}</span>
        </div>
      </template>
    </q-table>

    <div
      class="w-screen row mt-2 justify-center items-center"
      v-show="!showTable"
    >
      <q-btn
        color="primary"
        label="ABRIR MODAL DE CRIAÇÃO"
        @click="IsOpenAgain = !IsOpenAgain"
      />
    </div>

    <modal-create-table
      @confirm="createTable"
      :openModalAgain="IsOpenAgain"
      :updateData="dataUpdate"
    />

    <div
      v-if="loading"
      class="h-[calc(100vh-68px)] column justify-center items-center"
    >
      <q-icon name="autorenew" size="7rem" class="animate-spin h-20" />
      <span>Construindo sua Tabela</span>
    </div>

    <q-dialog
      v-model="isModalEditInput"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
      @keyup.enter="isModalEditInput = false"
    >
      <q-card class="bg-blue-grey-6 text-white" style="max-width: 80vw">
        <q-bar class="row justify-end">
          <q-btn dense flat icon="close" v-close-popup> </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">ALTERE OS VALORES DOS INPUTS</div>
        </q-card-section>

        <q-card-section class="q-pt-none row gap-1">
          <div v-for="input in arrayInputs" :key="input.label">
            <q-input
              color="grey-10"
              filled
              v-model="input.value"
              type="text"
              :label="input.label.toUpperCase()"
              :readonly="input.label === 'date'"
              @change="editValue(input.index, input.value, input.label)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isOpenModalConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Tem certeza?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="NÃO" color="red" v-close-popup />
          <q-btn
            flat
            label="SIM"
            color="green"
            v-close-popup
            @click="finalize"
            v-if="confirm === 'OK'"
          />
          <q-btn
            flat
            label="SIM"
            color="green"
            v-close-popup
            @click="cancel"
            v-else-if="confirm === 'CANCEL'"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="./table.ts"></script>