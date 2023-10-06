<template>
  <div class="payMethods">
    <h3 class="title"> Способ оплаты </h3>
    <div class="input-wr">
      <input type="radio" name="method" id="bank_cart" class="input">
      <label for="bank_cart" class="label"> Банковская карта </label>
    </div>
    <div class="input-wr">
      <input type="radio" name="method" id="corp_cart" class="input">
      <label for="corp_cart" class="label"> Корпоративная карта </label>
    </div>
    <div class="input-wr">
      <input type="radio" name="method" id="by_bill" checked class="input" >
      <label for="by_bill" class="label" > Выставление счета </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pay-methods",
 
  }
</script>

<style lang="scss" scoped>

.input-wr {
  @include flex(row, flex-start, center, 20px);
}
.payMethods {
  @include flex(column, center, flex-start, 12px);
}
.input {
  width: 18px;
  height: 18px;
  cursor:pointer;
}

.label {
  @include font(17px, 500, $font-color3);
  line-height: 26px;
  cursor:pointer;
}
.title {
  @include title_h3;
  text-align: left;
}


</style>
