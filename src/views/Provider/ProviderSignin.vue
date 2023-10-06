<template>
  <div class="login">
    <h1 class="visually-hidden">Вход</h1>
    <form-login v-if="SHOW_LOGIN_FORM" site_role="provider"/>
    <change-password v-if="SHOW_CHANGE_PASSWORD" class="change-password" />
    <confirm-email-form v-if="SHOW_CONFIRM_EMAIL" class="confirm-email" />
  </div>
</template>  

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import FormLogin from '@/components/Form/FormLogin';
import ChangePassword from '@/components/Form/ChangePassword';
import ConfirmEmailForm from '@/components/Form/ConfirmEmailForm';

export default {
  name: 'provider-signin',
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

  mounted(){
    const site_role = this.$route.path.split("/")[1];
    this.SET_SITE_ROLE(site_role)

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
.login{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F7;
  min-height: calc(100vh - 24rem);
  width: 100%;
}
.change-password{
  margin-top: 6rem;
  margin-bottom: 6rem;
  width: 68%;
  max-width: 600px;


  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0;
  }
}
.confirm-email{
  margin-top: 6rem;
  max-width: 600px;
}

  
</style>

