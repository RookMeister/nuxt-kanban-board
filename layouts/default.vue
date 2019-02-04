<template>
  <v-app id="default">
    <header_component />
    <v-content>
      <v-container fluid fill-height px-1 py-3 :class="background">
        <v-layout row style="height:100%;align-self: start;align-items:flex-start;"> <nuxt /> </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import header from '~/components/header/header.vue'

export default {
  components: {
    header_component: header
  },
  computed: {
    background: {
      get() {
        return 'background1'// + this.$store.state.data.background
      }
    }
  }
}
</script>

<style scoped>
#default {
  height: 100%;
}
main {
  height: 100%;
}
</style>
