import axios from "@/api/axios"
import router from "@/router"
export default {
  state:{
    passwords:{
      password_1: '',
      isValidPassword_1:'',
      password_2: '',
      isValidPassword_2:'',
      sendSecondEmail: false,
    }
   
  },
  getters: { 
    PASSWORDS(state){
      return state.passwords
    },
    SEND_SECOND_EMAIL(state){
      return state.passwords.sendSecondEmail
    }
  },
  actions: {
    async RESET_PASSWORD(_, email){
      const site_role = localStorage.getItem('site_role')
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/${site_role}/reset-password/send-code/${email}`
        }).then(() => {
            this.commit('SET_SEND_SECOND_EMAIL', false)
            this.commit('SET_SHOW_CHANGE_PASSWORD', false)
            this.commit('SET_SHOW_CONFIRM_EMAIL', true)
            this.commit('SET_SHOW_CHECK_EMAIL', true)
            resolve()
        }).catch(err => {
          this.commit('SET_VALIDATION_ERR', err.response.data.detail)
          reject()
        })
      })
    },
 
    async CREATE_NEW_PASSWORD({ commit }, data) {
      const site_role = router.currentRoute.value.query.site_role
      return axios({ 
        method: 'post',
        url: `/${site_role}/reset-password`,
        data: data
      }).catch(err => {
          console.log(err)
          commit('SET_VALIDATION_ERR', err.response.data.detail)
          throw err
        })
    }
  },

  mutations: {
    SET_PASSWORDS(state,data){ 
      let text = data.input.previousSibling.textContent
      if(text === 'Пароль'){
        state.passwords.password_1 = data.value
        state.passwords.isValidPassword_1 = data.isValid
      } else {
        state.passwords.password_2 = data.value
        state.passwords.isValidPassword_2 = data.isValid
      }     
    },
    SET_SEND_SECOND_EMAIL(state, status){
      state.passwords.sendSecondEmail = status
    }
  }
}