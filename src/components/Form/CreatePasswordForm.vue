<template>
  <div class="my-window">
    <h2 class="title"> {{ title }} </h2>
    <validation-errors />
     <password-input :label="label_1" data-id="1" />
     <password-input :label="label_2" data-id="2" />
     <p v-if="showErrorMsg" class="error">Пароли не совпадают</p>
     <p v-if="successMsg" class="success">Смена пароля прошла успешно</p>
     <my-semipolar-spinner v-if="showPreloader" class="preloader" />
     <my-color-btn 
       class="btn" 
       :class="{disabled:!isBntDisable}"
       :disabled="!isBntDisable"
       @click="createPassword">Создать пароль 
     </my-color-btn>
  </div>
</template>

<script>
import MySemipolarSpinner from '../UI/Spinners/MySemipolarSpinner.vue';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import PasswordInput from '@/components/Form/PasswordInput';
import { mapActions, mapGetters } from 'vuex';

  export default {
    name:'create-password-form',
    components:{
      PasswordInput, ValidationErrors, MySemipolarSpinner
    },

    data(){
      return{
        title: 'Создание нового пароля',
        label_1: "Пароль",
        label_2: 'Повторите пароль',
        btn : null,
        successMsg: false,
        showPreloader: false,
      }
    },

    computed:{
      ...mapGetters(
        ['PASSWORDS']
      ),

      isBntDisable() {
        try {
          if (this.PASSWORDS.password_1 === this.PASSWORDS.password_2 &&
              this.PASSWORDS.isValidPassword_1 === true &&
              this.PASSWORDS.isValidPassword_2 === true) {
            return true
          } else {           
            return false 
          } 
        } catch (err) {
          console.log(err)
          return ''
        } 
      },

      showErrorMsg(){
        if(this.PASSWORDS.password_2 && !this.isBntDisable ){
          return true
        } return false
      }
    },

  methods: {
    ...mapActions([
      'CREATE_NEW_PASSWORD'
    ]),

    createPassword() {
      this.showPreloader = true
      const data = {
        token: this.$route.query.reset_token,
        new_password: this.PASSWORDS.password_1
      }
      const site_role = localStorage.getItem('site_role')
      this.CREATE_NEW_PASSWORD(data)
        .then(()=>{
          this.showPreloader = false
          this.successMsg = true
          setTimeout(()=>{
            this.$router.push(`/${site_role}/signin`)
            this.successMsg = false
          }, 2000) 
      })
        .catch(err => console.log(err))
    }
  },

  mounted() {
    this.btn = document.querySelector('.btn')
  }
  }
</script>

<style lang="scss" scoped> 

.preloader{
  margin: 0 auto;
}

.error{
  margin: 0 auto;
  @include font(14px, 500, red)
}

.success{
  margin: 20px auto 0;
  @include font(20px, bold, $main-color)
}
.my-window{
 @include my-window;
 padding-top: 6rem;

 @media (max-width: 600px) {
  padding: 10px;
 }
}

.title{
  @include form-title
}
.btn{
  @include myColorBtn(white, #339DFF, #339DFF);
  width: 100%;
  margin-top: 3.7rem;
}
.btn:hover{
    color:#339DFF;
    background-color: #fff;
    border-color: #339DFF;
  }

.disabled{
  @include disabled
}

</style>