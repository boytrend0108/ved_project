<template>
  <div class="serviceDetailsBg">
    <div class="top">
      <div class="title">{{ title }}</div>
      <hr class="hr" v-if="innerWidth < 600"> 
      <p class="subtitle">Услуга включает</p>
      <slot name="header"></slot>
      <hr class="hr">
      <p class="subtitle2">Кому подходит</p>
      <slot name="footer"></slot> 
    </div>
    <div class="btn-box" v-if="this.btn !== 'Далее'" >
      <button 
        class="btn-blue" 
        ref="btn"
        @click="clickHandler"
      >{{ btn }}</button>
      <div class="price">{{ price }}</div>
    </div>
    <my-warning v-if="showWarning" :warning="warning" class="warning"/>
  </div>
</template> 

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'service-ditails-bg',
    props:{
      title:{
        type:String
      },
      btn:{
        type:String
      },
      price:{
        type:String
      }
    },

    data() {
      return {
        innerWidth: window.innerWidth,
        showWarning: false,
        warning: "Сначала надо добавить фирму. Сейчас вы будете перенаправленны на нужную страницу",
      }
    },

    computed: {
      ...mapGetters(["CURRENT_USER", "FID", "TOKEN"]),
    },

    methods:{
      ...mapMutations(["SHOW_DIALOG"]),

      firmValidation() {
      if (this.TOKEN && !this.FID) {
            this.showWarning = true
            setTimeout(() => {
              this.showWarning = false
              this.$router.push(`/${localStorage.getItem("site_role")}/profile`)
            }, 3000);
            return false
          } return true
    },

      clickHandler(){
         switch(this.btn){
          case 'К документам': this.$router.push('/documentation?article=product-search')
          break

          case 'Рассчитать стоимость': 
          if (!this.firmValidation()) return

            if (this.CURRENT_USER) {
                this.$router.push("/cost-calculation?step=FromWhichCountry")
              } else {
                this.SHOW_DIALOG('signin_offer')
                switch (this.$route.name) {
                  case 'home-new':  localStorage.setItem('selected_service', 'cost_calc')
                  break
                }
              }
              break
         }
      }
    },

    mounted(){
      if(this.price === "Бесплатно"){
        this.$refs.btn.classList.remove('btn-blue')
        this.$refs.btn.classList.add('btn-white')
      }
    }
 
  }
</script>

<style lang="scss" scoped>

.warning {
  margin-top: 1rem;
}

.serviceDetailsBg{
  // min-height: 575px;
  background-color: #FFFF;
  padding: 6rem ;

  @media (max-width: 600px) {
    padding: 0;
  }
}

.top{
  @include flex(column, flex-start, flex-start, 0px);

  @media (max-width: 600px) {
    padding: 2rem;
  }
}

.btn-box{
  @include flex(row, flex-start, center, 3rem);

  @media (max-width: 600px) {
    padding: 0 2rem 2rem 2rem;
    gap: 0.8rem;
    width: 100%;
    justify-content: space-between;
  }
}

.title{
  @include font(2.8rem, 600, $font-color2);
  line-height: 3.3rem;
  margin-bottom: 4.5rem;

  @media (max-width: 600px) {
    @include font(1.7rem, 600, $font-color2);
    line-height: 2.3rem;
    margin-bottom: 0px;
    text-align: left;
  }
}
.subtitle{
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.9rem;
    margin-bottom: 2rem;
    text-align: left;
  }
}
.subtitle2{
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.9rem;
    margin-bottom: 2rem;
    text-align: left;
  }
}

.price{
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;

  @media (max-width:600px) {
    @include font(1.4rem, 600, $font-color2);
    line-height: 1.9rem;
    min-width: 6rem;
  }
}

.hr{
@include hr;
}

.btn-white{
 @include myColorBtn($main-color, white,  $main-color, 1.4rem, 600, 2.1rem);
 padding: 1.2rem 3rem !important;

 @media (max-width:600px) {
    @include font(1.4rem, 600, $main-color);
    line-height: 1.9rem;
    padding: 1rem 1.5rem !important;
    height: 4rem;
    width: 100%;
  }
}

.btn-blue{
 @include myColorBtn( white, $main-color, $main-color, 1.4rem, 600, 2.1rem);
 padding: 1.2rem 3rem !important;

 @media (max-width:600px) {
    @include font(1.4rem, 600, white);
    line-height: 1.9rem;
    padding: 1.2rem 0.5rem !important;
    height: 4rem;
    width: 100%;
  }
}

</style>