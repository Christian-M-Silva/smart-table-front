<template>
  <div>
    <q-dialog v-model="modelOpenModal" persistent>
      <div class="bg-white w-96" style="max-height: 577px">
        <div class="bg-grey-7">
          <q-toolbar>
            <q-toolbar-title>
              {{ titleModal }}
            </q-toolbar-title>
            <q-btn
              flat
              v-close-popup
              round
              dense
              icon="close"
              @click="$emit('cancel')"
            />
          </q-toolbar>
        </div>

        <div style="max-height: 470px" class="scroll">
          <div padding class="mx-10">
            <form>
              <div class="my-5" v-for="input in inputs" :key="input.title">
                <span class="font-bold">{{ input.title }}</span>
                <q-select
                  v-if="input.type === 'select'"
                  v-model="input.vModel"
                  :options="input.options"
                  filled
                  :rules="[
                    (val) => val.length > 0 || 'Esse campo é obrigatório',
                  ]"
                  multiple
                />
                <q-input
                  v-else-if="input.type === 'password'"
                  v-model="input.vModel"
                  filled
                  autocomplete="new-password"
                  :type="input.isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="input.isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="input.isPwd = !input.isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  v-else
                  v-model="input.vModel"
                  :type="input.type"
                  :rules="
                    input.isRequired
                      ? [(val) => !!val || 'Esse campo é obrigatório']
                      : []
                  "
                  filled
                />
              </div>
            </form>
          </div>
        </div>

        <div class="bg-blue-grey-5 p-2 gap-2 flex justify-end text-white">
          <q-btn
            color="blue-grey-10"
            icon="check"
            label="Confirmar"
            @click="$emit('confirm', inputs)"
          />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script src="./ModalInputs.ts"></script>
