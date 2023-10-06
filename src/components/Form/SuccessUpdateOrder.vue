<template>
  <div class="successSubscribe">
    <h2 class="title">Вы успешно обновили заявку!</h2>
    <h2 class="title">Теперь её можно опубликовать.</h2>
    <my-blue-btn class="btn" @click="handler">Ок</my-blue-btn>
  </div>
</template>
 
<script>
  import { mapGetters, mapMutations } from 'vuex'; 
  export default {
    name: 'success-update-order',
    computed: {
      ...mapGetters(["DIALOG"])
    },
    methods:{
      ...mapMutations([
        "SHOW_DIALOG", 'SET_SHOW_SUCCESS_FORM'
      ]),

      handler() {
        this.$emit("close_dialog")
        if (this.DIALOG) this.SHOW_DIALOG()
      }
    }
  }

</script>
 
<style lang="scss" scoped>
.title {
  @include title_h3;
  align-self: center;
  text-align: center;

  @media (max-width: 600px) {
    text-align: center;
  }
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
  @include flex(column, center, flex-start, 12px);
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
  margin: 45px auto;
  text-align: left;
  position: relative;

  @media (max-width: 600px) {
    @include font(20px, 600, $font-color2);
    line-height: 27px;
    margin: 30px 0 20px 30px;
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
  
  @media (max-width: 600px) {
    margin: 45px auto;
    width: 100%;
  }
}
</style>