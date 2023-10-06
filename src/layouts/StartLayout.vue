<template>
  <div id="start-layout" class="start-layout">
    <header-main v-if="CURRENT_USER === null || CURRENT_USER.site_role === 'customer'" />
    <header-provider v-else />
    <div class="container">
      <main class="main-box" @click="clickHandler">
        <router-view />
      </main>
    </div>

    <div class="container">
      <footer class="footer">
        <div class="footer__box">
          <a href="#main_title">
            <my-logo @click="this.$router.push('/')" class="logo" />
          </a>
          <p class="footer_text">© 2023 Delegat</p>
        </div>
        <div class="footer__box">
          <div class="footer__title">Документация</div>
          <p class="footer_text">Политика конфиденциальности</p>
          <RouterLink 
            to="/customer-agreement" 
            class="footer_text"
          >Пользовательское соглашение
          </RouterLink>
          <RouterLink to="/oferta-page" class="footer_text">Оферта</RouterLink>
        </div>
        <div class="footer__box">
          <div class="footer__title">Контакты</div>
          <p class="footer_text">info@delegat.online</p>
          <p class="footer_text">г. Москва, ул. 4-ая Магистральная, д. 11, оф. 34</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations} from "vuex";
import HeaderMain from "@/components/Header/HeaderMain.vue"
import HeaderProvider from "@/components/Header/HeaderProvider.vue";
import { RouterLink } from "vue-router";

  export default {
    components: { HeaderMain, HeaderProvider, RouterLink },
    name:'start-layout',
    computed:{
    ...mapGetters([
      'CURRENT_USER'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_SHOW_HEADER_DROPDOWN'
    ]),

    clickHandler(){
     this.SET_SHOW_HEADER_DROPDOWN(false)
    }
  }
}
</script>

<style lang="scss" scoped>

.start-layout {
  background-color: #F5F5F7;
  min-height: 100vh;
  @include flex(column, center, center, 0);
}

.container{
  @include container;
}

.main-box {
  min-height: calc(100vh - 27rem);
  @include flex(column, center, center, 0);

  @media (max-width: 600px) {    
    padding: 1.5rem 0;
  }
 }
.logo{
  margin-bottom: 10px;
}

.footer__box{
  @include flex(column, center, flex-start, 0px)
}

.footer__title{
  @include font(14px, 600, $font-color2);
  line-height: 21px;
  margin-bottom: 10px;
}
.footer_text{
   @include font(14px, 500, #416782);
   line-height: 21px;
   text-align: left;
   margin-bottom: 7px;
}


.footer{
  @include flex(row, space-between, flex-start, 0);
  min-height: 170px;
  border-top: 2px solid #D9E1E7;
  // margin-top: 120px;
  padding: 45px 0;

  @media (max-width: 600px) {
    flex-direction: column;
    // margin-top: 45px;
    gap: 10px;
  }
}
  
.container{
  @include container;
}



</style>