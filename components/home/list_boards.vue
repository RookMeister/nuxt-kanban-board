<template>
  <v-list dense style="background-color: #f8f9f9; overflow-y: auto;padding-top: 40px;padding-left: 40px;width: 100%;height: 100%;">
    <v-layout column v-for="(item, index) in menu" :key="index" style="padding: 0 0 20px;">
      <v-layout row>
        <v-icon>{{ item.icon }}</v-icon>
        <v-subheader>{{ item.name }}</v-subheader>
      </v-layout>
      <v-layout wrap row style="max-width: 1250px;">
        <draggable class="layout wrap row" v-model="boardsFav" :options="{ draggable: '.boardsFav', chosenClass: 'chosen' }">
        <v-flex v-for="(child, i) in item.child" :key="i" d-flex xs12 sm6 md4 lg3 :class="item.class">
          <v-card :to="`/board/${child._id}`" color="blue-grey darken-2" class="white--text"
            style="cursor: pointer;margin-right: 4%;margin: 0 4% 8px 0;height: 100px;"
            :class="child.background ? 'background' + child.background : ''"
          >
            <v-card-title primary class="title">
              {{ child.name }}
              <v-spacer></v-spacer>
              <v-icon style="cursor: pointer;" class="white--text" @click.stop.prevent="del(child)">{{ 'delete' }}</v-icon>
            </v-card-title>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-icon
                  style="cursor: pointer;"
                  :class="child.favourites ? 'yellow--text' : 'white--text'"
                  @click.stop.prevent="favourites(child)"
              >star_border</v-icon>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-if="item.name == 'Персональные доски'" d-flex xs12 sm6 md4 lg3>
          <v-card @click="dialog = !dialog" color="blue-grey darken-2" class="white--text"
            style="cursor: pointer;margin-right: 4%;margin: 0 4% 8px 0;height: 100px;"
          >
            <v-card-title primary class="title">Создать новую доску</v-card-title>
          </v-card>
        </v-flex>
        </draggable>
      </v-layout>
    </v-layout>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  computed: {
    menu: {
      get() {
        return [
          {
            name: 'Избранные доски',
            icon: 'star_border',
            class: 'boardsFav',
            child: this.boardsFav
          },
          {
            name: 'Персональные доски',
            icon: 'dashboard',
            class: 'boards',
            child: this.boards
          }
        ]
      }
    },
    boardsFav: {
      get() {
        return this.$store.getters.boardsFav
      },
      set(value) {
        console.log(value)
        this.$store.dispatch('DAD_BOARD', value)
      }
    },
    boards: {
      get() {
        return this.$store.getters.boardsAll
      }
    },
    dialog: {
      get() {
        return this.$store.state.newBoard
      },
      set(value) {
        this.$store.dispatch('OPEN_DIALOG', value)
      }
    }
  },
  methods: {
    favourites: function (board) {
      board.favourites = !board.favourites
      this.$store.dispatch('UPDATE_BOARD', board)
    },
    del: function (board) {
      this.$store.dispatch('DELETE_BOARD', board)
    }
  }
}
</script>
