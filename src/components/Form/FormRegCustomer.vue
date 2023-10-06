<template>
  <section class="dialog__content"  >

    <form  
      class="form" 
      id="reg-form" 
      @submit.prevent='onSubmit'
    >
      <h2 class="form-title">Регистрация</h2>
      
      <div class="input-box">
        <label for="name" class="form-label">ФИО</label>
        <input 
          class="input-login"
          type="text" 
          id="name" 
          v-model.trim='value.name'
          @input="validations"      
          placeholder="ФИО"
        />

      </div>

      <div class="input-box">
        <label for="email" class="form-label">E-mail</label>
        <input
          class="input-login"
          type="email" 
          id="email"  
          v-model.trim='value.email'
          @input="validations"
          placeholder="E-mail"
          />

      </div>

      <my-phone-code  @phoneValidation="phoneValidation" />
      
      <div class="input-box">
        <label for="password" class="form-label">Пароль</label>
        <input 
          type="password"
          class="input-login"
          id="password_1" 
          v-model.trim='value.password_1'
          @input="validations"
          placeholder="Пароль"
        />
        <font-awesome-icon 
          v-if="showPass1"
          icon="fa-solid fa-eye" 
          @click="showPassword('1')"
        />
        <font-awesome-icon 
          icon="fa-solid fa-eye-slash" 
          class="icon"  
          @click="showPassword('1')"
          v-if="!showPass1"
        />
        <Transition name="fade">
         <p class="error-msg" v-if="passwordValidationMsg()"> {{ passwordValidationMsg() }}</p>
        </Transition>
      </div>

      <div  class="input-box">
        <label for="phone" class="form-label">Повторите пароль</label>
        <input
          class="input-login"
          type="password" 
          id="password_2"  
          v-model.trim='value.password_2'
          @input="validations"
          placeholder="Пароль"
        />
      
        <font-awesome-icon
          v-if="showPass2"
          icon="fa-solid fa-eye" 
          class="icon"
          @click="showPassword('2')"
        />
        <font-awesome-icon 
          icon="fa-solid fa-eye-slash" 
          @click="showPassword('2')"
          v-if="!showPass2" 
        />
        <Transition name="fade">
          <p class="error-msg" v-if="comparePasswordMsg">Пароли не совпадают</p>
        </Transition>
      </div>
      <my-btn 
        type="submit" 
        class="btn"
        :class="{ BtnEnable:!isBtnEnable }"
        :disabled="!isBtnEnable"
      >Зарегистрироваться</my-btn>
    </form>

    <validation-errors
      v-if='VALIDATION_ERRORS'
      :validation-errors='VALIDATION_ERRORS'
    />
    
    <router-link 
      to="/customer/signin" 
      class="form__question"
      @click="goToSignInForm"
    > Уже есть аккaунт?
    </router-link>
    
    <MyFormOffer />
   
   </section>
</template>

<script>
import MyFormOffer from '@/components/UI/Form/MyFormOffer.vue';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { REGEXP_EMAIL, REGEXP_PASSWORD, REGEXP_NAME } from "@/constants/regExp"
import { passwordValidationMsg, comparePassword } from "@/helpers/validation"

export default {
  name: 'form-reg-customer',
  components: {
    MyFormOffer, ValidationErrors
  },
  data() {
    return {
      isValid: {
        name: false,
        email: false,
        phone: false,
        password_1: false,
        samePassword: false,
      },
      isBtnEnable: false,
      showPass1: true,
      showPass2: true,
      value: { 
        name: '',
        email: '',
        phone: '',
        password_1: '',
        password_2: '',
      },
      regExp: {
        name: REGEXP_NAME,
        email: REGEXP_EMAIL,
        password_1: REGEXP_PASSWORD,
      },
      comparePasswordMsg: false,
    }
  },

  computed: {
    ...mapGetters(["VALIDATION_ERRORS", "IS_VALID"]),
  },

  methods: {
    ...mapActions([
      'REGISTRATION',
    ]),
    ...mapMutations([
      'SWITCH_IS_VALID',
      'SET_SHOW_LOGIN_FORM',
      'SET_SHOW_CONFIRM_EMAIL',
      'SET_SHOW_SIGNUP_FORM',
      'SET_FORM_DATA',
      'SET_VALIDATION_ERR',
      'SET_SHOW_PRELOADER'
    ]),

    goToSignInForm() {
      this.SET_VALIDATION_ERR('clear')
      this.SET_SHOW_LOGIN_FORM(true)
    },

    phoneValidation(data) {
      this.isValid.phone = data.status
      this.value.phone = data.phone
      if (this.isValid.samePassword &&
        this.isValid.name &&
        this.isValid.email &&
        this.isValid.phone &&
        this.isValid.password_1 === true) {
        this.isBtnEnable = true
      } else {
        this.isBtnEnable = false
      }
    },

    checkFormValidation(btn) {
      if (this.isValid.samePassword &&
        this.isValid.name &&
        this.isValid.email &&
        this.isValid.phone &&
        this.isValid.password_1 === true) {
        this.isBtnEnable = true
        btn.removeAttribute('disabled')
      }
    },

    passwordValidationMsg() {
     return passwordValidationMsg(this)
    },

    comparePassword() {
      comparePassword(this)
    },

    validations(event) {
      debugger
      event.target.classList.add('invalid')
      const btn = document.querySelector('.btn')
      btn.setAttribute('disabled', 'disabled')
      this.isBtnEnable = false
      const targetId = event.target.id

      if (event.target.id === "password_2") {
        if (this.value.password_1 === this.value.password_2) {
          event.target.classList.remove('invalid')
          this.comparePassword()
          this.checkFormValidation(btn)
        } else {
          this.comparePassword()
        }
      } else if (this.regExp[targetId].test(this.value[targetId])) {
        this.isValid[targetId] = true
        event.target.classList.remove('invalid')
        this.checkFormValidation(btn)
        this.comparePassword()
      } else {
        this.isValid[targetId] = false
        this.comparePassword()
      }

    },

    showPassword(id) {
      const firstPassword = document.getElementById('password_1')
      const secondPassword = document.getElementById('password_2')

      switch (id) {
        case "1":
          if (firstPassword.attributes.type.textContent === 'password') {
            firstPassword.attributes.type.textContent = 'text'
            this.showPass1 = !this.showPass1
            return
          }
          if (firstPassword.attributes.type.textContent === "text") {
            firstPassword.attributes.type.textContent = 'password'
            this.showPass1 = !this.showPass1
          }
          break

        case "2":
          if (secondPassword.attributes.type.textContent === 'password') {
            secondPassword.attributes.type.textContent = 'text';
            this.showPass2 = !this.showPass2
            return
          } else {
            secondPassword.attributes.type.textContent = 'password';
            this.showPass2 = !this.showPass2
          }

      }
    },

    onSubmit() {
      this.SET_SHOW_PRELOADER(true)
      this.SET_VALIDATION_ERR('clear')
      let data = {
        full_name: this.value.name,
        email: this.value.email,
        password: this.value.password_1,
        phone_number: this.value.phone,
      }

      this.REGISTRATION(data)
        .then(() => {
          this.SET_FORM_DATA(data)
          this.SET_SHOW_CONFIRM_EMAIL(true)
          this.SET_SHOW_SIGNUP_FORM(false)
          this.SET_SHOW_PRELOADER(false)
        })
        .catch(() => this.SET_SHOW_PRELOADER(false))
    }

  },
}
</script>

<style lang="scss" scoped>
.dialog__content {
  @include dialog__content
}

.form {
  @include form;
}

.form-title {
  @include form-title;
}

.input-box {
  @include input-box;
  position: relative;
}

.form-label {
  @include form-label
}

.input-login {
  @include input-login;
}
.fa-eye-slash,
.fa-eye {
    @include eye;
  }

.invalid {
  @include invalid
}

.BtnEnable {
  @include disabled
}

.btn {
  @include btn;
}

.preloader {
  margin: 0 auto;
  @include flex (row, center, center, 0);
  margin-bottom: 20px;
}

.form__question {
  @include form__question;
}

.form__question:hover {
  text-decoration: underline;
}

.error-msg {
  @include errorMsg;
  margin-top: 1rem;
  position: absolute;
  top: 7.5rem;

  @media (max-width: 600px) {
    top: 6.5rem;
  }
}

// #region animation

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// #endregion

</style>