// Xранилище для страницы application
import axios from "@/api/axios.js"
import router from "@/router"
import mainStore from "@/store"
import { enumDeliveryType, enumServices } from "@/helpers/enumTransformation"
export default {
  state: {
    country: "",
    city: "",
    toAddress: "", // адрес куда доставлять
    application_name: "",
    description: "",
    amount: "",
    gross: "",
    cargo_volume: "",
    date_of_cargo_readiness: "",
    dateForServer: "", // dateOfReadidess for server
    additional_services: [],
    comment_for_service: "",
    delivery_type: "Оптимальный (золотая середина между скоростью и стоимостью)",
    addressFrom: {
      from_city: "",
      from_address: ""
    },
    factoryContact: {
      agent_email:"",
      agent_fullname:"",
      agent_phone_number:"",
    },
    title: { 
      country: "Из какой страны вы планируете завозить товары?",
      cities: "В какой город РФ нужно доставить товары?",
      naming: "Придумайте название заявки",
      description: "Кратко опишите товары, которые планируете завозить",
      additional_services: "Какие услуги вы рассматриваете?",
      delivery_type: "Тип доставки",
      check: "Проверьте детали заявки перед публикацией",
      info: "Дополнительная информация",
      info1: "Точный адрес забора груза",
      info2: "Контакты представителя фабрики",
    }, 
    selectedId: "", 
    customerOrders:[], 
    isApplicationComplete: false // переключается на true когда нажимаем далее на последнем этапе
  },
  
  getters: {
    COMMENT_FOR_SERVICE(state) {
      return state.comment_for_service
    },

    QUANTITY(state) {
      return state.amount;
    },

    TO_ADDRESS(state) {
      return state.toAddress; 
    },

    WEIGHT(state) {
      return state.gross;
    },

    CAPACITY(state) { 
      return state.cargo_volume;
    },

    DATE_OF_READINESS(state) {
      return state.date_of_cargo_readiness;
    },

    SET_DATE_FOR_SERVER(state) {
      return state.dateForServer;
    },

    IS_APPLICATION_COMPLETE(state){
      return state.isApplicationComplete
    },

    COUNTRY(state){
      return state.country 
    },

    CITY(state){ 
      return state.city
    },
    APPLICATION_NAME(state){
      return state.application_name
    },
    APPLICATION_DESCRIPTION(state){
      return state.description
    },
    SERVICES(state){
      return state.additional_services
    },
    SHIPPING(state){ 
      return state.delivery_type
    },
    TITLE(state){
      return state.title
    },
    SELECTED_ID(state){
      return state.selectedId
    },
    ADDRESS_FROM(state){
      return state.addressFrom
    },
    FACTORY_CONTACT(state){
      return state.factoryContact
    },
    INPUT_NAME(state){
      return state.inputName
    },
   
  }, 
  actions: {
    GO_TO_NEXT_STEP({commit},route){ 
      if (route.path === "/" || route.path === "/start-application") { 
        commit("SET_INPUT", route)
        mainStore.commit("SAVE_INPUT_VALUE", "")
        router.push("/customer/new-application?step=cities")
      } 
      else if (route.query.step === "cities") {
        commit("SET_INPUT", route)
        mainStore.commit("SAVE_INPUT_VALUE", "")
        router.push("/customer/new-application?step=naming")
      }
      else if (route.query.step === "naming") {
        commit("SET_INPUT", route)
        mainStore.commit("SAVE_INPUT_VALUE", "")
        router.push("/customer/new-application?step=ApplicationDescription")
      }
      else if (route.query.step === "ApplicationDescription") {
        commit("SET_INPUT", route)
        mainStore.commit("SAVE_INPUT_VALUE", "")
        router.push("/customer/new-application?step=additional_services")
      }
      else if (route.query.step === "additional_services") {
        router.push("/customer/new-application?step=delivery_type")
      }
      else if (route.query.step === "delivery_type") {
        router.push("/customer/new-application?step=info")
      }
      else if (route.query.step === "info") {
        mainStore.commit("SAVE_INPUT_VALUE", "")
        router.push("/customer/new-application?step=check")
      }
      else if (route.path === "/customer") {
        mainStore.commit("SAVE_INPUT_VALUE", "")
        router.push("/customer?module=select_company")
      }
    },

    async CREATE_CUSTOMER_ORDER({ state, commit}) {
      commit("SET_PAGE", true)
      const create_data = {
        "firm_id": this.getters.FIRMS[0].fid,
        "from_country": state.country,
        "from_city": state.addressFrom.from_city,
        "from_address": state.addressFrom.from_address,
        "agent_fullname": state.factoryContact.agent_fullname,
        "agent_phone_number": state.factoryContact.agent_phone_number,
        "agent_email": state.factoryContact.agent_email,
        "to_country": "Россия",
        "to_city": state.city,
        "to_address": state.toAddress,
        "name": state.application_name,
        "description": this.getters.APPLICATION_DESCRIPTION,
        "additional_services": enumServices(state.additional_services),
        "delivery_type": enumDeliveryType(state.delivery_type),
        "amount": state.amount,
        "gross": state.gross,
        "net": state.gross,
        "cargo_volume": state.cargo_volume,
        "date_of_cargo_readiness": state.date_of_cargo_readiness,
        "created_at": Date.now(),
        "comment_for_service": state.comment_for_service,
      }
      const invoice = this.getters.DOCS.order_invoice.binaryFile
      const order_packing_list = this.getters.DOCS.order_packing_list.binaryFile
      const photos = this.getters.DOCS.images.binaryFile
      const data = new FormData()
      data.append("create_data", JSON.stringify(create_data)) 
      photos.forEach(el => {
        data.append("photos", el)
      });
      data.append("invoice", invoice)
      data.append("packing_list", order_packing_list)

      return new Promise((resolve, reject) => { 
        axios({
          method: "post", 
          url: `/order/delivery/create`,
          data: data
        }).then(() => {
          commit("SET_IS_APPLICATION_COMPLETE", false)
          commit("SET_CLEAR_INVOICE_AND_PLIST")
          resolve("Новая заявка успешно создана")
        })
        .catch(err => {
          reject(err)
        })
      })
 
    },  
  },  
 
  mutations: { 
   
    SET_INPUT(state, route) {
      if(route.path === "/" || state.selectedId === "country" || route.path === "/start-application" || route.path === "/cost-calculation"  ) {
        state.country = this.getters.INPUT ? this.getters.INPUT : this.getters.COUNTRY
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "from_country", value: state.country})
      } else if (route.query.step === "cities" || state.selectedId === "cities" ){
        state.city = this.getters.INPUT ? this.getters.INPUT : this.getters.CITY
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "to_city", value: state.city})
      }  else if (route.query.step === "naming" || state.selectedId === "naming") {
        state.application_name = this.getters.INPUT ? this.getters.INPUT : this.getters.APPLICATION_NAME
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "name", value: state.application_name})
      }  else if (route.query.step === "ApplicationDescription" || state.selectedId === "description"){
        state.description = this.getters.INPUT ? this.getters.INPUT : this.getters.APPLICATION_DESCRIPTION
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "description", value: state.description})
      } else if (state.selectedId === "amount") {
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "amount", value: state.amount})
      }  else if (state.selectedId === "gross") {
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "gross", value: state.gross})
      }  else if (state.selectedId === "cargo_volume") {
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "cargo_volume", value: state.cargo_volume})
      } 
    }, 

    SET_VALUE_FROM_APPLICATION_FORM(state, data) {
      state[data.key] = data.value
    },

    SET_SERVICE(state, {checked, service}){
      if(checked){
        state.additional_services.push(service)
        this.commit("SET_COST_CALCULATION_APPL", {id: "additional_services" , value: state.additional_services} )
      } else {
        state.additional_services = state.additional_services.filter(el => el !== service)
        this.commit("SET_COST_CALCULATION_APPL", {id: "additional_services" , value: state.additional_services} )
      }
    }, 
 
    SET_SHIPPING(state, delivery_type){
      state.delivery_type = delivery_type 
      this.commit("SET_COST_CALCULATION_APPL", {id: "delivery_type", value: state.delivery_type})
    },

    SET_SELECTED_ID(state, id){
       state.selectedId = id
    },

    SET_ADDITION_DATA(state, data) {
      debugger
      if(data.nameOfInput === "from_city" || data.nameOfInput === "from_address" ){
        state.addressFrom[data.nameOfInput] = data.inputValue
      } else if (data.nameOfInput === "gross" || data.nameOfInput === "cargo_volume" || data.nameOfInput === "date_of_cargo_readiness" || data.nameOfInput === "amount" ){
        state[data.nameOfInput] = data.inputValue
        this.commit("SET_COST_CALCULATION_APPL", {id: data.nameOfInput, value: data.inputValue})
        this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: data.nameOfInput, value: data.inputValue})
      } else if (data.nameOfInput === "toAddress") {
        state.toAddress = data.inputValue;
      } else {
        state.factoryContact[data.nameOfInput] = data.inputValue
      }
    },

    SET_DATE_FOR_SERVER(state, date) {
      state.dateForServer = date;
    },

    SET_IS_APPLICATION_COMPLETE(state, status){
      state.isApplicationComplete = status
    },

    SET_ADDRESS_FROM(state, data){
      state.addressFrom = data
    },

    SET_FACTORY_CONTRACT(state, data){  
      state.factoryContact = data
    },

    SET_COMMENT_FOR_SERVICE(state, comment) {
      state.comment_for_service = comment
      this.commit("SET_COST_CALCULATION_APPL", {id: "comment_for_service", value: state.comment_for_service})
      this.commit("SET_VALUE_FOR_SELECTED_ORDER", {key: "comment_for_service", value: comment})
    },


    // #region CLEAR
    SET_CLEAR_ADDITION_DATA(state) { 
      state.addressFrom.from_city = ""
      state.addressFrom.from_address = ""
      state.factoryContact.agent_fullname = ""
      state.factoryContact.agent_phone_number = ""
      state.factoryContact.agent_email = ""
      state.gross =  ""
      state.cargo_volume = ""
      state.date_of_cargo_readiness = ""
    }, 

    SET_CLEAR_SERVICES(state) {
      state.additional_services = [] 
    },

    SET_CLEAR_NEW_APPLICATION(state) {
      state.country = ""
      state.city = ""
      state.application_name = ""
      state.description = "" 
      state.additional_services = []
      state.toAddress = ""
      state.amount = ""
      state.gross = ""
      state.comment_for_service = ""
      state.delivery_type = "Оптимальный (золотая середина между скоростью и стоимостью)"
      this.commit("SET_CLEAR_ADDITION_DATA") 
      this.commit("CLEAR_COST_CALCULATION_APPL")
    },

    SET_CLEAR_DATA(state,id){
      state[id] = ""
    }
    // #endregion
  }
}