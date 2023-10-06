<template>
  <div class='service-item'> 
    <header class="header">
      <div class="header_notPublished">Неоплачена</div>
      <div class="header_published">В работе</div>
      <div class="header_finished">Завершена</div>
      <div class="header_right"> №10{{ }} &nbsp; Создана 10.10.10{{ }} </div>
    </header>
    <main class="service-item__main">
      <h3 class="service-item__title"> Название услуги {{ }}</h3>
    </main>
    <footer class="service-item__footer">
      <p class="service-item__price"> 15000 руб </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'service-item',
}
</script>
 
<style lang="scss" scoped>
.service-item {
  background-color: #FFFF;
  padding: 20px 50px;
  @include flex(column, center, flex-start, 5px);
}

.service-item__title {
  @include title_h3;
}

.header {
  @include flex(row, space-between, center, 10px);
  margin-bottom: 10px;
}

.header_notPublished {
  width: 138px;
  height: 21px;
  border: 1px solid #D9E1E7;
  border-radius: 5px;
  @include font(14px, 500, #416782);
  @include flex(row, center, center, 0);

  @media (max-width:600px) {
    @include font(13px, 500, #416782);
    line-height: 18px;
  }
}

.header_published {
  width: 138px;
  height: 21px;
  border: 1px solid $main-color;
  border-radius: 5px;
  @include font(14px, 500, $main-color);
  @include flex(row, center, center, 0);
}

.header_finished {
  width: 138px;
  height: 21px;
  border: 1px solid #416782;
  background-color: #416782;
  border-radius: 5px;
  @include font(14px, 500, #FFFF);
  @include flex(row, center, center, 0);
}

.header_right {
  @include font(14px, 500, #416782);
  text-align: right;

  @media (max-width:600px) {
    @include font(13px, 500, #416782);
    line-height: 18px;
  }
}

.service-item__price {
  @include font(14px, 500, #244156);

  @media (max-width:600px) {
    @include font(13px, 500, #416782);
    line-height: 18px;
  }
}
</style>