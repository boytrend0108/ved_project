import router from "@/router"
import store from "@/store"

export const orderDocumentsNav = function(event) {
  const route = router.currentRoute.value
  const site_role = store.getters.SITE_ROLE
    if(route.query.module === 'select_company'){
      if (event.target.id !== 'customer_order'){
        router.push(`/customer/support/0`)
      }else return
    } else if(route.params.id !== '0'){
      router
        .push(`/${site_role}/${event.currentTarget.id}/${route.params.id}?status=${route.query.status}&offer_id=${route.query.offer_id}&&type=${route.query.type}`)
    } else {
      router.go('-1')
    }
}

