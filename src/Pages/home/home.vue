<template>
  <div class="mx-10">
    <h1 class="text-center mt-3 text-2xl font-bold">
      Você está logado como {{ entity }}
    </h1>

    <div
      :class="[
        'flex gap-1',
        $q.screen.lt.md
          ? $q.screen.sm
            ? 'flex-col mx-36 mt-5'
            : 'flex-col mt-5'
          : 'my-3',
      ]"
    >
      <div class="flex gap-1">
        <input
          :class="[
            ' form-control px-3 relative flex-auto min-w-0 block py-1.5 text-base font-normal  text-gray-700  bg-slate-100 bg-clip-padding border border-solid border-gray-300  rounded  transition  ease-in-out focus:text-gray-700 focus:bg-slate-50 focus:border-blue-600  focus:outline-none',
            $q.screen.gt.xs ? 'w-72' : 'w-16',
          ]"
          type="search"
          class=""
          placeholder="Nome da tabela"
          aria-label="Pesquise pelo nome da tabela"
          aria-describedby="button-search"
          v-model="search"
        />

        <button
          class="
            btn
            px-5
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
            flex
            items-center
          "
          type="button"
          @click="find"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            class="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </button>
      </div>

      <button
        class="
          bg-emerald-500
          shadow-lg shadow-emerald-500/50
          btn
          px-5
          py-2.5
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          flex
          items-center
          justify-center
          gap-1
        "
        @click="newTable"
      >
        <q-icon name="add" size="xs" />
        <span> NOVA TABELA</span>
      </button>

      <button
        class="
          bg-red-500
          shadow-lg shadow-red-500/50
          btn
          px-5
          py-2.5
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          flex
          items-center
          justify-center
          gap-1
        "
        v-show="selected.length > 0"
        @click="removeTable"
      >
        <q-icon name="delete" size="xs" />
        <span>REMOVER TABELA</span>
      </button>

      <button
        class="
          bg-green-500
          shadow-lg shadow-green-500/50
          btn
          px-5
          py-2.5
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          flex
          items-center
          justify-center
          gap-1
        "
        v-show="selected.length > 0"
        @click="download"
      >
        <q-icon name="image" size="xs" />
        <span>BAIXAR TABELA</span>
      </button>
    </div>

    <q-table
      title="Tables"
      :rows="rows"
      :grid="$q.screen.lt.md"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="selected"
      @row-click="goTo"
    >
    </q-table>

    <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
  </div>
</template>
<script  src="./home.ts"></script>
