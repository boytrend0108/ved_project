<template>
  <div>
    <p 
      class="warning"
    > {{ warning }}</p>
  </div>
</template>

<script>
  export default {
    name: "my-warning",
    props: {
      warning: String
    }
  }
</script>

<style lang="scss" scoped>
.warning {
  @include warningMsg
}
</style>