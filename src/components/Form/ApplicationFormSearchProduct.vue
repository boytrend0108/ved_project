<template>
  <div class="applicationForm">

    <div v-if="SELECTED_ID === 'name'" class="wrapper">
      <my-search-product-input 
        lable="Название товара"
        placeholder="Название товара или код"
        class="inputbox"
        id="name" 
      />
    </div>

    <div v-if="SELECTED_ID === 'amount'" class="wrapper">
      <my-search-product-input 
        lable="Предполагаемое кол-во"
        placeholder="Предполагаемое кол-во"
        class="inputbox"
        id="amount"
      />
    </div>

    <div v-if="SELECTED_ID === 'one_volume'" class="wrapper">
      <my-search-product-input 
        lable="Размер"
        placeholder="Например, 20×30×30 см"
        class="inputbox" 
        id="one_volume"
      />
    </div>

    <div v-if="SELECTED_ID === 'material'" class="wrapper">
      <my-search-product-input 
        lable="Материал"
        placeholder="Материал"
        class="inputbox"
        id="material"
      />
    </div> 

    <div v-if="SELECTED_ID === 'color'" class="wrapper">
      <my-search-product-input 
        lable="Цвет"
        placeholder="Цвет"
        class="inputbox"
        id="color"
      />
    </div>

    <div v-if="SELECTED_ID === 'package'" class="wrapper">
      <my-select-input  
        class="mySelectInput"
        id="package" 
        title="Упаковка"  
        :value="selectSample" />
    </div>

    <div v-if="SELECTED_ID === 'sample_for_replication'" class="wrapper">
      <my-select-input 
        class="mySelectInput"
        id="sample_for_replication"
        title="Образец для утверждения тиража"  
        :value="selectSample" />
    </div>

    <div v-if="SELECTED_ID === 'description'" class="functional">
        <textarea 
          placeholder="Описание функционала"
          class="text-area"
          id="description"
          @blur="saveInput"
          v-model="value"
        ></textarea>
    </div>'

    <div v-if="SELECTED_ID === 'is_logo'">
      <product-logo />
    </div>

    <div v-if="SELECTED_ID === 'note'" class="functional">
      <textarea 
        placeholder="Примечание и параметры товара"
        class="text-area"
        id="note"
        v-model="value"
        @blur="saveInput"
    ></textarea>
    </div>

    <my-btn 
      class="btn " 
      @click="changeData"
      :disabled="INPUT_VALIDATION_ERR"
      :class="{'disabled': INPUT_VALIDATION_ERR}" 
      > Coхранить </my-btn >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import ProductLogo from "../SearchProduct/ProductLogo.vue"
export default {
  name: "application-form-search-product",
  data() {
    return {
      selectSample: ["Не выбрано", "Да", "Нет"],
      value: "",
    }
  },
  components: {
    ProductLogo
  },

  computed: {
    ...mapGetters(["SELECTED_ID", "SEARCH_PRODUCT_APPL", "INPUT_VALIDATION_ERR", "DIALOG"])
  },

  methods: {
    ...mapMutations(["SWITCH_SHOW_APPLICATION_FORM", "SHOW_DIALOG", "SET_SEARCH_PRODUCT_APPL",
    "SET_INPUT_VALIDATION_ERR",
   ]),

    closeDialog() {
      this.SWITCH_SHOW_APPLICATION_FORM(false)
      this.SHOW_DIALOG()
    },

    changeData() {
      this.$emit("close_dialog")
     if (this.DIALOG) this.SHOW_DIALOG()
    },

    saveInput() {
      const payload = {
        id: this.SELECTED_ID,
        value: this.value
      }
      this.SET_SEARCH_PRODUCT_APPL(payload)
    },

    saveCheckBoxValue() {
      const payload = {
        id: "logo_checkbox",
        value: this.$refs.logo_checkbox.checked
      }
      this.SET_SEARCH_PRODUCT_APPL(payload)
    },

  },

  mounted() {
    this.value = this.SEARCH_PRODUCT_APPL[this.SELECTED_ID]
    console.log(this.value)
    // записываем начальные данные в черновик
    if (this.$route.name === "search-product" || this.$route.query.type === "search") {
      switch(this.SELECTED_ID) {
        case "is_logo":
           this.SET_SEARCH_PRODUCT_APPL({id: 'draft', value: {
              is_logo: this.SEARCH_PRODUCT_APPL.is_logo,
              location_logo: this.SEARCH_PRODUCT_APPL.location_logo,
              brand_name: this.SEARCH_PRODUCT_APPL.brand_name,
           }})
           break
        default: this.SET_SEARCH_PRODUCT_APPL({id: 'draft', value: this.value})
      }
      
    }

    this.SET_INPUT_VALIDATION_ERR(false)
  }

}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
.functional {
  width: 100%;
}

.lable{
  @include font (17px, 500, #416782);
  line-height: 26px;
}

.input{
  height: 28px;
  width: 28px;
}

.checkbox{
  @include flex(row, flex-start, center, 15px);
  margin-bottom: 45px;
}

.title{
  @include title_h2;
  margin-bottom: 45px;
}

.text-area {
 @include text-area;
//  width: 400px;
}

.btn{
  width: 40%;
  margin-top: 45px;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.applicationForm{ 
  @include formBox;
  width: 100%;
}

.disabled {
  @include disabled;
}

</style>