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
        <v-list-tile v-for="(child, i) in item.child" :key="i" :to="`/boards/${child._id}`">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ child.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon style="cursor: pointer;" :class="child.favourites ? 'yellow--text' : null" @click.prevent="child.favourites = !child.favourites">star_border</v-icon>
          </v-list-tile-action>
        </v-list-tile>
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
  export default {
    data() {
      return {
        fav: false
      }
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
            child: this.$store.getters.boards
          },
          {
            name: 'Персональные доски',
            icon: 'dashboard',
            child: this.$store.state.boards
          }
        ]
      }
    }
  }

</script>
