<template>
  <div class="inputInn">
    <p class="formElem__title">ИНН компании</p>
    <input 
      type="text" 
      class="input" 
      ref="inn"
      id="inn"
      v-model.trim="inputInn" 
      :class="{invalid: isInnValid}"
      @input="showSuggestions"
    >
    <ul class="companiesDropDown">  
      <li 
        class="dropDownItem" 
        v-for="(company, i) in COMPANIES_LIST" 
        :key="i" 
        @click="selectCompany"
      >
        <p> {{ company }} </p>
      </li> 
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
  export default {
    name: 'da-data_inn',
    data(){
      return{
        inputInn:''
      }
    },

    computed:{
      ...mapGetters([
        'COMPANIES_LIST'
      ]),

      isInnValid() {
        if (this.inputInn.length === 0) return false;
        return this.inputInn.length >= 10 && this.inputInn.length <= 12 ? false : true;

      }
    },

    methods:{
      ...mapMutations([
        'SET_COMPANIES_LIST', 
        'SET_NEW_COMPANY_FORM', 
        'SET_VALIDATION_ERR',
        'SAVE_INPUT_VALUE',
      ]),
      ...mapActions([
        'GET_COMPANIES_FROM_DADATA'
      ]),
      showSuggestions(){
        this.SET_VALIDATION_ERR('clear')
         if(this.inputInn.length > 2){
          this.GET_COMPANIES_FROM_DADATA(this.inputInn)
         }
      },

      selectCompany(event){
        this.inputInn = event.target.textContent.split(' ')[0];
        this.SET_NEW_COMPANY_FORM(this.inputInn); // заполняем поля формы
        this.SET_COMPANIES_LIST(); // закрываем выпадающий список  
        this.SAVE_INPUT_VALUE(this.inputInn);
      },

      hideDropdown() {
        this.SET_COMPANIES_LIST()
      },
    },

    watch: {
      inputInn() {
        if (this.inputInn.length >= 10) this.$emit("innValidation", true);
        else this.$emit("innValidation", false)
      }
    },

    mounted() {
      this.$refs.inn.focus()
    }
  }
</script>

<style lang="scss" scoped>

.invalid{
  @include invalid ;
}
.companiesDropDown{
 @include dropDown
}
.dropDownItem{
 @include dropDownItem;
}
.input{
  @include input;
}
.error{
  margin-bottom: 20px;
}

.inputInn{
  @include flex(column, center, flex-start, 0px);
  width: 100%;
}
.formElem__title{
  @include form-label;
}

</style>