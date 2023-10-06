<template>
  <main>
    <header>
      <h2 class="title">Выберите вашу фирму и реквизиты</h2>
      <my-note :note="note" class="note"/>
    </header>
      <banks-comp />
      <companies-comp class="myCompanies" />
      <company-details v-if="this.FIRMS.length" />
      <footer-comp class="footer" /> <!--Здeсь кнопка Создать заявку-->
  </main>
</template> 

<script> 
import BanksComp from '@/components/BanksComp.vue';
import CompaniesComp from "@/components/Company/CompaniesComp"
import CompanyDetails from "@/components/Company/CompanyDetails"
import FooterComp from "@/components/FooterComp"
import { mapGetters } from 'vuex';
  export default {
    name:'m-select-company',
    components:{
      BanksComp,
      CompaniesComp,
      CompanyDetails,
      FooterComp
    },
    data(){
      return{
        note: 'Для публикации заявки вы должны быть индивидуальным предпринимателем или иметь юридическое лицо'
      }
    },
    computed:{
      ...mapGetters([
        'FIRMS'
      ])
    },

    mounted() {
    this.$router.push({ query: { 'module': 'select_company' } })
  }
  }

</script>

<style lang="scss" scoped>

.note{
  margin-bottom: 4.5rem;
}

.title{
  @include title_h2;
  margin-bottom: 2rem;
}
.myCompanies{
  margin-top: 4.5rem;
}
.footer {
  margin-top: 10rem;

  @media (max-width: 600px) {
    margin-top: 3rem;
  }
}
</style>