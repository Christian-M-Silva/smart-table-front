<template>
  <div>
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

export default defineComponent({
  
});
</script>
