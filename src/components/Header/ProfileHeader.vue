<template>
  <div class="profileHeader">
    <input 
      v-if="innerWidth > 600"
      type="file" 
      id="upload-user-pic"
      @change="uploadAvatar($event)" 
      class="hidden"
    >
    <label class="img" for="upload-user-pic" @click="showDropdownFn">
      <img 
        v-if="DOCS.upload_user_pic.href || DOCS.upload_user_pic.file"
        :src="src" 
        alt="avatar" 
        class="avatar">
      <div class="background"></div>
      <img src="@/assets/images/icons/camera.svg" alt="camera" class="icon">
    </label>
    <ul ref="dropdown" v-if="showDropdown" class="dropdown swing-in-top-fwd">
       <li class="dropdown-li">
        <input
          type="file" 
          id="upload-user-pic-mobile"
          @change="uploadAvatar($event)" 
          class="hidden"
        >
        <label for="upload-user-pic-mobile" class="dropdown-li upload">
          Загрузить с устройства
        </label>
        </li>

       <hr class="hr">

       <li class="dropdown-li">
        <input 
          type="file" 
          capture="camera" 
          accept="image/*" 
          class="hidden"
          @change="uploadAvatar($event)"
          id="takePictureField">
        <label for="takePictureField" class="dropdown-li upload">
          Сделать фото
        </label>
        </li>
    </ul>
    <div class="user">
      <p class="name"> {{ USER_NAME }}</p>
      <p class="since">На сервисе с {{ yearOfCreated }}</p>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'profile-header',
    data() {
      return {
        innerWidth: window.innerWidth,
        showDropdown: false,
      }
    },
    computed:{
      ...mapGetters([
        'USER_NAME','USER_CREATED_DATE', 'DOCS'
      ]),

      yearOfCreated(){
        const date = this.USER_CREATED_DATE.split('-')
        return date[0] + " года"
      },
 
      src(){
        if(this.DOCS.upload_user_pic.href) return this.DOCS.upload_user_pic.href
         else {
         return this.DOCS.upload_user_pic.file ? this.DOCS.upload_user_pic.file : require('@/assets/images/icons/user.svg')
         } 
      }
    },

    methods:{
      ...mapActions([
        'UPLOAD_DOCS', 'UPLOAD_AVATAR_TO_SERVER', 'GET_AVATAR_FROM_SERVER'
      ]),

    async uploadAvatar(event){
       await this.UPLOAD_DOCS(event) //constactsAndPayments.js
          .then(()=>{
             this.UPLOAD_AVATAR_TO_SERVER() // userProfile.js
          })
      },

      showDropdownFn() {
      if(this.innerWidth > 600 ) return 
      if(!this.showDropdown) {
        this.showDropdown = true
      } else {
        this.$refs.dropdown.classList.remove('swing-in-top-fwd')
        this.$refs.dropdown.classList.add('swing-out-top-bck')
        setTimeout(() => {
          this.showDropdown = false
        }, 400)
      }
    },
    },

  
    mounted(){
      this.GET_AVATAR_FROM_SERVER() 
    }
    
  }
</script>

<style lang="scss" scoped>

.upload::before{
  content: url('@/assets/images/icons/upload_img_mobile.png');
  top: 2px;
  position: relative;
  left: -6px;  
}

.photo::before{
  content: url('@/assets/images/icons/camera_mobile.png');
  top: 2px;
  position: relative;
  left: -6px;  
}

.hr{
  border: 1px solid #D9E1E7;
  width: 100%;
}

.dropdown{
  position: absolute;
  bottom: -8.5rem;
  width: 272px;
  background-color: #FFFF;
  box-shadow: 0px .5rem 20px rgba(6, 21, 43, 0.15);
  border-radius: .5rem;
  @include flex(column, center, flex-start, 0px);
  list-style-type: none;
}

.dropdown-li{
  @include font(14px, 500, #416782);
  line-height: 19px;
  padding: 1rem 1rem;
}

.background{
    background-color: gray;
    opacity: 51%;
    width: 90px;
    height: 90px;
    position: absolute;
    border-radius: 50%;
     
  @media (max-width:600px) {
    width: 70px;
    height: 70px;
  }
}
.avatar{
  width: 100px;
  position: relative;
}

.hidden{
  @include download__input;
}

.icon{
  width: 3.5rem;
  position: absolute;
  z-index: 2;
}
.fa-camera{
  color:#FFFF;
}

.profileHeader{
  @include flex(row, flex-start, center, 3rem);
  position: relative;
  margin-bottom: 4.5rem;

  @media (max-width:600px) {
   margin-bottom: 3rem;
  }
}

.img{
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(0deg, rgba(6, 21, 43, 0.5), rgba(6, 21, 43, 0.5));
  background-size: cover;
  @include flex(row, center, center, 0);
  cursor: pointer;
  overflow: hidden;

  @media (max-width:600px) {
    width: 70px;
    height: 70px;
  }
}

.user{
  @include flex(column, flex-start, flex-start, 3px);
}

.name{
  @include font(20px, 600, #244156);
  line-height: 3rem;

  @media (max-width: 600px) {
    @include font(17px, 600, #244156);
    line-height: 23px;
  }
}

.since{
  @include font(14px, 500, #416782);
  line-height: 16px;

  @media (max-width:600px) {
    @include font(1.3rem, 500, #416782);
  };
}

.swing-in-top-fwd {
	-webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
	animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;

@-webkit-keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
}
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
}

}

.swing-out-top-bck {
	-webkit-animation: swing-out-top-bck 0.45s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
	animation: swing-out-top-bck 0.45s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;

@-webkit-keyframes swing-out-top-bck {
  0% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
}
@keyframes swing-out-top-bck {
  0% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
}

}


</style>