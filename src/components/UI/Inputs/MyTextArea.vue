<template>
  <div class="textaria-box">
    <div class="description__notebox"> 
      <img src="@/assets/images/icons/info.svg" alt="info" class="info">
      <p class="description__note">
        Описание товара: наименование; марка; модель; код ТНВЭД; количество; класс опасности (если есть); ссылка на товар (если есть)
      </p>
    </div>   

    <div v-if="innerWidth < 600" class="offer">
      <img src="@/assets/images/home_page/magnifying_glass_mobile.png" alt="услуга">
      <div class="offer-wr">
        <p class="offer__text">
          Ещё не знаете, где и какой товар хотите закупать? Воспользуйтесь услугой по поиску товара/фабрики
        </p>
        <my-color-btn class="offer__btn" @click="goToService">К услуге</my-color-btn>
      </div> 
    </div>
   
    <textarea 
      placeholder="Описание товара"
      type="text-area" 
      class="text-area"
      v-model="value"
      @input="safeInput">
    </textarea>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
  export default {
    name: "my-text-area",
    data(){
      return{
        value: "",
        innerWidth: window.innerWidth
      }
    },
 
    computed:{
      ...mapGetters([
        "APPLICATION_DESCRIPTION", "COST_CALCULATION_APPL", "SELECTED_ORDER"
      ])
    },

    methods:{
      ...mapMutations([
        "SAVE_INPUT_VALUE", "SET_VALUE_FOR_SELECTED_ORDER"
      ]),

      goToService() {
        this.$router.push("/#search") 
      },

      safeInput() {
        this.SAVE_INPUT_VALUE(this.value)
        if (this.$route.name === "customer-order" && this.$route.query.type === "cost") {
          this.SET_VALUE_FOR_SELECTED_ORDER({key: "description", value: this.value})
        }

      }
    },

    mounted(){
      if (this.$route.name === "customer-order") {
        this.value = this.APPLICATION_DESCRIPTION ? this.APPLICATION_DESCRIPTION : this.SELECTED_ORDER.description
      } else {
        this.value = this.APPLICATION_DESCRIPTION ? this.APPLICATION_DESCRIPTION : this.COST_CALCULATION_APPL.description
      }
    }
    
  }
</script>

<style lang="scss" scoped>

.offer{
  margin-bottom: 3rem;
  padding: 2rem 1.5rem;
  border: 1px solid #D9E1E7;
  border-radius: 0.5rem;
  @include flex(row , center, flex-start, 1rem);
}
.offer-wr{
  @include flex(column , center, flex-start, 1rem);
}
.offer__btn{
  @include myColorBtn($main-color, #F5F5F7,#F5F5F7);

  &::after{
    content: url("@/assets/images/icons/shevron_rignt_blue.png");
    margin-left: 2rem;
  }
}

.offer__text{
  @include font(1.4rem, 600, $font-color2);
  line-height: 1.9rem;
  text-align: left;
}

.description__notebox {
 @include description__notebox
}

.info {
    @include info
  }

.text-area {
 @include text-area;
}

.description__note{
     @include note;
  }

</style>