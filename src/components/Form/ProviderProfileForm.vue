<template>
  <div class="providerProfileForm">
    <div class="formElemINN">
      <p class="formElem__title">ИНН</p>
      <p class="inn">{{ FIRMS[0].inn }}</p>
      <my-note :note="note"/>
    </div>
    <my-company-form-elem 
      :title="'КПП'" 
      :value="FIRMS[0].kpp ? FIRMS[0].kpp : '-'"/>
    <my-company-form-elem  
      :title="'ОГРН'" 
      :value="FIRMS[0].ogrn ? FIRMS[0].ogrn : '-'"/>
    <my-company-form-elem 
      :title="'Наименование'" 
      :value="FIRMS[0].long_name ? FIRMS[0].long_name : '-'"/>
    <my-company-form-elem 
      :title="'Сокр. наименование'" 
      :value="FIRMS[0].long_name ? FIRMS[0].long_name : '-'"/>
    <my-company-form-elem 
      :title="'Юридический адрес'" 
      :value="FIRMS[0].address_jur ? FIRMS[0].address_jur : '-'"/>
    <my-company-form-elem 
      :title="'ФИО Гендиректора'" 
      :value="FIRMS[0].director_name ? FIRMS[0].director_name : '-'"/>
    <my-company-form-elem 
      :title="'Email компании'" 
      :value="FIRMS[0].email ? FIRMS[0].email : '-'"/>
    <my-company-form-elem 
      :title="'Телефон компании'" 
      :value="FIRMS[0].phone_number ? FIRMS[0].phone_number : '-'"/>
  </div>
</template>

<script> 
import { mapGetters, mapActions} from "vuex"
  export default {
    name:'provider-profile-form',
    data(){
      return{
        note: 'Если хотите поменять ИНН, обратитесь в поддержку',
      }
    },
    computed:{
      ...mapGetters([
        'FIRMS'
      ])
    },

    methods: {
      ...mapActions([
        "GET_BANK_FROM_SERVER"
      ])
    },

  mounted() {
    if (!this.FIRMS.length) this.GET_COMPANY_FROM_SERVER()
  }
}
</script>

<style lang="scss" scoped>

.providerProfileForm{
  max-width: 65.2rem;
}


.hr{
  color:#D9E1E7;
}
.inn{
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;
}

.formElem__title{
  @include font(1.4rem, 600, $font-color2);
  line-height: 5.1rem;
  margin-bottom: 1rem;
}

.formElemINN{
  @include flex(column, center, flex-start, 0);
  margin-bottom: 3rem;
}

</style>