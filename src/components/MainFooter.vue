<template>
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
        <div class="footer__title"> Контакты </div>
        <p class="footer_text"> info@delegat.online </p>
        <p class="footer_text">г. Москва, ул. 4-ая Магистральная, д. 11, оф. 34</p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'main-footer',
  }
</script>

<style lang="scss" scoped>

.logo{
  margin-bottom: .5rem;
}
.container{
   padding: 0 2rem;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
}
.footer{
  @include flex(row, space-between, flex-start, 0);
  min-height: 170px;
  // margin-top: 120px;
  padding: 45px 0;

  @media (max-width:600px) {
    @include flex(column, space-between, flex-start, 10px);
    padding: 2rem 0;
  }
}
.footer__box{
  @include flex(column, center, flex-start, 0px)
}

.footer__title{
  @include font(1.4rem, 600, $font-color2);
  line-height: 2.1rem;
  margin-bottom: 10px;
}
.footer_text{
   @include font(1.4rem, 500, #416782);
   line-height: 2.1rem;
   text-align: left;
   margin-bottom: 7px;
}

</style>