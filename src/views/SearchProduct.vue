<template>
  <div class="searchProductPage">
    <component :is="component"></component>
    <progress-bar class="progress" v-if="showProgressBar" />
    <progress-bar-mob  v-if="showProgressBarMob" />
  </div>
</template>       
 
<script>
import ProgressBar from '@/components/SearchProduct/ProgressBar.vue'
import ProgressBarMob from '@/components/SearchProduct/ProgressBarMob.vue'
import SearchProductComp from '@/components/SearchProduct/SearchProductComp.vue';
import ProductDescription from '@/components/SearchProduct/ProductDescription.vue';
import ProductLogo from '@/components/SearchProduct/ProductLogo.vue';
import ProductPhoto from '@/components/SearchProduct/ProductPhoto.vue'
import SearchProductSummary from '@/components/SearchProduct/SearchProductSummary.vue';
import ServicePayment from '@/components/SearchProduct/ServicePayment.vue';
  export default {
    components: { 
      ProgressBar,
      ProgressBarMob,  
      SearchProductComp, 
      ProductDescription,
      ProductLogo,
      ProductPhoto,
      SearchProductSummary,
      ServicePayment,
    }, 
    name: 'search-product',
    data() {
      return {
        innerWidth: window.innerWidth,
      }
    },
    computed:{
      component(){ 
        return this.$route.query.step
      },

      showProgressBar() {
        if (innerWidth < 600 ||
          this.$route.query.step === 'SearchProductSummary' ||
          this.$route.query.step === 'ServicePayment' ) return false;
        return true;
      },

       showProgressBarMob() {
        if (innerWidth > 600 ||
          this.$route.query.step === 'SearchProductSummary' ||
          this.$route.query.step === 'ServicePayment' ) return false;
        return true;
      }
    },

    created() {
    console.log("created")
    window.addEventListener('beforeunload', (event) => {
      if(this.$route.name === "search-product" || this.$route.name === "customer-page") {
        event.preventDefault();
        // Chrome требует установки возвратного значения.
        event.returnValue = '';
      }
    });
   },
    
  }
</script>

<style lang="scss" scoped>

.searchProductPage{
  @include flex(column, flex-start, flex-start, 90px);

  @media (max-width: 600px) {
    gap: 0px; 
    width: 100%;
  }

}

.progress{
  margin-bottom: 5rem;
}

</style>