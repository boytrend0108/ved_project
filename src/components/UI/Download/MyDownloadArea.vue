<template>
  <div 
    class="wrapper" 
    :class="{disabled: this.$route.path === '/customer', cursor: this.$route.path !== '/customer' }"
  >
    <h3 
      class="ariaTitle" 
      :class="{'warning': showWarning}"
    > {{ inputTitle }}
    </h3> 
   
     <!--Показываем когда файл НЕ загружен-->
     <transition name="switch">
        <div v-if="showBlock" class="downloadAria">
          <div>
            <img src="@/assets/images/icons/plus.svg" alt="dounload" class="download__img">
            <div class="inputTitle">`Загрузить {{ inputTitle }}`</div>
          </div>
        </div>  
     </transition>
    
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex';
  export default {
    name:'my-download-area',
    props:{
      inputTitle:{
        type: String
      },
      name:{
        type:String
      },
      showBlock:{
         type: Boolean
      }
    },
    computed:{
      ...mapGetters([
        "DOCS", 'WRONG_FILE'
      ]),
// eslint-disable-next-line
      showWarning() {
        if(this.$route.query.step !== 'check') return
        switch(this.inputTitle){
          case 'инвойс': return this.DOCS.order_invoice.name ? false : true
          case 'упаковочный лист': return this.DOCS.order_packing_list.name ? false : true
        }
      }
    },

  }
</script>

<style lang="scss" scoped>

.wrong_format{
  color: red;
  @include note;
  margin-bottom: 2rem;
}

.warning{
  background: #ffc0cb7a;
}
.disabled{
  cursor: not-allowed !important;
}
.cursor{
    cursor: pointer;
}

.wrapper{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.downloadAria { 
  max-width: 33.5rem;
  height: 15.5rem;
  border: 2px dashed #339DFF;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // cursor: pointer;
  margin-top: 2rem;

  @media (max-width: 600px) {
    height: 10rem;
    max-width: none;
  }
}

.downloadAria-done{
  max-width: 33.5rem;
  height: 15.5rem;
  background-color: #EEEEF0;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin-top: 2rem;
  position: relative;

  @media (max-width: 600px) {
    height: 10rem;
  }
}

.fa-xmark{
  font-size:6rem;
}

.download__img{ 
 @include download__img;
}

.inputTitle {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #339DFF;
}

.ariaTitle {
  @include font (2rem, 600, #244156 );
  line-height: 3rem;
  text-align: left;
  text-transform: capitalize;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 1.9rem;
  }
}

.item-title{
  font-size: 1rem;
}

.fa-xmark {
  font-size: 2rem;
  color: $main-color;
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}


.switch-enter-from,
.switch-leave-to  {
  opacity: 0;
  transform: translateX(-150px);
}

.switch-enter-active,
.switch-leave-active {
  transition: all 1s ease;
}
</style>