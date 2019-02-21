<template>
  <list_notifications />
</template>

<script>
import list_notifications from '~/components/home/list_notifications.vue'

export default {
  layout: 'home',
  components: {
    list_notifications: list_notifications
  },
}
</script>

<style scoped></style>
