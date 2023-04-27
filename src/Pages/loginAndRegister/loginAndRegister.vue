<template>
  <div class="h-screen pt-5">
    <div>
      <div class="w-full lg:w-6/12 px-4 mx-auto pt-6">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-stone-300 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-slate-700 text-center my-5 font-bold text-2xl">
              <h2 :class="classAnimation">{{ action }}</h2>
            </div>
            <form>
              <input-component
                type="text"
                title="ENTIDADE"
                v-model="entity"
                @blur="v$.entity.$touch"
                placeholder="Insira seu nome ou da instituição"
                :erros="action === 'Cadastrar' ? v$.entity.$errors : []"
              ></input-component>

              <input-component
                v-show="action === 'Cadastrar'"
                type="text"
                title="EMAIL"
                autocomplete="username"
                v-model="email"
                placeholder="Insira seu e-mail"
                @blur="v$.email.$touch"
                :erros="action === 'Cadastrar' ? v$.email.$errors : []"
              ></input-component>

              <input-component
                :type="typePassword"
                title="SENHA"
                isVisibility
                v-model="password"
                placeholder="Insira a senha"
                autocomplete="current-password"
                @blur="v$.password.$touch"
                @show-password="showPassword"
                :erros="action === 'Cadastrar' ? v$.password.$errors : []"
              ></input-component>

              <div class="text-center mt-5 text-teal-700 font-semibold">
                <span
                  class="cursor-pointer"
                  @click="modelSendEmail = true"
                  v-if="action == 'Login'"
                  >Esqueci minha senha</span
                >
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-slate-700 text-white hover:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="registerOrLogin"
                >
                  {{ action }}
                </button>
              </div>

              <div
                class="flex justify-center mt-2 bg-gray-500 rounded-md cursor-pointer"
              >
                <span
                  class="slide-in-right text-center w-full py-2"
                  @click="action = 'Cadastrar'"
                  v-show="action == 'Login'"
                  >Não está cadastrado? Faça o seu cadastro</span
                >
                <span
                  class="slide-in-left text-center w-full py-2"
                  @click="action = 'Login'"
                  v-show="action == 'Cadastrar'"
                  >Já está cadastrado? Faça o seu login</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer class="w-full md:w-6/12 px-4 mx-auto text-center my-14">
        <a
          href="https://github.com/Christian-M-Silva"
          target="_blank"
          class="bg-red-500 font-bold shadow-lg shadow-red-500/50 rounded-md p-2"
          >DEVELOPED 🎮 <span class="text-red-700">CHRISTIAN</span></a
        >
      </footer>
    </div>

    <modal-error
      :errorMessage="errorMessage"
      :isOpenModalErro="openModalError"
    />

    <modal-response-api
      :isOpenModal="openModalResponseAPI"
      :messageAxios="messageAxios"
      :responseApiStatus="responseStatus"
    ></modal-response-api>

    <q-dialog v-model="modelSendEmail" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Digite o e-mail cadastrado</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="email" autofocus @keyup.enter="sendEmail" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Enviar" @click="sendEmail" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <modal-inputs
      :isCloseModal="closeModal"
      :isOpenModal="openModalInputs"
      titleModal="Crie sua nova senha"
      :inputs="inputsModal"
      @confirm="saveNewPassword"
    />

    <loading :isLoading="isLoading" />
  </div>
</template>
<style scoped src="./loginAndRegister.css"></style>
<script src="./loginAndRegister.ts"></script>
