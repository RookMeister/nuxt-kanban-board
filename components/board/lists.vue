<template>
  <draggable class="board" v-if="lists" v-model="lists" :options="{ draggable: '.list', chosenClass: 'chosen' }" style="height: 100%;">
    <div class="list-board list" v-for="(list, i) in lists" :key="i">
      <div class="list-content">
        <div class="list-header">
          <v-textarea full-width hide-details auto-grow rows="1" row-height="5" v-model="list.name" style="font-size: 20px;line-height: 20px;" @blur="updateList(list)"></v-textarea>
          <v-spacer></v-spacer>
          <v-btn icon flat small @click="deleteList(list)">
            <v-icon>{{ 'delete' }}</v-icon>
          </v-btn>
        </div>
        <cards :id="list._id"/>
        <div class="list-footer"><buttonCard :id="list._id"/></div>
      </div>
    </div>
    <div class="list-board">
      <v-btn small block color="grey lighten-1 my-0" v-if="button == false" @click="button = !button" style="width:100%;border-radius: 5px;">Добавить список</v-btn>
      <div v-if="button == true">
        <v-textarea hint solo v-model="nameList" rows="2" label="Ведите название списка" hide-details no-resize></v-textarea>
        <v-list-tile>
          <v-btn block small color="grey lighten-1" @click="createList()" style="width:100%">Добавить список</v-btn>
          <v-btn icon flat small @click="button = !button">
            <v-icon>{{ 'close' }}</v-icon>
          </v-btn>
        </v-list-tile>
      </div>
    </div>
  </draggable>
</template>

<script>
import cards from './cards.vue'
import button from './button.vue'

export default {
  components: {
    cards: cards,
    buttonCard: button
  },
  data() {
    return {
      nameList: null,
      button: false
    }
  },
  computed: {
    lists: {
      get() {
        return this.$store.state.lists
      }
      // set(value) {
      //   this.$store.dispatch('DragAndDropLists', {context: this, list: value})
      // },
    }
  },
  methods: {
    createList: function() {
      const board_id = this.$router.currentRoute.params.id
      // this.lists.push({ name: this.nameList })
      this.button = !this.button
      this.$store.dispatch('CREATED_LIST', { name: this.nameList, board_id })
      this.nameList = null
    },
    // deleteList: function() {
    //   const board_id = this.$router.currentRoute.params.id
    //   // this.lists.push({ name: this.nameList })
    //   this.$store.dispatch('CREATED_LIST', { name: this.nameList, board_id })
    // }
  }
}
</script>

<style>
.row_flex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
}
.addList {
  min-width: 272px;
  vertical-align: top;
}
.board {
  user-select: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}

.list-board {
  height: 100%;
  width: 272px;
  margin: 0 4px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
}

.list-content {
  background-color: #dfe3e6;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
}

.list-header {
  flex: 0 0 auto;
  padding: 10px 8px 8px;
  position: relative;
  min-height: 20px;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.list-footer {
  border-radius: 0 0 3px 3px;
  color: #6b808c;
  display: block;
  flex: 0 0 auto;
  padding: 0 4px 4px 4px;
  margin: 0 4px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
