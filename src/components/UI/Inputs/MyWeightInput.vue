<template>
 <div class="input-box">
       <p class="input__title"> {{ title }}</p> 
       <input
         :id="name" 
         :type="type" 
         class="input" 
         :placeholder="placeholder" 
         v-model.trim="value"
         @input="validate" 
         @blur="validate"
      >
      <p class="warning" v-if="wrongData">Поле должно содержать только цифры</p>
    </div>
</template>

<script>

import { numValidation } from "@/helpers/validation";
import { mapGetters, mapMutations} from "vuex";
  export default {
    name: "my-weight-input",
    props:{
      name: String,
      type: {
        type: String,
        default: "text"
      }
    
    },
    data(){
      return{
       value: "",
       wrongData: false,
      }
    },

    computed:{
      ...mapGetters([
        "WEIGHT", "CAPACITY", "DATE_OF_READINESS", "QUANTITY", "SELECTED_ORDER"
      ]),
// eslint-disable-next-line
      title() {
        switch(this.name) {
          case "gross": return "Общий вес БРУТТО, кг"
          case "cargo_volume" : return "Общий объём груза, м³"
          case "date_of_cargo_readiness": return "Дата готовности груза"
          case "amount": return "Количество"
        }
      },
// eslint-disable-next-line
      placeholder() {
        switch(this.name) {
          case "gross": return "Вec"
          case "cargo_volume" : return "Oбъём"
          case "date_of_cargo_readiness": return "дд/мм/гг"
          case "amount": return "Количество"
        }
      },

    },

    methods:{
      ...mapMutations([
        "SET_ADDITION_DATA"
      ]),

// eslint-disable-next-line
      validate(event) {
        if (numValidation(event) === "") {
          this.wrongData = false
          this.$emit("wrong_data", {id:this.name, status: false})
          this.saveValue(event)
        } else {
          this.wrongData = true
          this.$emit("wrong_data",  {id:this.name, status: true})
        }
      },

      saveValue(event) {
        const data = {
            nameOfInput: event.target.id,
            inputValue: this.value
          }
          this.SET_ADDITION_DATA(data); 
      },
    },

    mounted(){

      if (this.$route.query.type === "cost") {
      switch (this.name) {
        case "gross": this.value = this.SELECTED_ORDER.gross
          break
        case "cargo_volume": this.value = this.SELECTED_ORDER.cargo_volume
          break
        case "date_of_cargo_readiness": this.value = this.SELECTED_ORDER.date_of_cargo_readiness
          break
        case "amount": this.value = this.SELECTED_ORDER.amount
      }
    } else {
      switch (this.name) {
        case "gross": this.value = this.WEIGHT ? this.WEIGHT : this.SELECTED_ORDER.gross
          break
        case "cargo_volume": this.value = this.CAPACITY ? this.CAPACITY : this.SELECTED_ORDER.cargo_volume
          break
        case "date_of_cargo_readiness": this.value = this.DATE_OF_READINESS ? this.DATE_OF_READINESS : this.SELECTED_ORDER.date_of_cargo_readiness
          break
        case "amount": this.value = this.QUANTITY ? this.QUANTITY : this.SELECTED_ORDER.amount
      }
    }

  }
  }
</script>

<style lang="scss" scoped>
.input-box{
  width: 100%;
  padding-bottom: 1rem;
}
.input{
  @include input;
  @media (max-width: 600px) {
    height: 4rem;
  }
}
.input__title{
  @include font(1.4rem, 600, $font-color2);
  line-height: 2.1rem;
  text-align: left;
  margin-bottom: .3rem;
}
.warning{
  @include font(1.4rem, 600, red);
  line-height: 2.1rem;
  text-align: left;
}

.invalid{
  @include invalid;
}

</style>