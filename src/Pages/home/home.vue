<template>
  <div>
    <h1 class="text-center mt-2 text-2xl font-bold">Você está logado como {{entity}}</h1>
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    />

    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
  </div>
</template>
<script  src="./home.ts"></script>
