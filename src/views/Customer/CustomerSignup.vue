<template>
  <div class="registration">
    <h1 class="visually-hidden">Регистрация</h1>
    <form-reg-customer v-if="SHOW_SIGNUP_FORM === true" />
    <confirm-email-form class="confirm-email" v-if="SHOW_CONFIRM_EMAIL === true" />
  </div>
</template>

<script >
import ConfirmEmailForm from '@/components/Form/ConfirmEmailForm.vue';
import FormRegCustomer from '@/components/Form/FormRegCustomer';
import { mapActions, mapGetters } from 'vuex';

export default { 
  components:{
    FormRegCustomer, ConfirmEmailForm
  },
  
  computed:{
    ...mapGetters([
      'IS_LOGGED_IN', 'SHOW_CONFIRM_EMAIL','SHOW_SIGNUP_FORM'
    ])
  },

  methods:{
    ...mapActions([
      'VERIFY_EMAIL'
    ])
  },
  
  mounted() {
    const verifyToken = this.$route.query.verification_code
    if (verifyToken) {
      this.VERIFY_EMAIL(verifyToken)
    } return
  }
  }

</script>

<style lang="scss" scoped>

.visually-hidden {
  @include visually-hidden;
}

.registration{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F5F5F7;
  min-height: calc(100vh - 240px);
}

.confirm-email{
  margin-top: 6rem;
}

</style>


