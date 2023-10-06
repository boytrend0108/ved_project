<!--Element for UPLOAD document -->
<template>
  <div 
    :class="{disabled: this.$route.path === '/customer', cursor: this.$route.path !== '/customer' }" 
    @mouseover="SET_INVOICE_ID(invoice_id)"
   
  >
    <label 
      :for="inputId" 
      class="download-box" 
      @drop.prevent="dropDocument"
      @dragover.prevent
      :data-id="inputId"
      >
      <my-semipolar-spinner v-if="showPreloader" />
      <img v-else src="@/assets/images/icons/plus.svg" alt="upload">
      <p class="document-name"> {{ msg }} </p>
    </label>
    <input 
      type="file"     
      :id="inputId"
      :data-invoice_id="invoice_id"   
      class="input"  
      @change="upload_docs"
    > 
      <my-big-spinner v-if="showBigPreloader" />
  </div>  

</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'my-upload-item',
  props: {
    id: {
      type: String
    },
    msg: { 
      type: String
    },
    showPreloader: {
      type: Boolean,
      default: false,
    },
    invoice_id: {
      type: [String, Number]
    }
  },

  data() {
    return {
      showBigPreloader: false, 
      invoiceId: null
    }
  },

  computed: {
    ...mapGetters(["DOCS", "SITE_ROLE", "INVOICE_ID"]),

    inputId() {
      return this.id.replace(/_/g, '-') // id не может быть с нижним подчеркиванием
    }
  },

  methods: {
    ...mapActions([
      'UPLOAD_DOCS', "UPLOAD_BILL", "UPLOAD_BILL_OR_CHECK", "UPLOAD_DOCS_DRAG"
    ]),
    ...mapMutations(["SET_INVOICE_ID"]),

    dropDocument(event) {
      this.showBigPreloader = true;
      if (this.id === "invoice") {
        this.uploadBillsOrCheck(event)
      } else {
        this.UPLOAD_DOCS_DRAG(event)
          .then(() => this.showBigPreloader = false)
      }
    },

    clickHandler() { 
      this.invoiceId = this.invoice_id
    },

    uploadBillsOrCheck(event) {
      try {
          switch (this.SITE_ROLE) {
            case "provider":
            this.UPLOAD_BILL_OR_CHECK({ event, type: "bill", order_id:this.$route.params.id })
              .then(() => this.showBigPreloader = false)
              .catch(() => {
                event.target.value = ''
                this.showBigPreloader = false} )
              break
            case "customer":
             this.UPLOAD_BILL_OR_CHECK({ event, type: "check", order_id:this.$route.params.id, invoice_id:this.INVOICE_ID })
              .then(() => this.showBigPreloader = false )
              .catch(() => {
                event.target.value = ''
                this.showBigPreloader = false} )
              break
          }
        }
        catch (err) {
          console.log(err)
          this.showBigPreloader = false
        }
    },

  async upload_docs(event) {
    this.clickHandler()
      this.showBigPreloader = true;
      if (this.id === "invoice") {
        this.uploadBillsOrCheck(event)
      } else {
         this.UPLOAD_DOCS(event)
         .then(() => setTimeout(() => { this.showBigPreloader = false }, 1000))
         .catch(() => {
          event.target.value = ''
          this.showBigPreloader = false})
      }
    }
  }, 


}
</script>

<style lang="scss" scoped>

img{
  @media (max-width: 600px) {
    width: 35px;
    padding-top: 1rem;
  }
}
.disabled{
  cursor: not-allowed !important;
}
.cursor{
    cursor: pointer;
}
.download-box {
  width: 33.5rem;
  height: 15.5rem;
  left: 71.3rem;
  top: 29.1rem;
  border-radius: 1rem;
  border: .2rem dashed #339DFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: .5rem;

  @media (max-width: 600px) {
    height: 10rem;
    width: 100%;
  }
}

.fa-download{
  font-size: 3.8rem;
  color: #339DFF;
}

.document-name {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #339DFF;
}

.document-size {
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.4rem;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
}

.input{
  @include download__input;
 
}
</style>