<template>
  <a 
    class="wrapper" 
    :class="{'disabled':this.$route.path === '/customer', cursor: this.$route.path !== '/customer'}"
    :href="href"
    target="_blank"
  >
  <transition name="switch">
    <div v-if="!showBlock" class="downloadAria-done">
      <font-awesome-icon 
        icon="fa-solid fa-xmark"  
        @click="deleteItem()"
        v-if="showDeleteBtn"
      />
      <div>
        <img src="@/assets/images/icons/file.svg" alt="file">
         <p class="item-title"> {{ cuttedName }} </p>
      </div>
    </div>
  </transition>
  </a>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
  export default {
    name:'my-downloaded-area',
    props:{
      inputTitle:{
        type: String
      },
      name:{
        type:String
      },
      showBlock:{
         type: Boolean
      },
      id:{
        type: String
      },
      href: String
    },
    computed:{
      ...mapGetters([
        'INVOICE', 
      ]),

      showDeleteBtn() {
        // if (this.$route.path !== '/customer') return false
        if (this.$route.query.status === "IN_PROGRESS" || this.$route.query.status === "PUBLISHED") return false
        else return true
      },

      cuttedName() {
       return this.name.length > 30 ? this.name.substring(0, 10) + "..." : this.name
      }
    },

    methods:{
      ...mapMutations([
        'SET_UPLOAD_DATA'
      ]),

      deleteItem(){
        this.SET_UPLOAD_DATA({ file: '', name:'', id:this.id})
      }
    }
  }
</script>

<style lang="scss" scoped>

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
  margin-top: 2rem;

  @media (max-width:600px) {
    margin-top: 0;
  }
}
.downloadAria {
  @include downloadAria
}

.downloadAria-done{
 @include downloadAria-done
}

.fa-xmark{
  @include fa-xmark;
}

.download__img{ 
 @include download__img;
}

.inputTitle {
 @include inputTitle
}

.ariaTitle {
 @include ariaTitle
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
  transform: scale(0.5);
}

.switch-enter-active,
.switch-leave-active {
  transition: all 1s ease;
}
</style>