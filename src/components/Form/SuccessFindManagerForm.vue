<template>
  <div class="successSubscribe" @click.stop>
    <img src="@/assets/images/check.png" alt="check">
    <p class="msg"> Заявка отправлена </p>
    <p class="submsg"> Наш менеджер свяжется с вами, чтобы уточнить детали </p>
    <my-blue-btn class="btn" @click="handler">Ок</my-blue-btn>
  </div>
</template>

<script> 
  import { mapMutations } from 'vuex';
  export default { 
    name: 'success-find-manager-form',
    methods:{
      ...mapMutations([
        "SHOW_DIALOG", 'SET_SHOW_SUCCESS_FIND_MANAGER_FORM'
      ]),

      handler() {
        this.SET_SHOW_SUCCESS_FIND_MANAGER_FORM(false)
        this.SHOW_DIALOG()
      }
    }
  }

</script>
 
<style lang="scss" scoped>
.submsg {
 @include font(17px, 500, $font-color2);
 margin-bottom: 45px;
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
  @include flex(column, center, center, 0);
  height: 412px;
  background: #FFFFFF;
  box-shadow: 0px 5px 20px rgba(6, 21, 43, 0.15);
  border-radius: 10px;
  padding: 45px;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding: 1.5rem;
  }
}

.msg{
  @include font(32px, 600, $font-color2);
  line-height: 38px;
  margin: 45px 0 20px;

  @media (max-width: 600px) {
    @include font(20px, 600, $font-color2);
    line-height: 27px;
    margin: 30px 0 20px 0;
  }
}
.btn{
  width: 112px !important;
}
</style>