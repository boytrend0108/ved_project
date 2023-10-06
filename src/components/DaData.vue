<template>
  <div>
    <VueSuggestions
        :placeholder="'Введите ваш ИНН'"
        :options="suggestionOptions" 
        :model="inn" 
    >
    </VueSuggestions>
  </div>
</template>

<script> 
  import VueSuggestions from 'vue-suggestions';
  import { mapMutations } from 'vuex';
  export default {
    name: 'da-data',
    components: { VueSuggestions },
    data() {
      return {
        inn: '',
        value: '',
        firmData: '',
        suggestionOptions: {
          // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454318
          token: '41e2fb46678542503adc5b7d41461be1c9bc39c0',
          type: "PARTY",
          scrollOnFocus: false,
          triggerSelectOnBlur: false,
          triggerSelectOnEnter: false,
          triggerSelectOnSpace: false,
          mobileWidth: 400,
          comp: this,
          // @see https://confluence.hflabs.ru/pages/viewpage.action?pageId=207454320
          onSelect (suggestion) {     
           const firmData = {
             name : suggestion.data.name.full,
             inn: suggestion.data.inn
           }
           localStorage.setItem('firmData', JSON.stringify(firmData))
          },

          formatSelected(suggestion){
            let value =  suggestion.data.inn;
                suggestion.value = value;
                return value;
          }
        },
      }
    },
    computed:{


    },
    methods:{
      ...mapMutations([
        'SET_DADATA', 
      ])
    },
       
    mounted(){
      //  this.suggestionOptions.onSelect()
       document.querySelector(".suggestions-input").classList.add('input2')
       document.querySelector(".suggestions-suggestions").style.background= 'white'
       document.querySelector(".suggestions-suggestions").style.border = 'none'
      //  document.querySelector(".suggestions-suggestion").style.color = 'red'
    },
  }
</script>

<style lang="scss" scoped>
  .input2{
    box-sizing: border-box;
    background: rgb(238, 238, 240);
    width: 100%;
    border: none;
    outline: none;
    height: 50px;
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 2.6rem;
    font-feature-settings: "pnum", "lnum";
    color: rgb(36, 65, 86);
    height: 40px;
    padding: 8px 12px !important;
    border-radius: 10px;  
  }
  
  ::placeholder{
  @include placeholder;
}

</style>