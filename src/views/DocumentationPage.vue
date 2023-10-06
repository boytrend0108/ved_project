<template>
  <div class="documentationPage">
    <component :is="component" :headers="headers" :currentSection="currentSection" />
    <article-nav  v-if="innerWidth > 600" :headers="headers" :currentSection="currentSection" />
  </div>
</template>
 
<script>
import ArticleNav from '@/components/Documentation/ArticleNav.vue'
import ProductSearch from '../components/Documentation/ProductSearch.vue'
  export default {
    name: 'documentation-page',
    components:{ ProductSearch, ArticleNav },
    data(){
      return{
        headers:[
          'Где искать',
          'Поиск товара на сайте',
          'На что обратить внимание при выборе',
          "Общение с поставщиком",
          "Зачем нужна подробная информация о товаре",
          "Практические советы"
        ],
        currentSection : '',
        innerWidth: window.innerWidth,
      }
    },

    computed:{
      component(){
        if(this.$route.query.article === 'product-search') return "product-search"
        return ''
      }
     
    },

  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry => {
        if (entry.intersectionRatio > 0) {
          this.currentSection = entry.target.getAttribute('id')
        }
      }))
    },
      { rootMargin: '0px 0px -90% 0px' }, // options
    )

    document.querySelectorAll(".article__title").forEach(section => {
      observer.observe(section)
    })
  }
  }
</script>

<style lang="scss" scoped>


.documentationPage{
  @include flex(row, flex-start, flex-start, 80px);
}

.pageNav{
  width: 180px;
  height: 300px;
  @include flex(column, center, flex-start, 0px);
  position: sticky;
  top: 30px;

  @media (max-width: 600px) {
    display: none;
  }
}

.pageNav__link{
  @include font(14px, 500, $font-color2);
  line-height: 21px;
  text-align: left;
  padding: 5px 20px;
  border-left: 2px solid #D9E1E7;
  transition: 1s;

  &.active{
    font-weight: bold;
    border-left: 2px solid #244156;
  }
}

</style>