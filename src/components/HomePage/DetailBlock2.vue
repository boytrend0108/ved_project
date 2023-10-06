<template>
  <div class="servicesDetail__block-2">
      <service-details-bg 
        :title="'Заключение контракта и оплата'"
        :btn="'К документам'"
        :price="'Бесплатно'" 
        id="contract"
      >
      <template v-slot:header >
        <div class="box-item">
          <div class="slot-row">
            <img  v-if="innerWidth > 600" src="@/assets/images/home_page/file.png" alt="шаблоны докуметнов">
            <img v-else src="@/assets/images/home_page/file_mobile.png" alt="шаблоны докуметнов">
            <p class="text">Предоставление шаблонов документов</p>
          </div>
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/wallet.png" alt="инструкции к оплате">
            <img v-else src="@/assets/images/home_page/wallet_mobile.png" alt="инструкции к оплате">
            <p class="text">Предоставление инструкции по оплате</p>
          </div>
        </div>
       </template>
        <template v-slot:footer>
          <p class="text">Тем, кто уже является юрлицом и имеет открытый валютный счёт</p>
          <offer-box class="offerBox" />
        </template>
      </service-details-bg>
    </div>
</template>

<script>
import ServiceDetailsBg from '@/components/HomePage/ServiceDetailsBg.vue'
import OfferBox from '@/components/HomePage/OfferBox.vue';


  export default {
    name: 'detail-block-2',
    data() {
      return {
        innerWidth: window.innerWidth
      }
    },
     components:{
      ServiceDetailsBg,
      OfferBox
    }
  }
</script>

<style lang="scss" scoped>

.servicesDetail__block-2{
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    margin-bottom: 10px !important;
  }
}

.box-item{
  @include flex(row, flex-start, center, 4.5rem);

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
.slot-row{
  @include flex(row, flex-start, center, 2rem);
}
.text{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  text-align: left;
}

.offerBox{
  margin: 4.5rem 0 6rem;

  @media (max-width: 600px) {
    margin: 2rem 0;
  }
}



</style>