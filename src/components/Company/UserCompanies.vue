<template>
  <div class="userCompanies">
    <h3 class="title">Мои фирмы</h3> 
    <div class="company">
      <p class="subtitle">Фирмы</p> 
      <radio-list-box
        :title="'Добавить компанию'" 
        class="radioListBox"
        :id="'addNewCompany'" 
      />
      <hr class="hr"> 
      <p class="subtitle">Счета</p>    
      <radio-list-box 
        :data-tooltip="FID ? '' :'Сначала надо добавить компанию' "
        :title="'Добавить реквизиты'"
        :id="'addCompanyDetails'" 
        class="radioListBox"
      />
    </div>
  </div>
</template>

<script>
import RadioListBox from "../RadioListBox.vue"
import { mapActions, mapGetters, mapMutations } from "vuex"
export default {
  components:{ RadioListBox },

  data() {
    return {
      name: "user-companies",
    }
  },
 
  computed: {
    ...mapGetters([
      "BANK_ID", "BANK_NAME", "CURRENCY_TYPE", "FID", "FIRMS"
    ]),

    radioLable() { // если фирма есть в базе- отрисовываем в кабинете пользователя
      if (!this.BANK_ID) {
        return null
      } else {
        return `${this.BANK_NAME}, ${this.CURRENCY_TYPE}`
      }
    }
  },

  methods: {
    ...mapMutations([
      "SHOW_DIALOG"
    ]),

    ...mapActions([
      "DELETE_BANK" 
    ]),

    changeCompany() {
      this.SHOW_DIALOG("addNewCompany") // передаем ключ по которому будет открываться нужное окно
    },
  }

}
</script>

<style lang="scss" scoped>

[data-tooltip]::after {
  content: attr(data-tooltip); /* Выводим текст */
  opacity: 0;
  // display: none;
  transition: 1s;
  pointer-events: none;
  position: relative;
  bottom: 2.8rem;
  left: 24.5rem;
  @include font(1.7rem, 600, red);

  @media (max-width: 600px) {
    bottom: 0px;
    left: 0px;
  }
}

[data-tooltip]:hover::after {
  opacity: 1;
  // display: block;
}

  .addCompany{
    @include flex(row, center, center, 1rem);
    height: 4.2rem;
    width: 100%;
    left: 71.3rem;
    top: 119.5rem;
    border: 2px solid #D9E1E7;
    border-radius: 1rem;
    margin-bottom: 12.6rem;
    cursor: pointer;
    .btnName{
      @include font(1.7rem, 600, $main-color);
      line-height: 2.6rem;
    }
  }

  .hr{
    margin: 2rem 0;
  }

.company{
 background-color: #FFFF;
 padding: 2rem 3rem;
 margin-bottom: 2rem;
 width: 100%;

 @media (max-width: 600px) {
   padding: 2rem 1rem;
 }
}

.userCompanies{
  @include flex(column, center, flex-start, 0);
  margin-bottom: 9rem;
}

.subtitle{
  @include font(1.7rem, 600, #416782);
  line-height: 2.6rem; 
  text-align: left;
  margin-top: 2rem; 

  @media (max-width:600px) {
    margin-top: 0;
  }
}

.radioListBox{
  @include flex(column, center, flex-start, 0);
}
.note{
  margin-bottom: 4.5rem;
}

.myCompanies__subtitle {
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  margin: .5rem 0 2rem 0 ;
}

.radioList{
  margin-top: 3rem;
}


.radio-btn{
  @include radio-btn;
}

.fa-pen-to-square, .fa-xmark{
  font-size: 2rem;
}
.title{
  @include title_h3;
  margin-bottom: 2rem;
}

</style>