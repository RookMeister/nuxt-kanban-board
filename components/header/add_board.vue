<template>
  <v-dialog v-model="button" width="800px">
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">Создание новой доски</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs12 align-center justify-space-between>
            <v-layout align-center> <v-text-field placeholder="Название доски" type="text" v-model="boardName" required></v-text-field> </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat @click="createdBoard()">Сохранить</v-btn>
        <v-btn flat color="primary" @click="$emit('close')">Отменить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['button'],
  data() {
    return {
      boardName: null
    }
  },
  methods: {
    async createdBoard() {
      try {
        const user_id = this.$store.state.auth.user._id
        await this.$axios({ url: 'boards', method: 'POST', data: { name: this.boardName }, params: { user_id: user_id } })
        this.$toast.success('Доска создана')
        this.$emit('close')
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    }
  }
}
</script>
