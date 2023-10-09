<template>
  <div class="font-bold text-lg h-screen row justify-center items-center text-center">
    {{ message }}
    <modal-confirm
      :isOpenModalConfirm="showModalConfirm"
      @confirm="proceed"
      @negative="notProceed"
      :messageConfirmation="messageConfirmation"
    ></modal-confirm>
    <loading :isLoading="isLoading" />
  </div>
</template>
<style scoped src="./saveAuth.css"></style>
<script src="./saveAuth.ts"></script>
