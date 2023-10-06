<template>
  <div class="registration">
    <h1 class="visually-hidden">Регистрация исполнителя</h1>
    <form-reg-provider v-if="SHOW_SIGNUP_FORM === true" />
    <!-- <form-reg v-if="SHOW_SIGNUP_FORM === true" :site_role="'provider'"/> -->
    <confirm-email-form class="confirm-email" v-if="SHOW_CONFIRM_EMAIL === true" />
  </div>
</template> 
 
<script >
import ConfirmEmailForm from '@/components/Form/ConfirmEmailForm';
// import FormReg from '@/components/Form/FormReg';
import FormRegProvider from '@/components/Form/FormRegProvider'
import { mapGetters } from 'vuex';


export default {
  components:{
    // FormReg, 
    ConfirmEmailForm,
    FormRegProvider
  },
  
  computed:{
    ...mapGetters([
      'SHOW_SIGNUP_FORM',
      'SHOW_CONFIRM_EMAIL'
    ])
  }
}

</script>

<style lang="scss" scoped>

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

.visually-hidden {
  @include visually-hidden;
}

</style>


