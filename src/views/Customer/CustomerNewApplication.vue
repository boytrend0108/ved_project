<template> 
  <div @click="clickHandler" class="newApplicationPage"> 
    
    <h1 class="title"> {{ setTitle }} </h1>
      
    <main class="main">
      <section class="section" v-if="this.$route.query.step === 'cities'">
        <my-input class="selector__input" />
        <h3 class="form__title">Адрес доставки груза</h3> 
        <my-info-input :name="'toAddress'" />  
      </section> 

      <section class="section" v-if="this.$route.query.step === 'naming'">
        <my-input class="selector__input" />
      </section> 

      <application-description v-if="this.$route.query.step === 'ApplicationDescription'" class="description"/>
      <application-services v-if="this.$route.query.step === 'additional_services'" class="servises"/>
      <application-shipping v-if="this.$route.query.step === 'delivery_type'" class="shipping" />
      <application-addition-info v-if="this.$route.query.step === 'info'" />
      <application-check  v-if="this.$route.query.step === 'check'" />
      <application-progress-bar  
        v-if="this.$route.query.step !== 'check' && innerWidth > 600" 
      />
      <appl-progress-bar-mob
        v-if="this.$route.query.step !== 'check' && innerWidth < 600"
        class="progress-mobile"
      />
    </main>
  </div> 
</template>
 
<script>
import { mapMutations, mapGetters } from "vuex"
import ApplicationProgressBar from "@/components/Application/ApplicationProgressBar.vue"
import ApplProgressBarMob from "@/components/Application/ApplProgressBarMob.vue"
import ApplicationDescription from "@/components/Application/ApplicationDescription.vue"
import ApplicationServices from "@/components/Application/ApplicationServices.vue"
import ApplicationShipping from "@/components/Application/ApplicationShipping.vue"
import ApplicationCheck from "@/components/Application/ApplicationCheck.vue"
import ApplicationAdditionInfo from "@/components/Application/ApplicationAdditionInfo.vue"


export default {
  name:"customer-new-application",
  components: {
    ApplicationProgressBar,
    ApplProgressBarMob,
    ApplicationDescription, 
    ApplicationServices,
    ApplicationShipping,
    ApplicationCheck,
    ApplicationAdditionInfo
  },

  data() {
    return {
      innerWidth: window.innerWidth
    }
  },

  computed: {
    ...mapGetters([
      "TITLE"
    ]),

    setTitle() {
      if (this.$route.query.step === "cities") {
        return this.TITLE.cities
      } else if (this.$route.query.step === "naming"){
        return this.TITLE.naming
      } else if (this.$route.query.step === "ApplicationDescription") {
        return this.TITLE.description
      } else if (this.$route.query.step === "additional_services") {
        return this.TITLE.additional_services
      } else if (this.$route.query.step === "delivery_type") {
        return this.TITLE.delivery_type
      }  else if (this.$route.query.step === "info") {
        return this.TITLE.info
      } else if (this.$route.query.step === "check") {
        return this.TITLE.check
      }
      return ""
    },
  },

  methods: {
    ...mapMutations([
      "SET_INPUT", "SAVE_INPUT_VALUE", "SET_SHOW_HEADER_DROPDOWN"
    ]),

    select($event) {
      let value = $event.target.textContent
      this.SAVE_INPUT_VALUE(value)
      this.SET_INPUT(this.$route)
    },

    clickHandler(){
     this.SET_SHOW_HEADER_DROPDOWN(false)
    }
  },

  created() {
    window.addEventListener('beforeunload', (event) => {
      if(this.$route.name === "customer-new-application" || this.$route.name === "customer-page") {
         event.preventDefault();
        // Chrome требует установки возвратного значения.
        event.returnValue = '';
      }
   
    });
  },

}
</script>

<style lang="scss" scoped>

.newApplicationPage {
  width: 100%;
  @include flex (column, flex-start, flex-start, 0);

  @media (max-width: 600px) {
    width: 100%;
  }
}

.form__title {
  font-weight: 600;
  font-size: 2rem;
  line-height: 30px;
  color: #244156;
  margin-bottom: 2rem;
  margin-top: 4.5rem;
  text-align: left;

  @media (max-width: 600px) {
    @include font(17px, 600, #244156);
    line-height: 23px;
    margin-top: 2rem;
  }
}
.form {
  max-width: 49.5rem;
}

.section{
  width: 100%;
}

.main {
  width: 100%;
  flex-grow: 1;
  @include flex(column, space-between, flex-start, 0px);
}
.title {
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #244156;
  text-align: left;
  
  @media (max-width: 600px) {
    @include font(2rem, 600, #244156);
    line-height: 27px;
    padding: 0;
    margin: 0;
  }
}

.selector__input {
  margin-top: 4.5rem;
  width: 100%;

  @media (max-width: 600px) {
    margin-top: 30px;
  }
}
.selector__ul {
  display: flex;
  gap: 1rem;
  margin-top: 2.8rem;
}
.selector__li {
  @include selector__li
}

.description{
  margin-top: 2rem;
}

.servises{
  margin-top: 5.4rem;

  @media (max-width: 600px) {
    margin-top: 30px;
  }
}

.progress-mobile {
  margin-top: 3rem;
}

</style>