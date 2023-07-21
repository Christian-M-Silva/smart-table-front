<template>
  <div>
    <header class="bg-slate-500 py-5 px-5 flex justify-between">
      <div>
        <q-icon
          @click="editUser"
          class="cursor-pointer"
          name="fas fa-user-edit"
          size="xs"
        />
      </div>
      <h1
        class="text-xl font-semibold cursor-pointer"
        @click="$router.push({ name: 'home', params: { tableId: tableId } })"
      >
        SMART TABLE
      </h1>
      <div
        @click="exit"
        class="font-semibold row justify-center items-center cursor-pointer"
      >
        <q-icon
          :name="`fa-solid fa-arrow-right-${toOrFrom}-bracket`"
          class="pr-1"
          size="1rem"
        />
        <span>{{ isAuthenticate ? "Sair" : "Entrar" }}</span>
      </div>
    </header>
    <router-view></router-view>
    <modal-response-api
      :isOpenModal="openModalResponseAPI"
      :messageAxios="messageAxios"
      :responseApiStatus="responseStatus"
    ></modal-response-api>
  </div>
</template>

<script src="./Header.ts"></script>
