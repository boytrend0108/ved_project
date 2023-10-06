 <template>
   <div   
     class="uploadFoto"
     :class="{disabled: this.$route.path === '/customer', cursor: this.$route.path !== '/customer' }"
   >
      <p class="uploadFoto__note" 
        v-if="this.$route.path === '/customer/new-application' || this.$route.path === '/cost-calculation/' || this.$route.path === '/search_product/'"
      > Если есть фото товаров, загрузите их сюда </p>
     
      <transition name="slide"> 
        <p  
          class="uploadFoto__note warning" 
          v-if="WRONG_FILE_IMG"
        >Неверный формат файла {{ WRONG_FILE_IMG }}. Доступные форматы png/jpg/jpeg</p>
      </transition>
      

      <div class="uploadFoto__box"> 
        <my-uploaded-foto  /> 
        <input 
          id="images"    
          class="upload__input"  
          type="file"  
          @change="uploadFoto"  
          :disabled="this.$route.path === '/customer'" 
          :class="{disabled: this.$route.path === '/customer' }"
          multiple="true"
        >
        <label  
          for="images" 
          class="download__btn" 
          v-if="showInputLable" 
          @dragover.prevent
          @drop.prevent="uploadFoto"
          data-id="images"
        >
          <img src="@/assets/images/icons/plus.svg" alt="download" class="download__img">
        </label>
      </div>
    </div>
</template>

<script>
 import { mapActions, mapGetters} from 'vuex';
//--------
export default {
  name:'application-upload-foto',
  computed: {
    ...mapGetters([
      'DOCS', 'WRONG_FILE_IMG'
    ]),

    showInputLable() {
      if (this.$route.query.status === "PUBLISHED" || this.$route.query.status === "IN_PROGRESS") return false
      switch (this.$route.name) {
        case "customer-new-application": return this.DOCS.images.files.length < 5 ? true : false
        default:
          if (this.DOCS.images.href.length) return false
          if (this.DOCS.images.binaryFile.length >= 5) return false
          return true
      }
    },
  },

  methods: {
    ...mapActions([
      'UPLOAD_DOCS'
    ]),

    uploadFoto(event) {
      this.UPLOAD_DOCS(event).catch(() => event.target.value = '')
    }
  }

}
</script>

<style lang="scss" scoped>

.uploadFoto {
  width: 100%;
  @include flex (column, flex-start, flex-start, 0px);
}

.uploadFoto__note {
    @include note;
    margin-bottom: 2rem;
}

.disabled{
  cursor: not-allowed !important;
}
.cursor{
    cursor: pointer;
}
.upload__input{
 @include download__input;
}

.download__btn{
  @include download__btn
}

.download__img{ 
 @include download__img;
}

.uploadFoto__box{
  @include download__box;
  margin-top: 0;
}

.warning{
  color: red
}
.disabled{
  cursor: not-allowed !important;
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