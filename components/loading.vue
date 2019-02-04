<template>
  <v-dialog v-if="loading" persistent max-width="290">
    <v-card color="primary" dark>
      <v-card-text>
        Подождите
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // data: () => ({
  //   loading: false
  // }),
  computed: {
    loading() {
       return this.$store.state.loading
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
