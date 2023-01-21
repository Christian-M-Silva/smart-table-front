<template>
  <div>
    <q-table
      table-header-class="bg-blue-grey-6"
      table-class="bg-blue-grey-2"
      class="mx-32 my-5"
      v-show="showTable"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      virtual-scroll
      :title="nameTable"
      :rows="rows"
      :columns="columns"
      row-key="date"
      @row-click="openModalEdit"
    />
    <modal-create-table @confirm="createTable" />

    <div
      v-if="loading"
      class="h-[calc(100vh-68px)] column justify-center items-center"
    >
      <q-icon name="autorenew" size="7rem" class="animate-spin h-20" />
      <span>Construindo sua Tabela</span>
    </div>

    <q-dialog
      full-width
      v-model="isModalEditInput"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-blue-grey-6 text-white">
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
              @blur="editValue(input.index, input.value, input.label)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script  src="./tables.ts"></script>