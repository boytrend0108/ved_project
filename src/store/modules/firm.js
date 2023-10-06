import getActiveFirm from "@/helpers/filterFirmByStatus"
import axios from "@/api/axios"
import store  from "@/store"
export default {
  state:{
    fid: "", // нужен будет для удаления фирмы
    click: false, // ловим клик в ребёнке
    isFirm: false,
    isBank: false, 
    addOrChangeFirm: "",
    addOrChangeBank: "",
    isEmailValid: true,
    isPhoneValid: true,
    newInn: false, // флаг чтобы знать был ли изменен инн 
    // saveNewFirm: true,
    firms: [
      { 
        inn: "",
        status: "",
        kpp: "",
        ogrn: "",
        org_type: "",
        long_name: "",
        eng_name: "",
        director_name: "",
        eng_director_name: "",
        director_post: "string",
        address_fact: "",
        address_jur: "",
        eng_address_jur: "",
        is_ip: Boolean,
        email: "",
        phone_number: ""
      }
    ],
    selected_firm: 0, // значение по умолчанию.
    companiesList:[], // для отрисовки dropdown
    companiesList2:[], // для заполнения полей формы
    bank:[
      {
        bic: "", 
        name: "",
        ras_schet: "",
        kor_schet: "",
       }
    ],
    banksList:[], // для отрисовки dropdown
    banksList2:[], // для заполнения полей формы
  },

  getters: { 
    // SAVE_NEW_FORM(state) {
    //   return state.saveNewFirm
    // },

    NEW_INN(state) {
      return state.newInn
    },

    IS_EMAIL_VALID(state) {
      return state.isEmailValid
    },

    IS_PHONE_VALID(state) {
      return state.isPhoneValid }
    ,

    ADD_OR_CHANGE_FIRM(state) {
      return state.addOrChangeFirm
    },

    ADD_OR_CHANGE_BANK(state) {
      return state.addOrChangeBank
    },

    FID(state){
      return state.fid
    },
    FIRMS(state){
      return state.firms
    },
    BANK(state){
      return state.bank
    },
    IS_FIRM(state){
      return state.isFirm
    },
    IS_BANK(state){
      return state.isBank
    },
    INPUT_ID(state){
      return state.inputId
    },
    COMPANIES_LIST(state){
      return state.companiesList
    },
    BANKS_LIST(state){
      return state.banksList
    },
    SELECTED_FIRM(state) {
      return state.selected_firm
    }
  },

  actions: { 
    async GET_COMPANIES_FROM_DADATA({commit}, inputInn){ // for dropdown
      await axios({
        method: "post",
        url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + "41e2fb46678542503adc5b7d41461be1c9bc39c0" // dadata token
        },
        data: { query: inputInn }
      }).then((res) => {
        commit("SET_COMPANIES_LIST") // oчищаем 
        const companies = getActiveFirm(res.data.suggestions).slice(0,4)
        companies.forEach(company => {
          if (companies.indexOf(company) < 5) {
            commit("SET_COMPANIES_LIST", company )
          }
        });
      })
        .catch((err) => console.log(err))
    },

    async GET_BANKS_FROM_DADATA({commit}, inputInn){ // for dropdown
      await axios({
        method: "post",
        url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + "41e2fb46678542503adc5b7d41461be1c9bc39c0" // dadata token
        },
        data: { query: inputInn }
      }).then((res) => {
        commit("SET_BANKS_LIST") // oчищаем 
        const banks = res.data.suggestions.slice(0,4)
        banks.forEach(bank => {
          if (banks.indexOf(bank) < 5) {
            commit("SET_BANKS_LIST", bank )
          }
        });
      })
        .catch((err) => console.log(err))
    },

    async SEND_NEW_COMPANY_TO_SERVER({dispatch, commit}, credentials){
      await axios({
           method: "post",
           url: "/firm/create",
           data: credentials ,
         }).then(() => {
            dispatch("GET_COMPANY_FROM_SERVER")
         }).catch(err => {
           console.log(err.response.data.detail)
           commit("SET_VALIDATION_ERR",err.response.data.detail )
           throw new Error(err.response.data.detail)
         })
    },

    async UPDATE_COMPANY({commit}, credentials) {
      await axios({
        method: "put",
        url: `/firm/${this.getters.FID}/update`,
        data: credentials ,
      })
        .catch(err => {
          console.log(err)
          const errMsg = err.response.data.detail ? err.response.data.detail : "error"
          commit("SET_VALIDATION_ERR", errMsg )
          throw new Error(err.response.data.detail)
        })
    },
    
    async GET_COMPANY_FROM_SERVER({commit, dispatch}) {
      await axios({
        method: "get", 
        url: "/firms",
      }).then(result => {
        commit("SET_FIRM", result.data)
      }).then(() => {
         dispatch("GET_BANK_FROM_SERVER") 
      }).catch(err => console.log(err))
    },

    async DELETE_COMPANY({commit}, data){
      await axios({
        method: "delete",
        url: `/firm/${this.getters.FID}/delete`,
        params: data,
      }).then((res)=>{
        commit("SET_DELETE_COMPANY", res.data)
        commit("SET_DELETE_BANK") 
        
      }).catch(err => (console.log("Ошибка удаления компании", err)))
    },
   //=======
    async GET_BANK_FROM_SERVER({commit}) {
    
      // const fid = JSON.parse(localStorage.getItem("fid"))
      const fid = localStorage.getItem("fid") 
      await axios({
        method: "get",
        url : `/firm/${fid}/banks`,
      }).then(response => {
        commit("SET_BANK_INFO", response.data)
      }).catch(err => {
        console.log(err)
        const errMsg = err.response.data.detail ? err.response.data.detail : "error"
        commit("SET_VALIDATION_ERR", errMsg )
        throw new Error(err.response.data.detail)
      })
    },

    async SEND_BANK_TO_SERVER({ commit }, form) {
      await axios({
        method: "post",
        url: `/firm/${this.getters.FID}/bank/create`,
        data: form
      }).then(response => {
        commit("SET_BANK_INFO", response.data)
      }).catch(err => {
        console.log(err)
        const errMsg = err.response.data.detail ? err.response.data.detail : "Упс.. что-то нет так"
        commit("SET_VALIDATION_ERR", errMsg )
        throw new Error(err.response.data.detail)
      })
    },

    async UPDATE_BANK({commit}, bank){
      await axios({
        method: "put",
        url: `/bank/${store.getters.IS_BANK}/update`,
        data: bank
      })
        .catch(err => {
          console.log(err)
          const errMsg = err.response.data.detail ? err.response.data.detail : "error"
          commit("SET_VALIDATION_ERR", errMsg )
          throw new Error(err.response.data.detail)
        })
    },

    async DELETE_BANK({commit}){
      await axios({
        method: "delete",
        url: `/bank/${this.getters.IS_BANK}/delete`,
      }).then(() => {
        commit("SET_DELETE_BANK", "deleteBank")
      }).catch(err => {
        console.log("Ошибка удаления банка", err)
      })
    },
  }, 

  mutations: { 

    SET_IS_INPUT_VALID(state, {status, id}) {
      state[id] = status
    },

    SET_ADD_OR_CHANGE_FIRM(state, action) { // action === addNewCompany or changeFirm
      state.addOrChangeFirm = action
    },

    SET_ADD_OR_CHANGE_BANK(state, action) { // action === addNewCompany or changeFirm
      state.addOrChangeBank = action
    },

    SET_FIRM(state, firms){
      if(!firms.length) return
      state.firms = [] // oчишаем массив
      state.firms = firms
      state.fid = firms[0].fid
      state.isFirm = true
      localStorage.setItem("fid", firms[0].fid)
    },

    SET_SELECTED_FIRM(state, index) {
      state.selected_firm = index
    },

    SET_COMPANY_DATA(state, data) { // добавляем телефон и почту компании и факт.адресс
      state.firms[0][data.key] = data.value 
    },

    SET_NEW_COMPANY_FORM(state, inn) {//ucпользуется при заполнении анкеты посльзователем
      const company = state.companiesList2.filter(firm => inn === firm.data.inn)[0]
      const companyFormData = {
        inn: company.data.inn,
        kpp: company.data.kpp, 
        ogrn: company.data.ogrn,
        long_name: company.value,
        director_name: company.data.management ? company.data.management.name : "",
        address_fact: "",
        address_jur: company.data.address.value,
        email: "",
        phone_number: "",
       }
      state.firms.unshift(companyFormData) // добавляем в начало массива
      state.selected_firm = 0 // указываем что выбран первый индех
    },

    SET_NEW_BANK_FORM(state, bic) {//ucпользуется при заполнении анкеты посльзователем
      const bank = state.banksList2.filter(bank => bic === bank.data.bic)[0]
      const bankFormData = {
        bic: bank.data.bic,
        name: bank.value,
        ras_schet: "",
        kor_schet: bank.data.correspondent_account,
       }
      state.bank = []
      state.bank.push(bankFormData)
    },
    
    SET_BANK_FORM(state, data) { // cобираем форму для запроса
      state.bank[0].ras_schet = data
    },

    SET_DELETE_COMPANY(state, firm) {
      const fid = firm.fid
      const idx = state.firms.findIndex(el => el.fid === fid)
      state.firms.splice(idx, 1)
      state.isFirm = false
      state.isBank = false
      state.fid = ""
      state.selected_firm = ""
    },
 
    SET_DELETE_BANK(state) {
        for (let key in state.bank[0]){
          state.bank[0][key] = "" // очищаем данные
        }
        state.isBank = false
      },
  
    SET_BANK_INFO(state, bank){  
      state.bank = []
      if(bank.length) state.bank.push(bank[0]) // при получении с сервера возвращается один массив
      state.bank.push(bank) // при отравке на сервер возвращается один объект
      if(state.bank[0].id) state.isBank = state.bank[0].id // если банк пришел 
      
    },

    SET_COMPANIES_LIST(state, company){
      if(company){
        state.companiesList.push(`${company.data.inn}` +  ` | ` + `${company.value}`)
        state.companiesList2.push(company)
      } else {
        state.companiesList = [] // clear before getting new data from DaData
        state.companiesList2 = [] 
      }
     
    },

    SET_BANKS_LIST(state, bank){
      if(bank){
        state.banksList.push(`${bank.data.bic}` +  ` | ` + `${bank.value}`)
        state.banksList2.push(bank)
      } else {
        state.banksList = [] // clear before getting new data from DaData
        state.banksList2 = [] 
      }
     
    },

    SET_NEW_INN(state, status) {
      state.newInn = status
    },

    SET_IS_PHONE_VALID(state, status) {
      state.isPhoneValid = status
    }

  }
}