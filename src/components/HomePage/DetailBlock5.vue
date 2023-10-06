<template>
 <div class="servicesDetail__block-1">
      <service-details-sm 
        :title="'Полное обучение ВЭД'"
        :btn="'Записаться на вебинар'"
        :price="'15 000 ₽'"
       
      >
        <template v-slot:header >
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/webinar.png" alt="webinar">
            <img v-else src="@/assets/images/home_page/wallet_mobile.png" alt="webinar">
            <p class="text">Цикл вебинаров по ВЭД</p>
          </div>
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/question.png" alt="question">
            <img v-else src="@/assets/images/home_page/question_mobile.png" alt="question">
            <p class="text">Разбор всех интересующих вопросов</p>
          </div>
        </template>
        <template v-slot:footer>
          <p class="text">Тем, кто хочет быть в ВЭД как рыба в воде и максимально эффективно заниматься импортом</p>
        </template>
      </service-details-sm>
      <service-details-sm 
        :title="'Личный менеджер'"
        :btn="'Подключить менеджера'" 
        :price="'25 000 ₽'"
        id="manager"
      >
      <template v-slot:header >
          <div class="slot-row">
            <img v-if="innerWidth > 600" src="@/assets/images/home_page/men.png" alt="webinar">
            <img v-else src="@/assets/images/home_page/men_mobile.png" alt="webinar">
            <p class="text">"Полное сопровождение сделки от А до Я, включая согласование сделки с иностранным поставщиком и заключение внешнеторгового контракта</p>
          </div>
        </template>
        <template v-slot:footer>
          <p class="text">Тем, кто хочет делегировать организацию импорта специалисту и быть уверенным, что для него подберут наилучшие условия</p>
        </template>
      </service-details-sm>
    </div>
</template>

<script>
import ServiceDetailsSm from '@/components/HomePage/ServiceDetailsSm.vue'
  export default {
    name: 'detail-block-5',
    components:{
      ServiceDetailsSm
    },
    data() {
      return {
        innerWidth: window.innerWidth
      }
    },
  }
</script>

<style lang="scss" scoped>

.servicesDetail__block-1{
  @include flex(row, center, center, 3rem);
  flex-wrap: wrap;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
  }
}

.slot-row{
  @include flex(row, flex-start, center, 2rem);
  margin-bottom: 1rem;
}

.text{
  @include font(1.4rem, 500, #416782);
  line-height: 2rem;
  text-align: left;
}

</style>