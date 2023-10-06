import axios from "@/api/axios.js"
export default {
  state:{
    filter_services: [], // page provider search
    filter_country: [],  // page provider search
    filter_feedbacks_country: '', 
    filter_feedbacks_city: '', 
  },

  getters: {
  
   FILTER_SERVICES(state){ 
    return state.filter_services
   },
   FILTER_COUNTRY(state){
    return state.filter_country
   },
   FILTER_FEEDBACK_COUNTRY(state){
    return state.filter_feedbacks_country
   },
   FILTER_FEEDBACK_CITY(state){ 
    return state.filter_feedbacks_city
   },
 
  },  

  actions: {
   async GET_ORDERS_FOR_PROVIDER(_, {status, page_size, page}){
     return new Promise((resolve) => {
       axios({
        method: 'get',
        url: `/provider-orders/${status}`,
        params: {page_size, page}
       })
       .then(res => {
        resolve(res.data.sort((a,b) => { return b.offer_id - a.offer_id }))
       })
       .catch(err => console.log('Oшибка загрузки заявок исполнителя', err))
     })
   }
  },

  mutations: {
    SET_FILTER_SERVICES(state, services){
       state.filter_services =  services
    }, 

    SET_FILTER_COUNTRY(state, countries){
      state.filter_country =  countries
    },

    SET_FEEDBACK_FILTER(state, payload){
    if(payload.id === 'searchByCity') state.filter_feedbacks_city = payload.value
     else  state.filter_feedbacks_country =  payload.value
    }

  },

 
}