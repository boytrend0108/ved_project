<template>
  <div class="inputBox" >
     <p class="lable"> {{ lable }} </p>
     <input 
      ref="input"
      :id="id"
      class="input"
      :class="{'disabled': isDisabled }"  
      type="text"
      :placeholder="placeholder" 
      v-model.trim="value"
      @blur="saveInput"
      @keypress.enter="setFocus"
      @input="validate"
     >
     <p class="warning" v-if="warningMsg"> {{ warningMsg }}</p>
   </div>
</template>

<script>
import { numValidation } from "@/helpers/validation"
import { mapGetters, mapMutations } from "vuex"
  export default {
    name: "my-search-product-input",

    props:{
      lable:{
        type: String
      },
      placeholder:{
        type: String
      }, 
      id: String
    },

    data(){
      return{
        value: "",
        warningMsg: ""
      }
    },

    computed: {
      ...mapGetters([
        "SEARCH_PRODUCT_APPL"
      ]),

      isDisabled() {
        if(this.id === "brand_name" || this.id === "location_logo") {
          if(!this.SEARCH_PRODUCT_APPL.is_logo) return true
          return false
        } else return false
      }
      
    },

    methods: {
      ...mapMutations([
        "SET_SEARCH_PRODUCT_APPL", "SET_INPUT_VALIDATION_ERR"
      ]),

      saveInput(){
        const payload = {
          id: this.id,
          value: this.value
        }
        this.SET_SEARCH_PRODUCT_APPL(payload)
      },

      setFocus(){
        const data = {
          name: "amount",
          one_volume: "material",
          material: "color",
          color: "package", 
          package: "sample_for_replication",
          sample_for_replication: "description",
          brand_name: "location_logo"
        }
         document.querySelector(`#${data[this.id]}`).focus()
      },

      validate(event) {
        if (this.id === "amount" || this.id === "cargo_volume" || this.id === "gross") this.warningMsg = numValidation(event)
        if (this.warningMsg) this.SET_INPUT_VALIDATION_ERR(true)
          else this.SET_INPUT_VALIDATION_ERR(false)
        this.saveInput()
      }
   
    },

    watch: {
      "SEARCH_PRODUCT_APPL.is_logo"(){ // oчищаем данные если false
       if(!this.SEARCH_PRODUCT_APPL.is_logo){
        this.SET_SEARCH_PRODUCT_APPL({id:"brand_name", value: ""})
        this.SET_SEARCH_PRODUCT_APPL({id:"location_logo", value: ""})
        if(this.id === "brand_name" || this.id === "location_logo"){ 
           this.value = ""
           this.$refs.input.disabled = true
          } 
       } else {
        if(this.id === "brand_name" || this.id === "location_logo") {
          this.$refs.input.disabled = false
        }
       }
      }
    },

    mounted() {
      this.value = this.SEARCH_PRODUCT_APPL[this.id]
      // this.$refs.input.disabled = true
    }
  }
</script>

<style lang="scss" scoped>

.disabled{
  @include disabled;
}

.invalid{
  @include invalid;
}

.warning{
  @include font(1.4rem, 600, red);
  line-height: 2.1rem;
}
.inputBox{
  @include flex(column, center, flex-start, .5rem);
}
.lable{
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  text-align: left;
}

.input{
  @include input;
  max-width: 49.5rem;
  width: 100%;

  @media (max-width: 600px) {
    height: 4rem;
    width: 100%;
  }
}

::placeholder{
  @include font(1.7rem, 500, #809FB8);
  line-height: 2.6rem;
}

</style>