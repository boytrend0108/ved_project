<template>
  <div id="start-layout">
    <header-main v-if="CURRENT_USER === null || CURRENT_USER.site_role === 'customer'" />
    <header-provider v-else/>
    <div class="container" :style="{backgroundColor: setBackgroundColor }">
      <main class="main-box" @click="clickHandler">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component"></component>
          </transition> 
        </router-view>
      </main>
    </div>  

    <div class="container">
      <footer class="footer">
        <div class="footer__box">
          <a href="#main_title">
            <my-logo @click="this.$router.push('/')" class="logo"/>
          </a>
          <p class="footer_text">© 2023 Delegat</p>
        </div> 
        <div class="footer__box">
          <div class="footer__title">Документация</div>
          <p class="footer_text">Политика конфиденциальности</p>
          <RouterLink to="customer-agreement" class="footer_text">Пользовательское соглашение</RouterLink>
          <RouterLink to="oferta-page" class="footer_text">Оферта</RouterLink>
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


  export default {
    components: { 
      HeaderMain, HeaderProvider,
       },
    name:"home-layout",
    computed:{
    ...mapGetters([
      "CURRENT_USER"
    ]),

    setBackgroundColor() {
    return this.$route.name === "home-new"  ? "none" : "#F5F5F7"
    }
  },

  methods: {
    ...mapMutations([
      "SET_SHOW_HEADER_DROPDOWN"
    ]),

    clickHandler(){
     this.SET_SHOW_HEADER_DROPDOWN(false)
    }
  }
}
</script>

<style lang="scss" scoped>

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

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.2s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}


.route-leave-active {
  transition: all 0.2s ease-in
}



</style>