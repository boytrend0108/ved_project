<template>

  <footer class="footer">
    <my-color-btn 
      class="backBtn"
      @click="stepBack"
    >Назад
    </my-color-btn> 

    <my-semipolar-spinner v-if="showPreloader" />
    <p v-if="error" class="error"> Ошибка при создании заявки </p>

    <my-color-btn
      v-if="showBtn"
      class="shareBtn2" 
      @click="createOrder"
    >
      Создать заявку
    </my-color-btn>

    <p class="warningMsg" v-if="!ORDER_TYPE">Для продолжения нажмите кнопку "Назад"</p>
  </footer>

</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "footer-comp",
  data() {
    return {
      showPreloader: false,
      error: false
    }
  },

  computed: {
    ...mapGetters(["FID", "ORDER_TYPE", "BANK"]),

    showBtn() {
      if (this.FID && this.BANK[0].bic && this.ORDER_TYPE) return true
      else return false
    }
  },
 
  methods: {
    ...mapActions([ 

      "GO_TO_NEXT_STEP", 
      "CREATE_CUSTOMER_ORDER", 
      "COST_CALCULATION_ORDER_CREATE", 
      "CREATE_ORDER_SEARCH_PRODUCT",
    ]),
    ...mapMutations([
      "SET_CLEAR_NEW_APPLICATION", 
      "SET_FILTER_TYPE", 
      "CLEAR_SEARCH_PRODUCT_APPL", 
      "SET_ORDER_TYPE",
      "SET_FILTER_STATUS"
    ]), 

    stepBack() {
      switch (localStorage.getItem("application_type")) {
        case "delivery": this.$router.push("/customer/new-application?step=check")
        break
        case "cost": this.$router.push("/cost-calculation/?step=ApplicationCheck")
        break
        case "search": this.$router.push("/search_product/?step=SearchProductSummary")
        break
      }
    }, 

    createOrder() {
      this.showPreloader = true 
      this.SET_FILTER_STATUS("Все")
      switch (this.ORDER_TYPE) {
        case "delivery": 
          this.CREATE_CUSTOMER_ORDER() // newApplication.js
          .then(() => {
            this.showPreloader = false
            this.SET_CLEAR_NEW_APPLICATION()
            this.SET_FILTER_TYPE("Доставка")
            localStorage.setItem("application_type", "")
            this.$router.push("/customer/my_applications?type=delivery")
            this.SET_ORDER_TYPE('')
          }) 
          .catch(err => {
            this.showPreloader = false
            this.error = true
            setTimeout(() => { this.error = false }, 3000);
            console.log(err)
          })
          break

        case "cost":
            this.COST_CALCULATION_ORDER_CREATE()
            .then(() => {
              this.showPreloader = false
              this.SET_FILTER_TYPE("Расчет стоимости") 
              localStorage.setItem("application_type", "")
              this.$router.push("/customer/my_applications?type=cost")
            })
            .catch(() => {
               this.showPreloader = false
               this.showError = true
               setTimeout(() => {this.showError = false}, 3000)
            })
         break
        case "search": 
          this.showPreloader = true
          this.CREATE_ORDER_SEARCH_PRODUCT()
            .then(() => {
              this.showPreloader = false
              this.SET_FILTER_TYPE("Поиск товара")
              localStorage.setItem("application_type", "")
              this.$router.push("/customer/my_applications?type=search")
              this.CLEAR_SEARCH_PRODUCT_APPL()
            })
            .catch(() => { 
              this.showPreloader = false
              this.showError = true
              setTimeout(() => { this.showError = false }, 3000)
            })
         break
      }
     
    }

  }
} 
</script>

<style lang="scss" scoped>

.warningMsg {
  @include errorMsg;
  text-align: left;
  margin-left: 10px;
}

.footer {
  border-top: 2px solid #D9E1E7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 90px 0 120px 0 ;

  @media (max-width: 600px) {
    padding: 3rem 0;
  }
}

.backBtn {
  @include myColorBtn(#416782,#EEEEF0, #EEEEF0);
}
.shareBtn2 {
  @include myColorBtn(#FFFFFF, #339DFF, #339DFF);
}
.error {
  @include errorMsg;
}

</style>