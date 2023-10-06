<template>
  <section class="form" @click="hideDropdown">
    
    <h2 class="form-title">Новая фирма</h2>
   
      <div class="inputInn">
        <p class="formElem__title">ИНН</p>
        <input 
          type="text" 
          class="input" 
          v-model="inputInn"  
          @input="showSuggestions"
        > 
        <ul class="companiesDropDown">
          <li 
            class="dropDownItem" 
            v-for="(company,i) in COMPANIES_LIST" :key="i"
            @click="selectCompany"
          >
           <p> {{ company }} </p> 
          </li>
        </ul>
       </div>

    <my-company-form-elem 
      :title="'КПП'" 
      :value="FIRMS[0] && FIRMS[0].kpp ? FIRMS[0].kpp : '-'"/>
    <my-company-form-elem 
      :title="'ОГРН'" 
      :value="FIRMS[0] && FIRMS[0].ogrn? FIRMS[0].ogrn : '-'"/> 
    <my-company-form-elem 
      :title="'Наименование'" 
      :value="FIRMS[0] && FIRMS[0].long_name ? FIRMS[0].long_name : '-'" />
    <my-company-form-elem 
      :title="'Сокр. наименование'" 
      :value="FIRMS[0] && FIRMS[0].long_name ? FIRMS[0].long_name : '-'" />
    <my-company-form-elem 
      :title="'Юридический адрес'" 
      :value="FIRMS[0] && FIRMS[0].address_jur ? FIRMS[0].address_jur : '-'"/>
    <my-company-form-elem 
      :title="'Фактический адрес'" 
      :value="FIRMS[0] && FIRMS[0].address_fact ? FIRMS[0].address_fact : '-'"/>
    <my-company-form-elem 
      :title="'ФИО Гендиректора'" 
      :value="FIRMS[0] && FIRMS[0].director_name ? FIRMS[0].director_name : '-'"/>
    <my-company-form-elem 
      :title="'Email компании'" 
      :value="FIRMS[0] && FIRMS[0].email ? FIRMS[0].email : '-'"/>
    <my-company-form-elem 
      :title="'Телефон компании'" 
      :value="FIRMS[0] && FIRMS[0].phone_number ? FIRMS[0].phone_number : '-'" />
     <div class="btn-box">
        <my-color-btn 
          @click="onSubmit"  
          class="btn" 
          id="addNewCompany"
          :disabled="isDisabled"
          :class="{'disabled': isDisabled}"
        >Сохранить</my-color-btn> 
        <validation-errors
          v-if="true"
          :validation-errors="this.VALIDATION_ERRORS"
          class="error" 
        /> 
     </div>
   
  </section>


</template>
 
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
  export default {
    name:'new-company-form',
    components:{
    ValidationErrors,
},
    data(){
      return{
        inputInn:'',
      }
    },

    computed:{
      ...mapGetters([
        'FIRMS', 
        'VALIDATION_ERRORS',
        'COMPANIES_LIST', 
        "IS_FIRM", 'FID', 
        'SELECTED_FIRM', 
        'ADD_OR_CHANGE_FIRM',
        'IS_PHONE_VALID',
        'IS_EMAIL_VALID',
      ]),
 // eslint-disable-next-line
      isDisabled(){
        if(this.SELECTED_FIRM !== ''){
          if(this.IS_PHONE_VALID && this.IS_EMAIL_VALID && this.FIRMS[this.SELECTED_FIRM].address_fact && this.FIRMS[this.SELECTED_FIRM].phone_number &&    this.FIRMS[this.SELECTED_FIRM].email) return false
           return true
        } else return true // по умолчанию неактивна
      }
    },

    methods:{
      ...mapMutations([
        'SHOW_DIALOG', 
        'SET_CLICK',
        'SET_COMPANIES_LIST', 
        'SET_NEW_COMPANY_FORM', 
        'SET_VALIDATION_ERR', 
        'SET_NEW_INN'
      ]),
      ...mapActions([
        'SEND_NEW_COMPANY_TO_SERVER', 'DELETE_COMPANY', 'GET_COMPANIES_FROM_DADATA', 'UPDATE_COMPANY',
        "SET_SHOW_PRELOADER"
      ]),
 
      showSuggestions(){
        this.SET_VALIDATION_ERR('clear')
         if(this.inputInn.length > 2){
          this.GET_COMPANIES_FROM_DADATA(this.inputInn)
         }
      },
 
      selectCompany(event){
        this.inputInn = event.target.textContent.split(' ')[0]
        this.SET_NEW_COMPANY_FORM(this.inputInn) // заполняем поля формы
        this.SET_COMPANIES_LIST() // закрываем выпадающий список  
        this.SET_NEW_INN(true)
      },

      hideDropdown(){
        this.SET_COMPANIES_LIST()
      },

      async onSubmit() {
        this.SET_SHOW_PRELOADER(true)
        const form = {
          "inn":  this.FIRMS[0].inn,
          "kpp": this.FIRMS[0].kpp,
          "ogrn": this.FIRMS[0].ogrn,
          "long_name": this.FIRMS[0].long_name,
          "director_name": this.FIRMS[0].director_name,
          "address_fact": this.FIRMS[0].address_fact,
          "address_jur": this.FIRMS[0].address_jur,
          "email": this.FIRMS[0].email,
          "phone_number": this.FIRMS[0].phone_number
          }

          switch(this.ADD_OR_CHANGE_FIRM) {
             case 'addNewCompany' :
              this.SEND_NEW_COMPANY_TO_SERVER(form)
                .then(() => {
                  this.SET_SHOW_PRELOADER(false)
                  this.SHOW_DIALOG()
                }) 
                .catch((err) => {
                this.SET_SHOW_PRELOADER(false)
                console.log("throw==>", err)
              })
              break

             case 'changeFirm' :
              this.UPDATE_COMPANY(form)
                .then(() => {
                this.SET_SHOW_PRELOADER(false)
                this.SHOW_DIALOG()
                this.SET_NEW_INN(false) // cброс
              }) 
              .catch((err) => {
                this.SET_SHOW_PRELOADER(false)
                console.log("throw==>", err)
              })
              break
        }
          }

       
        
    },

    mounted(){
      if(this.SELECTED_FIRM === '') {
        this.inputInn = ''
      } else {
        this.inputInn = this.FIRMS[this.SELECTED_FIRM].inn
      }
    }

}

</script>

<style lang="scss" scoped>

.preloder{
  // margin: 0 auto;
  margin-top: 20px;
}

.btn-box{
  display: flex;
  margin-top: 45px;
  align-items: flex-end;
  justify-content: space-between;
  // gap: 27%;

  @media (max-width: 600px) {
    margin-top: 0;
    flex-direction: column;
  }
}
.disabled{
  @include disabled;
}
.companiesDropDown{
 @include dropDown
}
.dropDownItem{
 @include dropDownItem;
}
.inputInn{
  @include flex(column, center, flex-start, 0px)
}
.formElem__title{
  @include font(14px, 600, $font-color2);
  line-height: 30px;
}
.inputBox{
  position: relative;
}
.fa-xmark{
  position:absolute;
  top:16px;
  right: 16px;
  font-size: 20px;
  cursor: pointer;
  color: $placeholder-color;
}

::placeholder{
  @include placeholder;
}

.input{
  @include input;
}

.form{
  max-width: 60rem;
  padding: 45px 53px;

  @media (max-width:600px) {
    padding: 18px 15px;
    width: 100%;
  }
}
.form-title{
  @include title_h2;
  margin-bottom: 45px;
}

.btn{
  @include myColorBtn(#FFFFFF,#339DFF, #339DFF);
  margin-top: 45px;

  @media (max-width:600px) {
    margin-top: 30px;
    width: 100%;
  }
}

.error{
  margin-bottom: 20px;
}

</style>