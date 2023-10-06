<template>
  <div class="UserProfileForm">
    <my-profile-input
      :title="title_fio" 
      :profileInput="fio"
      :isClicked="isClicked"
      :id="'fio'"
      class="myProfileInput"
      @newFio="setNewFio"
      />

    <fieldset  class="fildset">
  
      <my-phone-code 
        @phoneValidation="setPhone" 
        @setCode="setCode"
        :isClicked="isClicked"
      />

      <div class="btnBox">
        <my-blue-btn 
          @click="changeUserData" 
          class="btn-blue"
          :class="{disabled: isSaveBtnDisable }"
          :disabled="isSaveBtnDisable"
        >Coхранить</my-blue-btn>
        <my-white-btn class="whiteBtn" @click="clearFn"> Отменить </my-white-btn>
      </div>
    </fieldset >
    <p v-if="error" class="error"> {{ error }}</p>
    <fieldset class="fildset">
      <my-profile-input
        :title="title_email" 
        :profileInput="email"
        class="myProfileInput"
      />
      <div class="btnBox">
        <my-white-btn class="whiteBtn2" @click="changePassword">Сменить пароль</my-white-btn>
      </div>
    </fieldset>
     
  </div> 
</template>
 
<script>

import { mapActions, mapGetters, mapMutations, } from 'vuex';
import MyProfileInput from '../UI/Inputs/MyProfileInput.vue';

  export default {
  components: { 
    MyProfileInput, 
  },
    name: 'user-profile-form',
    data(){
      return{
        title_fio: 'ФИО',
        fio: '',
        title_phone: 'Телефон',
        phone: '',
        code: '',
        flag: '',
        title_email: 'Email',
        email: '',
        isClicked:false,
        isSaveBtnDisable: true,
        error:'',
      }
    },
    computed:{
      ...mapGetters([
        'CURRENT_USER','FIRMS', 'DIALOG', 'SITE_ROLE'
      ])
    },

    methods:{
      ...mapActions([
        'UPDATE_USER', 'SEND_NEW_COMPANY_TO_SERVER',
      ]),
      ...mapMutations([
        'SHOW_DIALOG', 'SET_SHOW_CHANGE_PASSWORD', "SET_SHOW_PRELOADER"
      ]),
      
      clearFn(){
       this.isClicked = !this.isClicked // передаём пропсом в доч.комп
       this.fio = this.CURRENT_USER.full_name
      },

      changePassword(){
        localStorage.setItem('site_role', `${this.SITE_ROLE}`)
        this.SET_SHOW_CHANGE_PASSWORD(true)
        this.SHOW_DIALOG()
      },

      setNewFio(data) {
        this.fio = data.input 
        this.isSaveBtnDisable = data.status
      },
      
      setCode(data) {
         this.code = data.code
         this.flag = data.flag
      },

      setPhone(data) {
         if (!data.status) {
          this.isSaveBtnDisable = true
         } else {
          this.phone = data.phone
          this.isSaveBtnDisable = false
         }
      },

      changeUserData() {
        this.SET_SHOW_PRELOADER(true)
        const userData = {
          "full_name": this.fio,
          "phone_number": `${this.phone}`,
        }
        this.UPDATE_USER(userData)
         .then(() => {
          this.SET_SHOW_PRELOADER(false)
          this.isSaveBtnDisable = true
          })
         .catch(err => {
          this.error = err
          setTimeout(() => { this.error = '' }, 3000)
          this.SET_SHOW_PRELOADER(false)
        })
    }
      
    },

    mounted() {
    if (this.CURRENT_USER !== null) {
      this.fio = this.CURRENT_USER.full_name
      this.email = this.CURRENT_USER.email
    } else return
  }
  }
</script>

<style lang="scss" scoped>
.error {
  @include errorMsg;
}
.disabled{
  @include disabled;
}

.btn-blue{
  @media (max-width: 600px) {
    width: 100%;
  }
} 

.fildset{
  border: none;
  margin-bottom: 20px;
  padding: 0;
  
  @media (max-width: 600px) {
    margin-bottom: 0;
  }
}

.btnBox{
  @include flex(row, flex-start, center, 10px);
  margin-top: 10px;

  @media (max-width: 600px) {
    justify-content: space-between;
  }

}

.whiteBtn{
  border: none;
  background-color: inherit;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.whiteBtn2{
  background-color: inherit;

  @media (max-width: 600px) {
    height: 40px;
    width: 100%;
    margin-top: 20px;
  }
}

.myProfileInput{
  margin-top: 20px;
}



</style>