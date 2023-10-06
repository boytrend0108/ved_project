import axios from "@/api/axios"
import router from "@/router"
import { enumDeliveryType, enumServices } from "@/helpers/enumTransformation"

export default {
  state:{ 
    cost_calculation_appl: {
      "name": "",
      "from_country": "",
      "from_city": "",
      "from_address": "", // добавил сам . в доксах нет
      "to_country": "Россия",
      "to_city": "",
      "description": "",
      "amount": 0,
      "gross": "",
      "net": "",
      "cargo_volume": "",
      "additional_services": [],
      "comment_for_service": "",
      "delivery_type": "",
      "status": "unpublished",
      "type": "calculation",
    },
    progress: {
      FromWhichCountry: 17,
      cities: 33,
      SearchProductComp: 50,
      naming: 50, 
      ApplicationDescription: 67,
      productDescription: 75,
      ApplicationServices: 83,
      productLogo: 100,
      ApplicationShipping: 100,
    }, 
    step: ''
  },

  getters: {
    COST_CALCULATION_APPL(state) {
      return state.cost_calculation_appl
    },
    PROGRESS(state) {
      return state.progress
    },
    STEP(state) {
      return state.step
    }
  },

  actions: {
    async COST_CALCULATION_ORDER_CREATE({commit}) {
      commit("SET_PAGE", true)
      const cost_calculation_appl = {
        "firm_id": this.getters.FID,
        "name": this.getters.APPLICATION_NAME,
        "from_country": this.getters.COUNTRY,
        "from_city": this.getters.ADDRESS_FROM.from_city,
        // "from_address": this.getters.ADDRESS_FROM.street, // добавил сам . в доксах нет
        "to_country": "Россия",
        "to_city": this.getters.CITY,
        "description": this.getters.APPLICATION_DESCRIPTION,
        "amount": +this.getters.QUANTITY,
        "gross": this.getters.WEIGHT,
        "net": "string",
        "cargo_volume": this.getters.CAPACITY,
        "additional_services": enumServices(this.getters.SERVICES),
        "comment_for_service": this.getters.COMMENT_FOR_SERVICE,
        "delivery_type": enumDeliveryType(this.getters.SHIPPING),
      }

      const photos = this.getters.DOCS.images.binaryFile 
      const data = new FormData()
      data.append("create_data", JSON.stringify(cost_calculation_appl))
      photos.forEach(el => {
        data.append("photos", el)
      });
      return new Promise((resolve, reject) => {  
        axios({
          method: "post",
          url: "/order/cost-calculation/create",
          data: data
        })
        .then(() => {
          commit("SET_IS_APPLICATION_COMPLETE", false)
          commit("SET_CLEAR_INVOICE_AND_PLIST")
          resolve("Заявка успешно создана")
        })
        .catch(err => {
          console.log("Ошибка при создании заявки", err)
          reject("Ошибка при создании заявки")
        })
       })
    },

    NEXT_STEP({ commit, dispatch, state }, step) {
      const currentRoute = router.currentRoute.value
      switch (step) {
        //page search product
        case "SearchProductComp":
          router.push(`/search_product/?step=productDescription`)
          break
        case "productDescription":
          router.push(`/search_product/?step=productLogo`)
          break
        case "productLogo":
          router.push(`/search_product/?step=productPhoto`)
          break
        case "productPhoto":
          router.push(`/search_product/?step=SearchProductSummary`)
          break
        //page cost calculation
        case "FromWhichCountry":
          commit("SET_COST_CALCULATION_APPL", { id: "from_country", value: this.getters.INPUT ? this.getters.INPUT : this.getters.COST_CALCULATION_APPL.from_country })
          commit("SET_INPUT", currentRoute)
          router.push(`/cost-calculation/?step=cities`)
          break
        case "cities":
        commit("SET_COST_CALCULATION_APPL", { id: "from_city", value: this.getters.INPUT ? this.getters.INPUT : this.getters.COST_CALCULATION_APPL.from_city })
          commit("SET_INPUT", currentRoute)
          router.push(`/cost-calculation/?step=naming`)
          break
        case "naming":
          commit("SET_COST_CALCULATION_APPL", { id: "name", value: this.getters.INPUT ? this.getters.INPUT : this.getters.COST_CALCULATION_APPL.name })
          commit("SET_INPUT", currentRoute)
          router.push(`/cost-calculation/?step=ApplicationDescription`)
          break
        case "ApplicationDescription":
          commit("SET_COST_CALCULATION_APPL", { id: "description", value: this.getters.INPUT ? this.getters.INPUT : this.getters.COST_CALCULATION_APPL.description })
          commit("SET_INPUT", currentRoute)
          router.push(`/cost-calculation/?step=ApplicationServices`)
          break
        case "ApplicationServices":
          router.push(`/cost-calculation/?step=ApplicationShipping`)
          break
        case "ApplicationShipping":
          router.push(`/cost-calculation/?step=ApplicationAdditionInfo`)
          break
        case "ApplicationAdditionInfo":
          router.push(`/cost-calculation/?step=ApplicationCheck`)
          break
      }
      dispatch("SHOW_PROGRESS", state.progress[step] || 10)
    },

    PREVIOUS_STEP({ commit, state, dispatch }, step) {
      router.go("-1")
      commit("SAVE_INPUT_VALUE", "")
      const stepBack = {
        FromWhichCountry: 17,
        SearchProductComp:  state.progress["cities"],
        naming:  state.progress["FromWhichCountry"],
        ApplicationDescription: state.progress["cities"],
        productDescription: state.progress["ApplicationDescription"],
        ApplicationServices: state.progress["SearchProductComp"],
        productLogo: state.progress["ApplicationServices"],
        ApplicationShipping: state.progress["ApplicationDescription"],
        ApplicationAdditionInfo: 87,
        ApplicationCheck: 100
      }

      dispatch("SHOW_PROGRESS", stepBack[step] || 10)
    },

     SHOW_PROGRESS({state}, pers) {
      let progress = 0 
      const interval_id = setInterval(() => {
        progress++
        state.step = `${progress}%`
        if (progress === pers) clearInterval(interval_id)
      }, 20)
     }

  },
  mutations: {
    SET_COST_CALCULATION_APPL(state, data) {
      state.cost_calculation_appl[data.id] = data.value
    },

    CLEAR_COST_CALCULATION_APPL(state) {
      for(let el in state.cost_calculation_appl){
         switch (el) {
           case "to_country": state.cost_calculation_appl[el] = "Россия"
             break
           case "amount": state.cost_calculation_appl[el] = 0
             break
           case "additional_services": state.cost_calculation_appl[el] = []
             break
           default: state.cost_calculation_appl[el] = ""
         }
      }
    }
  }
}