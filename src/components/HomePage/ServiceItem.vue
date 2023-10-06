<template>
  <div class="serviceItem">
    <img :src="require(`@/assets/images/home_page/${img}`)" alt="box">
    <p class="serveceItem__title">{{title}}</p>
    <p class="serveceItem__subtitle">{{subtitle}}</p>
    <a  
      :href="`#${setHash}`" 
      class="serveceItem__btn"
    >Подробнее</a>
  </div> 
</template>

<script>

  export default {
    name:'service-item', 
    props:{
      img:{
        type: String
      },
      title:{
        type: String
      },
      subtitle:{
        type: String
      },
      article:{
        type: String
      }
    },

    computed: {
      setHash() {
        debugger
        switch (this.title) {
          case "Личный менеджер" : return "manager"
          case "Поиск товара" : return "search"
          case "Платная консультация и расчет стоимости логистики и ТО" : return "calculation"
          case "Заключение контракта" : return "contract"
          case "Организация доставки и ТО" : return "delivery"
          default: return 'default'
        }
    }}
    
  }
</script>

<style lang="scss" scoped>

.serveceItem__btn{
  background: #FFFF !important;
  margin-top: 1rem;
  height: 4.5rem !important;
  @include font(1.4rem, 600, $main-color);
  line-height: 2.1rem;
  padding: 1.2rem 3rem;
  border: 1px solid $main-color;
  border-radius: 1rem;
  cursor: pointer;
  &:hover{
    background-color:$main-color !important;
    color:#FFFFFF !important;
  }
}

.serveceItem__subtitle{
  @include font(1.4rem, 500, #416782);
  line-height: 2.1rem;
  width: 15rem;
  min-height: 6.5rem;
}

.serveceItem__title{
  @include font(1.6rem, 600, $font-color2);
  line-height: 2.4rem;
  margin: 2rem 0 1rem;
  height: 7rem;
}

.serviceItem{
  width: 22.2rem;
  background: #FFFFFF;
  border-radius: 1rem;
  @include flex(column, center, center, 0 );
  padding: 1.5rem 1.5rem;
  // height: 36rem;
}

</style>