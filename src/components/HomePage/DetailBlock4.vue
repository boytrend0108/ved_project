<template>
  <div class="servicesDetail__block-4">
      <service-details-bg 
        :title="'Организация доставки, таможенного оформления, сертификации'"
        :btn="'Далее'"
        :price="'15 000 ₽'"
      >
      <template v-slot:header >
        <div class="box-item">
          <div 
            class="slot-row"
            @click="this.$router.push('/documentation?article=product-search')"
          >
            <img v-if="isDesktop" src="@/assets/images/home_page/magnify.png" alt="magnify">
            <img v-else src="@/assets/images/home_page/magnifying_glass_mobile.png" alt="magnify">
            <p class="text">Поиск исполнителей</p>
          </div>
          <div class="slot-row"
            @click="this.$router.push('/documentation?article=product-search')"
          >
            <img v-if="isDesktop" src="@/assets/images/home_page/file.png" alt="files">
            <img v-else src="@/assets/images/home_page/file_mobile.png" alt="magnify">
            <p class="text">Формирование документов</p>
          </div>
          <div class="slot-row"
            @click="this.$router.push('/documentation?article=product-search')"
          >
            <img v-if="isDesktop" src="@/assets/images/home_page/stars.png" alt="stars">
            <img v-else src="@/assets/images/home_page/arrowright_mobile.png" alt="огранизация импорта">
            
            <p class="text">Организация импорта</p>
          </div>
        </div>
       </template>
        <template v-slot:footer>
          <p class="text">Тем, у кого уже готов товар и нужно организовать его доставку</p>
          <hr class="hr">
          <from-which-country  class="whichCountry" id="wichCountryInput"/>
          <!-- <from-which-country-mob v-else class="whichCountry" /> -->
        </template>

      </service-details-bg> 
    </div>
    
</template>

<script>
import ServiceDetailsBg from '@/components/HomePage/ServiceDetailsBg.vue'
import FromWhichCountry from '@/components/HomePage/FromWhichCountry.vue';
// import FromWhichCountryMob from '@/components/HomePage/FromWhichCountryMob.vue';

  export default {
    name: 'detail-block-4',
    components:{
      ServiceDetailsBg, 
      FromWhichCountry, 
      // FromWhichCountryMob
    },
    data() {
      return {
        isDesktop: true,
        innerWidth: window.innerWidth
      }
    },
   methods: {
    isDesktopFn() {
      if(window.innerWidth < 600) {
        this.isDesktop = false
      } else {
        this.isDesktop = true
      }
    }
   },

    mounted() {
      this.isDesktopFn()
      window.addEventListener('resize', () => {
        this.isDesktopFn()
      })
    }
  }
</script>

<style lang="scss" scoped>

.whichCountry{
  width: 100%;
}

.hr{
  @include hr;
}

.servicesDetail__block-4{
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    margin-bottom: 1rem;
  }
}

.box-item{
  @include flex(row, flex-start, center, 4rem);
  flex-wrap: wrap;

  @media (max-width:600px) {
    gap: 1rem;
  }
}
.slot-row {
  @include flex(row, flex-start, center, 2rem);
  cursor: pointer;
}
.text { 
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  text-align: left;
}
.text-mg {
    margin-bottom: 6rem;
  }

.offerBox {
  margin: 4.5rem 0 6rem;
}

</style>