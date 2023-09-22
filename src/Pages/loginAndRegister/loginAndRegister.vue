<template>
  <div class="h-screen column justify-center">
    <div>
      <div class="w-full lg:w-6/12 px-4 mx-auto pt-6">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-stone-300 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-slate-700 text-center my-5 font-bold text-2xl">
              <h2 :class="classAnimation">{{ action }}</h2>
            </div>
            <div class="py-5 text-center">
              <span class="text-[.9rem] font-semibold">Ola, Seja bem vindo(a)! Faça o seu {{lowercase}} para poder otimizar o seu tempo.</span>
            </div>
            <form>
              <input-component
                type="text"
                title="Entidade"
                v-model="entity"
                @blur="v$.entity.$touch"
                placeholder="Insira um nome para o sistema"
                :erros="v$.entity.$errors"
                v-if="action === 'Cadastro'"
              ></input-component>

              <div class="text-center mt-6">
                <button
                  class="bg-slate-700 text-white hover:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="startAuth"
                  :disabled="action === 'Cadastro' && !entity"
                >
                  Faça seu {{ action }}
                </button>
              </div>

              <div
                class="flex justify-center mt-2 bg-gray-500 rounded-md cursor-pointer"
              >
                <span
                  class="slide-in-right text-center w-full py-2"
                  @click="action = 'Cadastro'"
                  v-show="action == 'Login'"
                  >Não está cadastrado? Faça o seu cadastro</span
                >
                <span
                  class="slide-in-left text-center w-full py-2"
                  @click="action = 'Login'"
                  v-show="action == 'Cadastro'"
                  >Já está cadastrado? Faça o seu login</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer class="w-full md:w-6/12 px-4 mx-auto text-center mt-4">
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

    <loading :isLoading="isLoading" />
  </div>
</template>
<style scoped src="./loginAndRegister.css"></style>
<script src="./loginAndRegister.ts"></script>
