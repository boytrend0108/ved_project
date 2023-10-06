<template>
  <div class="selector">
    <h2 class="selector__title">{{ this.TITLE.country }}</h2>
    <div class="input-box">
      <my-input class="selector__input" id="country"/>
      <my-btn 
        class="input-box__btn" 
        @click="goToNextStep"
        :disabled="isBtnDisabled"
        :class="{'disabled': isBtnDisabled }"
        >Далее</my-btn>
    </div>
  </div> 
</template>
 
<script>
import { mapGetters, mapActions, mapMutations } from "vuex"; 

  export default {
  name: "from-which-country_mob",
  computed: {
    ...mapGetters([
      "COUNTRY", "CITY", "INPUT", "TITLE"
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
        this.SHOW_DIALOG("signin_offer")
        switch (this.$route.name) {
          case "home-new":  localStorage.setItem("selected_service", "delivery")
          break
        }
      }
    } 
  },
}
</script>

<style lang="scss" scoped>

.disabled {
  @include disabled;
}

.selector__title{
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;
  margin-bottom: 3rem;
  text-align: left;

}
.input-box{
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.input-box__btn{
  width: $input-box__btn_width !important;
  height: 5.2rem;
  border-radius: 0 1rem 1rem 0 !important;
}

</style>