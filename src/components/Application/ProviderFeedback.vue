<template>
  <div class="providerFeedback">
 
    <div class="wrapper">
      <h2 class="title"> {{ offer.name }} </h2>
      <img v-if="showRedDot" src="@/assets/images/icons/red_dot.svg" alt="отклик" >
    </div>
   
    <div class="direction">
      <p class="address__el_down">{{ offer.from_country }}</p> 
      <font-awesome-icon icon="fa-solid fa-arrow-right" />
      <p class="address__el_down"> {{ offer.to_city }}</p>
    </div>
    <hr class="hr">
    <my-chat-item :msg="offer.last_message" /> 
    <hr class="hr">  
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'provider-feedback',
   
    props:{
      offer:{
        type: Object
      }
    },
  
    computed:{ 
      ...mapGetters([
        'DOCS', "NEW_OFFER_IN_PROGRESS"
      ]),

      time() {
        return this.offer.last_message_date.split("T")[1].slice(0, 5)
      },

      showRedDot() {
        if (!this.NEW_OFFER_IN_PROGRESS) return 
        if (this.NEW_OFFER_IN_PROGRESS.includes(this.offer.offer_id)) return true
        return false
      }
    },

    methods:{
      ...mapActions([
        'GET_AVATAR_FROM_SERVER', 'GET_CUSTOMER_ORDER_BY_ID'
      ])
    }, 
  }
</script>



<style lang="scss" scoped>

.wrapper {
  @include flex(row, flex-start, center, 1rem)
}

.wrapper img {
  margin-bottom: 1rem;
}

.title{
  @include font(2rem, 600, $font-color2);
  line-height: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    @include font(17px, 600, $font-color2);
    line-height: 23px;
  }
}

.providerFeedback{
  @include flex(column, center, flex-start, 0);
  padding: 2rem 50px;
  background: #FFFF;
  cursor: pointer;
  max-width: 495px;

  @media (max-width: 600px) {
    padding: 1rem;
    max-width: 93vw;
  }
}
.direction{
  @include flex(row, center, center, 13px)
}

.address__el_down {
  @include font(1.4rem, 500,#244156) ;
}

.hr{
  @include hr;
  margin: 2rem 0;

  @media (max-width: 600px) {
    margin: 1rem 0;
  }
}

</style>
