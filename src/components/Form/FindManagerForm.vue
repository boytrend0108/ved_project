<template>
       <form 
        class="form" 
        id="reg-form" 
        @submit.prevent="onSubmit"
      >
        <h2 class="form-title">Подключение менеджера</h2>
        <validation-errors
          v-if="VALIDATION_ERRORS"
          :validation-errors="VALIDATION_ERRORS"
        />

        <div class="input-box">
          <label for="email" class="form-label">ФИО</label>
          <input
            class="input-login"
            type="text" 
            id="fullname"  
            v-model.trim="value.fullname"
            @input="validations($event)"
            placeholder="ФИО"
            />
        </div>


        <div class="input-box">
          <label for="email" class="form-label">E-mail</label>
          <input
            class="input-login"
            type="email" 
            id="email"  
            v-model.trim="value.email"
            @input="validations($event)"
            placeholder="E-mail"
            />
        </div>

        <div class="input-box">
          <label for="phone" class="form-label">Телефон</label>
          <input
            class="input-login"
            type="tel" 
            id="phone"  
            v-model.trim="value.phone"
            placeholder="Телефон"
            @input="validations"
          />
      </div>

      <my-btn 
        type="submit" 
        class="btn"
        :class="{ BtnEnable:!isBtnEnable }"
        >Отправить заявку</my-btn>

      <my-semipolar-spinner class="preloader" v-if="showPreloader"/>
      <p class="preloader" v-if="errorMsg" > Ошибка </p>

       </form>
</template>

<script>
import ValidationErrors from "@/components/Form/ValidationErrors.vue"
import {mapGetters, mapActions, mapMutations} from "vuex"
export default {
  name: "find-manager-form",
  components: {
   ValidationErrors
  },
  data() {
    return {
      isValid:{
        email: false,
        phone: false,
        fullname: false,
      },
      isBtnEnable:false,
      value: {
        email:"",
        phone: "",
        fullname: "",
      },
      regExp: {
        phone: /^[0-9+()-]*$/,
        email:  /.+@.+\..+/i,
        fullname: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]/
      }, 
      showPreloader: false,
      errorMsg: '',
    }
  },
 
  computed:{
   ...mapGetters(["VALIDATION_ERRORS", "IS_VALID", "DIALOG"])
  },

  methods: {
    ...mapActions([
     "REGISTRATION", "FIND_MANAGER_ORDER"
    ]),
    ...mapMutations([
     "SWITCH_IS_VALID",
     "SET_SHOW_LOGIN_FORM", 
     "SET_SHOW_CONFIRM_EMAIL",
     "SET_SHOW_SIGNUP_FORM",
     "SET_FORM_DATA",
     "SET_VALIDATION_ERR", "SET_SHOW_FIND_MANAGER_FORM", "SET_SHOW_SUCCESS_FIND_MANAGER_FORM", "SHOW_DIALOG", 
     
    ]),

    goToSignInForm(){
      this.SET_VALIDATION_ERR("clear")
      this.SET_SHOW_LOGIN_FORM(true)
    },

    validations(event) {
     
      const valid = () => {
        if (this.isValid.email && this.isValid.phone && this.isValid.fullname) {
          this.isBtnEnable = true
          btn.removeAttribute("disabled")
        }
      }
      event.target.classList.add("invalid")
      const btn = document.querySelector(".btn")
      btn.setAttribute("disabled", "disabled")
      this.isBtnEnable = false

      const targetId = event.target.id
      if(this.regExp[targetId].test(this.value[targetId])) {
        this.isValid[targetId] = true
        event.target.classList.remove("invalid")
        valid()
      } else {
        this.isValid[targetId] = false
      }

    },


    onSubmit() {
      this.SET_VALIDATION_ERR("clear")
      this.showPreloader = true
      let data = {
        email: this.value.email,
        phone_number: this.value.phone,
        fullname: this.value.fullname
      }

     this.FIND_MANAGER_ORDER(data)
       .then(() => {
        debugger
        this.SET_SHOW_FIND_MANAGER_FORM(false)
        this.SET_SHOW_SUCCESS_FIND_MANAGER_FORM(true)
        setTimeout(() => {
          if(this.DIALOG) this.SHOW_DIALOG()
          this.SET_SHOW_SUCCESS_FIND_MANAGER_FORM(false)}, 3000)
      })
       .catch(() => {
        console.log("oшибка")
        this.errorMsg = "error"
        this.showPreloader = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.preloader {
  margin: 28px auto 0;
}

.form{
  @include form;
  padding: 45px ;

  @media (max-width: 600px) {
    background-color: #fff;
    padding: 15px;
    margin: auto;
    width: 100%;
  }
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

.form__question{
 @include form__question;
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
</style>