import axios from "axios"
import {setItem} from '@/helpers/persistanceStorage'

export default {
  state:{},
  getters: {},
  actions: {
    async PROVIDER_SIGNUP({commit}, data){
      await axios({
         method: 'post',
         url: '/provider/signup',
         data: data
      })
      .then(()=>{
        commit('SET_SHOW_SIGNUP_FORM', false)
        commit('SET_SHOW_CONFIRM_EMAIL', true)
        commit('SET_FORM_DATA', data)
      })
      .catch((err)=>{
        commit('SET_VALIDATION_ERR', err.response.data.detail)
        throw err
      })
    },

    async PROVIDER_SIGNIN({commit}, data){
      return new Promise(resolve => { 
        axios({
          method: 'post', 
          url: '/provider/signin',
          data: data
       })
       .then((response) => {
         this.commit('SET_TOKEN', response.data.access_token)
         setItem('accessToken', response.data.access_token)
         setItem('refreshToken', response.data.refresh_token)
        //  this.dispatch('ATTEMPT', response.data.access_token )
         commit('SET_REFRESH_TOKEN', response.data.refresh_token )
         resolve(response.data.access_token)
       })
       .catch((result) => {
         console.log('result errors', result)
         commit('LOGIN_FILED', result.response.data.detail)
         commit('SET_VALIDATION_ERR', result.response.data.detail)
       })
      })  
    },
  },
  mutations: {} 
}