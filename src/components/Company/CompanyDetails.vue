<template>
  <div class="myCompanies">
    <h3 class="myCompanies__title">Реквизиты фирмы</h3>
    <radio-list-box
      :data-tooltip="FID ? '' :'Сначала надо добавить фирму' " 
      :note="note"
      :title="'Добавить реквизиты'"
      :id="'addCompanyDetails'"  
    />
  </div>
</template>

<script>
import RadioListBox from '@/components/RadioListBox'
import { mapGetters } from 'vuex'
export default {
  name:'company-details',
  components: {
    RadioListBox
  },
  data() {
    return {
      note: 'Для работы с нашим сервисом достаточно счета в RUB, но для работы с другими странами придется открыть валютный счет. Подробнее',
    }
  },

  computed: {
    ...mapGetters([
    'FID'
    ]
    )
  }
}
   
</script>

<style lang="scss" scoped>

[data-tooltip]::after {
  content: attr(data-tooltip); /* Выводим текст */
  opacity: 0;
  transition: 1s;
  pointer-events: none;
  position: relative;
  bottom: 2.8rem;
  left: 24.5rem;
  @include font(1.7rem, 600, red);
}

[data-tooltip]:hover::after {
  opacity: 1;
}
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
.note{
  margin-bottom: 4.5rem;
}

.radioList{
  margin-top: 3rem;
}

</style>