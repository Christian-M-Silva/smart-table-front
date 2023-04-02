<template>
    <q-dialog v-model="openModal" position="top">
      <q-card>
        <div class="header-body-modal">
          <span class="text-red-600">{{errorMessage}}</span>
        </div>
      </q-card>
    </q-dialog>
</template>

<script src="./ModalError.ts"></script>
<style scoped src="./ModalError.css"></style>
