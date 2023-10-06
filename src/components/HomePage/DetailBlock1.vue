<template>
 <div class="servicesDetail__block-1" >
      <service-details-sm 
        :title="'Обучение поиску товара'"
        :btn="'К инструкции'" 
        :price="'Бесплатно'"
      >
        <template v-slot:header >
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/list.png" alt="list">
            <img v-else src="@/assets/images/home_page/list_mobile.png" alt="list">
            <p class="text">Подробную инструкцию по поиску товара</p>
          </div>
        </template>
        <template v-slot:footer>
          <p class="text">Для тех, кто хочет научиться самостоятельно искать товары</p>
        </template>
      </service-details-sm>
      
      <service-details-sm 
        :title="'Поиск товара'"
        :btn="'Заказать поиск'" 
        :price="'3 000 ₽'" 
        id="search"
      >
       <template v-slot:header >
          <div class="slot-row" id="searchProduct">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/magnify.png" alt="поиск товара">
            <img v-else src="@/assets/images/home_page/magnifying_glass_mobile.png" alt="поиск товара">
            <p class="text">Поиск товара по заданным параметрам</p>
          </div>
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/stars.png" alt="педложение">
            <img v-else src="@/assets/images/home_page/stars_mobile.png" alt="педложение">
            <p class="text">Вы получите 3 предложения от лучших поставщиков</p>
          </div>
       </template>
        <template v-slot:footer>
          <p class="text">Для тех, кто хочет найти товар и дорожит свои временем</p>
        </template>
      </service-details-sm>
 </div>
</template>

<script>
import ServiceDetailsSm from '@/components/HomePage/ServiceDetailsSm.vue'
  export default {
    name: 'detail-block-1',
    data() {
      return {
        innerWidth: window.innerWidth
      }
    },
    components:{
      ServiceDetailsSm
    }
  } 
</script>

<style lang="scss" scoped>

.servicesDetail__block-1{
  @include flex(row, center, center, 3rem);
  flex-wrap: wrap;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem !important;
    gap: 1rem !important;
  }
}

.slot-row{
  @include flex(row, flex-start, center, 2rem);
  margin-bottom: 1rem;
  height: 3.6rem;
}

.text{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  text-align: left;
}

</style>