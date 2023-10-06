<template>

<div class="input-box" >
  <input  
    class="input"
    v-model.trim="value"  
    @click="showListFn"   
    @input="filterCountryFn"
    @keydown="keydownHandler" 
    :placeholder="setPlaceholder" 
    :id="id"
  >
  <p class="errorMsg" v-if="errorMsg">{{ errorMsg }}</p>
  <slot> </slot>
  <ul v-if="showList" class="input__ul">
    <li 
      ref="i"
      @click="select"
      v-for="(el,i) in filtered" 
      :key="i" 
      class="input__li"
      :class="{'selected': setSelected(i)}"
      > {{ el }}
    </li>
  </ul>
</div>
</template>

<script>
import { numValidation } from "@/helpers/validation"
import citiesOnly from "@/api/citiesApi"
import countries from "@/api/countries"
import { mapMutations, mapGetters } from "vuex"

  export default {
    name:"my-input",
    props:{
      id:{ 
        type: String
      }
    },

    data(){
      return{
        path: this.$route.path,
        value: "",
        showList: false,
        filtered: null,
        placeholder:"",
        innerWidth: window.innerWidth,
        errorMsg: "",
        selectedItem: 0
      }
    },

    computed:{ 
      ...mapGetters([
        "INPUT", "SELECTED_ID", "COUNTRY", "CITY", "APPLICATION_NAME", "OFFER_PRICE", "COST_CALCULATION_APPL",
        "SELECTED_ORDER"
      ]), 
// eslint-disable-next-line
      setPlaceholder(){ // dinamic placeholder 
        if(this.$route.query.step === "cities" || this.id === "cities" ){
            return  "Haпример Москва"
          } else if (this.$route.query.step === "naming" ){
            return this.APPLICATION_NAME ? this.APPLICATION_NAME : ""
          } else if (this.$route.query.form === "dialog"){
            return  "100 000"
          } else if (this.id === "country"){
            return this.COUNTRY ? this.COUNTRY : "Например Китай"
          }
      },
    },


    methods:{
      ...mapMutations([
        "SET_INPUT", "SAVE_INPUT_VALUE","SET_OFFER_PRICE", "SET_VALUE_FOR_SELECTED_ORDER"
      ]),

      keydownHandler({key}) {
        if (!this.$refs.i) return
        const scrollElem = this.$refs.i[this.selectedItem]
        const maxItem = this.$refs.i[0]?.textContent === "Афганистан" ? 242 : citiesOnly.length - 1
        switch(key) {
          case "ArrowDown": 
          if(this.selectedItem < maxItem) this.selectedItem++
            if (this.selectedItem % 3 === 0 ) {
              scrollElem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
            }
            break
          case "ArrowUp":
            if(this.selectedItem > 0) this.selectedItem--
            if (this.selectedItem % 2 === 0 ) {
              scrollElem.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            }
            break
          case "Enter":
            this.select(scrollElem.textContent)     
        }
        
      },

      setSelected(index) {
        if (this.selectedItem === index) return true
        return false
      },

      showListFn() {
        const inputBox = this.$parent.$refs.inputBox;

        if (inputBox) {
          inputBox.scrollIntoView();
        }
      },

      filterCountryFn(event) {
        this.showList = true;

        if(this.id === "priceOfWork") {
          this.errorMsg = numValidation(event)
          if (this.errorMsg) this.$emit("error", false) 
          if (!this.errorMsg) this.$emit("error", true) 
          !this.errorMsg ? this.SAVE_INPUT_VALUE(this.value) : console.log(this.errorMsg)
          return
        } 

        this.SAVE_INPUT_VALUE(this.value)

        if (
          this.$route.path === "/" 
          || this.SELECTED_ID === "country" 
          || this.$route.path === "/start-application" 
          || this.$route.query.step === "FromWhichCountry"
          ) {
          this.filtered = countries.filter(el => 
          el.toLowerCase().includes(this.value.toLowerCase()))
        } 
        
        if (this.$route.query.step === "cities" || this.SELECTED_ID === "cities"){ 
          this.filtered = citiesOnly.filter(el => 
          el.toLowerCase().includes(this.value.toLowerCase()))
        } 
        
        if (this.$route.query.form === "dialog") {
          this.SET_OFFER_PRICE(this.value)
        }
 
      },

      select(event){
        if (typeof(event) === "object") {
          this.value = event.target.textContent
          this.SAVE_INPUT_VALUE(this.value)
          this.SET_INPUT(this.$route)
          this.showList = false
        } else {
          this.value = event
          this.SAVE_INPUT_VALUE(this.value)
          this.SET_INPUT(this.$route)
          this.showList = false
        }

        const nextEl = document.querySelector("#toAddress")
        if (nextEl) nextEl.focus()
      },
    }, 

    watch:{
       INPUT(){
          this.value = this.INPUT
       },
    },

  mounted() {
    // подставляем нужный dropdown
    if (this.$route.query.step === "cities" || this.SELECTED_ID === "cities") {
      this.filtered = citiesOnly
    } else if (this.$route.path === "/" || 
               this.SELECTED_ID === "country" || 
               this.$route.path === "/start-application" ||
               this.$route.query.step === "FromWhichCountry") {
      this.filtered = countries
    }

    // подставляем нужный инпут 
    if(this.$route.path === "/" || this.$route.path === "/start-application" || this.id === "country"){
      if (this.$route.name === "customer-order" && this.$route.query.type === "cost")  {
        this.value = this.SELECTED_ORDER.from_country
      } else this.value = this.COUNTRY ? this.COUNTRY : this.SELECTED_ORDER.from_country
    } else if(this.$route.query.step === "naming" || this.id === "naming" ){
      this.value = this.APPLICATION_NAME ? this.APPLICATION_NAME : this.SELECTED_ORDER.name
    } else if(this.$route.query.step === "cities" || this.id === "cities" ){
      if (this.$route.name === "customer-order" && this.$route.query.type === "cost") {
        this.value = this.SELECTED_ORDER.to_city
      } else this.value = this.CITY ? this.CITY : this.SELECTED_ORDER.to_city
    } else if(this.$route.path === `/provider/application/${this.$route.params.id}`){
      this.value = this.OFFER_PRICE ?  this.OFFER_PRICE : ""
    } 

    if(this.$route.path === "/" ) {
      document.querySelector("input").style.borderRadius = "1rem 0 0 1rem"
    }
  }

}
</script>

<style lang="scss" scoped>
.input-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
 
  .input {
    width: 100%;
    height: 5.2rem;
    border: 2px solid #D9E1E7;
    border-radius: 1rem ;
    background-color: #EEEEF0;
    color: $font-color2;
    display: block;
    font-size: 1.7rem;
    line-height: 2.3rem;
    font-weight: 500;
    padding: 0.7rem 1.25rem;
    outline: none;

    @media (max-width:600px) {
      @include font(1.4rem, 500, $font-color2);
      line-height: 1.9rem;
      height: 4rem;
   }
  }

  .errorMsg{ 
    @include font(1.2rem, 500, red);
    line-height: 2.3rem;

    @media (max-width:600px) {
      @include font(1.2rem, 500, red);
      line-height: 1.9rem;
   }
  }

  .input-mobile{
    border-radius: 1rem;
  }

    .input__ul {
      transition: 1s;
      max-height: 20rem;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 5px 2rem rgba(6, 21, 43, 0.15);
      border-radius: 1rem;
      overflow-y:scroll;
    }

     .input__li {
       text-align: left;
       font-weight: 500;
       font-size: 1.7rem;
       line-height: 2.6rem;
       font-feature-settings: "pnum" on, "lnum" on;
       color: #244156;
       cursor: pointer;
       text-transform: capitalize;
       padding: 1.2rem 3rem;
       height: 5rem;

       @media (max-width:600px) {
          @include font(1.4rem, 500, $font-color2);
            line-height: 1.9rem;
            height: 4rem;
            padding: 1rem 1.5rem;
          }
     }

     .input__li:hover{
        background-color: #F1F4FA;
        color: #339DFF;
       }

      .selected {
        background-color: #F1F4FA;
        color: #339DFF;
      }
     }

::placeholder{
   color: #809FB8;
}

::-webkit-scrollbar{
  width: 1rem;
  background-color: #F1F4FA;
}

::-webkit-scrollbar-thumb{
  background:#416782;
  border-radius: 5px;
  height: 5rem;
}




</style>