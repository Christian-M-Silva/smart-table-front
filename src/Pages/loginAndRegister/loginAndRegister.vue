<template>
  <div class="h-screen pt-20">
    <section>
      <div class="w-full lg:w-6/12 px-4 mx-auto pt-6">
        <div
          class="
            relative
            flex flex-col
            min-w-0
            break-words
            w-full
            mb-6
            shadow-lg
            rounded-lg
            bg-stone-300
            border-0
          "
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-slate-700 text-center my-5 font-bold text-2xl">
              <h2 :class="classAnimation">{{ action }}</h2>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    uppercase
                    text-blueGray-600 text-xs
                    font-bold
                    mb-2
                  "
                  htmlfor="grid-password"
                >
                  ENTIDADE</label
                >
                <input
                  type="text"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  v-model="entity"
                  placeholder="Insira seu nome ou da empresa"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    uppercase
                    text-blueGray-600 text-xs
                    font-bold
                    mb-2
                  "
                  htmlfor="grid-password"
                  >Senha</label
                >
                <input
                  type="password"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  autocomplete="on"
                  v-model="password"
                  placeholder="Insira a senha"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="
                    bg-blueGray-800
                    text-white
                    active:bg-blueGray-600
                    text-sm
                    font-bold
                    uppercase
                    px-6
                    py-3
                    rounded
                    shadow
                    hover:shadow-lg
                    outline-none
                    focus:outline-none
                    mr-1
                    mb-1
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  type="button"
                  @click="registerOrLogin"
                >
                  {{ action }}
                </button>
              </div>

              <div class="flex justify-center mt-2 bg-gray-500 rounded-md cursor-pointer">
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
          class="
            bg-red-500
            font-bold
            shadow-lg shadow-red-500/50
            rounded-md
            p-2
          "
          >DEVELOPED 🎮 <span class="text-red-700">CHRISTIAN</span></a
        >
      </footer>
    </section>
  </div>
</template>
<style scoped src="./loginAndRegister.css"></style>
<script  src="./loginAndRegister.ts"></script>
