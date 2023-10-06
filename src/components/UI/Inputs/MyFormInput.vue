<template>
  <div class="input-box">
    <label class="label" @click="showInputAria"  >{{ label }}     
     <div v-if="!errorMsg" class="inputValue">  {{ inputValue ? inputValue : "-" }} </div>    
     <div v-else class="error"> {{errorMsg}} </div>    
    </label>
    <div class="overflow">
      <input 
      :placeholder="`${placeholder} `"
      :type="`${inputType}`"
      class="input "
      :class="animation"
      @input="setInput($event)"
      v-model.trim="input"
      :id="`${id}`"
      v-show="showInput"
      @blur="showInputAria"
      @keyup.enter="keyupEnter"
      >
    </div>
  </div>
</template>

<script> 
import { mapMutations} from 'vuex';
import { numValidation } from '@/helpers/validation';
  export default {
    name:'my-form-input',
    props: {
      label: {
        type: String
      },
      inputType: {
        type: String
      },
      inputValue:{
        type: String
      },
      placeholder: {
        type: String
      },
      id:{
        type:String
      },
    },

    data(){
      return{
        input:'',
        showInput:false,
        animation:'slide-in-top',
        number_reg: /^\d+$/,
        errorMsg: "",
        pressedEnter: false,
      }
    },

    methods:{
      ...mapMutations([
        'SAVE_INPUT_VALUE', 
        'SET_NEW_COMPANY_FORM', 
        'SET_INPUT_ID', 
        'SAVE_INPUT_VALUE',
        'SET_COMPANY_DETAIL_FORM'
      ]),

      keyupEnter() {
        this.pressedEnter = true
        if (this.showInput === false) {
          this.showInput = !this.showInput
        } else {
          this.animation = 'slide-out-top'
          setTimeout(() => {
            this.errorMsg = ''
            this.showInput = !this.showInput
            this.animation = 'slide-in-top'
          }, 500)
        }
      },

      showInputAria() {
        if (this.pressedEnter === false) { // чтобы не дублировать события enter and blur
          if (this.showInput === false) {
            this.showInput = !this.showInput
          } else {
            this.animation = 'slide-out-top'
            setTimeout(() => {
              this.errorMsg = ''
              this.showInput = !this.showInput
              this.animation = 'slide-in-top'
            }, 500)
          }
        } else {
          if (this.showInput === false) {
            this.pressedEnter = false
          } else {
            this.animation = 'slide-out-top'
            setTimeout(() => {
              this.errorMsg = ''
              this.showInput = !this.showInput
              this.animation = 'slide-in-top'
            }, 500)
          }
        }
      },

      setInput(event){
        this.pressedEnter = false
        this.errorMsg = numValidation(event)
        this.SET_INPUT_ID(event.target.id)
        const data ={
          id: event.target.id,
          value: this.input
        }
        this.SET_NEW_COMPANY_FORM(data)
        this.SET_COMPANY_DETAIL_FORM(data)
        this.SAVE_INPUT_VALUE(this.input) // чтобы повесить watch
      },
    }
  }
</script>

<style lang="scss" scoped>
.input-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3rem;
 

.overflow{
  overflow: hidden;
  width: 100%;
}
}
.input{
  @include input-login;
  background-color: #EEEEF0;
  border: none;

  @media (max-width: 600px) {
    height: 4rem;
  }
}

.invalid{
  border: 1px solid red;
}

.inputValue{
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #416782;
  margin-bottom: 3px;
  cursor: pointer;
  position: absolute;
  left: 17.4rem;
}

.error {
  @include errorMsg
}

.label {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #416782;
  margin-bottom: 3px;
  cursor: pointer;
  display: flex;
  position: relative;
  width: 100%;
  gap: 17%;

}

::placeholder {
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #809FB8;
}
// убираем стрелки у input
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none; // Yeah, yeah everybody write about it
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}

.slide-in-top {
	-webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

  @-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
}

.slide-out-top {
	-webkit-animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

 @-webkit-keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
    opacity: 0;
  }
}
@keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
    opacity: 0;
  }
}
</style>