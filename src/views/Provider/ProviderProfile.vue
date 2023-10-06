<template>
  <div> 
     <h1 class="title">Профиль</h1>
    <profile-header class="profileHeader"/>
    <provider-profile-form /> 
    <user-profile-form class="userProfileForm" /> 
    <my-dialog v-if="DIALOG">
      <change-password v-if="SHOW_CHANGE_PASSWORD" />
      <confirm-email-form v-if="SHOW_CONFIRM_EMAIL" />
    </my-dialog> 
  </div>
</template>  

<script>
import { mapGetters } from 'vuex';
import ConfirmEmailForm from '@/components/Form/ConfirmEmailForm.vue';
import ChangePassword from '@/components/Form/ChangePassword.vue';
import ProfileHeader from '@/components/Header/ProfileHeader.vue'
import ProviderProfileForm from '@/components/Form/ProviderProfileForm.vue'
import UserProfileForm from '@/components/Form/UserProfileForm.vue';

export default {
  components:{
    ProfileHeader, ProviderProfileForm, UserProfileForm, ConfirmEmailForm, ChangePassword

  },
  computed:{
    ...mapGetters([
      'CURRENT_USER', 
      'DIALOG', 
      'BTN_ID', 
      'SHOW_CHANGE_PASSWORD', 
      'SHOW_CONFIRM_EMAIL',
    ])
  },

}

</script>

<style lang="scss" scoped>

.userProfileForm{
  max-width: 652px;
  margin-bottom: 50px;
}
.title{
  @include title_h2;
  margin-bottom: 4.5rem;
}

</style>