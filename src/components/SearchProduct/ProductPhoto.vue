<template>
  <div class="productPhoto">
    <h1 class="title">Примечание и фото</h1>
    <textarea 
      placeholder="Примечание и параметры товара"
      class="text-area"
      id="note"
      v-model="value"
      @input="saveInput"
    ></textarea>
    <application-upload-foto class="uploadFoto" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ApplicationUploadFoto from '../Application/ApplicationUploadFoto.vue';
  export default {
    name: 'product-photo',
    components:{
      ApplicationUploadFoto
    },
    data(){
      return{
        value: ''
      }
    },

    computed: {
      ...mapGetters([
        'SEARCH_PRODUCT_APPL'
      ])
    },

    methods:{
      ...mapMutations([
        'SET_SEARCH_PRODUCT_APPL'
      ]),

      saveInput(){
        const payload = {
          id: 'note',
          value: this.value
        }
        this.SET_SEARCH_PRODUCT_APPL(payload)
      }
    },

    mounted() {
      this.value = this.SEARCH_PRODUCT_APPL.note
    }
  }
</script>

<style lang="scss" scoped>

.productPhoto{
  width: 100%;
}
.title{
  @include title_h2;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
}
.text-area {
 @include text-area;
}

.uploadFoto {
  margin: 3rem 0;
}
</style>