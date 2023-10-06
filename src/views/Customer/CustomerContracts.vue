<!--Вкладка ДОГОВОРЫ на странице пользователя-->
<template>
  <div>
    <h1 class="title">Документы</h1>

    <contract-comp class="contractComp" id="factory_contract"/>
    <contract-comp class="contractComp" id="factory_invoice"/>

    <h2 class="subtitle enhance">Логистика</h2>
    <contract-comp class="contractComp" id="logistics_contract"/>
    <contract-comp class="contractComp" id="logistics_transportation_request"/>
    <contract-comp class="contractComp" id="logistics_completion_certificate"/>

    <h2 class="subtitle enhance">Таможенное оформление</h2>
    <contract-comp class="contractComp" id="customs_customs_clearance"/>
    <contract-comp class="contractComp" id="customs_additional_agreement"/> 
    <contract-comp class="contractComp" id="customs_completion_certificate"/>
  </div>
</template> 

<script>
import ContractComp from '@/components/ContractComp.vue';
import { mapActions, mapMutations } from 'vuex';
  export default {
    name:'customer-contracts', 
    components:{
      ContractComp
    },
    methods: {
      ...mapActions(["GET_PROVIDER_OFFERS"]),
      ...mapMutations(["SET_CLEAR_DOCS"])
    },

    mounted() {
      this.GET_PROVIDER_OFFERS(this.$route.params.id)
    },

    unmounted() {
      this.SET_CLEAR_DOCS();
    }
  }
</script>

<style lang="scss" scoped> 
.title{
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) { 
    margin: 0 0 3rem;
  }
}

.subtitle  {
  font-size: 2.4rem !important;
  @include title_h3;
}

.contractComp {
 @include contractComp;
}

.enhance {
  margin-bottom: 3rem;
}
</style>