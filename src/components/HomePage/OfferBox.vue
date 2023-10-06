<template>
  <div class="offerBox">

    <div class="wrapper">
      <img src="@/assets/images/icons/user_list.png" alt="cписок банков">
      <div>
        <div class="offerBox__title">Ещё не являетесь юрлицом? Станьте им прямо сейчас</div>
        <div class="offerBox__item">
          <a :href="bankRefs.tinkoff" class="link" target="_blank">Открыть с Тинькофф</a>
          <a :href="bankRefs.tochka" class="link middle" target="_blank">Открыть с Точка</a>
          <a :href="bankRefs.module" class="link" target="_blank">Открыть с Модульбанк</a>
        </div>
      </div>  
    </div>

    <hr class="hr">

    <div class="wrapper">
      <img src="@/assets/images/icons/bank.png" alt="cписок банков">
      <div>
        <div class="offerBox__title">Ещё нет счёта? Откройте его у наших партнёров</div>
        <div class="offerBox__item">
          <a :href="bankRefs.tinkoff" class="link" target="_blank">Открыть с Тинькофф</a>
          <a :href="bankRefs.tochka" class="link middle" target="_blank">Открыть с Точка</a>
          <a :href="bankRefs.module" class="link" target="_blank">Открыть с Модульбанк</a>
        </div>
      </div>  
    </div>

  </div>
</template>

<script>
  export default {
    name: 'offer-box',
    data() {
      return {
        bankRefs: {
          tinkoff: "https://www.tinkoff.ru/business/rko/form?utm_medium=ptr.act&utm_campaign=sme.partners&partnerId=5-2SF2EZFLP&agentSsoId=a1018632-8a13-4ffd-92a3-7891d29be335&utm_source=partner_rko_a_sme",
          tochka: "https://partner.tochka.com?referer1=7714476990",
          module: "https://modulbank.ru/rko/?utm_source=agentnet&utm_medium=partner&utm_campaign=RKO_ag-7714476990"
        }
      }
    }
   
    
  }
</script>

<style lang="scss" scoped>

.wrapper{
  @include flex(row, flex-start, flex-start, 1rem);

}

.hr{
 @include hr;
 margin: 3rem 0 3rem;
}

.link{
  @include font(1.4rem, 600, $main-color);
  line-height: 2.1rem;
  text-align: left;
}
.middle{
  @include font(1.4rem, 600, $main-color);
  line-height: 2.1rem;
  border-left: 2px solid #D9E1E7;
  border-right: 2px solid #D9E1E7;
  padding: 0 2rem;
  margin: 0 2rem;

  @media(max-width:750px){
    border-left: none;
    border-right: none;
    padding: 0 ;
    margin: 0;
  }
}
.offerBox{
  @include flex(column, center, flex-start, 0);
  max-width: 59.5rem;
  width: 100%;
  // height: 224px;
  border: 2px solid #D9E1E7;
  border-radius: 1rem;
  padding: 3rem;

  @media (max-width:600px) {
    padding: 2rem 1rem;
  }
}

.offerBox__title{
  @include font(1.4rem, 600, $font-color2);
  line-height: 2rem;
  margin-bottom: 1rem;
  text-align: left;
}

.offerBox__item{
  @include flex(row, space-between, center, 0);
  width: 100%;
  flex-wrap: wrap;

  @media (max-width:750px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>