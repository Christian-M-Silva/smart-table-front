<template>
  <div>
    <header class="bg-slate-500 py-5 px-5 flex justify-between">
      <h1 class="text-xl font-semibold">SMART TABLE</h1>
      <div @click="exit" class="flex cursor-pointer">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        <span>Sair</span>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<style scoped src="./Header.css"></style>
<script  src="./Header.ts"></script>