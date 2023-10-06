<template>
  <div class="summary__item" id="info2">
    <p class="summary__question"> Фото товара</p>
    <div v-if="images.length" class="wr">
      <img 
        v-for="image in images" 
        :key="image"  
        :src="image" 
        alt="photo" 
        class="photo"
        @click="showBigImg"
      >
      <div 
        class="foto-wr scale-in-center" 
        :class="{'scale-in-center': !this.changeClass, 'scale-out-center': this.changeClass}"
        v-if="showBig" @click="hideBigImg"
      >
        <img  :src="bigImg" alt="photo" class="photo-big">
      </div>  
    </div> 
    <p v-if="!images.length" class="warningMsg">Заказчик не загрузил фото товара</p>
    <!-- <img src="@/assets/images/smiley.png" v-if="!images.length" alt="photo2" class="photo"> -->
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'application-download-photo',
    data(){
      return{
        images: [],
        showBig: false,
        bigImg: '',
        changeClass: false
      }
    },

    computed:{
      ...mapGetters([
        'DOCS'
      ])
    },

    methods:{
      ...mapActions([
        'CHECK_IMAGE_EXIST', 
        'GET_IMAGE_FROM_SERVER'
      ]),
      ...mapMutations([
        'SET_HREF_FILE'
      ]),

      showBigImg(event){
        this.bigImg = event.target.getAttribute('src')
        this.showBig = true
      },

      hideBigImg(){
        this.changeClass = true 
        setTimeout(() => {
          this.showBig = false
          this.bigImg = null
          this.changeClass = false
        }, 300);
      }
    }, 
  
    mounted(){
      this.SET_HREF_FILE({id:'clear'}) // очищаем сторе
    // загружаем image ---------------------------------------------------------
      this.GET_IMAGE_FROM_SERVER({ orderId: this.$route.params.id, size: '640' })
        .then(() => {
          this.images = this.DOCS.images.href
        })

    }
   
  }

</script>

<style lang="scss" scoped>

.warningMsg{
@include font(17px, bold, #416782);
text-align: left;

@media (max-width: 600px) {
    @include font(1.4rem, 600, #244156);
    line-height: 19px;
  }
}
  .summary__item{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top:2px solid #ECF0F3;
  padding: 1.5em 0;
}
.summary__question {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #416782;
  margin-top: 3rem;
}

.photo{
  width: 160px;
  height: 160px;
  border: 2px dashed #339DFF;
  border-radius: 1rem;
  margin-top: 10px;
  margin-right: 2rem;

  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
}

// .photo-big{
  // width: 500px;
  // height: 500px;
  // border: 2px dashed #339DFF;
  // border-radius: 1rem;
  // margin-top: 10px;
  // margin-right: 2rem;
// }

.foto-wr{
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  @include flex(row, center, center, 0);
  z-index: 3;
  transition: 2s;
  }

  .scale-in-center {
	-webkit-animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;


@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}

}

.scale-out-center {
	-webkit-animation: scale-out-center 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	animation: scale-out-center 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;

@-webkit-keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
}
@keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
}

}
</style>