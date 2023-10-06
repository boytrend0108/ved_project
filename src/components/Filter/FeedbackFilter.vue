<template>
  <div class="feedbackFilter">
    <div class="inputBox">
      <p class="inputBox__title">Страна-экспортёр</p>
      <input 
        type="text" 
        class="inputBox__input"
        placeholder="Поиск по стране"
        v-model="searchByCountry"
        @input="saveData('searchByCountry')"
        >
    </div>
    <div class="inputBox">
      <p class="inputBox__title">Город-импортер</p>
      <input 
        type="text" 
        class="inputBox__input"
        placeholder="Поиск по городу"
        v-model="searchByCity"
        @input="saveData('searchByCity')"
        >
    </div>
  </div>
</template> 

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'feedback-filter', 
    data(){
      return{
        searchByCountry: '',
        searchByCity: '',
      }
    },

    props:{
       clearData: Boolean
    },

    methods:{
      ...mapMutations([
        'SET_FEEDBACK_FILTER'
      ]),

      saveData(id){
        const payload = {
          id: id,
          value:this[id]
        }
      this.SET_FEEDBACK_FILTER(payload)
      }  
    },

    watch: {
      clearData() {
        if(this.clearData) {
          this.searchByCountry = '',
          this.searchByCity = ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

.feedbackFilter{
  @include flex (column, flex-start, flex-start, 3rem);
  padding: 2rem;
  background-color: #FFFF;
  border-radius: 1rem;
  margin-top: 2rem;

  @media (max-width:600px) {
    padding: 1.5rem;
  }
}

.inputBox{
  @include flex (column, flex-start, flex-start, 1.5rem);

  @media (max-width:600px) {
    width: 100%;
    margin-bottom: 2rem;
  }
}

.inputBox__title{
  @include font(1.7rem, 600, $font-color2);
  line-height: 2.6rem;
}

.inputBox__input{
  @include input
}

::placeholder{
  @include placeholder;
}

</style>