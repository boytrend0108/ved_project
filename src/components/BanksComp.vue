<template>
  <div class="banksComp">
    <img v-if="innerWidth < 600" src="@/assets/images/home_page/list_mobile.png" alt="банки">
    <div class="bank-wr">
    <h4 class="banks__title">Ещё не являетесь юрлицом? Станьте им прямо сейчас</h4>
      <div class="banks">
        <my-bank :bankName="bankName_1" :bankLink="bankLink_1" :bankLogo="bankLogo_1" />
        <my-bank :bankName="bankName_2" :bankLink="bankLink_2" :bankLogo="bankLogo_2" />
        <my-bank :bankName="bankName_3" :bankLink="bankLink_3" :bankLogo="bankLogo_3" />
      </div>
    </div> 
  </div>
</template>

<script>
  export default {
    name:'banks-comp',
    data(){
      return {
        bankName_1: 'Открыть с Тинькофф',
        bankLink_1: 'https://www.tinkoff.ru/business/rko/form?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-2SF2EZFLP&agentSsoId=a1018632-8a13-4ffd-92a3-7891d29be335&utm_source=partner_rko_a_sme',
        bankLogo_1: "tinkoff.png",
        bankName_2: 'Открыть с Точка',
        bankLink_2: 'https://partner.tochka.com?referer1=7714476990',
        bankLogo_2: "tochka.png",
        bankName_3: 'Открыть с Модульбанк',
        bankLink_3: 'https://modulbank.ru/rko/?utm_source=agentnet&utm_medium=partner&utm_campaign=RKO_ag-7714476990',
        bankLogo_3: "module.png",
        innerWidth: window.innerWidth
      }
    }
  }
</script>

<style lang="scss" scoped>

.bank-wr{
  @include flex(column, flex-start, flex-start, 10px);
}
.banksComp {
  max-width: 65.2rem;
  min-height: 11.2rem;
  border: 2px solid #D9E1E7;
  border-radius: 10px;
  padding: 2rem 3rem;
  display: flex;
  gap:10px;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 2rem 10px;
    margin-top: 2rem;
  }
}

.banks__title {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #244156;
  margin-bottom: 2rem;
  text-align: left;

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
}
.banks{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width:750px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
}

</style>