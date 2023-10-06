<template>
  <div class="formElem">
    <div class="wrapper">
      <p class="formElem__title"> {{ title }} </p>
      <div class="value-wr">

        <div class="box-wr" v-if="showCB">
          <input  
           ref="checkBox"  
           type="checkbox" 
           id="factAddress" 
           @change="setFactAddress" 
           :checked="isChecked" 
          >
          <label 
            for="factAddress" 
            class="label"
          >Совпадает c юридическим адресом</label>
        </div>

        <input 
          id="factAddress" 
          ref="factAddress"
          type="text" 
          class="input" 
          :class="{validate: isValidate}"
          v-if="showInput"
          v-model="input"
          @input="setInput"
          @blur="inputValidatioin"
        >
        <div 
          class="forvElem_value "  
          v-if="showValue"
          :class="{'capitalize': title === 'ФИО Гендиректора'}"  
        > {{ value }}
        </div>
        <p class="error" v-if="wrongEmail"> {{ wrongEmail }}</p>
        <p class="error" v-if="wrongPhone"> {{ wrongPhone }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import {REGEXP_PHONE_NUMBER } from "@/constants/regExp"

  export default {
    name: 'my-company-form-elem',
    props:{
      title:{
        type: String
      },
      value: String,
    },
    data(){
      return{
        input: '',
        address_fact:'',
        email: '',
        phone_number:'',
        isChecked :false,
        wrongPhone: '',
        wrongEmail: '',
      }
    },

    computed:{
      ...mapGetters([
        'FIRMS','SELECTED_FIRM', 'NEW_INN' 
      ]),

      showCB(){
        if(this.$route.name === 'provider-profile') return false
        if(this.title === 'Фактический адрес') return true
        return false
      },

      showInput(){
        if(this.$route.name === 'provider-profile') return false
        if(this.title === 'Фактический адрес' || 
           this.title === 'Email компании' || 
           this.title === 'Телефон компании') return true
          return false
      },

      showValue(){
        if(this.$route.name === 'customer-profile' || this.$route.name === 'customer-page' ) {
          if(this.title === 'Фактический адрес' || 
           this.title === 'Email компании' || 
           this.title === 'Телефон компании') return false
          return true
        } else {
          return true
        }
       
      },

      isValidate(){ // для формы
        if(this.SELECTED_FIRM === '') return
        if(this.FIRMS[this.SELECTED_FIRM].inn){
          if(this.input) return false
          return true
        } return false
      },

    },

    methods:{
      ...mapMutations([
        'SET_COMPANY_DATA', 'SET_IS_INPUT_VALID', 'SET_NEW_INN'
      ]),

      setFactAddress(event){
        if(this.SELECTED_FIRM === '') return // если форма пустая- уходим
        this.SET_NEW_INN(false)
        this.isChecked = !this.isChecked
        if(event.target.checked){
          this.$refs.factAddress.value = this.FIRMS[this.SELECTED_FIRM].address_jur
          this.input = this.FIRMS[this.SELECTED_FIRM].address_jur // чтобы убрать валидацию
          // добавляем фактический адрес
          this.SET_COMPANY_DATA({key:'address_fact', value: this.FIRMS[this.SELECTED_FIRM].address_jur})
        } else {
          this.input = ''
          this.SET_COMPANY_DATA({key:'address_fact', value: ''})
        }
      },
 
      emailValidation(event){
        const email_reg =  /.+@.+\..+/i
        if (!email_reg.test(event.target.value)) {
          event.target.classList.add('invalid')
          this.wrongEmail = 'Наверный формат email'
          this.SET_IS_INPUT_VALID({status:false, id: 'isEmailValid'})
        } else {
          event.target.classList.remove('invalid')
          this.wrongEmail = ''
          this.SET_IS_INPUT_VALID({status:true, id: 'isEmailValid'})
        }
      }, 

      phoneValidation(event) {
        if (!REGEXP_PHONE_NUMBER.test(event.target.value)) {
          event.target.classList.add('invalid')
          this.wrongPhone = 'Неверный формат телефонного номера'
          this.SET_IS_INPUT_VALID({status:false, id: 'isPhoneValid'})
        } else {
          event.target.classList.remove('invalid')
          this.wrongPhone = ''
          this.SET_IS_INPUT_VALID({status:true, id: 'isPhoneValid'})
      }
    },

    inputValidatioin(event) {
      switch(this.title) {
        case 'Email компании' : this.emailValidation(event)
        break
        case 'Телефон компании' : this.phoneValidation(event)
        break
      }

    }, 

      setInput(event){
        if (this.NEW_INN)  this.SET_NEW_INN(false)
        if (this.isChecked) this.isChecked = false
        this.inputValidatioin(event)
        switch(this.title) {
          case 'Email компании' : this.SET_COMPANY_DATA({key:'email', value: this.input})
          break
          case 'Телефон компании' : this.SET_COMPANY_DATA({key:'phone_number', value: this.input})
          break
          case 'Фактический адрес' : this.SET_COMPANY_DATA({key:'address_fact', value: this.input})
        }
      },

    }, 

    watch: {  
      FIRMS: { // если меняется inn ощищаем эти поля
        handler() {
          if(this.title === 'Email компании' || this.title === 'Телефон компании' || this.title === 'Фактический адрес' ) {
            if(this.NEW_INN) {
              this.input = ''
              document.getElementById('factAddress').checked = false
            } else return
          }
       },
       deep: true
      }
    },

    mounted(){
      if(this.SELECTED_FIRM === '') return
      switch(this.title){
        case 'Фактический адрес':
          this.input = this.FIRMS[this.SELECTED_FIRM].address_fact
          break
        case 'Телефон компании':
          this.input = this.FIRMS[this.SELECTED_FIRM].phone_number
          break
        case 'Email компании':
          this.input = this.FIRMS[this.SELECTED_FIRM].email
          break
      }
      if(this.FIRMS[this.SELECTED_FIRM].address_fact === this.FIRMS[this.SELECTED_FIRM].address_jur && this.FIRMS[this.SELECTED_FIRM].address_jur !== "") {
        if (document.getElementById('factAddress'))  document.getElementById('factAddress').checked = true
      }
    }
  }
</script>

<style lang="scss" scoped>

.invalid{
  @include invalid;
}

.capitalize{
  text-transform: capitalize;
}
.disabled{
  @include disabled;
}

.validate{
  border: 2px solid red !important;
}

.input{
  @include input;
  height: 3rem;
  @include font(1.4rem, 600, $font-color2);
}

.label{
  @include font(1.2rem, 500, #416782);
  line-height: 1.4rem;
}

.error{
  @include font(1.2rem, 500, red);
  line-height: 1.4rem;
}
.box-wr{
  @include flex(row, center, center, .5rem);
  margin-top: 1rem;
}
.value-wr{
  min-width: 13rem;
  width: 100%;
  @include flex(column, center, flex-start, .5rem);
  margin: 1.2rem 0;

  @media (max-width:600px) {
    margin: 0;
  }
}

.wrapper{ 
  // max-width: 350px;
  @include flex(row, flex-start, center, 0);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0;
  }
}

.formElem{
  border-bottom: 1px solid #D9E1E7;
}

.forvElem_value{
  @include font(1.4rem, 600, $font-color2);
  max-width: 23rem;
  text-align: left;
}

.formElem__title{
  @include font(1.4rem, 500, $font-color2);
  width: 24rem;
  text-align: left;
  // line-height: 51px;
}

</style>