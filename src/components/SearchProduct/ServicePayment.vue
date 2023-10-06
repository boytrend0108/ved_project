<template>
  <div class="ServicePayment">
    <h1 class="title"> Оплата услуги </h1>
    <service-item />
    <pay-methods class="payMethods" />
    <user-companies class="userCompanies" /> 
    <div class="btn-wr">
      <div class="msg" v-if="msg"> {{ msg }}</div>
      <my-blue-btn @click="getBill"> Получить счёт </my-blue-btn>
      <div class="price-wr">
        <p class="text"> К оплате </p>
        <p class="price"> 15 000 руб </p>
      </div>
      <my-semipolar-spinner v-if="showPreloader" /> 
  </div> 
</div> 
</template> 

<script>
import UserCompanies from "@/components/Company/UserCompanies"
import PayMethods from "@/components/ServicePayment/PayMethods.vue"
import ServiceItem from "@/components/ServicePayment/ServiceItem.vue"
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "service-payment",
  components: { ServiceItem, PayMethods, UserCompanies },
  data() {
    return {
      msg: '',
      showPreloader: false
    } 
  },

  computed: {
    ...mapGetters(["SEARCH_PRODUCT_APPL", "CURRENT_USER"])
  },

  methods: {
    ...mapActions(['GET_BILL']),

    getBill() {
      debugger
      if (!this.CURRENT_USER) {
        this.$router.push('/customer/signin')
        return
      }
      this.showPreloader = true
      const data = {
        "product_name": this.SEARCH_PRODUCT_APPL.name,
        "product_amount": this.SEARCH_PRODUCT_APPL.amount,
        "one_volume": this.SEARCH_PRODUCT_APPL.one_volume,
        "material": this.SEARCH_PRODUCT_APPL.material,
        "color": this.SEARCH_PRODUCT_APPL.color,
        "package": this.SEARCH_PRODUCT_APPL.package,
        "sample_for_replication": this.SEARCH_PRODUCT_APPL.sample_for_replication,
        "description_of_functionality": this.SEARCH_PRODUCT_APPL.description,
        "is_logo": this.SEARCH_PRODUCT_APPL.is_logo,
        "is_brand": this.SEARCH_PRODUCT_APPL.brand_name, // ???
        "location_logo": this.SEARCH_PRODUCT_APPL.location_logo,
        "note": this.SEARCH_PRODUCT_APPL.note,
      }
      this.GET_BILL(data)
        .then(res => {
          this.showPreloader = false
          this.msg = res
          setTimeout(() => { this.msg = '' }, 2000)
        })
        .catch(err => {
          this.showPreloader = false
          this.msg = err
          setTimeout(() => { this.msg = '' }, 2000)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ServicePayment {
  margin-bottom: 45px;
}

.price-wr {
  @include flex(column, flex-start, flex-start, 6px);
}

.price {
  @include font(20px, 600, $font-color3);
}

.btn-wr {
  @include flex(row, flex-start, center, 30px);
}
.title{
  @include title_h2;
  margin-bottom: 45px;
}

.text {
  @include font(14px, 500, $font-color3);
  line-height: 21px;
}

.payMethods {
  margin-top: 60px;
}

.userCompanies {
  margin-bottom: 60px;
}

</style>