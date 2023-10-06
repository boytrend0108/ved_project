<template>
  <a class="serviceItemMobile" :href="`#${setHash}`">
    <img :src="require(`@/assets/images/home_page/${img}`)" alt="box">
    <div class="title-wr">
      <p class="serveceItem__title">{{title}}</p>
      <p class="serveceItem__subtitle">{{subtitle}}</p>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'service-item-mob',
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
          case "Расчёт стоимости" : return "culculation"
          case "Заключение контракта" : return "contract"
          case "Организация доставки" : return "delivery"
          default: return 'default'
        }
    }},
}
</script>

<style lang="scss" scoped>

.serveceItem__title{
  @include font(1.4rem, 600, $font-color2);
  line-height: 1.9rem;
  text-align: left;
}

.serveceItem__subtitle{
  @include font(1.4rem, 500, $font-color2);
  line-height: 1.9rem;
  text-align: left;
  // width: 180px;
}

  .serviceItemMobile{
    padding: 1.5rem;
    background: #FFFFFF;
    border-radius: 1rem;
    width: 100%;
    @include flex(row, flex-start, center, 1.5rem);

   &::after{
    content: url(@/assets/images/icons/sheron_right.png);
    width: 2rem;
    height: 2rem;

   }
  }

  .title-wr{
    @include flex(column, flex-start, flex-start, 1rem);
    width: 100%;
  }

</style>