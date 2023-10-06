<template>
  <section class="shipping" @change="setShipping">
    <div class="radio">
      <input type="radio" id="1" class="radio__input" name="radio" autocomplete="off" data-type="medium">
      <label for="1" class="radio__lable">Оптимальный (золотая середина между скоростью и стоимостью)</label>
    </div>

    <div class="radio">
      <input type="radio" id="2" class="radio__input" name="radio" autocomplete="off" data-type="fast">
      <label for="2" class="radio__lable">Быстрый (подходит тем, кому поставка нужна ещё вчера)</label>
    </div>

    <div class="radio">
      <input type="radio" id="3" class="radio__input" name="radio" autocomplete="off" data-type="slow">
      <label for="3" class="radio__lable">Бюджетный (для тех, кто располагает временем)</label>
    </div>

    <div class="radio">
      <input type="radio" id="4" class="radio__input" name="radio" autocomplete="off" data-type="any">
      <label for="4" class="radio__lable">Не имеет значения</label>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
  export default {
    name:"application-shipping", 
    computed: {
      ...mapGetters([
        "SHIPPING", "SELECTED_ORDER"
      ])
    },

    methods: { 
      ...mapMutations([
        "SET_SHIPPING", "SET_SHIPPING_FOR_SELECTED_ORDER", 
      ]), 

      setShipping(event) {
        const shipping = event.target.nextSibling.textContent
        this.SET_SHIPPING(shipping)
        this.SET_SHIPPING_FOR_SELECTED_ORDER(shipping)
      }
    },

    mounted() { 
      debugger
      const labels = document.querySelectorAll(".radio__lable")
      labels.forEach(el => {
        el.previousSibling.checked = false
        if (this.$route.name === "customer-new-application" || this.$route.name === "cost-calculation") {
          if (this.SHIPPING === el.textContent) el.previousSibling.checked = true
        } else {
          if (this.SELECTED_ORDER.delivery_type === el.textContent) {
          el.previousSibling.checked = true
        }
        }
      })

    }
  }
</script>

<style lang="scss" scoped>

.shipping{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 4.5rem;

  @media (max-width: 600px) {
    margin-top: 30px;
  }
}
.radio{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.radio__lable {
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #416782;
  margin-left: 1.5rem;
  cursor: pointer;
  text-align: left;

  @media (max-width: 600px) {
    line-height: 23px;
  }
}
.radio__input{
  min-width: 1.8rem;
  min-height: 1.8rem;
  cursor: pointer;
}
</style>