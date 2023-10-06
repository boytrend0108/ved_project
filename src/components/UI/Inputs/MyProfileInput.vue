<template>
  <div class="myProfileInput" >
    <p class="inputName">{{ title }}</p>
    <input
      type="text" 
      class="input"  
      :id="id" 
      :placeholder="profileInput"
      v-model.trim="input"
      @input="inputHanldler"
      :isClicked="isClicked"
      :disabled="$route.name === 'customer-profile' || $route.name === 'provider-profile'"
    >
    <p class="error" v-if="error"> {{ error }}</p>
  </div>
</template>

<script>
import { phoneValidation, fioValidation } from '@/helpers/validation'
  export default {
    name: 'my-profile-input',
    props:{
      title:{
        type: String
      },
      profileInput:{
        type: String
      },
      id:{
        type: String
      },
      isClicked:{ // отслеживаем нажатие кнопки "Удалить"
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        input:'',
        error: ''
      }
    },
     
    methods:{
   
      inputHanldler(event) {
        switch (this.id) {
          case 'phone': 
            this.error = phoneValidation(event)
            if (this.error) return 
            this.error = ''
            this.$emit('newPhone', {input:this.input, id:this.id})
            break
          case 'fio': 
            this.error = fioValidation(event)
            if (this.error) {
              this.$emit('newFio', {input:this.input, id:this.id, status: true})
            } else {
              this.error = ''
              this.$emit('newFio', {input:this.input, id:this.id, status: false})
            }
        }
      
      }
    },

    watch:{
       isClicked(){ // очищаем form
          this.input = ''
          this.error = ''
       }
    }
  }
</script>

<style lang="scss" scoped>

.error{
  text-align: left;
  @include font(14px, 600, red);
  line-height: 21px;
  margin-bottom: 3px;
}

.inputName{
  text-align: left;
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  margin-bottom: 0.3rem;
}
.input {
  width: 100%;
  height: 5.1rem;
  background: #EEEEF0;
  border-radius: 1rem;
  border: none;
  outline: none;
  @include font(1.7rem, 500, #244156);
  line-height: 2.6rem;
  padding: 1.2rem 2rem;

  @media (max-width:600px) {
    height: 40px;
    @include font(1.4rem, 500, #244156);
    line-height: 1.9rem;
  }
}
</style>