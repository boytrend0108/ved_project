<template>
  <div class="progress-mobile" v-if="showProgressBar">

    <div class="progress__bar">
       <h3 class="progress__title">Заполнено на <span class="span"> {{ STEP }} </span></h3>
       <div class="progress__border">
          <div class="progress__line" :style=" {'width': STEP }"></div>
       </div>
     </div>
 
    <div class="btn-wr">
      <my-white-btn 
      class="btn"
      @click="PREVIOUS_STEP(this.$route.query.step)"
    > <font-awesome-icon icon="fa-solid fa-chevron-left" />

    </my-white-btn>
    
    <my-white-btn 
      id="nextBtn"
      class="btn btn-right" 
      @click.stop="NEXT_STEP(this.$route.query.step)" 
      :disabled="isNextBtnDisables"
      :class="{'disabled': isNextBtnDisables}" >Далее  
      <font-awesome-icon icon="fa-solid fa-chevron-right icon" />
    </my-white-btn>
    </div>
   
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
  export default {
  data(){
    return{
      name:"progress-bar-mob",
      width:"",
    }
  },

  computed: {
    ...mapGetters(["INPUT_VALIDATION_ERR", "INPUT", "COST_CALCULATION_APPL", "STEP", "PROGRESS", "COUNTRY", "CITY", "APPLICATION_NAME", "APPLICATION_DESCRIPTION", "WEIGHT", "CAPACITY", "QUANTITY", "DOCS", "SERVICES", "ADDRESS_FROM", "SEARCH_PRODUCT_APPL", "COMMENT_FOR_SERVICE"]),

    showProgressBar() {
      if(this.$route.query.step === "SearchProductSummary" ) return false
      else if(this.$route.query.step === "ApplicationCheck" ) return false
      else return true
    },

    isNextBtnDisables() {
      switch (this.$route.query.step ) {
        case "FromWhichCountry": return this.COUNTRY ? false : true
        case "cities": return this.CITY ? false : true
        case "naming": return this.INPUT ? false : true
        case "ApplicationDescription": 
          if (this.INPUT && this.WEIGHT && this.CAPACITY && this.QUANTITY ) return false
             else return true
        case "ApplicationServices":
          if (this.SERVICES.length ) return false
           else return this.COMMENT_FOR_SERVICE ?  false : true
        case "ApplicationAdditionInfo": 
          if (this.ADDRESS_FROM.from_city && this.ADDRESS_FROM.from_address) return false
            else return true
        case "SearchProductComp": 
          return (this.SEARCH_PRODUCT_APPL.name && this.SEARCH_PRODUCT_APPL.amount && !this.INPUT_VALIDATION_ERR ) ? false : true
        case "productDescription":
          if (this.INPUT_VALIDATION_ERR) return true
          if (this.SEARCH_PRODUCT_APPL.one_volume && this.SEARCH_PRODUCT_APPL.material && this.SEARCH_PRODUCT_APPL.color &&
              this.SEARCH_PRODUCT_APPL.package !== "Не выбрано" && this.SEARCH_PRODUCT_APPL.sample_for_replication !== "Не выбрано" &&
              this.SEARCH_PRODUCT_APPL.description) return false
              else return true
        case "productLogo" :
          if (!this.SEARCH_PRODUCT_APPL.is_logo) return false
          if (this.SEARCH_PRODUCT_APPL.brand_name && this.SEARCH_PRODUCT_APPL.location_logo) return false
             else return true
        case "productPhoto": 
          if (this.SEARCH_PRODUCT_APPL.note) return false
          else return true
        default: return false
      }
    }
  },

  methods:{
    ...mapActions([
      "NEXT_STEP", "PREVIOUS_STEP", "SHOW_PROGRESS"
    ]),

    ...mapMutations([
      "SAVE_INPUT_VALUE", "SET_COST_CALCULATION_APPL", "SET_INPUT"
    ]),

  },

  mounted() {
    if (this.$route.name === "cost-calculation") this.SHOW_PROGRESS(10)
    else this.SHOW_PROGRESS(25)
  }
    
  }
</script>

<style lang="scss" scoped>

.btn-wr{
  @include flex(row, center, center, 10px);
  width: 100%;
  margin-top: 20px;
} 

.progress-mobile{
  @include flex(column, space-between, center, 10px);
  border-top: 2px solid #D9E1E7;
  padding-top: 4.2rem;
  width: 100%;
}
.progress__title {
  @include font(13px, 500, #416782);
  line-height: 18px;
}

.span{
  @include font(13px, 600, $main-color);
  line-height: 18px;
}

.progress__bar{
  width: 100%;
}
.progress__border{
  height: 2px;
  background-color: #ECF0F3;
  margin-top: 1.3rem;
}
.progress__line{
  background-color: $main-color;
  // width: 25%;
  height: 4px;
}
.btn{
  background-color: $bg-color;
  color:#416782;
  border: none;
  height: 40px;
}
.btn-right{
  background-color: $main-color;
  color:#FFFF;
  border: none;
  height: 40px;
  width: 100%;
}
 
.svg-inline--fa{
  margin:0 8px;
  font-size: 14px;
}

.disabled {
  @include disabled;
}

</style>