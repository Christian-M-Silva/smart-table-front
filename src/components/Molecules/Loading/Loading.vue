<template>
  <q-dialog v-model="openModal" persistent>
    <div class="column justify-center p-8 items-center gap-3">
      <q-spinner color="white" size="6rem" :thickness="3" />
      <span v-if="textLoad" class="font-semibold text-lg">{{ textLoad }}</span>
    </div>
  </q-dialog>
</template>

<script src="./Loading.ts"></script>