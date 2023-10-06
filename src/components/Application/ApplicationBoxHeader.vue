<template>
  <div class="applicationBoxHeaderComp">

  <div class="applicationBoxHeaderComp__elem">
    <button
      id="newFirst" 
      class="applicationBoxHeaderComp__btn active left-filter" 
      @click="clickHandler($event, '.left-filter')"
    >
    Сначала новые
    </button>

    <button
      id="oldFirst" 
      class="applicationBoxHeaderComp__btn left-filter"
      @click="clickHandler($event,'.left-filter')"
    >Сначала старые
    </button>
    </div>

    <div class="applicationBoxHeaderComp__elem">
      <button
        id="broaderView" 
        class="applicationBoxHeaderComp__btn right-filter "
        @click="clickHandler($event, '.right-filter')"
      > 
        <img src="@/assets/images/icons/extended_view.svg" alt="icon" id="left" class="icon">
        Расширенный вид
     </button>

      <button 
        id="compactView"
        class="applicationBoxHeaderComp__btn active right-filter"
        @click="clickHandler($event, '.right-filter')"
      >
        <img src="@/assets/images/icons/compact_look.svg" alt="icon" id="left" >
        Компактный вид
      </button>

    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  export default { 
    name: 'application-box-header',
    methods:{
      ...mapMutations([
        'SET_FILTER_MODE'
      ]), 

      clickHandler(event, data){
        let elems = document.querySelectorAll(data)
          elems.forEach(element => {
            element.classList.remove('active')
          });
          event.target.classList.add('active')
          this.SET_FILTER_MODE(event.target.id) // передает состояние фильтра 
       },
       
      },

      mounted(){
        this.SET_FILTER_MODE('newFirst') // cбрасываем фильтры
        this.SET_FILTER_MODE('compactView')
      }
    
  }
</script>

<style lang="scss" scoped>

.icon{
  fill:"red"
}

.applicationBoxHeaderComp__elem{
  display: flex;
  gap: 2rem;
}
.applicationBoxHeaderComp__btn {
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  gap:1rem;
}

.active{
    background-color: #FFFF;
    color: #339DFF;
  }
.applicationBoxHeaderComp{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;

  @media (max-width: 600px) {
    display: none;
  }
}
</style>