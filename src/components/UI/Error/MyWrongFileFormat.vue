<template>
  <transition name="slide">
    <p 
      class="wrong_format" 
      v-if="showWrongFileMsg"
    >Неверный формат файла {{ wrongFile.file }}. Доступные форматы pdf/docx/xls </p>
  </transition>
</template>

<script setup>
import { computed , defineProps} from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  id: {type: String, required: true}
})

 const store = useStore()
 const wrongFile= store.getters.WRONG_FILE

const showWrongFileMsg = computed(() => {
  switch (wrongFile.document_id) {
    case "order_invoice" :
      if (wrongFile.document_id === props.id) return true
      else return false
    case "order_packing_list":
      if (wrongFile.document_id === props.id) return true
      else return false
    default:
      if (wrongFile.document_id === props.id.replaceAll("_", "-")) return true
      else return false
  }
})

</script>

<style scoped lang="scss">

.wrong_format{
  color: red !important;
  @include note;
  margin-top: 2rem;
  top: 164px;
  background: antiquewhite;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 3;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px) ;
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.slide-leave-active,
.slide-enter-active {
  transition: all 0.5s ease;
}

</style>