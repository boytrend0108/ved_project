<template>
  <div class="download-bottom">
      <h3 class="ariaTitle">Инвойс</h3>
      <!--Загруженний инвойс--> 
      <div class="download__box-bottom">
        <div class="wrapper">
            <div  class="downloadAria-done disable " v-if="!DOCS.order_invoice.href" >
              <div>
                <img src="@/assets/images/icons/file.svg" alt="file">
                <p class="inputTitle"> Инвойс не загружен</p>
              </div>
            </div>

            <a 
              :href="DOCS.order_invoice.href" 
              target="_blank"
              :download="`Инвойс для заявки № ${this.$route.params.id}.${ DOCS.order_invoice.ext}`" 
              class="link downloadAria-done"
              v-else
            >  
              <div id="order_invoice">
                <div>
                  <img src="@/assets/images/icons/file.svg" alt="file">
                  <p class="inputTitle"> {{ DOCS.order_invoice.name }} </p>
                </div>
              </div>
            </a>
          
          </div>
        </div>

      <!--Загрузка упаковочного листа--> 
    <div class="download-bottom">
      <h3 class="ariaTitle">Упаковочный лист</h3>
      <!--Загруженний инвойс-->
      <div class="download__box-bottom">
        <div class="wrapper">
            <div  class="downloadAria-done  disable" v-if="!DOCS.order_packing_list.href" >
              <div> 
                <img src="@/assets/images/icons/file.svg" alt="file">
                <p class="inputTitle"> Упаковочный лист не загружен</p>
              </div>
            </div>

          
              <a 
                :href="DOCS.order_packing_list.href" 
                target="_blank"
                :download="`Упаковочный лист для заявки № ${this.$route.params.id}.${ DOCS.order_packing_list.ext}`"
                class="link downloadAria-done " 
                v-else
              >   
                <div id="order_packing_list"> 
                <div>
                  <img src="@/assets/images/icons/file.svg" alt="file">
                  <p class="inputTitle"> {{ DOCS.order_packing_list.name }} </p>
                </div>
              </div>
            </a>
            
          </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { onBeforeRouteLeave } from 'vue-router'
import store from '@/store'
import { mapActions, mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'application-download-invoice-and-plist',
    computed: {
      ...mapGetters([
        "DOCS", "SITE_ROLE"
      ]),
    },
    
    methods: {
      ...mapMutations([
        'SHOW_DIALOG', 'SET_CLEAR_INVOICE_AND_PLIST', 'SET_SHOW_PDF_VIEWER'
      ]),
      ...mapActions([
        'GET_FILE_FROM_SERVER'
      ]),


    },

    setup(){
      onBeforeRouteLeave(() => {
        store.commit('SET_CLEAR_INVOICE_AND_PLIST')
      })
    },

  mounted(){
    //- загружаем документы(кроме image)---------------------------------- ------
    const orderId = this.$route.params.id
    this.GET_FILE_FROM_SERVER({orderId, inputId: 'order_invoice'})
    this.GET_FILE_FROM_SERVER({orderId, inputId: 'order_packing_list'})
  }
}
</script>

<style lang="scss" scoped>

.disable{
  cursor: not-allowed !important;
}
  .ariaTitle {
  font-weight: 600;
  font-size: 2rem;
  line-height: 30px;
  color: #244156;
  text-align: left;
  text-transform: capitalize;

  @media (max-width: 600px) {
    @include font(17px , 600, $font-color2);
    line-height: 23px;
    padding-top: 1.5em;
    border-top: 1px solid #ECF0F3;
  }
}

.inputTitle {
 @include inputTitle
}

.downloadAria-done {
 @include downloadAria-done;
 cursor: pointer;
}
.link {
 @include flex(row, center, center, 0);
}


.download__box{
 @include download__box
}
.download__box-bottom{
  @include download__box-bottom
}


.download__box{
 @include download__box
}

.download-bottom{
  @include download-bottom;
  flex-direction:column;
  margin-top: 0;
}


</style>