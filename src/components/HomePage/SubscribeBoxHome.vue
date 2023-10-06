<template>
  <div class="subscribeBoxHome">
    <div class="subscribeBoxHome__block">
       <img src="@/assets/images/home_page/envelope.png" alt="Подписка" class="img">
       <h3 class="title">Узнавайте первыми новости ВЭД в нашем Telegram-канале</h3>
       <a 
         href="https://t.me/justdelegat" 
        target="blanc" 
        class="link"
        >Перейти в Telegram-канал</a>
    </div>
    <div class="divider">
      <hr class="hr">
      <p class="or">или</p>
      <hr class="hr"> 
    </div>
    <div class="subscribeBoxHome__block">
      <h3 class="title">Подпишитесь на рассылку</h3>
      <div class="input-box">
         <input 
           id="email"
           type="email"  
           class="input-email" 
           placeholder="Электронная почта"
           @blur="validation"
           @focus="clearErr"
           v-model="input"
          >
         <my-blue-btn @click="subscribe" class="btn-blue" id="subscr_btn">Подписаться</my-blue-btn>
      </div>
      <p class="err" v-if="error">{{ error }}</p>
      <p class="note">Нажимая «Подписаться», я соглашаюсь получать рекламные и иные сообщения на условиях Политики конфиденциальности и Пользовательского соглашения</p>
    </div>
     <my-semipolar-spinner class="preloader" v-if="showpreloader" />
     <validation-errors />
  </div>
</template>

<script>
  import { emailValidation } from '@/helpers/validation';
  import { mapMutations, mapGetters, mapActions } from 'vuex';
  import ValidationErrors from '../Form/ValidationErrors.vue';
  export default {
    name: 'subscribe-box-home',
    components: { ValidationErrors },
    data(){
      return{
        input: '',
        error: '',
        showpreloader: false,
      }
    },

    computed:{
      ...mapGetters([
        'DIALOG', 'SHOW_SUCCESS_FORM'
      ])
    },

    methods:{
      ...mapMutations([
        'SHOW_DIALOG', 'SET_SHOW_SUCCESS_FORM'
      ]),

      ...mapActions(['SUBSCRIBE_TO_NEWS']),

      validation(event) {
        this.error = emailValidation(event)
        if (this.error) {
          document.querySelector('#subscr_btn').classList.add('disabled');
          document.querySelector('#subscr_btn').setAttribute('disabled', true);
        }
      },

      clearErr() {
        this.error = '';
        document.querySelector('#subscr_btn').classList.remove('disabled');
        document.querySelector('#email').classList.remove('invalid');
        document.querySelector('#subscr_btn').removeAttribute('disabled');
      },

      subscribe(){
        if (!this.input) return 
        this.showpreloader = true;
        this.SUBSCRIBE_TO_NEWS(this.input)
          .then(() => {
            this.showpreloader = false;
            this.SET_SHOW_SUCCESS_FORM(true);
            this.SHOW_DIALOG();
            this.input = '';
          }) 
      }
    }

  }
</script>

<style lang="scss" scoped>
.link{
  @include myBlueBtn;
  @media (max-width: 600px) {
    width: 100%;;
  };
}
.preloader{
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-blue {
  @media (max-width:600px) {
    width: 100% !important;
  }
}
.note{
  @include font(1.4rem, 400, #416782);
  line-height: 2.1rem;
  margin-top: 1.5rem;
  width: 54%;

  @media (max-width: 600px) {
    width: 100%;
    @include font(1.3rem, 400, #416782);
    line-height: 1.8rem;
  }
}

.err{
  @include font(1.4rem, 400, red);
  line-height: 2.1rem;
  margin-top: 1.5rem;
  width: 54%;

  @media (max-width: 600px) {
    width: 100%;
    @include font(1.3rem, 400, red);
    line-height: 1.8rem;
  }
}

.hr{
  @include hr;
  margin-top: 4.5rem !important;
  }
.divider{
  @include flex(row, center, center, 4.5rem);
  margin: 4rem 0 ;

  @media (max-width: 600px) {
    margin: 3rem 0;
    gap: 1.5rem;
  }
}

.input-box{
  @include flex(row, center, center, 1rem);
  width: 54%;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
}
.input-email{
  @include input;

  @media (max-width: 600px) {
    height: 4rem;
  }
}

.img{
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
    width: 7.2rem;
    height: 6rem;
  }
}
.title{
  @include font(2rem, 600, $font-color2);
  line-height: 2.3rem;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    @include font(1.7rem, 600, $font-color2);
    margin-bottom: 2rem;
  }
}

.or{
  @include font(2rem, 600, $font-color2);
  line-height: 2.3rem;

  @media (max-width: 600px) {
    @include font (1.4rem, 600, $font-color2 );
  }
}

::placeholder{
  @include placeholder;
}

.subscribeBoxHome{
  min-height: 575px;
  background-color: #FFFF;
  padding: 6rem ;

  @media (max-width: 600px) {
    padding: 3rem 1.5rem;
  }
}
.subscribeBoxHome__block{
  @include flex(column, center, center, 0);
}

.invalid{
  @include invalid;
}

.disabled{
  @include disabled;
}

</style>