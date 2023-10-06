<template>
  <div class="successSubscribe">
    <img src="@/assets/images/check.png" alt="check">
    <p class="msg">Благодарим за подписку на наши новости</p>
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
        this.SET_SHOW_SUCCESS_FORM(false);
        this.SHOW_DIALOG();
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
  @include successSubscribe;
}

.msg {
  @include form-msg;
}
.btn {
  width: 11.2rem !important;
}
</style>