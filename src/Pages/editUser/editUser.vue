<template>
  <div class="mx-10">
    <h1 class="text-center mt-3 text-2xl font-bold">
      <span>Configurações do usuário</span>
    </h1>

    <div class="px-56 text-center">
      <input-component standout  v-model="userName" type="text" label="Nome de usuário" />
      <input-component
      standout 
        v-model="lastRows"
        type="number"
        label="Faltando quantas linhas para acabar a tabela você quer que atualize?"
      />
      <div class="mt-2 flex justify-center items-center gap-2">
        <q-btn
          color="red"
          icon="delete"
          label="Excluir usuário"
          @click="openModalConfirmRemove = true"
        />
        <q-btn color="blue" icon="check" label="Salvar" @click="saveEdits" />
      </div>
    </div>

     <modal-confirm
      :isOpenModalConfirm="openModalConfirmRemove"
      @confirm="deleteUser"
      @negative="openModalConfirmRemove = false"
    ></modal-confirm>
  </div>
</template>
<script src="./editUser.ts"></script>
