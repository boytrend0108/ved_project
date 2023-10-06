<template >
  <section class="dialog__content">
    <form 
      class="form" 
      id="login-form"
      @submit.prevent='onSubmit'
    >
    <div class="title-box">
      <h2 class="form-title">Вход для специалистов</h2>
    </div>
    
      <validation-errors
        v-if='VALIDATION_ERRORS'
        :validation-errors='VALIDATION_ERRORS'
      />

        <div class="input-box">
          <label for="email" class="form-label">E-mail</label>
          <input 
            placeholder="E-mail"
            class="input-login"
            type="email" 
            id="email" 
            @input="validations($event)"
            :class="{ invalid:!IS_VALID }"
            v-model.trim='email'
          />
        </div>

        <div class="input-box">
          <label for="password" class="form-label">Пароль</label>
          <input 
            placeholder="Пароль"
            type="password"
            class="input-login"
            id="password_1" 
            v-model.trim='password'
            @input="validations"
            :class="{ invalid:!IS_VALID }"  />
          <font-awesome-icon
            v-if="showPass1"
            icon="fa-solid fa-eye" 
            @click="showPassword('1')"
            />
            <font-awesome-icon 
              icon="fa-solid fa-eye-slash"
              @click="showPassword('1')"
              v-if="!showPass1"
            />
        </div>

        <my-btn 
          type="submit" 
          class="btn"
          :class="{ BtnEnable:!isBtnEnable }"
        >Войти</my-btn>
  </form>
  <div class="question-box"> 
    <router-link
      @click="goToRegistrationPage"
      to="/provider/signup" 
      class="form__question"> Eще нет аккaунта?</router-link>
    <p  class="form__question" @click="clickHandler"> Забыли пароль?</p>
  </div>
  </section>
   
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'; 
import ValidationErrors from '@/components/Form/ValidationErrors.vue'
import { REGEXP_PASSWORD, REGEXP_EMAIL } from "@/constants/regExp"

  export default {
    name: 'form-login-spec',
    components:{
      ValidationErrors
    },
  data() {
    return {
      // isValid: true,
      isBtnEnable: true,
      showPass1: true,
      showPass2: true,
      email: '',
      password: '',
      email_reg: REGEXP_EMAIL,
      password_reg: REGEXP_PASSWORD,
    }
  },

  computed:{
    ...mapGetters([
      'IS_VALID','EMAIL','PASSWORD', "VALIDATION_ERRORS"
    ]), 
  },

  methods: {
    ...mapActions([
      'PROVIDER_SIGNIN','GET_EMAIL','CURRENT_USER', 'ATTEMPT'
    ]
    ),
    ...mapMutations([
      'SWITCH_IS_VALID','SET_FORM_DATA','SET_SHOW_CHANGE_PASSWORD',
      'SET_SHOW_LOGIN_FORM','SET_VALIDATION_ERR', 'SET_SHOW_PRELOADER'
     ]),

     goToRegistrationPage(){
      this.SET_VALIDATION_ERR('clear')
     },

    sendFormData(email, password) {
      const formData = {
        email: email,
        password: password
      }
      this.SET_FORM_DATA(formData)
    },

    clearForm(){
      this.email = ''
      this.password = ''
    },

    clickHandler(){
      this.SET_SHOW_LOGIN_FORM(false)
      this.SET_SHOW_CHANGE_PASSWORD(true)
    },


    showPassword(id) {
      const firstPassword = document.getElementById('password_1')
      if (id === "1") {
        if (firstPassword.attributes.type.textContent === 'password') {
          firstPassword.attributes.type.textContent = 'text'
          this.showPass1 = !this.showPass1
          return
        }
        if (firstPassword.attributes.type.textContent === "text") {
          firstPassword.attributes.type.textContent = 'password';
          this.showPass1 = !this.showPass1
        }
      }
    },
    
    validations(event) {
      this.sendFormData(this.email, this.password);
      this.SWITCH_IS_VALID(false);
      const btn = document.querySelector('.btn')
      btn.setAttribute('disabled', 'disabled')
      if (this.email_reg.test(this.email) && event.target.id === 'email') {
        event.target.classList.remove('invalid')
      }

      if (
        this.email_reg.test(this.email) &&
        this.password_reg.test(this.password)
      ) {
        console.log(this.password_reg.test(this.password))// если убрать то регулярка рабоате не правильно?!
        this.SWITCH_IS_VALID(true);
        this.isBtnEnable = true
        btn.removeAttribute('disabled')
      } else {
        this.SWITCH_IS_VALID(false);
        this.isBtnEnable = false
      }
    },
    
    async onSubmit() { 
      this.SET_SHOW_PRELOADER(true)
      this.SET_VALIDATION_ERR('clear')
      let data = {
        email: this.email,
        password: this.password, 
      }
      const newData = new FormData()
      newData.append('email', data.email)
      newData.append('password', data.password)
      this.PROVIDER_SIGNIN(newData)
      .then(token => {
        this.ATTEMPT(token)
      .then(() => {
        console.log('successfully sing in')
        this.$router.push(`/provider/search/`)
        this.SET_SHOW_PRELOADER(false)
        })
      })
      .catch(() => this.SET_SHOW_PRELOADER(false))
    }
  },
  
  mounted(){
    this.SET_VALIDATION_ERR('clear')
  }
  }
</script>

<style lang="scss" scoped>

.title-box{
  @include flex(row, center, center, 55px);
}

.form{
  @include form;
}
.form-title{
  @include form-title;
  margin-bottom: 0;
}
.input-box{
  @include input-box;
  position: relative;
}
.input-login{
  @include input-login
}
.form-label {
 @include form-label
}
.btn{
 @include btn;
}

.form__question{
 @include form__question;
 cursor: pointer;
}
.form__question:hover{
    text-decoration: underline;
  }
  .question-box{
    @include flex(column, center, center, 0);
    margin-bottom: 20px;

    @media (max-width: 600px) {
      background-color: #F5F5FC;
    }
    
  }

.fa-eye-slash, .fa-eye{
  @include eye;
  top: 5.2rem;
}

.invalid{
  @include invalid
}
.BtnEnable{
  opacity: 0.5;
  cursor:not-allowed
}
.dialog__content{
  @include dialog__content
}

::placeholder{
@include placeholder;
}
</style>