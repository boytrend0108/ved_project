<template>
  <div class="login">
    <h1 class="visually-hidden">Вход</h1>
    <form-login v-if="SHOW_LOGIN_FORM" />
    <change-password v-if="SHOW_CHANGE_PASSWORD" class="change-password" />
    <confirm-email-form v-if="SHOW_CONFIRM_EMAIL" class="confirm-email" />
  </div>
</template>  
 
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import FormLogin from '@/components/Form/FormLogin.vue';
import ChangePassword from '@/components/Form/ChangePassword.vue';
import ConfirmEmailForm from '@/components/Form/ConfirmEmailForm.vue';

export default {
  name: 'login-page',
  components:{
    FormLogin, 
    ChangePassword,
    ConfirmEmailForm
  },
  computed:{
    ...mapGetters([
      'FORGET_PASSWORD',
      'SHOW_CONFIRM_EMAIL',
      'SHOW_CHANGE_PASSWORD', 
      'SHOW_LOGIN_FORM',
    ])
  },

  methods:{
    ...mapActions([
      'VERIFY_EMAIL'
    ]),

    ...mapMutations(["SET_SITE_ROLE"])
  },
  
  mounted() {
    const site_role = this.$route.path.split("/")[1];
    this.SET_SITE_ROLE(site_role)

    window.scrollTo(0,0)
    const verifyToken = this.$route.query.verification_code
    if(verifyToken){
      this.VERIFY_EMAIL(verifyToken)
    } return   
  }
}
</script>

<style  lang="scss" scoped> 

.visually-hidden {
  @include visually-hidden;
}
.login {
  @include flex (column, center, center, 0);
  background-color: #F5F5F7;
  min-height: calc(100vh - 24rem);
  width: 100%;
}
.change-password{
  margin-top: 6rem;
  margin-bottom: 6rem;
  max-width: 500px;
  width: 68%;
  max-width: 600px;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }
}
.confirm-email{
  margin-top: 6rem;
  margin-bottom: 6rem;

  @media (max-width: 600px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
  }
}
  

</style>

