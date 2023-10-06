<template>
  <div class="servicesDetail__block-3">
      <service-details-bg 
        :title="'Платная консультация, расчёт стоимости доставки, таможенных платежей и сертификации'"
        :btn="'Рассчитать стоимость'"
        :price="'2 000 ₽'" 
        id="calculation"
      >
      <template v-slot:header >
        <div class="box-item">
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/magnify.png" alt="расчет чтоимости доставки">
            <img v-else src="@/assets/images/home_page/arrowright_mobile.png " alt="расчет чтоимости доставки">
            <p class="text">Расчёт стоимости доставки</p>
          </div>
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/stars.png" alt="расчёт платежей">
            <img v-else src="@/assets/images/home_page/receipt_mobile.png" alt="расчёт платежей">
            <p class="text">Расчёт таможенных платежей и сертификации</p>
          </div>
        </div>
       </template>
        <template v-slot:footer>
          <p class="text text-mg">Тем, кто хочет посчитать выгоду от импорта товара</p>
        </template>
      </service-details-bg>
    </div>
</template>

<script>
import ServiceDetailsBg from '@/components/HomePage/ServiceDetailsBg.vue'

  export default {
    name: 'detail-block-3',
    data() {
      return {
        innerWidth: window.innerWidth
      }
    },
    components:{
      ServiceDetailsBg,
    }
  }
</script>

<style lang="scss" scoped>

.servicesDetail__block-3{
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
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
.text-mg{
    margin-bottom: 6rem;

    @media (max-width: 600px) {
      margin-bottom: 1rem;
    }
  }

.offerBox{
  margin: 4.5rem 0 6rem;
}



</style>