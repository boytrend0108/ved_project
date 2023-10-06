<template>
  <div class="radioListBox">
    <div class="wrapper" v-if="showElem" >
      <my-radio-list       
        :id="id"
        :index="0"
        class="radioList" 
      />
    </div> 
   
    <p  
      v-if="showMsg" 
      class="myCompanies__subtitle"
    >Вы ещё не добавили реквизиты своей фирмы</p>
    <p  
      v-if="showMsg2" 
      class="myCompanies__subtitle" 
    >Вы ещё не добавили банковские реквизиты</p>

    <my-add-btn 
      :title="title" 
      @click="addFirmOrBank"  
      :disabled="isDisabled"
      :class="{'disabled': isDisabled}"
      class="addBtn"
     />
  </div> 
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "radio-list-box",
  props: {
    title: {
      type: String
    },
    id:{
      type: String
    },
  },

  computed: {
    ...mapGetters([
     "FID", "FIRMS", "IS_FIRM", "IS_BANK", "BANK"
    ]),

    showElem() { // если фирма есть в базе- отрисовываем в кабинете пользователя
      switch (this.id) {
        case "addCompanyDetails":
          if (!this.IS_BANK ) {
            return null
          } else {
            return true
          }
        case "addNewCompany":
          if (!this.IS_FIRM) return null
            return true
        default: 
           return ""
      }
    },

    showMsg() {
      if(this.id === "addNewCompany" && !this.IS_FIRM ) return true
      return false
    },

    showMsg2() {
      if(this.id === "addCompanyDetails" && !this.IS_BANK ) return true
      return false
    },

// eslint-disable-next-line
    isDisabled() {
       if(this.id === "addCompanyDetails") {
        if (!this.FID) return true
          else return this.BANK[0].id ? true : false
       } else if (this.id === "addNewCompany") {
        return this.FID ? true : false
       }
    } 
  },
  methods:{
    ...mapMutations([
        "SHOW_DIALOG", "SET_ADD_OR_CHANGE_FIRM", "SET_ADD_OR_CHANGE_BANK"
      ]),

      addFirmOrBank() {
        if(this.id === "addNewCompany") {
          this.SET_ADD_OR_CHANGE_FIRM("addNewCompany")
        } else {
          this.SET_ADD_OR_CHANGE_BANK("addNewBank")
        }
        this.SHOW_DIALOG(this.id) 
      }
  }
}
</script>

<style lang="scss" scoped>

.wrapper{
  z-index: 1;
}

.addBtn{
  @media (max-width:600px) {
    margin-top: 2rem;
  }
}

.disabled{
  @include disabled;
}

.radioListBox{
  @include flex(column, center, flex-start, 0);
}
.radioList{
  margin-top: 3rem;

  @media (max-width: 600px) {
    margin-top: 2rem;
  }
}

.myCompanies__subtitle {
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  margin: .5rem 0 2rem 0 ;

  @media (max-width: 600px) {
    @include font(1.4rem, 500, #416782);
    line-height: 2.1rem;
  }
}


</style>