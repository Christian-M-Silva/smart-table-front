<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 700px">
      <q-card-section class="bg-slate-500 row items-center q-pt-sm">
        <div class="text-h6">Escolha uma forma de compartilhamento</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="row justify-center gap-2">
        <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          class="p-2 rounded-borders row justify-center items-center"
          :style="{ backgroundColor: network.color }"
          :url="url"
          :title="title"
        >
          <q-icon class="mr-1" size="sm" :name="network.icon" />
          <span :class="network.className">{{ network.name }}</span>
        </ShareNetwork>
      </q-card-section>

      <q-card-section v-if="copyText">
        <input-component
          type="text"
          disable
          bg-color="grey-5"
          v-model="url"
          :button="button"
          @action-button="copy"
        ></input-component>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script src="./ModalSharing.ts"></script>
