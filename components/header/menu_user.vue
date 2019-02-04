<template>
  <v-card v-if="$auth.$state.loggedIn">
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar> <v-img :src="pic" /> </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ $auth.user.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ $auth.user.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" @click.native="logout()">Выйти</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['pic'],
  data() {
    return {
      fav: true,
      hints: true,
      messages: false
    }
  },
  methods: {
    logout() {
      this.$toast.show('Logging out...', { icon: 'fingerprint' })
      this.$auth.logout()
    }
  }
}
</script>
