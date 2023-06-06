<template>
  <div class="pt-4">
    <span class="font-semibold" v-if="title">{{ title }}</span>
    <div class="row gap-1">
      <q-input class="col" v-bind="propsComputed" dense filled>
        <template v-slot:append v-if="$props.isVisibility">
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword"
          />
        </template>
      </q-input>
      <q-btn no-caps v-if="button" :color="button.color" @click="$emit('action-button', $attrs.modelValue)">
        <q-icon class="mr-1" v-if="button.iconName" :size="button.iconSize" :name="button.iconName" />
        <div>{{button.label}}</div>
      </q-btn>
    </div>

    <div v-if="erros">
      <div v-for="(error, index) of erros" :key="index">
        <div class="text-red-700 font-semibold">
          {{ error.$message || error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./InputComponent.ts"></script>
