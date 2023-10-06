
export default {
  state:{
    customer_order:{},
    customer_data:{},
    customer_firm:{},
    provider_data:{},
    show_pdf_viewer: false
  },
 
  getters: {
    SHOW_PDF_VIEWER(state) {
      return state.show_pdf_viewer 
    },
   
    CUSTOMER_ORDER(state){
      return state.customer_order
    },

    CUSTOMER_DATA(state){
      return state.customer_data
    },
    CUSTOMER_FIRM(state){ 
      return state.customer_firm
    },
  },

  mutations: {
   
    SET_CUSTOMER_ORDER(state, order){
      if(order.offer){
        state.customer_order = order.order
        state.customer_data = order.customer
        state.customer_firm = order.customer_firm
        state.provider_data = order.provider,
        this.commit('SET_PROVIDER_OFFER', order.offer)
      } else if (order.chat) {
        this.commit('SET_CHAT_ID', order.chat.chat_id) 
      } else {
        state.customer_order =  order.order
        state.customer_data = order.customer
      }
      this.commit('SET_SELECTED_ORDER', order)
    },

    SET_SHOW_PDF_VIEWER(state, status) {
      state.show_pdf_viewer = status
    }

  }
}