<template>
  <div class="confirm-email">
    <my-window :title="title">
      <div v-if="SHOW_CONFIRM_EMAIL" class="confim-email__top"> 
        <div v-if="!SHOW_CHECK_EMAIL">
          <p class="text">Мы выслали письмо для подтвеждения на почту</p>
          <p><a class="text email" :href="href"> {{ EMAIL }} </a> </p>
        </div>
      </div>
      <my-semipolar-spinner v-if="showPreloader" class="preloader"/>
      <validation-errors
        v-if='VALIDATION_ERRORS'
        :validation-errors='VALIDATION_ERRORS'
      />
      <div v-if="SHOW_CHECK_EMAIL" class="confim-email__top">
        <p class="text">Мы выслали письмо на почту 
           <span class="span"> {{ EMAIL }} </span>  со ссылкой для восстановления пароля</p>
      </div>

      <div 
        v-if="!SEND_SECOND_EMAIL && $router.path === `/${SITE_ROLE}/profile`" 
        class="confim-email__bottom">
        <p 
          class="text" 
          v-if="this.countdown > 0" 
        >Отправить письмо повторно через {{ this.counter }} </p>
        <button 
          class="btn slide-in-blurred-left" 
          v-if="this.countdown <= 0" 
          @click="sendEmailAgain">
           Отправить письмо повторно
        </button>
      </div>
      <p 
        v-if="SEND_SECOND_EMAIL"
        class="btn"
      >Повторное письмо отравлено. Проверьте почту {{ EMAIL }} </p>
     
    </my-window>>
  
  </div>
</template>

<script>
import ValidationErrors from '@/components/Form/ValidationErrors.vue'
import { onBeforeRouteLeave } from 'vue-router'
import store from '@/store'
import { mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    name: 'confirm-email-form',
    components: { ValidationErrors},
    data(){
      return{
        href: `mailto:${ this.EMAIL }`,
        countdown: 3,
        counter:"2:00",
        showPreloader: false,
      }
    },

    props:{
      isLeaving: Boolean
    },
    
    computed:{
      ...mapGetters([
        'EMAIL',
        'IS_LOGGED_IN',
        'SHOW_CONFIRM_EMAIL', 
        'SHOW_CHECK_EMAIL',
        'SEND_SECOND_EMAIL',
        'VALIDATION_ERRORS',
        'SITE_ROLE'
      ]),

      // dinamic title
      title(){
        if(this.SHOW_CONFIRM_EMAIL){
          return "Подтвердите почту"
        } else if (this.SHOW_CHECK_EMAIL) {
          return "Проверьте почту"
        }
        return "+++"  
      },

    },

    methods:{
      ...mapMutations([
      'SET_VALIDATION_ERR',
      'SET_SHOW_CHANGE_PASSWORD',
      'SET_SHOW_CONFIRM_EMAIL',
      'SET_SHOW_CHECK_EMAIL',
      'SET_SEND_SECOND_EMAIL',
     
    ]),

    ...mapActions([
      'SEND_EMAIL_AGAIN'
    ]),

    countdownFn(time){ 
      setInterval(()=>{
        let minutes =  Math.floor(time/60)
        let seconds =  time % 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        this.counter =  `${minutes}:${seconds}`
        this.countdown--
        if(time > 0){
          time--
        } 
      },
      1000) 
    },

    async sendEmailAgain() {
      this.showPreloader =  true
      this.SEND_EMAIL_AGAIN()
        .then(() => this.showPreloader = false )
        .catch(() => this.showPreloader = false )
    }
  },

    mounted(){
      this.countdownFn(this.countdown)
    },

   setup(){
    //перед уходом сбрасываем статус
    onBeforeRouteLeave(() => {
      store.commit('SET_RESET_FORM_STATUS')
      store.commit('SET_SEND_SECOND_EMAIL', false)
    })

   }
 
    
    
  }
</script>

<style lang="scss" scoped>
.preloader{
  margin: 0 auto;
  margin-bottom: 50px;
}
.confirm-email{
  overflow: hidden;
}

.confim-email__top{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 45px;
}

.confim-email__bottom{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.text {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #416782;
  text-align: left;
}

.email{
    color:$main-color;
  }

.click{
    cursor: pointer;
  }

  .btn{
    @include btn-no-border
  }

  .span{
    color:$main-color;
    font-weight: 500;
   font-size: 14px;
   line-height: 21px;
  }

  .slide-in-blurred-left{-webkit-animation:slide-in-blurred-left .6s cubic-bezier(.23,1.000,.32,1.000) both;animation:slide-in-blurred-left .6s cubic-bezier(.23,1.000,.32,1.000) both}

@-webkit-keyframes slide-in-blurred-left{0%{-webkit-transform:translateX(-1000px) scaleX(2.5) scaleY(.2);transform:translateX(-1000px) scaleX(2.5) scaleY(.2);-webkit-transform-origin:100% 50%;transform-origin:100% 50%;-webkit-filter:blur(40px);filter:blur(40px);opacity:0}100%{-webkit-transform:translateX(0) scaleY(1) scaleX(1);transform:translateX(0) scaleY(1) scaleX(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes slide-in-blurred-left{0%{-webkit-transform:translateX(-1000px) scaleX(2.5) scaleY(.2);transform:translateX(-1000px) scaleX(2.5) scaleY(.2);-webkit-transform-origin:100% 50%;transform-origin:100% 50%;-webkit-filter:blur(40px);filter:blur(40px);opacity:0}100%{-webkit-transform:translateX(0) scaleY(1) scaleX(1);transform:translateX(0) scaleY(1) scaleX(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-filter:blur(0);filter:blur(0);opacity:1}}
</style>