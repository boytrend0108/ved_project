<template>
  <div class="successSubscribe">
    <h2 class="title">Заявка опубликована!</h2>
    <p class="msg" v-if="$route.query.type === 'delivery'">Ждите предложения от исполнителей</p>
    <my-blue-btn class="btn" @click="handler">Ок</my-blue-btn>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: 'success-publish-order',
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
  @include title_h3;
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
    width: 100%;
  }
  
}
</style>