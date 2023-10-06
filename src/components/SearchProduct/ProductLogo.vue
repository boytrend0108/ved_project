<template>
  <div class="productLogo">
    <h1 class="title">Нанесение логотипа / принта</h1>
    <div class="checkbox">
      <input 
        ref="is_logo"
        type="checkbox"  
        id="is_logo"
        class="input"
        @change="saveCheckBoxValue"
      >
      <label for="input" class="lable">Нанесение логотипа / принта</label>
    </div>
    <my-search-product-input 
      lable="Нанесен ли на товар зарегистрированный бренд?"
      placeholder="Да / нет (например: да, Calvin Klein)"
      class="inputbox"
      id="brand_name"
    />
    <my-search-product-input 
      lable="Место нанесения логотипа"
      placeholder="Место нанесения логотипа"
      class="inputbox"
      id="location_logo"
    />

  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'product-logo',

  computed: {
    ...mapGetters([
      'SEARCH_PRODUCT_APPL'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_SEARCH_PRODUCT_APPL'
    ]),

    saveCheckBoxValue() {
      const payload = {
        id: 'is_logo',
        value: this.$refs.is_logo.checked
      }
      this.SET_SEARCH_PRODUCT_APPL(payload)
    }
  },

  mounted() {
    if (this.SEARCH_PRODUCT_APPL.is_logo === true) {
      this.$refs.is_logo.checked = true
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin: 0 0 3rem;
  }
}

.checkbox {
  @include flex(row, flex-start, center, 1.5rem);
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
}

.input {
  height: 2.8rem;
  width: 2.8rem;

  @media (max-width: 600px) {
    height: 2.4rem;
    width: 2.4rem;
  }
}

.lable {
  @include font (1.7rem, 500, #416782);
  line-height: 2.6rem;
}

.inputbox {
  margin-bottom: 2rem;
}
</style>