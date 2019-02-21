<template>
  <list_boards />
</template>

<script>
import list_boards from '~/components/home/list_boards.vue'

export default {
  layout: 'home',
  components: {
    list_boards: list_boards
  },
  async fetch ({ store }) {
    await store.dispatch('GET_BOARDS')
  },
}
</script>

<style scoped></style>
