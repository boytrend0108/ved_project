<template>
  <section class="content">
    <from-which-country />
    <application-progress-bar v-if="innerWidth > 600" />
    <application-progress-bar-mob class="content__progress-mobile" v-else/>
  </section>
</template>

<script>
import ApplicationProgressBar from '@/components/Application/ApplicationProgressBar.vue'
import ApplicationProgressBarMob from '@/components/Application/ApplProgressBarMob.vue'
import FromWhichCountry from '@/components/HomePage/FromWhichCountry.vue';
import {  mapGetters, mapActions } from 'vuex';
export default {
  name: 'start-application',
  components: {
   FromWhichCountry, ApplicationProgressBar, ApplicationProgressBarMob
  },
  data() {
    return {
      inputParam:{
        inputValue: null,
        inputPath: this.$route.path
      },
      innerWidth: window.innerWidth,
      checkbox: []
    }
  },


  computed:{
    ...mapGetters([
      'COUNTRY', 'CITY', 'INPUT','TITLE'
    ]),
  },

  methods: {
    ...mapActions([
      "GO_TO_NEXT_STEP",
    ]),
  },

  mounted(){
    if(this.$route.path === '/' || this.$route.name === 'start-application'){
      this.inputParam.inputValue = this.COUNTRY
    } else if(this.$route.path === '/cities'){
      this.inputParam.inputValue = this.CITY
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  @include flex(column, space-between, center, 0 );

  &__progress-mobile {
    margin-top: 3rem;
  }
}


</style>