<template>
  <div class="pt-4">
    <span class="font-semibold">{{ title }}</span>
    <q-input v-bind="propsComputed" dense filled bg-color="white">
      <template v-slot:append v-if="$props.isVisibility">
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="showPassword"
        />
      </template>
    </q-input>
    <div v-if="erros">
      <div v-for="error of erros" :key="error.$uid">
        <div class="text-red-700 font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./InputComponent.ts"></script>
