<template>
  <div>
    <q-dialog v-model="openModal" position="top">
      <q-card>
        <div v-if="responseApiStatus > 399" class="header-body-modal">
          <span :class="colorCode">ERRO {{ responseApiStatus }}</span>
        </div>
        <div class="header-body-modal">
          <span :class="colorCode">{{axiosMessage}}</span>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="./ModalResponseApi.ts"></script>
<style scoped src="./ModalResponseApi.css"></style>
