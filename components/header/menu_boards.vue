<template>
  <v-list dense>
    <template v-for="item in menu">
      <v-subheader v-if="item.subheader" :key="item.name" class="mt-3 grey--text text--darken-1">{{ item.nameheader }}</v-subheader>
      <v-list-group v-else-if="item.child" :key="item.name">
        <v-list-tile slot="activator" append>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> {{ item.name }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <draggable v-model="boardsFav" :options="{ draggable: '.boardsFav', chosenClass: 'chosen' }">
        <v-list-tile v-for="(child, i) in item.child" :key="i" :to="`/board/${child._id}`" :class="item.class">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ child.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon
                style="cursor: pointer;"
                :class="child.favourites ? 'yellow--text' : null"
                @click.stop.prevent="favourites(child)"
            >star_border</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        </draggable>
      </v-list-group>
      <v-list-tile v-else :key="item.name">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title> {{ item.name }} </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable,
    },
    computed: {
      menu() {
        return [{
            nameheader: 'Доски',
            subheader: 'true'
          },
          {
            name: 'Избранные',
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
      }
    },
    methods: {
      favourites: function (board) {
        board.favourites = !board.favourites
        this.$store.dispatch('UPDATE_BOARD', board)
      }
    }
  }

</script>
