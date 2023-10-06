<template>
  <div class="applicationBoxHeaderComp">
    <div class="applicationBoxHeaderComp__elem"  @click.stop="showDropdownFn" id="left_dropdown">
      <p class="filter left">Cначала новые</p>
      <ul class="dropdown" v-if="showDropdownLeft" @click.stop="selectTime">
        <div class="li-wr" id="newFirst">
          <div class="img-wr">
            <img v-show='selectNew' src="@/assets/images/icons/v.png" alt="cначала новые">
          </div>
          <li class="dropdown__li">Сначала новые</li>
        </div>
        
        <li class="hr"></li>

        <div class="li-wr" id="old">
          <div class="img-wr">
            <img v-show="!selectNew" src="@/assets/images/icons/v.png" alt="cначала старые">
          </div>
          <li class="dropdown__li">Сначала старые</li>
        </div>
      </ul>
    </div>
    
    <div class="applicationBoxHeaderComp__elem"  @click="showDropdownFn" id="filters">
        <p class="filter right">Фильтры</p>
    </div>

    <my-dialog v-if="DIALOG">
      <div class="wrapper" v-if="SHOW_SIDE_FILTER">
        <div class="filter_header">
          <p class="filter__title">Фильтры</p>
        </div>
        <side-filter-mob />
        <my-blue-btn style="width: 100%" @click="SHOW_DIALOG()">Показать заявки</my-blue-btn>
      </div>
    </my-dialog>

  </div>
</template>

<script>

  import SideFilterMob from '@/components/Filter/SideFilterMob.vue';
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: 'application-box-header-mob',
    components: { SideFilterMob },
    data() {
      return {
        showDropdownLeft: false,
        showDropdownRight: false,
        selectNew: true,
      }
    },

    computed:{
      ...mapGetters([
        'DIALOG', 'SHOW_SIDE_FILTER', 'SHOW_BURGER_MENU'
      ])
    },

    methods:{
      ...mapMutations([
        'SET_FILTER_MODE', 'SHOW_DIALOG', 'SET_SHOW_SIDE_FILTER'
      ]), 

      showDropdownFn(event) {
        if(event.currentTarget.id === 'left_dropdown') {
          this.showDropdownLeft = !this.showDropdownLeft
        } else {
          this.showDropdownLeft = false
          this.SET_SHOW_SIDE_FILTER(true)
          this.SHOW_DIALOG()
        }
      },

      clickHandler(event, data){
        let elems = document.querySelectorAll(data)
          elems.forEach(element => {
            element.classList.remove('active')
          });
          event.target.classList.add('active')
          this.SET_FILTER_MODE(event.target.id) // передает состояние фильтра 
       },

       selectTime(event) {
        if(event.target.parentElement.id === 'newFirst') { 
          this.selectNew = true 
          this.SET_FILTER_MODE('newFirst')
        }
        else {
          this.selectNew = false 
          this.SET_FILTER_MODE('oldFirst')
        }  
       }
       
      },

      mounted(){
        this.SET_FILTER_MODE('newFirst') // cбрасываем фильтры
        this.SET_FILTER_MODE('compactView')
      }
    
  }
</script>

<style lang="scss" scoped>

.filter__title {
  @include font (2rem, 600, $font-color2);
  line-height: 30px;
}


.wrapper{
  @include flex(column, space-between, flex-start, 0px);
  padding: 1.5em;
  height: 100%;

  @media (max-width:600px) {
    width: 100%;
    height:100vh;
  }
}

.img-wr{
  width: 2rem;
}

.hr{
  height: 2px;
  width: 100%;
  margin: 52px 0 45px 0;
  border: none;
  background: #D9E1E7;
  margin: 0;
}

.dropdown{
  list-style-type: none;
  background-color: #FFFF;
  position: absolute;
  top: 50px;
  left: 1px;
  box-shadow: 0px 5px 2rem rgba(6, 21, 43, 0.15);
  border-radius: 5px;
  padding: 1px;
  width: 210px;
  z-index: 1;
}

.dropdown__li{
  text-align: left;
  @include font(1.4rem, 500, #416782);
  line-height: 19px;
}

.li-wr{
  padding: 10px 2rem;
  @include flex(row, flex-start, center, 10px);
}
.left::before{
  content: url('@/assets/images/icons/filter_new_mobile.png')
}

.right::before{
  content: url('@/assets/images/icons/filterview_mobile.png')
}

.filter{
  @include font(1.4rem, 600, $main-color);
  line-height: 19px;
  @include flex(row, center, flex-start, 5px);
}

.icon{
  fill:"red"
}

.applicationBoxHeaderComp__elem{
  @include flex(row, space-between, center, 2rem);
  position: relative;
  padding: 10px;
}
.applicationBoxHeaderComp__btn {
  height: 37px;
  border-radius: 10px;
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
  padding: 8px 2rem;
  display: flex;
  align-items: center;
  gap:10px;
}

.active{
    background-color: #FFFF;
    color: #339DFF;
  }
.applicationBoxHeaderComp{
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 600px) {
    display: none;
  }
}
</style>