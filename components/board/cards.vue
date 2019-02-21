<template>
  <div class="list-cards">
    <draggable v-model="cards" :options="{ draggable: '.list-card', group: 'card' }" style="min-height:2px;height:100%;">
      <div class="list-card" v-for="(card, i) in cards" :key="i">
        <v-textarea class="pa-0" full-width hide-details auto-grow rows="1" row-height="5" v-model="card.name" style="font-size: 20px;line-height: 24px;"></v-textarea>
        <v-spacer></v-spacer>
        <v-btn icon flat small><v-icon>{{ 'delete' }}</v-icon></v-btn>
      </div>
    </draggable>
  </div>
</template>

<script>

export default {
  props:['id'],
  data() {
    return {
      nameCard: null,
      button: false
    }
  },
  computed: {
    cards: {
      get() {
        return this.$store.getters.cards(this.id)
      }
    }
  }
}
</script>

<style scoped>
.list-card {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  border-radius: 5px;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.list-cards {
  white-space: normal;
  flex: 1 1 auto;
  margin-bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
}
</style>
