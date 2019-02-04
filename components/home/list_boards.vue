<template>
  <v-list dense style="background-color: #f8f9f9; overflow-y: auto;padding-top: 40px;padding-left: 40px;width: 100%;height: 100%;">
    <v-layout column v-for="(item, index) in menu" :key="index" style="padding: 0 0 20px;">
      <v-layout row>
        <v-icon>{{ item.icon }}</v-icon>
        <v-subheader>{{ item.name }}</v-subheader>
      </v-layout>
      <v-layout wrap row style="max-width: 1250px;">
        <v-flex v-for="(child, i) in item.child" :key="i" d-flex xs12 sm6 md4 lg3>
          <v-card
            :to="`/boards/${child._id}`"
            color="blue-grey darken-2"
            class="white--text"
            style="cursor: pointer;margin-right: 4%;margin: 0 4% 8px 0;height: 100px;"
            :class="child.background ? 'background' + child.background : ''"
          >
            <v-card-title primary class="title">
              {{ child.name }}
              <v-spacer></v-spacer>
              <v-icon style="cursor: pointer;" class="white--text" @click.stop="delBoard(child)">{{ 'delete' }}</v-icon>
            </v-card-title>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-icon style="cursor: pointer;" :class="child.favourites ? 'yellow--text' : 'white--text'" @click.stop="child.favourites = !child.favourites">star_border</v-icon>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-list>
</template>

<script>
export default {
  computed: {
    menu() {
      return [
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
