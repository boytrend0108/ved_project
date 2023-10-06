<template>
  <div class="wrapper" v-if="DOCS.images.files.length || DOCS.images.href.length">

    <transition-group name="list" appear>
        <div 
          class="top"   
          :class="box_style" 
          v-for="(el, index) in DOCS.images.href" 
          :key="index" 
          :id="index"
        >
          <button class="delete-btn" @click="deleteItem($event)">
            <font-awesome-icon 
              icon="fa-solid fa-xmark" 
              v-if="showDeleteBtn"  
            /></button> 
          <img :src="`${el}`" alt="file" :class="img_style">
      </div>
    </transition-group> 

    <transition-group name="list" appear>
      <div   
        :class="box_style" 
        class="bottom"
        v-for="(el, index) in DOCS.images.files" 
        :key="index" 
        :id="index">
        <button class="delete-btn" @click="deleteItem($event)">
          <font-awesome-icon 
            icon="fa-solid fa-xmark" 
            v-if="this.$route.path !== '/customer'" 
          /></button> 
        <img  v-if="showImg(el, index)" :src="`${el}`" alt="file" :class="img_style">
        <div v-else>
          <img src="@/assets/images/icons/file.svg" alt="file">
          <p class="item-title"> {{ DOCS.images.name[index]}} </p>
        </div>
      </div>
    </transition-group>
  </div>
</template>
  
<script>
import { mapMutations, mapGetters} from "vuex"
  export default {
    name: "my-uploaded-foto",
   
    computed:{
      ...mapGetters([
        "DOCS"
      ]),

      box_style() {
        if (this.$route.name === "provider-chat" || this.$route.name === "customer-chat") { 
          return "download__item_chat"
        } else return "download__item"
      },

      img_style() {
        if (this.$route.name === "provider-chat" || this.$route.name === "customer-chat") { 
          return "img_chat"
        } else return "img"
      },

      showDeleteBtn() {
        if (this.$route.path === '/new-application') return true
         else return false
    },
  },

  methods:{
      ...mapMutations(
      ['SET_IMAGE']
      ),

      showImg(el, index) {
        const file_format = el.toString().split(":")[1].slice(0, 5)
        let file_format2 = null;
        if(this.DOCS.images.name[index]) {
           file_format2 = this.DOCS.images.name[index].split(".").pop()
        }
       
        const validFormats = ['image', "jpeg", "png", "gif", "jpg"]
        // if (file_format === "image" || file_format2 === "jpeg" || file_format2 === "png" ) return true
        if (validFormats.includes(file_format) || validFormats.includes(file_format2) ) return true
          else return false
      },

      deleteItem(event) {
        let item = event.target.closest('.download__item')
        if (!item) item = event.target.closest('.download__item_chat')
        const id = item.attributes.id
        // item.classList.add('removing')
        setTimeout(()=>{
            // item.classList.remove('removing')
            this.SET_IMAGE({file:id, type: "delete"})
        }, 300)   
      },

    },

    watch: {
      DOCS:{
        handler(newValue) {
          if(this.$route.name === "provider-chat" || this.$route.name === "cutomer-chat") {
            if (newValue.images.files.length) {
              setTimeout(() => {
              window.scrollTo(0, 1000)
              }, 1000)
              
            }
          }
        },
          deep: true
        }
    }

  }
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2.2rem;

}
.download__item{
  position: relative;
   width: 16rem;
   height: 16rem;
   background-color: #EEEEF0;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 1rem;
   display: flex;
   flex-direction: column;
   margin-right: 1.5rem;
   margin-bottom: 1.5rem;

   @media (max-width: 600px) {
    height: 8rem;
    width: 8rem;
    margin: 0;
   }
}

.download__item_chat {
  position: relative;
   width: 10rem;
   height: 10rem;
   background-color: #EEEEF0;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 1rem;
   display: flex;
   flex-direction: column;
   margin-right: 1.5rem;
   margin-bottom: 1.5rem;

   @media (max-width: 600px) {
    height: 8rem;
    width: 8rem;
   }
}


.img {
  width: 16rem;
  height: 16rem;

  @media (max-width: 600px) {
    height: 8rem;
    width: 8rem;
   }
}




.download__item.removing{
  transform:scale(0);
  transition: transform .3s
}

.delete-btn{
  border: none;
}

.fa-xmark {
  font-size: 2rem;
  color: $main-color;
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}

.item-title{
  font-size: 1.5rem;
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img_chat {
  width: 10rem;
  height: 10rem;

  @media (max-width: 600px) {
    height: 10rem;
    width: 10rem;
   }
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.list-enter-active,
.list-leave-active  {
  transition: all 1s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.5);
}


.list-move {
  transition: all 1s ease;
}

</style>