<template>
  <q-dialog v-model="openModal" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{messageConfirmation}}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="NÃO" color="red" v-close-popup @click="negative"/>
        <q-btn flat label="SIM" color="green" v-close-popup @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./ModalConfirm.ts"></script>
