<template> 
  <div class="profilePage">
    <h1 class="title">Профиль</h1>
    <profile-header class="profileHeader" ref="profile" />
    <validation-errors v-if="VALIDATION_ERRORS"/>
    <user-profile-form /> 
    <banks-comp class="bankComp" /> 
    <user-companies id="company"/> 
    <my-dialog v-if="DIALOG">
      <new-company-form v-if="this.BTN_ID === 'addNewCompany'" />
      <bank-form v-if="this.BTN_ID === 'addCompanyDetails'" />
      <change-password v-if="SHOW_CHANGE_PASSWORD" />
      <confirm-email-form v-if="SHOW_CONFIRM_EMAIL" />
    </my-dialog> 
  </div>  
</template>

<script>
import ChangePassword from "@/components/Form/ChangePassword.vue";
import ProfileHeader from "@/components/Header/ProfileHeader";
import UserProfileForm from "@/components/Form/UserProfileForm.vue";
import BanksComp from "@/components/BanksComp.vue";
import UserCompanies from "@/components/Company/UserCompanies"
import ValidationErrors from "@/components/Form/ValidationErrors"
import BankForm from "@/components/Form/BankForm.vue"
import NewCompanyForm from "@/components/Form/NewCompanyForm.vue"
import { mapGetters, mapMutations } from "vuex";
import ConfirmEmailForm from "@/components/Form/ConfirmEmailForm.vue";
  export default {
    name: "customer-profile",
    components:{
      ProfileHeader, 
      UserProfileForm,
      BanksComp,
      UserCompanies,
      ValidationErrors,
      NewCompanyForm,
      BankForm,
      ChangePassword,
      ConfirmEmailForm,
    },

    computed:{
      ...mapGetters([
        "DIALOG", "VALIDATION_ERRORS", "BTN_ID","SHOW_CHANGE_PASSWORD", "SHOW_CONFIRM_EMAIL",
      ]),
    
    },
    methods:{
      ...mapMutations([
        "SET_SHOW_CONFIRM_EMAIL", "SET_SHOW_CHANGE_PASSWORD"
      ])
    },

    mounted() {
      if (this.$route.hash) {
        const el = document.querySelector(this.$route.hash)
        if (!el) return
         el.scrollIntoView() // если есть hash прокручиваем 
      }
    } 

    
  }
</script>

<style lang="scss" scoped>
.profileMod{
  max-width: 644px;
}

.bankComp{
  width: 100%;
  margin-bottom: 45px;
}
.title{
  @include title_h2;
  margin-bottom: 45px;

  @media (max-width: 600px) {
    margin: 30px 0 ;
    @include font(2rem, 600, $font-color2);
    line-height: 19px;
  }
}


</style>