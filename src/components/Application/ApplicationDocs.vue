<template>
  <div class="applicationDocsComp" v-if="$route.name !== 'cost-calculation'">
    <!--Загрузка инвойса++-->
    <div class="download__box-bottom" v-if="true">
      <input  
        id="order_invoice" 
        class="download__input"   
        type="file" 
        @change="uploadDocs"
        :disabled="this.$route.path === '/customer'" 
        >
      <label 
        for="order_invoice"
        @drop.prevent="dropDocument"
        @dragover.prevent
        data-id="order_invoice"
        >
      <!--Показываем когда файл НЕ загружен++-->
        <my-download-area 
          inputTitle="инвойс" 
          :name="DOCS.order_invoice.name"
          :showBlock="DOCS.order_invoice.name === ''"
          :class="{disabled: this.$route.path === '/customer' }" 
        />
        <MyWrongFileFormat id="order_invoice"/>
      </label>
      
      <!--Показываем когда файл загружен-->
        <my-downloaded-area
          inputTitle="инвойс" 
          :name="DOCS.order_invoice.name"
          :showBlock="DOCS.order_invoice.name === ''"
          id="order_invoice"
          :class="{disabled: this.$route.path === '/customer' }"
          :href="DOCS.order_invoice.href"
      />
    
    </div> 

    <!--Загрузка упаковочного листа-->
    <div class="download__box-bottom">
      <input 
        id="order_packing_list" 
        class="download__input pppp" 
        type="file" 
        @change="uploadDocs" 
        :disabled="this.$route.path === '/customer'"
      >
      <label 
          for="order_packing_list"
          @drop.prevent="dropDocument"
          @dragover.prevent
          data-id="order_packing_list"
        >
          <!--Показываем когда упаковочный лист НЕ загружен-->
        <my-download-area 
          inputTitle="упаковочный лист" 
          :name="DOCS.order_packing_list.name"
          :showBlock="DOCS.order_packing_list.name === ''" 
        />
      </label>
        <!--Показываем когда упаковочный лист  загружен-->
      <my-downloaded-area
        inputTitle="упаковочный лист" 
        :name="DOCS.order_packing_list.name"
        :showBlock="DOCS.order_packing_list.name === ''"
        id="order_packing_list"
        :class="{disabled: this.$route.path === '/customer' }"
        :href="DOCS.order_packing_list.href"
      />
    </div>
    <MyWrongFileFormat id="order_packing_list"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MyWrongFileFormat from "@/components/UI/Error/MyWrongFileFormat.vue"

export default {
  name: "application-docs",
  components: {MyWrongFileFormat},
  computed:{
    ...mapGetters(["DOCS", "WRONG_FILE"])
  },

  methods:{
    ...mapActions(["UPLOAD_DOCS", "GET_FILE_FROM_SERVER", "UPLOAD_DOCS_DRAG"]),

    async uploadDocs(event) {
      this.UPLOAD_DOCS(event)
      .catch(() => event.target.value = '')
    },

    dropDocument(event) {
        this.UPLOAD_DOCS_DRAG(event)
          .then(() => this.showBigPreloader = false)
      }
  },

  mounted() {
    const orderId = this.$route.params.id
    this.GET_FILE_FROM_SERVER({orderId, inputId: 'order_invoice'})
    this.GET_FILE_FROM_SERVER({orderId, inputId: 'order_packing_list'})
  }
}
</script>

<style lang="scss" scoped>
.applicationDocsComp {
  @include download-bottom;
  position: relative;
}

.download__box-bottom{
  @include download__box-bottom
}
.download__input{
 @include download__input
}

.wrong_format{
  color: red !important;
  @include note;
  margin-top: 2rem;
  position: absolute;
  top: 164px;
  background: antiquewhite;
  padding: 10px 2rem;
  border-radius: 10px;
  z-index: 3;
}
.slide-in-right {
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.disabled{
  @include disabled;
  // cursor: not-allowed !important;
}



</style>