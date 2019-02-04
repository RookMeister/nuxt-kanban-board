<template>
<div>
  <v-toolbar color="blue darken-3" dark app dense>
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-btn to="/" flat icon small color="blue darken-2"><v-icon dark class="white--text">home</v-icon></v-btn>
    <!--
      v-menu v-model="menuBoard" :close-on-content-click="false" offset-x>
        <menu_boards />
        <v-btn small color="blue darken-2" slot="activator"> <v-icon dark>dashboard</v-icon> </v-btn>
      </v-menu
    -->
    <v-btn small icon flat color="blue darken-2"><v-icon dark class="white--text">search</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="ma-0">
      <v-layout column> <span>Trello</span> </v-layout>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat icon small color="blue darken-2" @click="button = !button"><v-icon dark class="white--text">add</v-icon></v-btn>
    <v-btn flat icon small color="blue darken-2"><v-icon dark class="white--text">notifications</v-icon></v-btn>
    <v-menu v-model="menuUser" :close-on-content-click="false" offset-x>
      <menu_user :pic="picture" />
      <v-avatar slot="activator" style="margin: 6px;" size="40"><v-img :src="picture"/></v-avatar>
    </v-menu>
    <add_board @close="close" :button="button" />
  </v-toolbar>
  <v-navigation-drawer v-model="drawer" absolute temporary> <menu_boards /> </v-navigation-drawer>
</div>
</template>

<script>
import menu_boards from './menu_boards.vue'
import menu_user from './menu_user.vue'
import add_board from './add_board.vue'

export default {
  computed: {
    picture() {
      if (this.$auth.user.picture) return this.$auth.user.picture
      else return 'https://m.footboom.com/img/new-images/def-face.jpg'
    },
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(value) {
        return this.$store.commit('DRAWER', value)
      }
    }
  },
  components: {
    menu_boards: menu_boards,
    menu_user: menu_user,
    add_board: add_board
  },
  data() {
    return {
      button: false,
      menuBoard: false,
      menuUser: false
    }
  },
  methods: {
    close() {
      this.button = !this.button
    }
  }
}
</script>
