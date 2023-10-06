<template>
  <div class="preloaderWindow" >
    <my-semipolar-spinner />
  </div>
</template>

<script>
export default {
  name: "my-big-spinner",
}
</script>

<style lang="scss">
.preloaderWindow{
  @include preloaderWindow;
}
</style>