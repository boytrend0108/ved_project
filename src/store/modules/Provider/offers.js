import axios  from "@/api/axios" 
import router from "@/router"

export default {
  state:{
    provider_offer:{},
    provider_offers:[], // отклики от всех исполнителей
    specific_offer:'', // отклик от иполнителя
    my_offers:[], // заявки на которые откликнулся исполнитель. 
    offer_price: '',
    offer_msg: '',
    is_offer_sended: false,
    new_offer_in_progress: [], // новые заявки в статусе in_progress у заказчика
    is_provider_selected: [],
    orderConfirmed: [], // {close_order: {order_id: number}} 
  },

  getters: {
    ORDER_CONFIRMED(state) {
      return state.orderConfirmed;
    }, 

    IS_PROVIDER_SELECTED(state) { 
      return state.is_provider_selected 
    },

    NEW_OFFER_IN_PROGRESS(state) {
      return state.new_offer_in_progress
    },

    OFFER_PRICE(state){
      return state.offer_price
    },
    OFFER_MSG(state){
      return state.offer_msg
    },
    IS_OFFER_SENDED(state) {
      return state.is_offer_sended
    },
    MY_OFFERS(state){
      return state.my_offers
    },
    PROVIDER_OFFERS(state){
      return state.provider_offers  
    },
    SPECIFIC_OFFER(state){
      return state.specific_offer
    }, 
  },

  actions: {
    async SEND_OFFER({commit}, payload) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url: `/offer/send/${payload.orderId}`,
          data: payload.formData,
        }).then(res => {
          resolve(res)
        })
          .catch(err => {
            commit('SET_VALIDATION_ERR', err.response.data.detail)
            reject()
          })
      })
    },

    async GET_PROVIDER_OFFERS({commit}, order_id){ //получить все отклики по заявке
      return new Promise((resolve)=>{
        axios({
          method: 'get',
          url: `/order/${order_id}/offers`,
        }).then(res => {
           commit('SET_PROVIDER_OFFERS', res.data)
           resolve(res.data)
        }).catch(err => console.log(err))
      })
    },

    async GET_MY_OFFERS(_, {status, page_size, page}){
      return new Promise((resolve)=>{
          axios({
          method: 'get',
          url: '/offers',  
          params: {status, page_size, page },  
        }).then((res)=>{
            resolve(res.data) 
          })
          .catch((err)=>{console.log('Ошибка загрузки откликов исполнителя', err)})
      })
     },

     async GET_SPECIFIC_OFFER({commit}, {order_id, user_id}) {
      return new Promise(resolve => {  
        axios({
          method: 'get',
          url: `/order/${order_id}/offer/user/${user_id}`
        })
          .then(res => {
            commit("SET_SPECIFIC_OFFER", res.data)
            resolve(res.data)
          })
          .catch(err => console.log("Ошибка загрузки оффера по заявке", err))
      })
     },

     async COMPLETE_ORDER(_, order_id) {
       return new Promise((resolve, reject) => {
         axios({
          method: "put",
          url: `/order/${order_id}/confirm`
         })
         .then(() => {
          resolve()
         })
         .catch(() => {
           console.log("Ошибка при завершении заявки")
           reject("Ошибка при завершении заявки")
         })
       })
     }
  },
  
  mutations: {

    SET_ORDER_CONFIRMED(state, data) {
      state.orderConfirmed.push(data);
    },

    REMOVE_ORDER_CONFIRMED(state) {
      state.orderConfirmed = [];
    },

    SET_NEW_OFFER_IN_PROGRESS(state,{ data, action}) {
      debugger
      switch(action) {
        case "add": 
           state.new_offer_in_progress.push(data)
           localStorage.setItem("unwatched_offers", JSON.stringify(state.new_offer_in_progress))
           break
        case "delete": 
          state.new_offer_in_progress = state.new_offer_in_progress.filter(el => el !== +data)
          localStorage.setItem("unwatched_offers", JSON.stringify(state.new_offer_in_progress))
          break
        case "set": state.new_offer_in_progress = data
      
      }
    },
    SET_PROVIDER_OFFERS(state, offers){
      state.provider_offers = offers
    },

    SET_SPECIFIC_OFFER(state, offer){
      state.specific_offer = offer
    },
    
    SET_OFFER_PRICE(state, price) {
      state.offer_price =  price
    },

    SET_OFFER_MSG(state, msg) {
      state.offer_msg =  msg
    },

    SET_IS_OFFER_SENDED(state, status) {
      state.is_offer_sended = status
    },

    SET_LEAVE_SELECTED_OFFER(state, offer_id) {
      state.provider_offers = state.provider_offers.filter(el => el.id == offer_id)
    },

    SET_IS_PROVIDER_SELECTED(state, data) {
      state.is_provider_selected.push(data)
      if (router.currentRoute.value.name === "provider-application") {
        const id = router.currentRoute.value.params.id;
        const offer_id = router.currentRoute.value.query.offer_id
        router
         .push(`/provider/application/${id}?status=IN_PROGRESS&feedback=true&offer_id=${offer_id}`)
      }
      
    },

    REMOVE_EL_FROM_IS_PROVIDER_SELECTED(state, i) {
     state.is_provider_selected.splice(i, 1)
    }
  
  }
}