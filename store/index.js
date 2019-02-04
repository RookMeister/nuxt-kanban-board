import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    boards: null,
    cards: null,
    lists: null,
    loading: false,
    drawer: false
  },

  getters: {
    boards: state => {
      if (state.boards) return state.boards.filter(board => board.favourites === true)
    },
    cards: state => id => {
      if (state.cards) return state.cards.filter(card => card.list_id === id)
    }
  },

  actions: {
    async nuxtServerInit ({ dispatch } , { context }) {
      const user_id = this.$auth.user ? this.$auth.user.id : null
      if (user_id) await dispatch('GET_BOARDS', user_id)
    },
    async GET_BOARDS({ commit }) {
      const user_id = this.$auth.user.id//params
      const { data } = await this.$axios({ url: 'http://localhost:3001/api/board', method: 'GET', params: { user_id } })
      commit('SET_BOARDS', data)
    },
    async GET_LISTS({ commit }, params) {
      const user_id = this.$auth.user.id
      const board_id = params
      const { data } = await this.$axios({ url: 'http://localhost:3001/api/list', method: 'GET', params: { user_id, board_id} })
      commit('SET_LISTS', data)
    },
    async GET_CARDS({ commit }, params) {
      const user_id = this.$auth.user.id
      const board_id = params
      const { data } = await this.$axios({ url: 'http://localhost:3001/api/card', method: 'GET', params: { user_id, board_id} })
      commit('SET_CARDS', data)
    },
    async CREATED_LIST({ commit }, params) {
      const user_id = this.$auth.user.id
      const board_id = params.board_id
      const { data } = await this.$axios({ url: 'http://localhost:3001/api/list', method: 'POST', params: { user_id, board_id}, data: { name: data.name } })
    },
    async CREATED_CARD({ commit }, params) {
      const user_id = this.$auth.user.id
      const board_id = this.$router.currentRoute.params.id
      const { data } = await this.$axios({ url: 'http://localhost:3001/api/list', method: 'POST', data: {name, board_id} })
    },
    // CREATE_BOARD(context, state) {

    // },
    // DELETE_BOARD(context, state) {

    // },
    // FAVOURITES_BOARD(context, state) {

    // }
    // CREATED_LIST(context, state) {

    // },
    // },

    // DELETE_LIST(context, state) {

    // },
    // DELETE_CARD(context, state) {

    // },
    // UPDATE_LIST(context, state) {

    // },
    // UPDATE_CARD(context, state) {

    // },
    // DRAG_AND_DROP_LIST(context, state) {

    // },
    // DRAG_AND_DROP_CARD(context, state) {
    // }
  },

  mutations: {
    SET_BOARDS(state, payload) {
      state.boards = payload
    },
    SET_LISTS(state, payload) {
      state.lists = payload
    },
    SET_CARDS(state, payload) {
      state.cards = payload
    },
    LOADING(state, payload) {
      state.loading = payload
    },
    DRAWER(state, payload) {
      state.drawer = payload
    }
  }
})


export default store