<template>
  <div class="progress">
    <my-white-btn  
      class="btn"
      @click="goBack"
    > <font-awesome-icon icon="fa-solid fa-chevron-left" />
      Назад
    </my-white-btn>
     <div class="progress__bar">
       <h3 class="progress__title">Заполнено на {{step}}</h3>
       <div class="progress__border">
          <div class="progress__line" :style=" {'width': step }"></div>
       </div>
     </div>
    <my-white-btn 
      class="btn" 
      @click.stop="GO_TO_NEXT_STEP(this.$route)" 
      :disabled="isBtnDisabled" 
      :class="{'disabled': isBtnDisabled }" 
      >Далее  
      <font-awesome-icon icon="fa-solid fa-chevron-right icon" />
    </my-white-btn>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
  export default {
  data(){
    return{
      name:'application-progress-bar', 
      width:''
    }
  },

  computed:{
    ...mapGetters(["COUNTRY", "CITY", "TO_ADDRESS", "INPUT", "APPLICATION_DESCRIPTION", 
                    "WEIGHT", "CAPACITY", "DATE_OF_READINESS", "DOCS", "QUANTITY", "SERVICES",
                    "ADDRESS_FROM", "FACTORY_CONTACT", "COMMENT_FOR_SERVICE"]),

    step(){
      if(this.$route.name === 'start-application') return '17%'
      if(this.$route.query.step === 'cities'){
      return '17%'
      } else if(this.$route.query.step === 'naming'){
      return '33%'
      } else if(this.$route.query.step === 'ApplicationDescription'){
      return '50%'
      }  else if(this.$route.query.step === 'additional_services'){
      return '67%'
      }  else if(this.$route.query.step === 'delivery_type'){
      return '83%'
      }  else if(this.$route.query.step === 'info'){
      return '100%'
      } 
      return ''
    },

    isBtnDisabled() {
      if (this.$route.name === 'start-application' && !this.COUNTRY) return true
      if (this.$route.query.step === 'cities' && (!this.CITY || !this.TO_ADDRESS)) return true
      if (this.$route.query.step === 'naming' && !this.INPUT ) return true
      if (this.$route.query.step === "ApplicationDescription") {
        if ((!this.INPUT && !this.APPLICATION_DESCRIPTION) || !this.QUANTITY || !this.WEIGHT || 
            !this.CAPACITY || !this.DATE_OF_READINESS || !this.DOCS.order_invoice.file || !this.DOCS.order_packing_list.file ) return true
      }
      if (this.$route.query.step === "additional_services"  ) {
        if (this.SERVICES.length ) return false
         else return this.COMMENT_FOR_SERVICE ?  false : true
      }
      if (this.$route.query.step === "info") {
        if (!this.ADDRESS_FROM.from_city || !this.ADDRESS_FROM.from_address || !this.FACTORY_CONTACT.agent_fullname ||
        !this.FACTORY_CONTACT.agent_phone_number || !this.FACTORY_CONTACT.agent_email ) return true
      }
    
      return false  
    }
  },
 
  methods:{
    ...mapActions([
      'GO_TO_NEXT_STEP', 'GO_TO_PREV_STEP'
    ]),

    ...mapMutations([
      'SAVE_INPUT_VALUE'
    ]),

    goBack(){
      this.$router.go('-1')
      this.SAVE_INPUT_VALUE('')
    }
  }
    
  }
</script>

<style lang="scss" scoped>

.disabled {
  @include disabled;
}

.progress{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #D9E1E7; 
  padding-top: 4.2rem;
  margin-bottom: 50px;
  margin-top: 2rem;
  width: 100%;
  gap:2rem
}
.progress__title {
  font-weight: 600;
  font-size: 17px;
  line-height: 26px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
}

.progress__bar{
  flex-grow: 1;
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
  border: none !important;
}
 

.svg-inline--fa{
  margin:0 8px;
  font-size: 1.4rem;
}

</style>