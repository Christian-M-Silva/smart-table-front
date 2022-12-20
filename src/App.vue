<template>
  <div>
    <Header v-if="$route.name !== 'loginAndRegister'"/>
    <router-view />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-neutral-300;
}

.borda {
  border: 1px red solid;
}
</style>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header/Header.vue";

export default defineComponent({
  components: {
    Header
  },
});
</script>
