<template>
  <div class="validationErrorMsg">
    <p class="error" v-show="errorMsg"> {{ errorMsg }} </p>
  </div>
</template>

<script>
  export default {
    name: 'my-validation-error-msg',
    props: {
      errorMsg:{
        type: String
      }
    }

  }
</script>

<style lang="scss" scoped>
.error {
  @include font ( 20px, bold, red);
  line-height: 21px;

  @media (max-width:600px) {
    @include font(14px, 600, red);
  }
}

</style>