<template>
  <div class="selector" id="selector" ref="inputBox">
    <h2 class="selector__title">{{ this.TITLE.country }}</h2>
    <div class="input-wr">
      <my-input class="selector__input" id="country" />
      <my-btn 
        id="select_country"
        v-if="$route.name === 'home-new'"
        class="input-box__btn" @click="goToNextStep"
        :disabled="isBtnDisabled"
        :class="{'disabled': isBtnDisabled }"
      >Далее</my-btn> 
    </div>   
  </div> 
</template> 

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'; 

  export default {
  name: 'from-which-country',
  computed: {
    ...mapGetters([
      'COUNTRY', 'CITY', 'INPUT', 'TITLE', 'CURRENT_USER'
    ]),

    isBtnDisabled() {
      if (!this.COUNTRY) return true
      return false
    }
  },

  methods: {
    ...mapActions([ 
      "GO_TO_NEXT_STEP",
    ]),
    ...mapMutations(["SHOW_DIALOG"]),

    goToNextStep() {
      if (this.CURRENT_USER) {
        this.GO_TO_NEXT_STEP(this.$route)
      } else {
        this.SHOW_DIALOG('signin_offer')
        switch (this.$route.name) {
          case 'home-new':  localStorage.setItem('selected_service', 'delivery')
          break
        }
      }
    } 
  },
}
</script>

<style lang="scss" scoped>
.selector{
  width: 100%;
}

.disabled {
  @include disabled;
}

.selector__title {
 @include font(3.2rem, 600, $font-color2);
 line-height: normal;;
 text-align: left;

 @media (max-width: 600px) {
   font-size: 2rem;
   line-height: 2.7rem;
 }
}
.input-wr{
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 6rem 0;

  @media (max-width: 600px) {
    margin-top: 3rem;
  }
}
.input-box__btn{
  width: $input-box__btn_width !important;
  height: 5.2rem;
  border-radius: 0 1rem 1rem 0 !important;

  @media (max-width:600px) {
    width: 13rem !important ;
    height: 4rem;
  }
}

</style>