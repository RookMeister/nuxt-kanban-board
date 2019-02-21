<template>
  <lists />
</template>

<script>
import lists from '~/components/board/lists.vue'

export default {
  components: {
    lists,
  },
  async fetch ({ store, params }) {
    await store.dispatch('GET_CARDS', params.id)
    await store.dispatch('GET_LISTS', params.id)
  },
  created() {

  }
}
</script>

<style></style>
