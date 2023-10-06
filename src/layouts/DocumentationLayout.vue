<template>
  <div class="documentation-layout">
    <header-main />
    <div class="container">
      <aside class="side-bar">
        <h3 class="side-bar__nav">Документация</h3>
        <ul 
          class="side-bar__ul" 
          v-if="this.$route.path !== '/customer/my_applications'"
        > 
          <div class="li_wr" v-if="this.$route.path !== '/customer/profile'">
              <li 
                class="side-bar__li " 
                :class="{'active': this.$route.path === `/customer/customer_order/${this.$route.params.id}`}"  
               
              >
              <img 
               src="@/assets/images/icons/right_triangle.png" 
               alt="Oбучение ВЭД"
               class="icon"
              >
              Обучение ВЭД
              </li>
            
              <li 
                class="side-bar__li"
                :class="{'active': this.$route.query.article === 'product-search'}"
                @click="this.$router.push({query: {article: 'product-search'}})"
              >
                <img 
                src="@/assets/images/icons/right_triangle.png" 
                alt="Oбучение ВЭД"
                class="icon"
                >
                Поиск товара
              </li>

              <li 
                class="side-bar__li "
                :class="{'active': this.$route.path === `/customer/bills/${this.$route.params.id}`,
                        'disabled': this.$route.params.id === `0`}" 
                @click="showDropdown = !showDropdown"
              >
                <div class="arrowBox">
                  <img 
                    v-if="!showDropdown"
                    src="@/assets/images/icons/right_triangle.png" 
                    alt="Oбучение ВЭД"
                    class="icon"
                    >
                  <img 
                    v-if="showDropdown"
                    src="@/assets/images/icons/down_triangle.png" 
                    alt="Oбучение ВЭД"
                    class="icon"
                  >
                </div>
                
                  Заключение контракта и оплата
              </li>
              <ul 
                class="dropDown  tilt-in-left-1" 
                v-if="showDropdown" 
              >
                <li class="side-bar__li dropDown__li">Шаблоны контрактов</li>
                <li class="side-bar__li dropDown__li">Инструкция по оплате</li>
              </ul>
          </div>
        </ul>
      </aside>

      <main class="main-box">
        <router-view />
      </main>
    </div>
 
    <hr class="hr">
    <main-footer  />
   
  </div>
 
</template>

<script>
import MainFooter from "@/components/MainFooter.vue";
import HeaderMain from "@/components/Header/HeaderMain.vue"
export default {
  components: { HeaderMain, MainFooter}, 
  name:'documentation-layout',
  data(){
    return{
      showDropdown: false,
    }
  },
}

</script>

<style lang="scss" scoped>
.documentation-layout {
  background-color: #F5F5F7;
}
.hr{
  @include hr;
  margin-bottom: 0;
  margin-top: 120px;
}

.footer{
  padding: 45px 0;
}

.side-bar__nav{
  @include font (17px, 600, $font-color2);
  line-height: 26px;
  padding: 0 0 20px 34px;
  text-align: left
}
.arrowBox{
  @include flex(column, center, center, 0);
  width: 5px;
}

.dropDown__li{
  padding-left: 70px !important;
}

.li_wr{
  width: 100%;
}

.profile-li{
  @include flex(column, flex-start, flex-start, 0px);
  width: 100%;
}

.container {
  display: flex;
  margin: 0 auto;
  padding: 0 2rem;
  margin: 0 auto;

  @media (max-width:600px) {
    padding: 0 15px;
   }
}

.main-box{
  padding: 6rem 0 0  8.2rem;
  flex-grow: 1;

  @media (max-width: 600px) {
    padding: 30px 0;
  }
}
.side-bar{
  margin-top: 6rem;
  min-width:  285px;
  // height: 100vh;

  @media (max-width: 600px) {
    display: none;
  }
  .side-bar__ul{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style-type:none;
    @include font(17px, 600, $font-color2);
    line-height: 26px;
    overflow: hidden;
  }

  .side-bar__li {
    @include font(14px, 600, $font-color2 );
    line-height: 21px;
    padding: 8px 0 8px 17px;
    cursor: pointer;
    text-align: left;
    border-radius: 1rem;
    @include flex (row, flex-start, center, 10px);
  }
  .active{
    background-color: #EEEEF0;
    border-radius: 10px;
  }

  .disabled{
    @include disabled;
  }
}

.tilt-in-left-1{
	-webkit-animation: tilt-in-left-1 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: tilt-in-left-1 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  
   @-webkit-keyframes tilt-in-left-1 {
      0% {
        -webkit-transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
                transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
                transform: rotateX(0deg) translateX(0) skewX(0deg);
        opacity: 1;
      }
    }
    @keyframes tilt-in-left-1 {
      0% {
        -webkit-transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
                transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
                transform: rotateX(0deg) translateX(0) skewX(0deg);
        opacity: 1;
      }
    }
}

</style>