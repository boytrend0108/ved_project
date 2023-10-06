<!--Динамическая форма для измения значений полей анкеты пользователя.
    В зависимоти от SELECTED_ID показывает нужные поля
-->
<template> 
  <div class="application-form">
    <h3 class="application-form__title"> {{ title }} </h3> 

    <div class="application-form__content">
      <my-input class="selector__input" 
        v-if="this.SELECTED_ID === 'country' || 
              this.SELECTED_ID === 'cities'  ||  
              this.SELECTED_ID === 'naming'   "  
        :id="this.SELECTED_ID" 
      /> 

      <div class="input-wr" v-if="showToAddress">
        <h3 class="form__title2">Адрес доставки груза</h3> 
        <my-info-input :name="'toAddress'" />   
      </div>

      <div>
        <application-services v-if="this.SELECTED_ID === 'additional_services'" @hideBtn="hideBtnFn" />

        <div class="params" v-if="showParams" >  
          <my-text-area class="textaria-box " />
          <my-weight-input name="amount" @wrong_data="setBtnDisabled" />
          <my-weight-input name="gross" @wrong_data="setBtnDisabled" />
          <my-weight-input name="cargo_volume" @wrong_data="setBtnDisabled"/>
          <my-weight-input name="date_of_cargo_readiness" type="date" v-if="showDateInput" /> 
        </div>
    
        <application-shipping v-if="this.SELECTED_ID === 'delivery_type'" class="shipping" />

        <div v-if="this.SELECTED_ID === 'info1'" class="info">
          <my-info-input :name="'from_city'"/>
          <my-info-input :name="'from_address'" v-if="$route.query.type !== 'cost'"/>
        </div> 

        <div v-if="this.SELECTED_ID === 'info2'" class="info">
          <my-info-input :name="'agent_fullname'"/>
          <my-info-input :name="'agent_phone_number'"/>
          <my-info-input :name="'agent_email'"/>
        </div>
      </div> 
    </div>

    <my-btn 
      class="application-form__btn" 
      @click="changeData"
      :disabled="isBtnDisabled"
      :class="{'disabled': isBtnDisabled}"
    > 
      Coхранить 
    </my-btn >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ApplicationServices from '@/components/Application/ApplicationServices.vue';
import ApplicationShipping from '@/components/Application/ApplicationShipping.vue';

  export default {
    name:'application-form',
    components: { 
      ApplicationServices, 
      ApplicationShipping, 
    },
    data() {
      return {
        isInputChanged: false,
        isBtnDisabled: false,
        hideBnt: false,
        validationErrors: []
      }
    },
    computed:{
      ...mapGetters([
        'TITLE', 'SELECTED_ID','INPUT_NAME', "INPUT", "SELECTED_ORDER"
      ]),
 
      title() {
        switch(this.SELECTED_ID) {
          case "country": return this.TITLE.country;
          case "cities": return this.TITLE.cities;
          case "naming": return this.TITLE.naming;
          case "product": return this.TITLE.product;
          case "additional_services": return this.TITLE.additional_services;
          case "delivery_type": return this.TITLE.delivery_type;
          case "info": return this.TITLE.info;
          case "info1": return this.TITLE.info1;
          case "info2": return this.TITLE.info2;
          default: return ''
        }
      },
// eslint-disable-next-line
      showToAddress() {
        if (this.$route.name === "customer-order") return false
        if (this.SELECTED_ID === 'cities' && this.$route.name !== 'cost-calculation') return true
      },

      showDateInput() {
        if ( this.$route.name === 'cost-calculation' ) return false
        if ( this.$route.query.type === "cost") return false
        return true
      },

      showParams() {
        if (this.SELECTED_ID === 'description' ) return true
        if (this.SELECTED_ID ===  'amount' ) return true
        if (this.SELECTED_ID ===  'gross' ) return true
        if (this.SELECTED_ID ===   'cargo_volume') return true
        return false
      } 
    },

  methods: {
    ...mapMutations([
      'SET_INPUT', "SHOW_DIALOG",'SET_SERVICE', 'SET_SHIPPING',
      'SWITCH_SHOW_APPLICATION_FORM', "SAVE_INPUT_VALUE",
    ]),

    changeData() {
      if (this.SELECTED_ID === "description" && !this.isInputChanged) {
        this.SAVE_INPUT_VALUE(this.SELECTED_ORDER.description)
        this.SET_INPUT(this.$route);
        this.SHOW_DIALOG()
      } else {
        this.SET_INPUT(this.$route);
        this.SHOW_DIALOG()
        this.isInputChanged = false
      }
      this.$emit("close_dialog")
    },

    setBtnDisabled(data) {
      switch (data.id) {
        case "amount": this.validationErrors[0] = data.status
        break
        case "gross": this.validationErrors[1] = data.status
        break
        case "cargo_volume": this.validationErrors[2] = data.status
        break
      }
      for (let el of this.validationErrors) {
        if (el === true) {
          this.isBtnDisabled = true
          break
        } else this.isBtnDisabled = false
      } 
    },

    hideBtnFn(status) {
      this.isBtnDisabled = status
    },

    closeDialog(){
      this.SWITCH_SHOW_APPLICATION_FORM(false)
      this.SHOW_DIALOG()
    }
  },

  watch: {
    INPUT() {
      this.isInputChanged = true
    }
  }
    
  }
</script>

<style lang="scss" scoped>

.application-form {
  @include formBox;
}
.application-form__title {
  @include selector__title;
  text-align:left;
}

.application-form__content {
  width: 100%;
  flex-grow: 1;
}

.disabled {
  @include disabled;
}
.textaria-box{
  margin-bottom: 20px !important;
}

.params{
  margin-bottom: 20px;
}
.input-wr{
  margin-bottom: 24px;
}

.fa-xmark{
  @include fa-xmark;
}

.selector__input{
  margin-bottom: 4.5rem;
  border-radius: 10px !important;
}

.textaria-box, .shipping{
  margin-bottom: 5.7rem;
}
.application-form__btn{
  width: 15rem;

  @media (max-width: 600px) {
    width: 100% ;
    height: 40px;
  }
}

.info{
  width: 100%;
  margin-bottom: 3.7rem;
}

.form__title2 {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #244156;
  margin-bottom: 2rem;
  margin-top: 4.5rem;
  text-align: left;

  @media (max-width: 600px) {
    @include font(17px, 600, #244156);
    line-height: 23px;
    margin-top: 20px;
  }
}

</style>