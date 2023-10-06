<template>
  <div class="mySelectInput">
    <p class="lable"> {{ title }}</p>
    <select 
      :id="`${id}_select`" 
      name="select" 
      class="input" 
      @change="select">
      <option 
        :value="el"  
        class="option" 
        v-for="(el, i) in value"
        :key="i"
      > {{ el }} </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "my-select-input",
    props: {
      title: String,
      value: Array,
      id: String,
    },

    computed: {
       ...mapGetters(["SEARCH_PRODUCT_APPL"])
    },

    methods: {
      ...mapMutations(["SET_SEARCH_PRODUCT_APPL"]),

      select() {
        document.querySelector(`#${this.id}_select`).style.color = "#244156"
        const value = document.querySelector(`#${this.id}_select`).value
        this.SET_SEARCH_PRODUCT_APPL({id: this.id, value })
      }
    },

    mounted() {
     
    }
  }
</script>

<style lang="scss" scoped>

.lable{
  @include font(1.4rem, 600, #416782);
  line-height: 2.1rem;
  text-align: left;

  @media (max-width: 600px) {
    margin-bottom: .5rem;
  }
}
.input {
  @include input;
  color: $placeholder-color;
  max-width: 49.5rem;
  width: 100%;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.option {
  @include input;
}


</style>