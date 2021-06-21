<template>  
  <div>
    <div
    class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-50">
    <div
      class="absolute top-0 w-full rounded h-full bg-center bg-cover"
      style="
        background-image: url('https://images.unsplash.com/photo-1579532536935-619928decd08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      "
    >
      <span
        id="blackOverlay"
        class="w-full h-full absolute opacity-50 rounded bg-black"
      ></span>
    </div>
    <div class="container relative mx-auto">
      <div class="items-center flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
          <div class="pr-12">
            <h1 class="text-white font-semibold text-5xl">
              Noticias e Novidades
            </h1>
            <p class="mt-4 text-lg text-blueGray-200">
              Temas selecionados direto ao ponto,.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- CARDS CONTAINERS -->
    <div v-if="news.length > 1" class="container mx-auto flex flex-wrap items-center justify-between mt-8">
        <!-- MODULE LOOP -->
        <div v-for="one in news" :key="one.id" class="w-full sm:w-6/12 lg:w-6/12 px-2">
            <div class="w-full md:w-12/12 px-1 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded-lg">
                <div class="px-4  flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i class="fas fa-award"></i>
                  </div>
                  <h6 class="text-xl font-semibold">{{one.title}}</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    {{one.short_desc}}
                  </p>
                  <a :href="one.url" class="text-sm"> Continuar lendo...</a>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center">
        Desculpe, nenhuma novidade ou noticia disponivel.
    </div>
  </div>
</template>
<script>
import { api } from "@/services";
export default {
  name: 'Modules',
  data() {
    return {
      news: []
    }    
  },
  methods: {
      getModules() {
        api
        .get('features')
        .then(response => {
          this.news = response.data
        })
        .catch(error => {
          this.errored = error
        })
      }
    },
  mounted() {
    this.getModules()
  }
};
</script>
