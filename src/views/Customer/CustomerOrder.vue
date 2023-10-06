<template>
  <div class="customerOrder"> 
    <h1 class="visually-hidden">Заявка</h1>
    <customer-order-delivery :order="order" v-if="order.type === 'delivery'"/>
    <search-product-summary 
      v-if="SEARCH_PRODUCT_APPL.type === 'search' && $route.query.type === 'search'"
      class="customerOrder__search"
    />
    <customer-order-cost :order="order" v-if="order.type === 'cost'" />
    <div class="preloaderWindow" v-if="showPreloaderWindow">
      <my-semipolar-spinner />
    </div>
  </div>   
</template>    

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import {getDocsFromServer} from "@/helpers/countSentDocs"
import CustomerOrderDelivery from '@/components/Application/CustomerOrderDelivery.vue';
import SearchProductSummary from "@/components/SearchProduct/SearchProductSummary.vue";
import CustomerOrderCost from "@/components/Application/CustomerOrderCost.vue"

export default {
  name: "customer-order",
  components: { CustomerOrderDelivery, SearchProductSummary, CustomerOrderCost },
  data() {
    return {
      order: '',
      showPreloaderWindow: false
    }
  },

  computed: {
    ...mapGetters([
      "SHOW_PDF_VIEWER", 
      "DIALOG", 
      "DOCS", 
      "BTN_ID", 
      "SEARCH_PRODUCT_APPL"
    ]),

    // eslint-disable-next-line
    src() {
      switch (this.BTN_ID) {
        case "invoice": return this.DOCS.order_invoice.url
        case "order_packing_list": return this.DOCS.order_packing_list.url
      }
    },
  }, 

  methods: {
    ...mapActions([
      "GET_CUSTOMER_ORDER_BY_ID", 
      "GET_PROVIDER_OFFERS"
    ]),
    ...mapMutations([
      "SET_SEARCH_PRODUCT_APPL_ALL", 
      "SHOW_DIALOG", 
      "SET_CLEAR_NEW_APPLICATION",
      "SET_CLEAR_DOCS"
    ]),
  },
  
 
  mounted() {
    this.showPreloaderWindow = true
    this.GET_CUSTOMER_ORDER_BY_ID(this.$route.params.id) 
      .then(res =>{ 
        switch (res.type) {
          case "delivery":  this.order = res
            break
          case "search": this.SET_SEARCH_PRODUCT_APPL_ALL(res)
            break
          case "cost": this.order = res
        }
        this.showPreloaderWindow = false 
      })
      
    //---Получаем все отклики по заявке
    this.GET_PROVIDER_OFFERS(this.$route.params.id);

    //--- получаем все договора
    getDocsFromServer()
  },

  unmounted() {
   this.SET_CLEAR_NEW_APPLICATION();
   this.SET_CLEAR_DOCS();
  }
}
</script>

<style lang="scss" scoped>

.customerOrder__search {
  margin-bottom: 3rem;
}

.visually-hidden {
  @include visually-hidden;
}

.customerOrder {
  width: 100%;
}

.preloaderWindow{
  @include preloaderWindow;
}

</style>

