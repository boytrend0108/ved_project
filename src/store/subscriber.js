import store from "@/store" 
import router from "@/router"  

function sendFile(id){
    if(id === "upload-user-pic" || id === "images" || id === "order_invoice" || id === "order_packing_list" || id === "chat_file" ) return false
    return true    
}

store.subscribe(mutations => {
  if (mutations.type === "SET_BINARY_FILE") {
    const inputId = mutations.payload.id
    const orderId = router.currentRoute.value.params.id
    const site_role = store.getters.SITE_ROLE
    if (sendFile(inputId)) {
      store.dispatch("UPLOAD_FILE_TO_SERVER", { orderId, inputId, site_role })
        .then(() => {
          store.dispatch("GET_FILE_FROM_SERVER", { orderId, inputId, site_role })
        })
    } return
  }

  if (mutations.type === "SET_BILL_BINARY_FILE") {
    const orderId = router.currentRoute.value.params.id
    store.dispatch("UPLOAD_BILL_TO_SERVER", orderId)
  }
})   
