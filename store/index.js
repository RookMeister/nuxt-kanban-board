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
    //////Методы BOARDS/////////
    async nuxtServerInit ({ dispatch } , { context }) {
      const user_id = this.$auth.user ? this.$auth.user.id : null
      if (user_id) await dispatch('GET_BOARDS', user_id)
    },
    async GET_BOARDS({ commit }) {
      try {
        const user_id = this.$auth.user.id
        const { data } = await this.$axios({
          url: 'board',
          method: 'GET',
          params: { user_id }
        })
        commit('SET_BOARDS', data)
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    async CREATED_BOARD({ dispatch, state }, name) {
      try {
        const user_id = this.$auth.user.id
        state.boards.push({ name, user_id })
        await this.$axios({
          url: 'board',
          method: 'POST',
          data: { name },
          params: { user_id: user_id }
        })
        this.$toast.success('Доска создана', {icon: 'done'})
        dispatch('GET_BOARDS')
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    async DELETE_BOARD({ state }, board) {
      try {
        const user_id = this.$auth.user.id
        const board_id = board._id
        const index = state.boards.indexOf(board)
        state.boards.splice(index, 1)
        await this.$axios({ //Удаление из базы
          url: 'board',
          method: 'delete',
          params: { user_id, board_id }
        })
        this.$toast.success('Доска удалена', {icon: 'done'})
      } catch (e) {
        this.$toast.error('Error', {icon: 'error'})
      }
    },
    async FAVOURITES_BOARD({ state }, board) {
      try {
        const user_id = this.$auth.user.id
        await this.$axios({
          url: 'board',
          method: 'put',
          data: board,
          params: { user_id }
        })
      } catch (e) {
        this.$toast.error('Error', {icon: 'error'})
      }
    },
    //////Методы LISTS/////////
    async GET_LISTS({ commit }, board_id) {
      try {
        const user_id = this.$auth.user.id
        const { data } = await this.$axios({
          url: 'http://localhost:3001/api/list',
          method: 'GET',
          params: { user_id, board_id}
        })
        commit('SET_LISTS', data)
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    async CREATED_LIST({ dispatch, state }, params) {
      try {
        const user_id = this.$auth.user.id
        const board_id = params.board_id
        const name = params.name
        state.lists.push({ name , board_id, user_id })
        await this.$axios({
          url: 'http://localhost:3001/api/list',
          method: 'POST',
          params: { user_id, board_id},
          data: { name }
        })
        dispatch('GET_LISTS', board_id)
        this.$toast.success('Список создан', { icon: 'done' })
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    async DELETE_LIST({ state }, list) {
      try {
        const user_id = this.$auth.user.id
        const board_id = list.board_id
        const list_id = list._id
        const index = state.lists.indexOf(list)
        state.lists.splice(index, 1)
        await this.$axios({ //Удаление из базы
          url: 'list',
          method: 'delete',
          params: { user_id, board_id, list_id }
        })
        this.$toast.success('Список удалена', {icon: 'done'})
      } catch (e) {
        this.$toast.error('Error', {icon: 'error'})
      }
    },
    async UPDATE_LIST({ state }, list) {
      try {
        const user_id = this.$auth.user.id
        const board_id = list.board_id
        const list_id = list._id
        await this.$axios({
          url: 'list',
          method: 'put',
          data: list,
          params: { user_id, board_id, list_id }
        })
        this.$toast.success('Список изменена', {icon: 'done'})
      } catch (e) {
        this.$toast.error('Error', {icon: 'error'})
      }
    },
    //////Методы CARDS/////////
    async GET_CARDS({ commit }, board_id) {
      try {
        const user_id = this.$auth.user.id
        const { data } = await this.$axios({
          url: 'http://localhost:3001/api/card',
          method: 'GET',
          params: { user_id, board_id}
        })
        commit('SET_CARDS', data)
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    async CREATED_CARD({ dispatch, state }, params) {
      try {
        const user_id = this.$auth.user.id
        const board_id = params.board_id
        const list_id = params.list_id
        const name = params.name
        state.cards.push({ name, list_id, board_id, user_id })
        await this.$axios({
          url: 'card',
          method: 'POST',
          params: { user_id, board_id, list_id},
          data: { name }
        })
        dispatch('GET_CARDS', board_id)
        this.$toast.success('Карточка создана', {icon: 'done'})
      } catch (e) {
        this.$toast.error('Error', { icon: 'error' })
      }
    },
    async DELETE_CARD({ state }, card) {
      try {
        const user_id = this.$auth.user.id
        const board_id = card.board_id
        const list_id = card.list_id
        const card_id = card._id
        const index = state.cards.indexOf(card)
        state.cards.splice(index, 1)
        await this.$axios({ //Удаление из базы
          url: 'card',
          method: 'delete',
          params: { user_id, board_id, list_id, card_id }
        })
        this.$toast.success('Карточка удалена', {icon: 'done'})
      } catch (e) {
        this.$toast.error('Error', {icon: 'error'})
      }
    },
    async UPDATE_CARD({ state }, card) {
      try {
        const user_id = this.$auth.user.id
        const board_id = card.board_id
        const list_id = card.list_id
        const card_id = card._id
        await this.$axios({
          url: 'card',
          method: 'put',
          data: card,
          params: { user_id, board_id, list_id, card_id }
        })
        this.$toast.success('Карточка изменена', {icon: 'done'})
      } catch (e) {
        this.$toast.error('Error', {icon: 'error'})
      }
    },

    // UPDATE_LIST(context, state) {

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
    // UPDATE_POS_BOARD(state) {

    // },
    LOADING(state, payload) {
      state.loading = payload
    },
    DRAWER(state, payload) {
      state.drawer = payload
    }
  }
})


export default store