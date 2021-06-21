<template>  
  <div>
    <div
    class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-50">
    <div
      class="absolute top-0 w-full rounded h-full bg-center bg-cover"
      style="
        background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1002&q=80');
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
              Modulos e Serviços
            </h1>
            <p class="mt-4 text-lg text-blueGray-200">
              Acesse todas suas ferramentas em um só lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- CARDS CONTAINERS -->
    <div v-if="modules_available.length > 1" class="container mx-auto flex flex-wrap items-center justify-between mt-8">
        <!-- MODULE LOOP -->
        <div v-for="module in modules_available" :key="module.id" class="w-full sm:w-6/12 lg:w-4/12 px-2">
            <div class="flex flex-col break-words bg-white w-full mb-6 shadow-lg hover:shadow-md rounded-lg bg-emerald-500">
                <!-- IMAGE -->
                <img v-if="module.image_replace_url" alt="Capa do modulo" :src="module.image_replace_url" class="w-full align-middle rounded-t-lg"/>
                <img v-else-if="module.image" alt="Capa do modulo" :src="'http://localhost:1337' + module.image.url" class="w-full align-middle rounded-t-lg"/>
                <img v-else alt="Capa do modulo" src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="w-full align-middle rounded-t-lg"/>
                <blockquote class="relative p-4 mb-1">
                <svg 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    class="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                    <polygon
                    points="-30,95 583,95 583,65"
                    class="text-emerald-500 fill-current"
                    ></polygon>
                    </svg>
                    <div class="flex mb-4 text-sm font-semibold">
                        <div class="flex-auto flex">
                            <div class="w-1/2 flex">
                                <h4 class="text-xl font-bold text-white">{{module.name}}</h4> 
                            </div>
                            <div class="w-1/2 flex justify-end">
                                <button class="flex-none flex items-center text-xl justify-center p-4 hover:shadow-lg rounded-full bg-lightBlue-400 text-white shadow-md" title="Acessar modulo" type="button" aria-label="like">
                                    <i class="fas fa-sign-in-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                <p class="text-md font-light mt-2 text-white">
                    {{module.description}}
                </p>
                <div class="text-right">
                    <small>v{{module.version}} </small>
                </div>
                </blockquote>
            </div>
        </div>
    </div>
    <div v-else>
        Nenhum modulo disponivel no momento.
    </div>
  </div>
</template>
<script>
import { api } from "@/services";
export default {
  name: 'Modules',
  data() {
    return {
      modules_available: []
    }    
  },
  methods: {
      getModules() {
        api
        .get('modules')
        .then(response => {
          this.modules_available = response.data
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
