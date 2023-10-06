<template>
  <div class="successSubscribe">
    <img src="@/assets/images/check.png" alt="check">
    <p class="msg">Для заполнения заявки Вам нужно войти на сайт или зарегистрироваться</p>
    <my-blue-btn class="btn" @click="handler">Ок</my-blue-btn>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: 'signin-offer-form',
    methods:{
      ...mapMutations([
        "SHOW_DIALOG", 
      ]),

      handler() {
        this.$router.push('/customer/signin')
        this.SHOW_DIALOG()
      }
    }
  }

</script>
 
<style lang="scss" scoped>

img{
  @media (max-width: 600px) {
    width: 4.5rem;
  }
}
.fa-xmark{
  width: 2rem;
  height: 2rem;
}
.successSubscribe{
  @include flex(column, center, center, 0);
  height: 41.2rem;
  background: #FFFFFF;
  box-shadow: 0px .5rem 2rem rgba(6, 21, 43, 0.15);
  border-radius: 1rem;
  padding: 4.5rem;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding: 1.5rem;
  }
}

.msg{
  @include font(3.2rem, 600, $font-color2);
  line-height: 3.8rem;
  margin: 4.5rem 0 4.5rem;

  @media (max-width: 600px) {
    @include font(2rem, 600, $font-color2);
    line-height: 2.7rem;
    margin: 30px 0 2rem 0;
  }
}
.btn{
  width: 11.2rem !important;
}
</style>