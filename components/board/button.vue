<template>
  <div>
    <v-btn small block color="grey lighten-1" v-if="button == false" @click="button = !button" style="width:100%;border-radius: 5px;">Добавить карточку</v-btn>
    <v-flex v-if="button == true">
      <v-textarea style="border-radius: 5px" hint solo v-model="nameCard" rows="2" label="Ведите название карточки" hide-details no-resize></v-textarea>
      <v-list-tile>
        <v-btn
          block
          small
          color="grey lighten-1"
          @click="createCard()"
          style="width:100%;border-radius: 5px;"
          >Добавить карточку</v-btn
        >
        <v-btn icon flat small @click="button = !button"
          ><v-icon>{{ 'close' }}</v-icon></v-btn
        >
      </v-list-tile>
    </v-flex>
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
  methods: {
    createCard: function() {
      const board_id = this.$router.currentRoute.params.id
      const list_id = this.id
      this.button = !this.button
      this.$store.dispatch('CREATED_CARD', { name: this.nameCard, board_id, list_id })
      this.nameCard = null
    }
  }
}
</script>
