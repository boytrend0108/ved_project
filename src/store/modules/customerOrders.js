import axios from "@/api/axios.js"
import { enumServices2, enumDeliveryType2 } from "@/helpers/enumTransformation"
// import { connectToCentrifuge } from "@/helpers/centrifugo"
import router from "@/router"
 
export default { 
  state: {
    customerOrders: [],
    all_published_orders: [], // опубликованные ордера от всех заказчиков
    page: 0, // cтраница которую будем подгружать
    filterStatus: {}, // состояние фильтра Статус на странице Мои заявки
    filterType: {}, // состояние фильтра Статус на странице Мои заявки
    filterModeTime: "newFirst",    // cocтояние фильтра новые/старые и вид отображения заявки
    filterModeView: "compactView", // вид отображения заявки
    changeOrderStatus: false, // для отслеживания публикации
    selected_order: {
      from_country: "",
      additional_services: [],
    }, // выбранная из списка заявка
    isOrderSelected: false,
    orderType: '',
    showDeletionConfirmationForm : false,
    delete_order_status: false,
    deletedOrderId: null,
    newOfferBanners : [] 
  },

  getters: {
    NEW_OFFER_BANNERS(state) {
      return state.newOfferBanners
    },

    DELETED_ORDER_ID(state) {
      return state.deletedOrderId
    },
    DELETE_ORDER_STATUS(state) {
      return state.delete_order_status
    },
    SHOW_DELETION_CONFIRMATION_FORM(state) {
      return state.showDeletionConfirmationForm
    },
    ORDER_TYPE(state) {
      return state.orderType
    },

    IS_ORDER_SELECTED(state) {
      return state.isOrderSelected
    },

    SELECTED_ORDER(state) {
      return state.selected_order
    },
   
    CUSTOMER_ORDERS(state) {
      return state.customerOrders
    },

    FILTER_STATUS(state) {
      return state.filterStatus
    },

    FILTER_TYPE(state) {
      return state.filterType
    },

    FILTER_MODE_TIME(state) {
      return state.filterModeTime
    },
    FILTER_MODE_VIEW(state) {
      return state.filterModeView
    },
    CHANGE_ORDER_STATUS(state) {
      return state.changeOrderStatus
    },
    PAGE(state) {
      return state.page
    },
    ALL_PUBLISHED_ORDERS(state) {
      return state.all_published_orders
    }

  },

  actions: {

    async GET_CUSTOMER_ORDERS({ commit }, { status, order_type, page, insurance, payment_from_the_contractor, logistics, customs_clearance,  certification, product_check, other, user_id, page_size }) {
      return new Promise((resolve, reject) => {
        const params = {
          user_id,
          // firm_id: this.getters.FID,
          page,
          page_size, 
          status, 
          order_type, 
          logistics, 
          customs_clearance, 
          certification,
          product_check,
          payment_from_the_contractor, 
          insurance,
          other,
        }
        axios({
          method: "get",
          url: `/orders`,
          params: params,
        })
        .then(res => {
          const orders = res.data
          commit("SET_ORDERS_CUSTOMER", orders)
          resolve(res)
        })
        .catch(err => {
          console.log(err);
          reject(err);
        }
      )
      })
    },

    async GET_CUSTOMER_ORDER_BY_ID({ commit }, id) {
      return new Promise(resolve => {
        axios({
          method: "get",
          url: `/order/${id}`
        }).then(res => {
          commit("SET_SELECTED_ORDER", res.data)
          commit("SET_EMUM_SERVICES_FOR_SELECTED_ORDER")
          resolve(res.data)
        }).catch(err => console.log(`Ошибка загрузки заявки № ${id}`, err))
      })
    }, 

    async CANCEL_CUSTOMER_ORDER({state}) {
      await axios({
        method: "delete",
        url: `/order/${state.deletedOrderId}/delete`,
      })
      .catch(err => console.log("Oшибка удаления ордера", err))
    }, 

    async PUBLISH_ORDER({ commit, dispatch }, orderId) {
      return new Promise(resolve => {
        axios({
          method: "put",
          url: `/order/${orderId}/publish`,
        }).then(() => {
          dispatch("GET_CUSTOMER_ORDERS", { status: "published", page: "0" })
            .then(() => {
              commit("SET_PAGE", true) // обнуляем счетчик при загрузке новыx данныx
              resolve()
            })
        }).catch(err => console.log(err))
      })



    },

    async UNPUBLISH_ORDER({ commit, dispatch }, orderId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: `/order/${orderId}/unpublish`,
        }).then(() => {
          dispatch("GET_CUSTOMER_ORDERS", { status: "unpublished", page: "0" })
            .then(() => {
              commit("SET_PAGE", true) // обнуляем счетчик при загрузке новыx данныx
              resolve()
            })
        }).catch(err => {
          console.log(err)
          reject("Ошибка удаления с заявки с публикации")
        })
      })
    },

    async CONFIRM_ORDER({ commit, dispatch }, orderId) {   
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: `/order/${orderId}/confirm`,
        }).then(() => {
          dispatch("GET_CUSTOMER_ORDERS", { status: "completed", page: "0" })
            .then(() => {
              commit("SET_PAGE", true) // обнуляем счетчик при загрузке новыx данныx
              resolve()
            })
        }).catch(err => {
          console.log(err)
          reject("Ошибка при завершении заявки. Обратитесь в поддержку")
        })
      })



    },

    async UPDATE_DELIVERY_ORDER({dispatch}, order) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: `/order/delivery/${router.currentRoute.value.params.id}/update`,
          data: order
        })
        .then(() => {
          if (this.getters.DOCS.images.binaryFile.length || this.getters.DOCS.images.href.length ) {
            dispatch("UPDATE_IMAGES", router.currentRoute.value.params.id )
          }
          if (this.getters.DOCS.order_invoice.binaryFile) {
            dispatch("UPLOAD_FILE_TO_SERVER", { orderId: router.currentRoute.value.params.id , inputId: "order_invoice" })
          }
          if (this.getters.DOCS.order_packing_list.binaryFile) {
            dispatch("UPLOAD_FILE_TO_SERVER", { orderId: router.currentRoute.value.params.id , inputId: "order_packing_list" })
          }
          
          resolve("Ордер обновлен успешно")
        })
        .catch(err => {
          console.log("Ошибка обновления ордера", err)
          reject("Ошибка обновления ордера")
        })
      }) 
    },

    async UPDATE_COST_ORDER({dispatch}, order) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: `/order/cost-calculation/${router.currentRoute.value.params.id}/update`,
          data: order
        })
        .then(() => {
          if (this.getters.DOCS.images.binaryFile.length || this.getters.DOCS.images.href.length ) {
            dispatch("UPDATE_IMAGES", router.currentRoute.value.params.id )
          }
          resolve("Ордер обновлен успешно")
        })
        .catch(err => {
          console.log("Ошибка обновления ордера", err)
          reject("Ошибка обновления ордера")
        })
      })
    },

    async UPDATE_SEARCH_ORDER({ dispatch }, order) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: `/order/search/${router.currentRoute.value.params.id}/update`,
          data: order
        }) 
          .then(() => {
            if (this.getters.DOCS.images.binaryFile.length || this.getters.DOCS.images.href.length ) {
              dispatch("UPDATE_IMAGES", router.currentRoute.value.params.id )
            }
            resolve("Ордер обновлен успешно")
          })
          .catch(err => {
            console.log("Ошибка обновления ордера", err)
            reject("Ошибка обновления ордера")
          })
      })
    },

    async SELECT_PROVIDER({ commit }, payload) {   
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `/order/${payload.order_id}/offer/${payload.offer_id}/select`,
        }).then(() => {
          commit("SET_IS_ORDER_SELECTED", true)
          // connectToCentrifuge()
          resolve()
        })
          .catch(err => {
            console.log("Ошибка при выборе исполнителя", err)
            reject()
          })
      })
    
    },

    async FIND_MANAGER_ORDER(_, data) {
      return new Promise((resolve, reject) => {
        axios({
          method:"post",
          url: "/order/manager/create",
          data: data
        })
        .then(() => resolve() )
        .catch(err => {
          console.log(err)
          reject()
        })
      }) 
    }

  },

  mutations: {

    SET_NEW_OFFER_BANNERS(state, newOffer) {
      state.newOfferBanners.push(newOffer)
    },

    REMOVE_EL_FROM_NEW_OFFER_BANNERS(state, i) {
      state.newOfferBanners.splice(i, 1)
    },

    SET_DELETE_ORDER_STATUS(state, status) {
      debugger
      state.delete_order_status = status
    },

    SET_SHOW_DELETION_CONFIRMATION_FORM(state, status) {
      state.showDeletionConfirmationForm = status
    },

    SET_ORDER_TYPE(state, type) {
      state.orderType = type
    },

    SET_IS_ORDER_SELECTED(state, status) {
      state.isOrderSelected = status
    },

    SET_ORDERS_CUSTOMER(state, orders) {
      state.customerOrders = orders
    },
    
    SET_FILTER_STATUS(state, status) {
      switch (status) {
        case "Все":
          state.filterStatus = {}
          break
        case "Неопубликованные":
          state.filterStatus = "unpublished"
          break
        case "Опубликованные":
          state.filterStatus = "published"
          break
        case "Завершённые":
          state.filterStatus = "completed"
          break 
        case "В процессе":
          state.filterStatus = "in_progress"
          break
      }
    },

    SET_FILTER_TYPE(state, type) {
      switch (type) {
        case "Все":
          state.filterType = {}
          break
        case "Доставка":
          state.filterType = "delivery"
          break
        case "Поиск товара":
          state.filterType = "search"
          break
        case "Расчет стоимости":
          state.filterType = "cost"
          break
      }
    },

    SET_FILTER_MODE(state, mode) {
      if (mode === "newFirst" || mode === "oldFirst") {
        state.filterModeTime = mode
      } else {
        state.filterModeView = mode
      }
    },

    SET_CHANGE_ORDER_STATUS(state) {
      state.changeOrderStatus = !state.changeOrderStatus
    },
 
    SET_PAGE(state, number) {
      if (number) {
        state.page = 0
      } else state.page++
    },

    SET_ALL_PUBLISHED_ORDERS(state, orders) {
      state.all_published_orders.push(...orders)
    },

    SET_SELECTED_ORDER(state, order) {
      state.selected_order = order
      if (order.chat) {
        this.commit("SET_CHAT_ID", order.chat.chat_id)
      }
    },

    SET_VALUE_FOR_SELECTED_ORDER(state, data) {
       state.selected_order[data.key] = data.value 
    },

    SET_DELETED_ORDER_ID(state, id) {
      state.deletedOrderId = id
    },

    SET_DELETE_ORDER(state) {
      const arr = state.customerOrders
      if(!arr.length) return 
      const index = arr.findIndex(el =>  el.id == state.deletedOrderId )
      state.customerOrders.splice(index, 1)
      state.deletedOrderId = null
    },

    CLEAR_SELECTED_ORDERS(state) {
      for(let el in state.selected_order) {
        if (el === "additional_services") state.selected_order[el] = []
          else state.selected_order[el] = ""
      }
    },

    SET_CLEAR_SELECTED_ORDER_SERVICES(state) {
      state.selected_order.additional_services = [] 
    },

    SET_EMUM_SERVICES_FOR_SELECTED_ORDER(state) { 
      if (state.selected_order.additional_services) {
        state.selected_order.additional_services = enumServices2(state.selected_order.additional_services)
      }
      if (state.selected_order.delivery_type) {
        state.selected_order.delivery_type = enumDeliveryType2(state.selected_order.delivery_type)
      }
    },

    SET_SERVICES_FOR_SELECTED_ORDER(state, {checked, service}) {
      if (checked) {
        state.selected_order.additional_services.push(service)
      } else {
        state.selected_order.additional_services = state.selected_order.additional_services.filter(el => el !== service)
      }
    },

    SET_SHIPPING_FOR_SELECTED_ORDER(state, delivery_type){
      state.selected_order.delivery_type = delivery_type 
    },

    SET_ADDITION_DATA_FOR_SELECTED_ORDER(state, data){
      if(data.nameOfInput === "from_city" || data.nameOfInput === "from_address" ){
        state.selected_order[data.nameOfInput] = data.inputValue
      } 
      else if (data.nameOfInput === "toAddress") {
        state.selected_order.toAddress = data.inputValue;
      } 
      else {
        state.selected_order[data.nameOfInput] = data.inputValue
      }
    },

    SET_ADDRESS_FROM_FOR_SELECTED_ORDER(state, data){
      state.selected_order.from_city = data.from_city
      state.selected_order.from_address = data.from_address
    },

    SET_FACTORY_CONTRACT_FOR_SELECTED_ORDER(state, data){
      state.selected_order.agent_fullname = data.agent_fullname
      state.selected_order.agent_phone_number = data.agent_phone_number
      state.selected_order.agent_email = data.agent_email
    },

  }
} 