<template>
  
    <my-window :title="title">  
    <form 
      class="form" 
      id="form2"
      @submit.prevent='onSubmit'
    >
    <div class="input-box">
          <label for="email_2" class="form-label">E-mail</label>
            <input 
              placeholder="E-mail"
              class="input-login"
              type="email" 
              id="email_2" 
              @input="validations($event)"
              :class="{ invalid:!IS_VALID }"
              v-model.trim='email'
              :disabled="isInputDisabled"
              />
        </div>
        <validation-errors
        v-if='VALIDATION_ERRORS'
        :validation-errors='VALIDATION_ERRORS'
      />
      <!-- <my-semipolar-spinner v-if="showPreloader" class="preloader"/> -->
      <my-big-spinner v-if="showPreloader"/>
        <my-btn
          form="form2" 
          type="submit" 
          class="btn"
          :class="{ BtnEnable:!isBtnEnable }"
        >Cменить пароль
        </my-btn>
    </form>
    <p 
      class="form__question" 
      @click="goToSignUpPage"
      v-if="showMsg"
    > Eще нет аккaунта?</p>
  </my-window>

  
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import MyBigSpinner from '../UI/Spinners/MyBigSpinner.vue';

export default {
  name:'change-password',
  components: { ValidationErrors, MyBigSpinner },
  data() {
    return {
      title: 'Смена пароля',
      isBtnEnable: true,
      email: '',
      email_reg: /.+@.+\..+/i,
      showPreloader: false,
    }
  },

  computed: {
    ...mapGetters([
      'IS_VALID',
      'CURRENT_USER',
      'VALIDATION_ERRORS',
    ]),

    isInputDisabled() {
      if (this.$route.name === 'customer-signin' || this.$route.name === 'provider-signin') return false
      else return true
    },

    showMsg(){
      if(this.$route.path === '/customer/profile' || this.$route.path === '/provider/profile') return false
      return true
    }
  },

  methods: {
    ...mapMutations([
      'SWITCH_IS_VALID',
      'SET_FORM_DATA',
      'SET_VALIDATION_ERR',
      'SET_SHOW_CHANGE_PASSWORD',
      'SET_SHOW_CONFIRM_EMAIL',
      'SET_SHOW_CHECK_EMAIL',
      'SET_SHOW_SIGNUP_FORM',
    ]),

    ...mapActions([
      'RESET_PASSWORD'
    ]),

    sendFormData(email, password) {
      const formData = {
        email: email,
        password: password
      }
      this.SET_FORM_DATA(formData)
    },

    validations(event) {
      this.sendFormData(this.email, '');
      this.SWITCH_IS_VALID(false);
      const btn = document.querySelector('.btn')
      btn.setAttribute('disabled', 'disabled')
      if (this.email_reg.test(this.email) && event.target.id === 'email') {
        event.target.classList.remove('invalid')
      }

      if (
        this.email_reg.test(this.email)
      ) {
        this.SWITCH_IS_VALID(true);
        this.isBtnEnable = true
        btn.removeAttribute('disabled')
      } else {
        this.SWITCH_IS_VALID(false);
        this.isBtnEnable = false
      }
    },

    async onSubmit() {
      this.showPreloader = true
      const site_role = this.$route.path.split('/')[1]
      localStorage.setItem('site_role', `${site_role}`)
      this.SET_SHOW_CHANGE_PASSWORD(true)
      this.RESET_PASSWORD(this.email)
        .then(() => this.showPreloader = false)
        .catch(() => this.showPreloader = false)
    },

    goToSignUpPage(){
      this.SET_SHOW_CHANGE_PASSWORD(false)
      this.SET_SHOW_SIGNUP_FORM(true)
      const userStatus = this.$route.path.split('/')[1]
      this.$router.push(`/${userStatus}/signup`) 
    }

    
  },

  mounted(){
    this.CURRENT_USER ? this.email = this.CURRENT_USER.email : this.email = ''
  }

}
</script>

<style lang="scss" scoped>

.preloader{
  margin: 40px 40% 0;
}
.form{
width: 100%;
}
.input{
  @include input-login
}
.input-box{
  @include input-box
}
.input-login{
  @include input-login ;

  @media (max-width: 600px) {
    height: 40px;
  }
}
.form-label {
 @include form-label
}
.invalid{
  @include invalid
}
.btn{
 @include btn;
 margin-top: 45px;
}

::placeholder{
@include placeholder;
}

.form__question{
 @include form__question;
 margin-top: 20px;
 align-self: center;
 cursor: pointer;
}

</style>