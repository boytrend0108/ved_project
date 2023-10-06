<template>
  <div class="myCompanies">
    <h3 class="myCompanies__title">Мои фирмы</h3>
    <radio-list-box
      :title="'Добавить фирму'"
      :id="'addNewCompany'"
    />
  </div> 
</template>
 
<script>
import RadioListBox from '@/components/RadioListBox.vue'
import { mapActions } from 'vuex';
export default {
  name:'companies-comp',
  components: {
    RadioListBox
  },

  methods:{
    ...mapActions([
      'GET_COMPANY_FROM_SERVER',
    ]),
  },

  mounted(){
    // this.GET_COMPANY_FROM_SERVER() // получаем данные о фирме из сервера
  }
}
   
</script>

<style lang="scss" scoped>
.myCompanies{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.myCompanies__title{
  @include title_h3
}

.myCompanies__subtitle {
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
  margin: .5rem 0 2rem 0 ;
}

.radioList{
  margin-top: 3rem;
}


</style>