<!--Element for DOWNLOAD - СКАЧИВАНИЕ С СЕРВЕРА-->
<template>
    <a 
      :href="href" 
      :id="id" 
      class="download-box"  
      :download="fileName" 
      target="_blank"
    > 
    <my-semipolar-spinner v-if="showPreloader" />
      <img v-else  src="@/assets/images/icons/download_2.svg" alt="download" >
      <p class="document-name"> {{ type }} </p>
      <p class="document-name"> {{ fileName }} </p>
      <p v-if="href" class="document-size">150kb</p>
    </a>
    
</template> 

<script>
import { mapGetters} from 'vuex'; 
  export default {
    name:'my-download-item-from-server',
    props:{
      id:{
        type: String,
      }, 
      href:{
        type: String, 
        // required:true
      },
      type:{ 
        type: String,
      },
      fileName:{
        type: String,
        // required: true, 
      },
      showPreloader:{ 
        type: Boolean,
        default: false
      }
    },

    computed:{
      ...mapGetters([
        'DOCS', 'CURRENT_USER'
      ]),

      // fileName(){
      //   if(this.$route.path === `/${this.CURRENT_USER.site_role}/bills/${this.$route.params.id}`){
      //     return `${this.DOCS[this.id].name}`
      //   } return `${this.DOCS.templates[this.id].name}`
      // }
    },
  }
 
</script>

<style lang="scss" scoped>


img {
  @media (max-width: 600px) {
    width: 2.6rem;
  }
}

.disabled{
  @include disabled;
}
.download-box {
  width: 160px;
  height: 15.5rem;
  left: 713px;
  top: 291px;
  background: #EEEEF0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 600px) {
    width: 100%;
    height: 10rem;
  }
}

.fa-download{
  font-size: 38px;
  color: #339DFF;
}
 
.document-name {
  @include font(1.4rem, 600, #416782 );
  line-height: 2.1rem;
  text-align: center;
  width: 80%;
  overflow: hidden;
}

.document-size {
  @include font(1.2rem, 500, #416782 );
  line-height: 1.4rem;
  text-align: center;
}

.input{
  @include download__input;
}
.hidden{
 opacity: 50%;
 height: 1px;
}
</style>