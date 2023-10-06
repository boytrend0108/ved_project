<template>
  <div class="successSubscribe">
    <h2 class="title">Благодарим за отзыв!</h2>
    <p class="msg">Мы приложим все усилия, чтобы сделать наш сервис ещё лучше и порадовать вас</p>
    <p class="submsg"> &copy; Команда Delegat </p>
    <my-blue-btn class="btn" @click="handler">Ок</my-blue-btn>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
    name: 'success-subscribe',
    methods:{
      ...mapMutations([
        "SHOW_DIALOG", 'SET_SHOW_SUCCESS_FORM'
      ]),

      handler() {
        this.SET_SHOW_SUCCESS_FORM(false)
        this.SHOW_DIALOG()
      }
    }
  }

</script>
 
<style lang="scss" scoped>
.title {
  @include title_h2;
  align-self: center;
}

img{
  @media (max-width: 600px) {
    width: 45px;
  }
}
.fa-xmark{
  width: 20px;
  height: 20px;
}
.successSubscribe{
  @include flex(column, center, flex-start, 0);
  background: #FFFFFF;
  box-shadow: 0px 5px 20px rgba(6, 21, 43, 0.15);
  border-radius: 10px;
  padding: 45px;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding: 15px;
  }
}

.msg{
  @include font(17px, 500, $font-color2);
  line-height: 26px;
  margin: 45px 0 10px;
  text-align: left;
  margin-left: 50px;
  position: relative;

  @media (max-width: 600px) {
    @include font(20px, 600, $font-color2);
    line-height: 27px;
    margin: 30px 0 20px 30px;
  }

  &:before {
    content: url("@/assets/images/icons/quotes.svg");
    position: absolute;
    top: 0px;
    left: -38px;
  }
}

.submsg {
  @include font(14px, 500, $font-color3);
  margin-left: 50px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
}

.btn{
  width: 112px ;
  margin-top: 45px;
  min-width: 150px;
  
  
}
</style>