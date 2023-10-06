<template>
  <aside class="pageNav"> 
    <p v-if="innerWidth < 600"  class="navTitle"> Контент </p>
      <a 
      :href="`#${header}`" 
      v-for="(header,i) in headers" 
      :key="i"
      class="pageNav__link"
      :class="{'active': header === currentSection}"
    > {{ header }} </a>


    </aside>
</template>

<script>
  export default {
    name: 'article-nav',
    props: {
      headers: Array,
      currentSection: String,
    }, 
    data() {
      return {
        innerWidth: window.innerWidth
      }
    }
  }
</script>

<style lang="scss" scoped>

.navTitle{
  @include font(14px, 600, $font-color2 );
  line-height: 19px;
  text-align: left;
  margin-bottom: 15px;
}

.pageNav{
  width: 180px;
  // height: 300px;
  @include flex(column, center, flex-start, 0px);
  position: sticky;
  top: 30px;

  @media (max-width:600px) {
    position: static;
    width: 100%;
    margin: 20px 0 45px ;
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