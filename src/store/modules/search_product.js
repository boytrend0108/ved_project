import axios from "@/api/axios"


export default {
  state: {
    search_product_appl: {
      color: "",
      description: "",
      material: "",
      name: "",
      amount: null,
      one_volume: "", 
      brand_name: "",  
      note: "",
      location_logo: "",
      is_logo: false,
      package:"Не выбрано",
      sample_for_replication:"Не выбрано",
      //фото храняться в DOCS.images(contractAndPayments)
      draft: ''
    },

  },

  getters: {
    SEARCH_PRODUCT_APPL(state) {
      return state.search_product_appl
    }
  },

  actions: {

    async CREATE_ORDER_SEARCH_PRODUCT({ state, commit }) {
      commit("SET_PAGE", true)
      const application = {
        "firm_id": this.getters.FID,
        "name": state.search_product_appl.name,
        "amount": state.search_product_appl.amount,
        "one_volume": state.search_product_appl.one_volume,
        "material": state.search_product_appl.material,
        "color": state.search_product_appl.color,
        "package": state.search_product_appl.package === "Да" ? true : false,
        "sample_for_replication": state.search_product_appl.sample_for_replication === "Да" ? true : false,
        "description": state.search_product_appl.description,
        "is_logo": state.search_product_appl.is_logo,
        "location_logo": state.search_product_appl.location_logo, 
        "note": state.search_product_appl.note,
        "brand_name": state.search_product_appl.brand_name,
        "created_at": Date.now()
      }

      const photos = this.getters.DOCS.images.binaryFile
      const data = new FormData()
      data.append("create_data", JSON.stringify(application))
      photos.forEach(photo => data.append("photos", photo))
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "/order/search/create",
          data: data
        })
          .then(() =>{
            commit("SET_IS_APPLICATION_COMPLETE", false)
            commit("SET_CLEAR_INVOICE_AND_PLIST")
            resolve("Новая заявка успешно создана")
          })
          .catch(err => {
            reject("Ошибка при создании заявки")
            console.log("Ошибка при создании заявки", err)
          }
          )
      })
    },

    async GET_BILL(_, data) {
      debugger
      return new Promise((resolve, reject) => {
        axios({
          methods: "post",
          url: "/service/product-search",
          data: data
        })
          .then(() => resolve("Заявка успешно отправлена"))
          .catch(() => reject("Ошибка при отправке заявки"))
      })
    }, 

    async UPLOAD_FOTO_SEARCH_PRODUCT(_, files) {
      await axios({
        method: "post",
        url: "/service/product-search/images",
        data: files
      })
    }
  },

  mutations: {
    SET_SEARCH_PRODUCT_APPL(state, payload) {
      state.search_product_appl[payload.id] = payload.value
    },

    SET_SEARCH_PRODUCT_APPL_ALL(state, order) {
      state.search_product_appl = order
    },

    SET_CANCEL_APPL(state) {
      for (let el in state.search_product_appl) {
        state.search_product_appl[el] = ""
      }
    },

    CLEAR_SEARCH_PRODUCT_APPL(state) {
      state.search_product_appl = {}
    }
  }


}