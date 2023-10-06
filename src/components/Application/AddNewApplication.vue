<template> 
  <div 
    class="btn-box" 
    @click="goTo" 
  >
    <div 
      class="addNewApplication" 
      id="delivery"
      >
      <img :src="require(`@/assets/images/icons/plus.png`)" alt="icon" class="img" id="delivery">
      <p class="text" id="delivery"> Доставка и ТО</p>
    </div>

    <div class="addNewApplication" id="cost_calc" >
      <img  
        :src="require(`@/assets/images/icons/plus.png`)" 
        alt="icon" 
        class="img" id="cost_calc">
      <p class="text" id="cost_calc"> Платная консультация и <br> расчет стоимости </p>
    </div>

    <div class="addNewApplication" id="search_product" >
      <img :src="require(`@/assets/images/icons/plus.png`)" alt="icon" class="img" id="search_product">
      <p class="text" id="search_product"> Поиск товара </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
  export default {
    name:'add-new-application',
   data(){
    return{
      url: 'plus.svg'
    }
   },

   computed: {
    ...mapGetters(["FID"]),
   },

   methods: {
    ...mapMutations([
      'SET_CLEAR_NEW_APPLICATION', 
      'SET_CLEAR_INVOICE_AND_PLIST', 
      'SET_IS_APPLICATION_COMPLETE',
      'SET_CLEAR_IMG',
      'SET_CLEAR_DOCS',
      "SET_CLEAR_ADDITION_DATA",
      "SET_CLEAR_SERVICES",
      "CLEAR_SEARCH_PRODUCT_APPL",
      "CLEAR_SELECTED_ORDERS"
    ]),
 
    goTo(event) {
      this.SET_IS_APPLICATION_COMPLETE(false)
      this.SET_CLEAR_SERVICES()
      this.SET_CLEAR_ADDITION_DATA()
      this.SET_CLEAR_NEW_APPLICATION()
      this.SET_CLEAR_INVOICE_AND_PLIST()
      this.SET_CLEAR_IMG()
      this.SET_CLEAR_DOCS()
      this.CLEAR_SEARCH_PRODUCT_APPL()
      this.CLEAR_SELECTED_ORDERS()

      switch(event.target.id) {
        case 'delivery': this.$router.push('/start-application')
        break
        case 'cost_calc': this.$router.push('/cost-calculation?step=FromWhichCountry')
        break
        case 'search_product': this.$router.push('/search_product/?step=SearchProductComp')
        break
      }
       
    }
   },
    
  }
</script>

<style lang="scss" scoped> 

.btn-box {
  @include flex(row, space-between, center, 2rem);
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 1rem
  }
}
.text {
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  color: #339DFF;

  @media (max-width:600px) {
    @include font(1.4rem, 600, $main-color);
    flex-grow: 1;
  }
}
.addNewApplication {
  height: 7rem;
  border: 2px solid #339DFF;
  border-radius: 10px;
  @include flex(row, center, center, .5rem);
  cursor: pointer;
  flex-grow: 1;
  padding: 0 1.5rem;

  @media (max-width: 600px) {
    height: fit-content;
    gap:5px;
    padding: 1rem 4rem;
  }
}

.img{
  @media (max-width: 600px) {
    height: 2rem;
  }
}

.disabled {
  @include disabled
}
</style>