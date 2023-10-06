<template>
  <section>
    <h1 class="visually-hidden">Страница заказчика</h1>
     <m-select-company v-if="ACTIVE_MODULE === 'application'" />
     <!-- добавить этот id в логику отрисовки-->
     <m-customer-application v-if="ACTIVE_MODULE === 'checkApplication'" /> 
     <my-dialog v-if="DIALOG">
        <!-- <new-company-form v-if="this.BTN_ID === 'addNewCompany'" /> -->
        <new-company-form v-if="this.BTN_ID === 'addNewCompany'" /> 
        <!-- <new-company-form v-if="this.BTN_ID === 'addNewCompany'" /> -->
        <bank-form v-if="this.BTN_ID === 'addCompanyDetails'" />
        <application-form v-if="this.$route.query.module === 'check_application'" />
     </my-dialog>
  </section>
</template>

<script>
import MSelectCompany from './modules/M-SelectCompany';
import MCustomerApplication from './modules/M-CustomerApplication';
import NewCompanyForm from "@/components/Form/NewCompanyForm.vue"
import BankForm from '@/components/Form/BankForm.vue'
import ApplicationForm from '@/components/Form/ApplicationForm.vue';
import { mapGetters} from 'vuex';

  export default {
    components:{
      MSelectCompany,
      MCustomerApplication,
      NewCompanyForm,
      BankForm,
      ApplicationForm,
    },

    computed:{
    ...mapGetters([
      'DIALOG', 
      'SHOW_SELECT_COMPANY_MODULE', 
      'ACTIVE_MODULE', 
      'BTN_ID',
    ])
  },

  }
</script>

<style lang="scss" scoped>

.visually-hidden {
  @include visually-hidden;
}

</style>