<template>
  <div class="successSubscribe">
    <img src="@/assets/images/check.png" alt="check">
    <p class="msg"> Вы выбрали исполнителя по заявке </p>
   
    <div class="btn-wr">
      <my-blue-btn 
        @click="toToApplication" 
        class="btn"
      >Показать список заявок</my-blue-btn>
      <my-blue-btn class="btn" @click="handler">Продолжить чат с исполнителем</my-blue-btn>
    </div>
  </div>
</template>

<script> 
  import { mapMutations } from "vuex";
  export default {
    name: "success-provider-selected",
    methods:{
      ...mapMutations([
        "SHOW_DIALOG", 
      ]),

      handler() {
        this.SHOW_DIALOG()
      },

      toToApplication() {
        this.SHOW_DIALOG()
        this.$router.push("/customer/my_applications")
      }
    }
  }

</script>
 
<style lang="scss" scoped>

.btn-wr {
  @include flex(row, center, center, 20px);
  width: 75%;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
 } 
}

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

</style>