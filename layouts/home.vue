<template>
  <v-app id="home">
    <header_component />
    <v-content>
      <v-container fluid fill-height px-6 py-3>
        <v-layout row style="height:100%;align-self: start;align-items:flex-start;justify-content: center;"> <list_menu /> <nuxt /> </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import header from '~/components/header/header.vue'
import list_menu from '~/components/home/list_menu.vue'

export default {
  components: {
    header_component: header,
    list_menu: list_menu
  },
  data() {
    return {
      menuBoard: false,
      menuUser: false,
      items: [
        { heading: 'Главная страница' },
        { icon: 'dashboard', text: 'Доски', to: '/boards' },
        { icon: 'home', text: 'Главная страница', to: '/' },
        { divider: true },
        { heading: 'Создать' }
        // { icon: 'add', text: 'Создать доску' },
      ]
    }
  }
}
</script>

<style scoped>
#home {
  height: 100%;
}

main {
  height: 100%;
}
</style>
