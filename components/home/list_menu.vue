<template>
  <v-list dense style="background-color: #f8f9f9;padding-top: 40px;width: 210px;" class="hidden-sm-and-down">
    <template v-for="(item, i) in items">
      <v-layout row v-if="item.heading" align-center :key="i">
        <v-flex>
          <v-subheader v-if="item.heading"> {{ item.heading }} </v-subheader>
        </v-flex>
      </v-layout>
      <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
      <v-list-tile v-else :key="i" :to="item.to">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
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
