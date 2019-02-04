<template>
  <v-list dense style="background-color: #f8f9f9; overflow-y: auto;margin-top: 40px;padding-left: 40px;width: 100%; height: 100%;">
    <v-layout column v-for="(item, index) in menu" :key="index" style="padding: 0 0 20px;">
      <v-layout row>
        <v-icon>{{ item.icon }}</v-icon>
        <v-subheader>{{ item.name }}</v-subheader>
      </v-layout>
      <v-layout wrap row style="max-width: 1250px;">
        <v-flex v-for="(child, i) in item.child" :key="i" d-flex xs12 sm6 md4 lg3>
          <v-card to="/" color="blue-grey darken-2" class="white--text uuu" style="margin-right: 4%;margin: 0 4% 8px 0;height: 100px" @click="board(child)">
            <v-card-title primary class="title">{{ child.name }}</v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: 'Требует внимания',
          icon: 'check',
          child: null
        }
      ]
    }
  }
}
</script>
