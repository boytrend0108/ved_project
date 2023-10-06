<template>
  <section class="dialog__content" >

      <form 
        class="form" 
        id="reg-form" 
        @submit.prevent='onSubmit' 
        @click.self="handleFormClick"
      >
        <h2 class="form-title">Регистрация для специалистов</h2> 
            
        <div class="form-part" v-if="showFirstPart">
          <div class="input-box">
            <label for="name" class="form-label">ФИО</label>
            <input 
              class="input-login"
              type="text" 
              id="name" 
              ref="fio"
              v-model.trim='username'
              @input="validations"      
              placeholder="ФИО"
            />
          </div>

          <my-phone-code  @phoneValidation="phoneValidation" />

          <div class="input-box">
            <label for="email" class="form-label">Ваш E-mail</label>
            <input
              class="input-login"
              type="email" 
              id="email"  
              v-model.trim='email'
              @input="validations($event)"
              placeholder="E-mail"
            />
          </div>
        
          <div class="input-box">
            <label for="password" class="form-label">Пароль</label>
            <input 
              type="password"
              class="input-login"
              id="password_1" 
              v-model.trim='value.password_1'
              @input="validations($event)"
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
            <label for="password_2" class="form-label">Повторите пароль</label>
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
            class="btn btn-next"
            id="next_step"
            :class="{ BtnEnable: !isNextBtnEnable }"
            :disabled="!isNextBtnEnable"
            @click="showFirstPart = false"
          >Следующий шаг</my-btn>

        </div>
        
        <div class="form-part" v-else>
          <da-data-inn @innValidation="setInnValidation"/>

          <div class="input-box">
            <label for="email" class="form-label">E-mail компании</label>
            <input
              class="input-login"
              type="email" 
              id="email_firm"  
              v-model.trim='email_firm'
              @input="validations($event)"
              placeholder="E-mail компании"
            />
          </div>

          <my-phone-code  @phoneValidation="phoneValidation" inputLable="Телефон компании" />

          <bank-form class="bank-form" :isCurrencyValid="isCurrencyValid" />

          <div class="btn-wr">
            <my-btn 
              class="btn btn-back"
              @click="showFirstPart = true"
            >Назад</my-btn>

            <my-btn 
              type="submit" 
              class="btn btn-reg"
              id="register"
              :class="{ BtnEnable:!isBtnEnable }"
              :disabled="!isBtnEnable"
            >Зарегистрироваться</my-btn>
          </div>

          <validation-errors
            v-if='VALIDATION_ERRORS'
            :validation-errors='VALIDATION_ERRORS' 
          />
        </div>
        
      </form> 

      <router-link 
        to="/provider/signin" 
        class="form__question"
        @click="goToSignInForm"
      > Уже есть аккaунт?
      </router-link>

  </section>
</template>

<script>
import BankForm from './BankForm.vue';
import DaDataInn from './DaDataInn.vue';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { numValidation, currencyTypeValidation, passwordValidationMsg, comparePassword } from '@/helpers/validation';
import { REGEXP_EMAIL, REGEXP_PASSWORD, REGEXP_NAME, REGEXP_PHONE_NUMBER } from "@/constants/regExp"


export default {
  name: 'form-reg-provider',
  components: {
    ValidationErrors, DaDataInn, BankForm,
  },
  data() {
    return {
      showFirstPart: true,
      isValid: {
        name: false,
        email: false,
        password_1: false,
        samePassword: false,
        phone: false,
        inn: false,
        email_firm: false,
        phone_firm: false,
        bank: false,
      },
      value: {
        password_1: '',
        password_2: '',
      },
      isCurrencyValid: null,
      isBtnEnable: false,
      isNextBtnEnable: false,
      showPass1: true,
      showPass2: true,
      inn: '',
      email_firm: '',
      phone_firm: '',
      username: '',
      email: '',
      phone: '',
      username_reg: REGEXP_NAME,
      email_reg: REGEXP_EMAIL,
      password_reg: REGEXP_PASSWORD,
      phone_reg: REGEXP_PHONE_NUMBER,
      errorMsg: '',
      comparePasswordMsg: false,
    }
  },

  computed: {
    ...mapGetters(["VALIDATION_ERRORS", "IS_VALID", 'FIRMS', 'INPUT', 'BANK', "COMPANIES_LIST"]),
  },

  methods: {
    ...mapActions([
      'REGISTRATION',
    ]),
    ...mapMutations([
      'SWITCH_IS_VALID', 
      'SET_SHOW_LOGIN_FORM', 
      'SET_VALIDATION_ERR', 
      'SET_FORM_DATA',
      'SET_SHOW_CONFIRM_EMAIL',
      'SET_SHOW_SIGNUP_FORM',
      'SET_DELETE_BANK',
      "SET_COMPANIES_LIST",
      "SET_SHOW_PRELOADER"
    ]),

    handleFormClick() {
      this.SET_COMPANIES_LIST(); // закрываем выпадающий список  
    },

    setInnValidation(status) {
      const btn = {id: "register"};
      this.isValid.inn = status;
      this.isBtnValid(btn);
    },

    goToSignInForm() {
      this.SET_VALIDATION_ERR('clear')
      this.SET_SHOW_LOGIN_FORM(true)
    },

    numValidationFn(event) { // for INN
      this.errorMsg = numValidation(event)
    },

    phoneValidation(data) {
     const nextBtn = document.querySelector(".btn-next")
     const regBtn = document.querySelector(".btn-reg")
     switch(data.lable) {
      case 'Ваш телефон' :
        this.isValid.phone = data.status
        this.phone = data.phone
        this.isBtnValid(nextBtn)
        break
      case 'Телефон компании':
       this.isValid.phone_firm = data.status
        this.phone_firm = data.phone
        this.isBtnValid(regBtn);
        break
     }
    },

    isBtnValid(btn) {
      if(!btn) return 
      switch(btn.id) {
        case 'register':
          if (this.isValid.inn && 
            this.isValid.email_firm &&
            this.isValid.phone_firm &&
            this.isValid.bank === true
            ) {
            this.isBtnEnable = true;
          } else {
            this.isBtnEnable = false
          }
        break;

        case 'next_step':
          if (this.isValid.samePassword &&
            this.isValid.name &&
            this.isValid.email &&
            this.isValid.password_1 &&
            this.isValid.phone === true) {
            this.isNextBtnEnable = true
          }  else {
            this.isNextBtnEnable = false
          }
      }

    },
    
    passwordValidationMsg() {
     return passwordValidationMsg(this)
    },

    validations(event) {
      event.target.classList.add('invalid');
      const btn = document.querySelector('.btn-reg');
      const btnNext = document.querySelector('.btn-next');

      if (this.INPUT) this.isValid.inn =  true;

      switch(event.target.id) {
        case 'name':
          if (!this.username_reg.test(this.username)) {
            this.isValid.name = false
            this.isBtnValid(btnNext)
            return
          } 
    
          this.isValid.name = true
          event.target.classList.remove('invalid')
          this.isBtnValid(btnNext)
          break;

        case "email":
          if (!this.email_reg.test(this.email)) {
            this.isValid.email = false
            this.isBtnValid(btnNext)
            return
          }

          this.isValid.email = true;
          event.target.classList.remove('invalid')
          this.isBtnValid(btnNext);
          break;

        case "email_firm":
          if (!this.email_reg.test(this.email_firm)) {
            this.isValid.email_firm = false
            this.isBtnValid(btn)
            return
          }

          this.isValid.email_firm = true;
          event.target.classList.remove('invalid')
          this.isBtnValid(btn)
          break

        case "password_1":
          if (!this.password_reg.test(this.value.password_1)) {
            this.isValid.password_1 = false
            comparePassword(this)
            this.isBtnValid(btnNext)
            return
          }

          event.target.classList.remove('invalid')
          this.isValid.password_1 = true
          comparePassword(this)
          this.isBtnValid(btnNext)
          break
        
        case "password_2":
        if (this.value.password_1 !== this.value.password_2) {
          comparePassword(this)
          this.isBtnValid(btnNext)
          return
        }
        
        event.target.classList.remove('invalid')
        comparePassword(this)
        this.isBtnValid(btnNext);
        break
      }
    },

    showPassword(id) {
    const firstPassword = document.getElementById('password_1')
    const secondPassword = document.getElementById('password_2')
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
    else if (id === "2") {
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
    this.isCurrencyValid =  currencyTypeValidation();
    if (!this.isCurrencyValid) return;

      this.SET_SHOW_PRELOADER(true)
      this.SET_VALIDATION_ERR('clear')
      let data = {
        full_name: this.username,
        email: this.email,
        password: this.value.password_1,
        phone_number: this.phone,
        "firm": {
          "inn": this.FIRMS[0].inn,
          "kpp": this.FIRMS[0].kpp,
          "ogrn": this.FIRMS[0].ogrn,
          "long_name": this.FIRMS[0].long_name,
          "address_jur": this.FIRMS[0].address_jur,
          "email": this.email_firm,
          "phone_number": this.phone_firm
        },
        "bank": {
          "bic": this.BANK[0].bic,
          "ras_schet": this.BANK[0].ras_schet,
          "name": this.BANK[0].name,
          "kor_schet": this.BANK[0].kor_schet,
    }
      }

      this.REGISTRATION(data)
        .then(user => {
          this.SET_SHOW_PRELOADER(false)
          console.log('successfully register user', user)
          this.SET_FORM_DATA(data)
          this.SET_SHOW_CONFIRM_EMAIL(true)
          this.SET_SHOW_SIGNUP_FORM(false)
        }).catch(err => {
          console.log(err)
          this.SET_SHOW_PRELOADER(false)
        })
    }
  },

  watch: {
    BANK: {
      handler(newValue) {
        if (newValue[0].ras_schet.length === 20 && newValue[0].bic.length === 9) this.isValid.bank = true
        else this.isValid.bank = false
        const btn = document.querySelector('#register');
        this.isBtnValid(btn)
      },
      deep: true
    },

    FIRMS: {
      handler(newValue) {
        console.log("watcher")
        if (newValue[0].inn) {
          this.isValid.inn = true;
        } else this.isValid.inn = false;
      },
      deep: true
    }
  },

  mounted() {
    this.SET_DELETE_BANK()
    this.$refs.fio.focus()
  }

}


</script>

<style lang="scss" scoped>
.btn-wr{
  @include flex(row, space-between, center, 30px);
}
.bank-form {
  padding: 45px 0 0 0 ;
}
.form-part {
  width: 100%;
}
.input-firm {
  @include input;
}

.preloader{
  margin: 0 auto;
}

.bottom {
  @include flex(row, center, center, 0);
  margin-top: 36px;
}
.error {
  @include errorMsg
}
.dialog__content{
  @include dialog__content
}

.form{
  @include form;
}

.form-title{
  @include form-title;
}
.form-label {
 @include form-label
}

.input-box{
  @include input-box;
  position: relative;
}

.btn{
 @include btn;
}

.btn-back{
  background-color: #EEEEF0;
  color: $font-color2;
}

.form__question{
 @include form__question;
 margin-bottom:  30px;
 display: block;
}

.form__question:hover{
    text-decoration: underline;
  }
 .input-login {
   @include input-login;
 }
.fa-eye-slash, .fa-eye{
 @include eye;
}

.invalid{
 @include invalid
}
.BtnEnable{
 @include disabled
}

::placeholder{
@include placeholder;
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