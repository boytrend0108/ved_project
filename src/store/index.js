import { createStore } from 'vuex'
import axios from '@/api/axios' 
import auth from './modules/auth'
import form from './modules/form'
import newApplication from './modules/newApplication'
import resetPassword from './modules/resetPassword'
import customerPage from '@/store/modules/customerPage'
import contractsAndPayments from './modules/contractsAndPayments'
import userProfile from '@/store/modules/userProfile'
import specSeachPage from '@/store/modules/Provider/specSeachPage'
import applicationPageSpec from '@/store/modules/Provider/applicationPageSpec'
import authProvider from '@/store/modules/Provider/authProvider'
import firm from './modules/firm'
import customerOrders from './modules/customerOrders'
import chat from  "./modules/chat"
import search_product from './modules/search_product'
import offers from './modules/Provider/offers'
import costCalculation from './modules/costCalculation'
import userInfo from './modules/userInfo'
import centrifugoSocket from './modules/centrifugoSocket'


export default createStore({
  state: {
    showDialog:false,
    showPreloader: false,
    input:'',
    btnId:'',
    showHeaderDropDown: false,
    innerWidth: window.innerWidth,
    inputValidationErr: false // флаг для ошибки при валидации
  },

  getters: {

    SHOW_PRELOADER(state) {
      return state.showPreloader
    },

   INPUT_VALIDATION_ERR(state) {
    return state.inputValidationErr
   },

    INNER_WIDTH(state) {
      return state.innerWidth
    },
    
    SHOW_HEADER_DROPDOWN(state){
     return state.showHeaderDropDown
    },

    DIALOG(state){
      return state.showDialog
    },
    INPUT(state){ 
      return state.input
    },
    BTN_ID(state){ 
      return state.btnId
    }
  },

  actions: {
    async SUBSCRIBE_TO_NEWS(_, email) {
    await axios({
      method: 'get',
      url: `/subscribe-to-newsletter/${email}`,
    })
      .catch(err => console.log('Ошибка при подписке на новости', err))
    },

    async UNSUBSCRIBE(_, email) {
      try {
        const res = await axios({
          method: 'get', 
          url: `/unsubscribe-from-newsletter/${email}`
        });

        return res.data;
      } catch(err) {
        console.log(err)
        throw new Error(err.response.data)
      }
    },

    async SEND_TARGET_DATA(_, info) { 
      await axios({
        method: "post",
        url: "/target",
        data: info
      })
        .catch(err => console.log("Ошибка при отправке таргета", err))
    }
  },

  mutations: {
     SET_SHOW_PRELOADER(state, status) {
      state.showPreloader = status
     }, 

    SET_CLICK(state, status){
      state.click = status
    }, 

    SHOW_DIALOG(state, btnId){ 
      state.btnId = ''
      this.commit('SET_VALIDATION_ERR', 'clear')
      if(btnId){
          state.btnId = btnId
          state.showDialog = !state.showDialog
        } else {
          state.showDialog = !state.showDialog 
        }
           
    },  

    SAVE_INPUT_VALUE(state, value) {
      state.input = value;
      this.commit("SET_INPUT_DRAFT", value?.trim())
    },
    
    SET_SHOW_HEADER_DROPDOWN(state, status) {
      state.showHeaderDropDown = status;
    }, 

    SET_INPUT_VALIDATION_ERR(state, status) {
      state.inputValidationErr = status;
      setTimeout(() => state.inputValidationErr = false, 3000 )
    }

  },

  modules: {
    auth, 
    form, 
    newApplication,
    contractsAndPayments,
    resetPassword,
    customerPage,
    userProfile,
    specSeachPage,
    applicationPageSpec,
    authProvider,
    firm,
    customerOrders,
    chat,
    search_product,
    offers,
    costCalculation,
    userInfo,
    centrifugoSocket,
  
  }
})
