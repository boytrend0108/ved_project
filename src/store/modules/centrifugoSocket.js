import axios from "@/api/axios.js"
export default {
  state:{
    centrifugoToken: '',
  },

  getters: {
    CENTRIFUGO_TOKEN(state) {
      return state.centrifugoToken
    }
  }, 

  actions: {
    async CONNECT_TO_CENTRIFUGO({commit}) { 
      return new Promise((resolve) => {
        axios({
          method: "get", 
          url: "/centrifugo/ws/access-token"
        })
        .then(res => {
          commit("SET_CENTRIFUGO_TOKEN", res.data)
          resolve(res.data)
        })
        .catch(err => {
          console.log("Ошибка получение токена к centrifugo")
          console.log(err)})
      })
      
    }
  },

  mutations: {
    SET_CENTRIFUGO_TOKEN(state, token) {
      state.centrifugoToken = token
    }
  }
}