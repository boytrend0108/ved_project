<!-- Eлемент ПРИМЕЧАНИЕ-->
<template>
  <div class="note-box">
      <img :src="require(`@/assets/images/icons/${url}`)" alt="info" class="img">
      <p class="note"> {{ note }}</p>
  </div>
</template>

<script>
  export default {
    name:'my-note',
    props:{
      note:{
        type: String
      }, 
      url:{
        type: String,
        default: 'info.svg'
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.note-box {
  @include note-box;
}

.note { 
 @include note
}

.img{
  margin-top: 3px;
}

</style>