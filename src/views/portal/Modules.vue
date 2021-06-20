<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
      </div>
      
      aqui
      {{modules}}
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  created() {
    this.$store.dispatch('retrieveModules')
  },
};
</script>
