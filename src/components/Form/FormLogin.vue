<template >
  <section class="dialog__content">
    <form  
      class="form" 
      id="login-form"
      @submit.prevent="onSubmit"
    >
    <div class="form__title-box">
      <h2 class="form-title">Вход <span v-if="site_role" class="form-title"> для специалиста</span></h2>
    </div>
    
      <div class="input-box">
        <label for="email" class="form-label">E-mail</label>
        <input 
          placeholder="E-mail"
          autocomplete="email"
          class="input-login"
          type="email" 
          id="email" 
          @input="validations($event)"
          :class="{ invalid:!IS_VALID }"
          v-model.trim="email"
        />
      </div>

        <div class="input-box">
          <label for="password" class="form-label">Пароль</label>
          <input 
            placeholder="Пароль"
            type="password"
            class="input-login"
            id="password_1" 
            v-model.trim="password"
            autocomplete="current-password"
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

        <validation-errors
          v-if="VALIDATION_ERRORS"
          :validation-errors="VALIDATION_ERRORS"
        />
    </form>
  <div class="question-box">
    <router-link
      @click="goToRegistrationPage"
      to="/customer/signup" 
      class="form__question"> Eще нет аккaунта?</router-link>
    <p  class="form__question" @click="clickHandler"> Забыли пароль?</p>
    <my-form-offer />
  </div>
  </section>
   
</template>

<script>
import { setDefaultHeader } from "@/api/axios"
import { mapActions, mapGetters, mapMutations } from "vuex";
import ValidationErrors from "@/components/Form/ValidationErrors.vue"
import { REGEXP_PASSWORD, REGEXP_EMAIL } from "@/constants/regExp"
  export default {
    name: "form-login",
    components:{
       ValidationErrors
    },

  props:{
    site_role: String
  },

  data() {
    return {
      isBtnEnable: true,
      showPass1: true,
      showPass2: true,
      email: "",
      password: "",
      email_reg: REGEXP_EMAIL,
      password_reg: REGEXP_PASSWORD,
    }
  },

  computed:{
    ...mapGetters([
      "IS_VALID","EMAIL","PASSWORD", "VALIDATION_ERRORS", 
      "IS_APPLICATION_COMPLETE"
    ]), 
  },

  methods: {
    ...mapActions([
      "LOGIN","GET_EMAIL","CURRENT_USER", "ATTEMPT"
    ]
    ),
    ...mapMutations([
      "SWITCH_IS_VALID","SET_FORM_DATA","SET_SHOW_CHANGE_PASSWORD",
      "SET_SHOW_LOGIN_FORM","SET_VALIDATION_ERR", "SET_IS_APPLICATION_COMPLETE", "SET_SHOW_PRELOADER"
     ]),

     goToRegistrationPage(){
      const site_role = this.$route.path.split("/")[1] 
       this.SET_VALIDATION_ERR("clear")
       this.$router.push(`/${site_role}/signup`)
     },

    sendFormData(email, password) {
      const formData = {
        email: email,
        password: password
      }
      this.SET_FORM_DATA(formData)
    },
 
    clearForm(){
      this.email = ""
      this.password = ""
    },

    clickHandler(){
      this.SET_SHOW_LOGIN_FORM(false)
      this.SET_SHOW_CHANGE_PASSWORD(true)
    },


    showPassword(id) {
      const firstPassword = document.getElementById("password_1")
      if (id === "1") {
        if (firstPassword.attributes.type.textContent === "password") {
          firstPassword.attributes.type.textContent = "text"
          this.showPass1 = !this.showPass1
          return
        }
        if (firstPassword.attributes.type.textContent === "text") {
          firstPassword.attributes.type.textContent = "password";
          this.showPass1 = !this.showPass1
        }
      }
    },
    
    validations(event) {
      this.sendFormData(this.email, this.password);
      this.SWITCH_IS_VALID(false);
      const btn = document.querySelector(".btn")
      btn.setAttribute("disabled", "disabled")
      if (this.email_reg.test(this.email) && event.target.id === "email") {
        event.target.classList.remove("invalid")
      }

      if (
        this.email_reg.test(this.email) &&
        this.password_reg.test(this.password)
      ) {
        this.SWITCH_IS_VALID(true);
        this.isBtnEnable = true
        btn.removeAttribute("disabled")
      } else {
        this.SWITCH_IS_VALID(false);
        this.isBtnEnable = false
      }
    },
      
    async onSubmit() {
      this.SET_SHOW_PRELOADER(true)
      this.SET_VALIDATION_ERR("clear") 

      const newData = {
        login: this.email,
        password: this.password
      }
      
      this.LOGIN(newData)
        .then(token => { 
          const site_role = this.$route.path.split("/")[1] 
          this.ATTEMPT(token).then(() => {
            setDefaultHeader()
            switch (site_role) { 
              case "customer": 
                if (!localStorage.getItem("selected_service") && !localStorage.getItem("currentRoute")) { 
                  this.$router.push("/customer/my_applications")
                } else if (localStorage.getItem("selected_service") === "delivery") {
                  this.$router.push("/start-application") 
                  localStorage.setItem("selected_service", "")
                } else if (localStorage.getItem("selected_service") === "search") {
                  this.$router.push("/search_product/?step=SearchProductComp") 
                  localStorage.setItem("selected_service", "")
                } else if (localStorage.getItem("selected_service") === "cost_calc") {
                  this.$router.push("/cost-calculation?step=FromWhichCountry") 
                  localStorage.setItem("selected_service", "")
                }  else if (localStorage.getItem("selected_service") === "manager") {
                  this.$router.push("/?#manager") 
                  localStorage.setItem("selected_service", "")
                } else if (localStorage.getItem("currentRoute")) {
                  if (localStorage.getItem("currentRoute").includes("verification_code")) {
                    this.$router.push(`/customer/my_applications`)
                  localStorage.setItem("currentRoute", "")
                  } else {
                    this.$router.push(`${localStorage.getItem("currentRoute")}`)
                    localStorage.setItem("currentRoute", "")
                  }             
                }

                break

              case "provider": 
                if (!localStorage.getItem("currentRoute")) this.$router.push("/provider/search/")
                  else {
                    if (localStorage.getItem("currentRoute").includes("verification_code")) {
                    this.$router.push("/provider/search/")
                    localStorage.setItem("currentRoute", "")
                  } else {
                    this.$router.push(`${localStorage.getItem("currentRoute")}`)
                    localStorage.setItem("currentRoute", "")
                  }
                  }
              break
            } 
            this.SET_SHOW_PRELOADER(false) 
          })
        })
        .catch(err => {
          console.log(err)
          this.SET_SHOW_PRELOADER(false)
        })
      }
  },

  mounted(){
    this.SET_VALIDATION_ERR("clear")
  }
    
}
</script>

<style lang="scss" scoped>

.form__title-box{
  @include flex(row, flex-start, center, 14px)
}

.proloader{
  margin: 36px auto 0;
  
}

.form{
  @include form;
} 
.form-title{
  @include form-title;
  margin-bottom: 0;
  text-align: left;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

</style>