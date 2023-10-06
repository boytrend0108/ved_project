<template>
  <div class="searchProductComp"> 
    <h1 class="title">Поиск товара</h1>
    <my-search-product-input 
      lable="Название товара"
      placeholder="Название товара или код"
      class="inputbox"
      id="name"
    />
    <my-search-product-input  
      lable="Предполагаемое кол-во"
      placeholder="Предполагаемое кол-во"
      class="inputbox"
      id="amount"
    />
  </div>  
</template>
 
<script>
  export default {
    name: 'search-product-comp',

  }
</script>

<style lang="scss" scoped>

.searchProductComp{
  width:100%;
  
  @media (max-width: 600px) {
    width: 100%;
    flex-grow: 1;
  }
}

.title{
  @include title_h2;

  @media (max-width: 600px) {   
    margin: 0 0 3rem;
  }
}

.inputbox{
  margin-bottom: 20px;
}

</style>