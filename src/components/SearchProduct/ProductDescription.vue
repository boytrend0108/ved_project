<template>
  <div class="productDescription" >
    <h1 class="title">Характеристики товара</h1>
    <my-note :note="note" url="info_red.svg" class="note" />
    <my-search-product-input 
      lable="Размер"
      placeholder="Например, 20×30×30 см"
      class="inputbox"
      id="one_volume" 
    />
    <my-search-product-input 
      lable="Материал"
      placeholder="Материал"
      class="inputbox"
      id="material"
    />
    <my-search-product-input 
      lable="Цвет"
      placeholder="Цвет"
      class="inputbox"
      id="color"
    />

    <my-select-input 
      class="mySelectInput"
      id="package"
      title="Упаковка"  
      :value="selectSample" />
    
    <my-select-input 
      class="mySelectInput"
      id="sample_for_replication"
      title="Образец для утверждения тиража"  
      :value="selectSample" />

     <p class="lable">Описание функционала</p>
     <textarea 
      placeholder="Описание функционала"
      class="text-area"
      id="description"
      @input="saveInput"
      v-model="value"
    ></textarea>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'product-description',
  data() {
    return {
      note: 'Можете заполнить не все поля, с оставшимися вам поможет наш специалист. Он напишет, как только вы оплатите услугу',
      value: '',
      selectSample: ["Не выбрано", "Да", "Нет"]
    }
  },
  computed: {
    ...mapGetters([
      'SEARCH_PRODUCT_APPL'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_SEARCH_PRODUCT_APPL'
    ]),

    saveInput() {
      const payload = {
        id: 'description',
        value: this.value
      }
      this.SET_SEARCH_PRODUCT_APPL(payload)
    }
  },

  mounted() {
    this.value = this.SEARCH_PRODUCT_APPL.description
  }

}
</script>

<style lang="scss" scoped>
.productDescription {
  @include flex(column, center, flex-start, 0);
}


.title {
  @include title_h2;

  @media (max-width:600px) {
    margin-top: 0;
  }
}

.note {
  margin-bottom: 4.5rem;

  @media (max-width:600px) {
    margin-bottom: 3rem;
  }
}

.inputbox {
  margin-bottom: 2rem;
  width: 100%;
}

.mySelectInput {
  margin-bottom: 1.5rem;
  width: 60%;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.lable {
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  text-align: left;
}

.text-area {
  @include text-area
}
</style>