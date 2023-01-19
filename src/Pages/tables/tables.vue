<template>
  <div>
    <q-table
      class="mx-5 mt-5"
      v-show="showTable"
      :title="nameTable"
      :rows="rows"
      :columns="columns"
      row-key="date"
     @row-click="addValueRow"
    />
    <modal-create-table @confirm="createTable" />

    <div
      v-if="loading"
      class="h-[calc(100vh-68px)] column justify-center items-center"
    >
      <q-icon name="autorenew" size="7rem" class="animate-spin h-20" />
      <span>Construindo sua Tabela</span>
    </div>
  </div>
</template>

<script  src="./tables.ts"></script>