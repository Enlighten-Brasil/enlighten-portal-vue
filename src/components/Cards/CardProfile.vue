<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img v-if="group.image" alt="..." :src="'http://localhost:1337' + group.image.formats.thumbnail.url" class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
          </div>          
        </div>
        <div class="w-full px-4 text-center mt-20">
          <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                01
              </span>
              <span class="text-sm text-blueGray-400">Integrantes</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-2">
        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          @{{group.reference}}
        </h3>
        <div class="mb-2 text-blueGray-600 mt-2">
          <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          {{group.corp_name}}
        </div>
        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          --
        </div>
      </div>

      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
          <h3 class="text-xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">Modulos do Grupo</h3>
        <div class="flex flex-wrap justify-center">
          <div>
            <ul class="list-none mt-4">
              <li v-for="module in group.modules" :key="module.id" class="py-2">
                <div class="flex items-center">
                  <div>
                    <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 mr-3">
                      <i class="fas fa-fingerprint"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">
                      {{module.name}} <small>{{module.version}}</small>
                    </h4>
                  </div>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import team2 from "@/assets/img/team-2-800x800.jpg";
import { api } from "@/services";
export default {
  name: 'Modules',
  data() {
    return {
      group: {
        name: '',
        reference: '',
        status: '',
        max_users: 10,
        corp_name: '',
        trading_name: '',
        corp_id: '',
        image: false,
        modules: []
       },
      replace: team2
    }    
  },
  methods: {
      getGroup() {
        api
        .get('groups/only')
        .then(response => {
          this.group = response.data
        })
        .catch(error => {
          this.errored = error
        })
      }
    },
  mounted() {
    this.getGroup()
  }
}
</script>
