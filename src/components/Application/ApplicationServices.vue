<template>
  <div class="services" @change="setCheckbox">
    <div class="check">
      <input type="checkbox" id="1" class="input" >
      <label for="1" class="label">Логистика</label> 
    </div>
   
   <div class="check">
    <input type="checkbox" id="2" class="input" >
    <label for="2" class="label">Таможенное оформление</label>
   </div>
    
    <div class="check">
      <input type="checkbox" id="3" class="input" >
      <label for="3" class="label">Сертификация</label>
    </div>
  
    <div class="check">
      <input type="checkbox" id="4" class="input" >
      <label for="4" class="label">Инспекция товара на фабрике</label>
    </div>
  
    <div class="check">
      <input type="checkbox" id="5" class="input">
      <label for="5" class="label">Оплата товара поставщику силами исполнителя</label>
    </div>
   
    <div class="check">
      <input type="checkbox" id="6" class="input" >
      <label for="6" class="label">Страхование груза</label>
    </div>

    <div class="check">
      <input type="checkbox" id="textInput" class="input" @click="isTextInputDisabled = !isTextInputDisabled">
      <input 
        id="textInput"
        type="text" 
        class="text_input" 
        placeholder="Другое"
        v-model="textInput"
        @input="setTextInput"
        @blur="setOther"
        :class="{disabled: isTextInputDisabled}"
        :disabled="isTextInputDisabled" >
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
// import { enumServices2 } from "@/helpers/enumTransformation"
  export default {
    name:"application-services",
    data(){
      return{
        // services: [],
        textInput:"",
        isTextInputDisabled: true
      }
    },
    
    computed: {
      ...mapGetters([
        "SERVICES", "COMMENT_FOR_SERVICE", "SELECTED_ORDER"
      ])
    },

    methods:{
      ...mapMutations([
        "SET_SERVICE", "SAVE_INPUT_VALUE", "SET_COMMENT_FOR_SERVICE", "SET_SERVICES_FOR_SELECTED_ORDER"
      ]),

      setCheckbox(event) {
        if (event.target.id !== "textInput") {
          const service = event.target.nextSibling.textContent
          const checked = event.target.checked
          this.SET_SERVICE({checked, service})
          this.SET_SERVICES_FOR_SELECTED_ORDER({checked, service})
        } 
      },

      setTextInput() {
        const isChecked = document.querySelector("#textInput").checked
        if (isChecked) this.SET_COMMENT_FOR_SERVICE(this.textInput)
      }
    },

    watch: {
      isTextInputDisabled () {
         if (this.isTextInputDisabled) {
          this.SET_COMMENT_FOR_SERVICE("")
          this.textInput = ""
        } else this.SET_COMMENT_FOR_SERVICE(this.textInput)

        if(!this.isTextInputDisabled && !this.textInput) this.$emit("hideBtn", true)
        if(!this.isTextInputDisabled && this.textInput) this.$emit("hideBtn", false)
        if(this.isTextInputDisabled) this.$emit("hideBtn", false)
      },
      
      textInput() {
        if(!this.isTextInputDisabled && !this.textInput) this.$emit("hideBtn", true)
        if(!this.isTextInputDisabled && this.textInput) this.$emit("hideBtn", false)
      }

    },
    
    mounted() {

      this.textInput = this.COMMENT_FOR_SERVICE ? this.COMMENT_FOR_SERVICE : this.SELECTED_ORDER.comment_for_service
      // подставляем выбранные услуги из стора
      const textInput_box = document.querySelector("#textInput")
      if (this.COMMENT_FOR_SERVICE || this.SELECTED_ORDER.comment_for_service) {
        textInput_box.checked = true
        this.isTextInputDisabled = false
      } else this.isTextInputDisabled = true

      const services = document.querySelectorAll(".label")
      const selectedOrderServices = this.SELECTED_ORDER.additional_services
      services.forEach(label => {
        label.previousSibling.checked = false // сначала oчищаем все
      })
      if (this.$route.name === "customer-order") {
        selectedOrderServices.forEach(element => {
        services.forEach(label => {
          if(label.textContent === element) {
            label.previousSibling.checked = true
          }
        })
      });
      } else {
        this.SERVICES.forEach(element => {
        services.forEach(label => {
          if(label.textContent === element) {
            label.previousSibling.checked = true
          }
        })
      });
      }
      
    }
    
  }
</script>

<style lang="scss" scoped>

.disabled {
  @include disabled;
}

.text_input {
  @include input;
}
.services{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input{
  min-width: 2.8rem;
  min-height: 2.8rem;
  cursor: pointer;

  @media (max-width: 600px) {
    min-width:2.4rem;
    height: 2.4rem;
  }
}
.input-text {
  outline: none;
  background: #EEEEF0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #809FB8;
  width: 452px;
  height: 51px;
  padding: 0 2rem;
  border: none;
}

.check{
  @include flex (row, flex-start, center, 10px);;
  margin-bottom: 2.5rem;
  width: 100%;
}

.label {
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  cursor: pointer;
  text-align: left;

  @media (max-width:600px) {
    line-height: 23px;
  }
}

:checked{
  background-color: red;
}
</style>