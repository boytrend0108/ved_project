<template>
  <div class="typeOfService">
    <img :src="img" alt="Тип услуги" class="img">
    <p class="text"> {{ typeOfService }} </p>
  </div>
</template>

<script>
export default {
  name: "my-type-of-service",
  props: {
    type: String
  },

  computed: {
     // eslint-disable-next-line
    img() {
      if (!this.type) return
      switch (this.type) {
        case "delivery":  return require(`@/assets/images/home_page/plane_mobile.png`)
        case "search":  return require(`@/assets/images/home_page/boxblue_mobile.png`)
        case "cost":  return require(`@/assets/images/home_page/calculatorblue_mobile.png`)
      }
     
    },
 // eslint-disable-next-line
    typeOfService() {
      if (!this.type) return
      switch (this.type) {
        case "delivery":  return "Доставка"
        case "search":  return "Поиск товара"
        case "cost":  return "Расчет стоимости"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.typeOfService {
  @include flex (row, flex-start, center, 8px);
  min-width: 130px;
}

.img {
  width: 22px;
  height: 22px;
}

.text {
  @include font(14px, 500, #416782);
  text-align: left;

  @media (max-width:600px) {
    @include font(13px, 500, #416782);
    line-height: 18px;
  }
}
</style>