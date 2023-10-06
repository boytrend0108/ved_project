<template>
  <div class="costCalculationPage"> 
    <main class="main">
      <h1 class="title" v-if="$route.query.step !== 'FromWhichCountry' "> {{ setTitle }} </h1>
      <component :is="component" class="component"/>

      <section class="section" v-if="this.$route.query.step === 'cities'">
          <my-input class="selector__input" />
      </section>

      <section class="section" v-if="this.$route.query.step === 'naming'">
          <my-input class="selector__input" />
      </section>
    </main>
    
        <progress-bar class="progress" v-if="innerWidth > 600"/> 
        <progress-bar-mob v-else/>
  </div>
</template>    
 
<script>
import ProgressBar from '@/components/SearchProduct/ProgressBar.vue'
import ProgressBarMob from '@/components/SearchProduct/ProgressBarMob.vue'
import FromWhichCountry from '@/components/HomePage/FromWhichCountry'
import FromWhichCountryMob from '@/components/HomePage/FromWhichCountryMob'
import ApplicationDescription from '@/components/Application/ApplicationDescription.vue'
import ApplicationServices from '@/components/Application/ApplicationServices.vue'
import ApplicationShipping from '@/components/Application/ApplicationShipping.vue'
import ApplicationCheck from '@/components/Application/ApplicationCheck.vue'
import ApplicationAdditionInfo from '@/components/Application/ApplicationAdditionInfo.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProgressBar,
    ProgressBarMob,
    ApplicationDescription,
    ApplicationServices,
    ApplicationShipping,
    ApplicationCheck,
    ApplicationAdditionInfo,
    FromWhichCountry,
    FromWhichCountryMob,
  },
  name: 'cost-calculatiion',
  data() {
    return { 
      innerWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapGetters(
      ['TITLE']
    ),

    component() {
      return this.$route.query.step
    },

    setTitle() {
      if (this.$route.query.step === 'cities') {
        return this.TITLE.cities
      } else if (this.$route.query.step === 'naming') {
        return this.TITLE.naming
      } else if (this.$route.query.step === 'ApplicationDescription') {
        return this.TITLE.description
      } else if (this.$route.query.step === 'ApplicationServices') {
        return this.TITLE.additional_services
      } else if (this.$route.query.step === 'delivery_type' || this.$route.query.step === 'ApplicationShipping') {
        return this.TITLE.delivery_type
      } else if (this.$route.query.step === 'info') {
        return this.TITLE.info
      } else if (this.$route.query.step === 'check' || this.$route.query.step === 'ApplicationCheck') {
        return this.TITLE.check
      } else if (this.$route.query.step === 'ApplicationAdditionInfo') {
        return 'Адрес забора груза'
      }
      return ''
    },

    showProgressBar() {
      if(this.$route.query.step === 'SearchProductSummary' && innerWidth > 600) return false
      else if(this.$route.query.step === 'ApplicationCheck' && innerWidth > 600) return false
      else return true
    }
  },

  created() {
    console.log("created")
    window.addEventListener('beforeunload', (event) => {
      if(this.$route.name === "cost-calculation" || this.$route.name === "customer-page") {
        event.preventDefault();
        // Chrome требует установки возвратного значения.
        event.returnValue = '';
      }
   
    });
   },

}
</script>

<style lang="scss" scoped>

.component{
  margin: 20px 0;

  @media (max-width:600px) {
    margin: 0;
  }
}

.main {
  width: 100%;
}
.section{
  width: 100%;
}

.selector__input{
  margin-top: 4.5rem;
  width: 100%;
  margin: 60px 0;

  @media (max-width: 600px) {
    margin-top: 30px;
  }
}

.title{
  @include title_h2;
}

.costCalculationPage{
  @include flex(column, space-between, flex-start, 0px);
}

.progress {
  margin-bottom: 4rem;
}


</style>