
export default {
  state:{
    userInfo: null,
    phone_number: null,
    email: null ,
  },

  getters: {
    USER_INFO(state) {
      return state.userInfo
    }
  },

  actions: {
    async GET_USER_IP({commit, dispatch, state}) {
       await fetch("https://api.db-ip.com/v2/free/self")
         .then(res => {
          let userInfo =  res.json()
          userInfo.then(info => commit("SET_USER_INFO", info)) 
           .then(() => dispatch("SEND_TARGET_DATA", state.userInfo ))
         })
           .catch(err => console.log("Ошибка при получинии ip пользователя", err))
    }
  },

  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      state.userInfo.last_visit = (new Date()).toJSON().split("T")[0]
      state.userInfo.user_id = this.getters.CURRENT_USER ? this.getters.CURRENT_USER.uid : "no"
      state.userInfo.phone_number = this.getters.USER_DATA ? this.getters.USER_DATA.phone_number : "no"
      state.userInfo.email = this.getters.USER_DATA ? this.getters.USER_DATA.email : "no"
    }
  }
}