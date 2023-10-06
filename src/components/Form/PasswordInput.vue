<template>
  
    <div 
     class="input-box" 
    >
      <label for="password" class="form-label"> {{ label }} </label>
      <input 
        type="password"
        class="input"
        :class="{invalid:!this.isValid}"
        v-model.trim='password'
        @input="validation($event)" 
        placeholder="Пароль"
      />
       
        <font-awesome-icon 
          v-if="showPass"
          icon="fa-solid fa-eye" 
          @click="showPassword($event)"
         />
         <font-awesome-icon 
          icon="fa-solid fa-eye-slash" 
          class="icon"  
          @click="showPassword($event)"
          v-if="!showPass" />
    </div>
  
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'password-input',
    props:{
      label: String,
    },

    data(){
      return{
        password: '',
        // password_reg: /(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*].{8,}/g,
        isValid: Boolean,
        password_reg: /(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}/g,
        showPass: false
      }
    },

    computed:{
      ...mapGetters([ "IS_VALID"]) 
    },

    methods: {
    ...mapMutations([
      'SET_PASSWORDS'
    ]),

    validation(event) { 
      // проверка валидации
      if(this.password === ''){
        this.isValid = true
        return
      }else if(this.password !== ''){
        this.isValid = false
      }
      if (this.password_reg.test(this.password)) {
        console.log(this.password_reg.test(this.password))// без єтого валидация рабоатет не правильно???
        this.isValid = true
      } else {
        console.log(this.password_reg.test(this.password))// без єтого валидация рабоатет не правильно???
        this.isValid = false
      }
    // синхронизация со стором
      const data = this.getInputData(event)
      this.SET_PASSWORDS(data)
    },

    getInputData(event){ // cобираем данніе для отправки в стор
      const data = {
        input:this.getInputEl(event),
        value: this.password,
        isValid:this.isValid
      }  
      return data
    },

    getInputEl(event){ // получаем нужный инпут
      const inputBox = event.target.closest('[data-id]')
      const input = inputBox.querySelector('.input')
      return input
    },

    showPassword(event) { 
      const input = this.getInputEl(event)
        if (input.attributes.type.textContent === 'password') {
            input.attributes.type.textContent = 'text'
            this.showPass = !this.showPass
            return
        } 
        if (input.attributes.type.textContent === "text") {
            input.attributes.type.textContent = 'password';
            this.showPass = !this.showPass
        }
      } 
  },   
  }
</script>

<style lang="scss" scoped>
.form-label{
  @include form-label
}

.input-box{
  @include input-box;
  position: relative;
}

.input{
  @include input-login
}

.fa-eye-slash, .fa-eye{
 @include eye;
}

.invalid{
  @include invalid
}

</style>