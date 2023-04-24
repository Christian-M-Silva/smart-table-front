<template>
  <div class="mx-10">
    <h1 class="text-center mt-3 text-2xl font-bold">
      <span v-if="isAuthenticate">Você está logado como {{ entity }}</span>
      <span v-else>Olá seja bem-vindo(a)</span>
    </h1>

    <div
      :class="[
        'flex gap-1',
        $q.screen.lt.md
          ? $q.screen.sm
            ? 'flex-col mx-36 mt-5'
            : 'flex-col mt-5'
          : 'my-3',
      ]"
    >
      <div class="flex gap-1">
        <input
          :class="[
            ' form-control px-3 relative flex-auto min-w-0 block py-1.5 text-base font-normal  text-gray-700  bg-slate-100 bg-clip-padding border border-solid border-gray-300  rounded  transition  ease-in-out focus:text-gray-700 focus:bg-slate-50 focus:border-blue-600  focus:outline-none',
            $q.screen.gt.xs ? 'w-72' : 'w-16',
          ]"
          type="search"
          class=""
          placeholder="Nome da tabela"
          aria-label="Pesquise pelo nome da tabela"
          aria-describedby="button-search"
          v-model="search"
        />
      </div>

      <button
        class="bg-emerald-500 shadow-lg shadow-emerald-500/50 btn px-5 py-2.5 font-medium text-xs leading-tight uppercase rounded flex items-center justify-center gap-1"
        @click="newTable"
        v-if="isAuthenticate"
      >
        <q-icon name="add" size="xs" />
        <span> NOVA TABELA</span>
      </button>

      <button
        class="bg-red-500 shadow-lg shadow-red-500/50 btn px-5 py-2.5 font-medium text-xs leading-tight uppercase rounded flex items-center justify-center gap-1"
        v-show="selected.length > 0 && isAuthenticate"
        @click="this.openModalConfirm = !this.openModalConfirm"
      >
        <q-icon name="delete" size="xs" />
        <span>REMOVER TABELA</span>
      </button>

      <button
        class="bg-green-500 shadow-lg shadow-green-500/50 btn px-5 py-2.5 font-medium text-xs leading-tight uppercase rounded flex items-center justify-center gap-1"
        v-show="selected.length > 0"
        @click="download"
      >
        <q-icon name="image" size="xs" />
        <span>BAIXAR TABELA</span>
      </button>
    </div>

    <q-table
      title="Tables"
      :rows="rows"
      :grid="$q.screen.lt.md"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      @row-click="goTo"
    >
    </q-table>

    <loading :isLoading="isLoading" />
    <modal-response-api
      :isOpenModal="openModalResponseAPI"
      :messageAxios="messageAxios"
      :responseApi="response"
    ></modal-response-api>
    <modal-confirm
      :isOpenModalConfirm="openModalConfirm"
      @confirm="removeTable"
    ></modal-confirm>
      <!-- TODO:Descomentar e colocar dentro do  modal-confirm-->
      <!-- @negative="getTables" -->
  </div>
</template>
<script src="./home.ts"></script>
