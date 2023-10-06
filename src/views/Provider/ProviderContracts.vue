<template> 
  <div>
    <h1 class="title">Договоры</h1>

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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ContractComp from '@/components/ContractComp.vue';
  export default {
    name: 'provider-contracts',
    components:{
      ContractComp
    },
    computed:{
      ...mapGetters([
        "CURRENT_USER"
      ])
    },

    methods: {
      ...mapActions(["GET_CHAT_ID"]),
      ...mapMutations(["SET_CLEAR_DOCS"])

    },
    
    mounted() {
      this.GET_CHAT_ID({ order_id: this.$route.params.id, offer_id: this.$route.query.offer_id })
    },

    unmounted() {
      this.SET_CLEAR_DOCS();
    }
  }
</script>

<style lang="scss" scoped>

.contractComp {
 @include contractComp;
}

.title{
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) { 
    margin: 0 0 3rem;
  }
}
.subtitle {
  @include title_h3;
  font-size: 2.4rem !important;
  margin-bottom: 3rem;
}

.enhance {
  margin-bottom: 3rem;
}
</style>
