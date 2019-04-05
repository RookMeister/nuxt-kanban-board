<template>
  <div class="list-cards">
    <draggable v-model="cards" :options="{ draggable: '.list-card', group: 'card' }" style="min-height:2px;height:100%;">
      <div class="list-card" v-for="(card, i) in cards" :key="i">
        <v-textarea class="pa-0" full-width hide-details auto-grow rows="1" row-height="5" v-model="card.name" style="font-size: 20px;line-height: 24px;" @change="updateCard(card)"></v-textarea>
        <v-spacer></v-spacer>
        <v-btn icon flat small @click="deleteCard(card)"><v-icon>{{ 'delete' }}</v-icon></v-btn>
      </div>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

export default {
  props:['id'],
  components: {
    draggable,
  },
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
      },
      set(value) {
        this.$store.dispatch('DAD_CARD', { cards: value, id: this.id })
      },
    }
  },
  methods: {
    updateCard: function(card) {
      this.$store.dispatch('UPDATE_CARD', card)
    },
    deleteCard: function(card) {
      const board_id = this.$router.currentRoute.params.id
      this.$store.dispatch('DELETE_CARD', card)
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
