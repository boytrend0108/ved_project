<template>
  <div class="feedbacks">
    <h1 class="title">Mои заявки</h1>
    <div class="fiters" @click="SHOW_DIALOG">Фильтры</div>
    <div class="noOffers" v-if="show_note && !filteredOffers.length">
      <p class="text" v-if="$route.query.status === 'completed'">У вас ещё нет завершенных заявок</p>
      <p class="text" v-else >У вас ещё нет откликов</p>
      <my-blue-btn 
        @click="this.$router.push('/provider/search/')"
      >Найти заказ
      </my-blue-btn>
    </div> 

    <ul class="offersStatus">
      <li 
        class="offersStatus__li" 
        :class="{ active: this.$route.query.status === 'pending' }"
        @click="getOffers('pending')" 
        >
        Отклики
      </li> 

      <li 
          :class="{ active: this.$route.query.status === 'in_progress' }"
          @click="getOffers('in_progress')" 
          class="offersStatus__li">
          В работе
          <img v-if="NEW_OFFER_IN_PROGRESS?.length" src="@/assets/images/icons/red_dot.svg" alt="отклик" >
        </li>
      <li 
        :class="{active: this.$route.query.status === 'completed'}"
        @click="getOffers('completed')" 
        class="offersStatus__li">Завершенные</li>
    </ul>

      <my-big-spinner v-if="!filteredOffers.length && show_preloader"/>

      
      <transition-group v-else name="list">
        <provider-feedback 
          v-for="(offer, i) in filteredOffers"  
          :key="i"
          :offer="offer"
          class="providerFeedback"
          @click="goToOrder(offer)"
        />
      </transition-group>
      

    <my-dialog v-if="DIALOG">
      <div class="wr">
        <div class="filter__header">
          <p class="filter__text">Фильтры</p>
          <p class="filter__text clean" @click="clearData = true">Очистить</p>
        </div>
        <feedback-filter :clearData="clearData" class="feedbackFilter"/>
      </div>
    </my-dialog>

   <div class="target"></div>
  </div>
</template>

<script>
import FeedbackFilter from "@/components/Filter/FeedbackFilter.vue";
import { mapActions, mapGetters, mapMutations } from "vuex"
import ProviderFeedback from "@/components/Application/ProviderFeedback.vue"

  export default{
    name: "provider-feedbacks",
    components: { ProviderFeedback, FeedbackFilter },
    data(){
      return{
        myOffers: [],
        filter_by_country:[],
        filter_by_city:[],
        show_preloader: Boolean,
        show_note:false, 
        clearData: Boolean,
        order_status: "pending",
      }
    },

    computed:{
      ...mapGetters([
        "FILTER_FEEDBACK_COUNTRY", "FILTER_FEEDBACK_CITY", "DIALOG", "PAGE", "NEW_OFFER_IN_PROGRESS"
      ]),

      filteredOffers() {
      return [...this.myOffers]
        .filter(el => el.to_city.toLowerCase().includes(this.FILTER_FEEDBACK_CITY.toLowerCase()) &&
          el.from_country.toLowerCase().includes(this.FILTER_FEEDBACK_COUNTRY.toLowerCase()))
      }
    },

    methods: {
      ...mapActions([ 
      "GET_ORDERS_FOR_PROVIDER"
      ]),
      ...mapMutations([
        "SHOW_DIALOG", "SET_PAGE", "SET_NEW_OFFER_IN_PROGRESS"
      ]), 
 
      goToOrder(offer){
        this.$router.push(`/provider/application/${offer.id}?status=${offer.status}&feedback=true&offer_id=${offer.offer_id}`)
      },

     async getOffers(order_status){
        this.SET_PAGE(true)
        this.order_status = order_status
        this.show_preloader = true
         //подгружаем существующие отклики.
        this.GET_ORDERS_FOR_PROVIDER({status: order_status, page_size: "10", page: this.PAGE}) 
        .then(res => {
          this.myOffers= res
          this.$router.push({query:{status:order_status}})
          console.log(this.$route.query.status)
          this.show_note = this.filteredOffers.length ? false : true
          this.show_preloader =  false 
          return res
        })
        .then(res => {
          setTimeout(() => {
            if (this.$route.query.status === "in_progress") localStorage.setItem("lastOffer", res[0].offer_id)
          }, 1000)
        })
      } 
    },
  
    mounted(){
      this.show_preloader = true
      this.$router.push({query:{status:"pending"}})
      this.SET_PAGE(true)
      //подгружаем существующие отклики.
      this.GET_ORDERS_FOR_PROVIDER({status: this.order_status, page_size: "10", page: this.PAGE}) 
        .then(res => {
          this.myOffers = res
          this.show_note = this.filteredOffers.length ? false : true
          this.show_preloader =  false 
        })
        .then(() => {
          let options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        };

        let callback = (entries) => {
         entries.forEach((entry) => {
          if(entry.isIntersecting) {
            console.log("entry >>>>")
            this.SET_PAGE() // ПРИБАВЛЯЕМ К СТРАНИЦЕ 1
            this.GET_ORDERS_FOR_PROVIDER({status: this.order_status, page_size: "10", page: this.PAGE}) 
              .then(res => {
                this.myOffers = [...this.myOffers, ...res ]        
              })
          }    
          });
        };

        let observer = new IntersectionObserver(callback, options);
        let target = document.querySelector(".target");
        if (target) observer.observe(target);
        
        })

        // отслеживаем новые отклики от заказчика
        this.GET_ORDERS_FOR_PROVIDER({ status: "in_progress", page: 0 })
          .then(res => {
            debugger
            res.forEach(el => {
              if (el.offer_id > localStorage.getItem('lastOffer')) {
                this.SET_NEW_OFFER_IN_PROGRESS({ data: el.offer_id, action: "add" })
              }
            })
      
      })
  
    }
   
  }

</script>
 
<style lang="scss" scoped>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(3rem);
}

.feedbackFilter {
  width: 100%;
}
.wr {
  @include flex (column, flex-start, center, 0 );
  width: 100%;
}

.target{
  width: 100%;
  height: 50px;
  // background-color: aquamarine
}

.filter__header{
  @include flex(row, space-evenly, center, 1.5rem);
  padding: 1.5rem;
  @include font(1.4rem, 500, $font-color2);
  border-bottom: 1px solid #D9E1E7;
  width: 100%;

  @media (min-width: 600px) {
    display: none;
  }
}

.filter__text{
  @include font(1.7rem, 600, $font-color2);
  line-height: 23px;
}

.clean{
    color: $main-color;

    &::before{
      content: url("@/assets/images/icons/trash_blue.png");
      position: relative;
      top: 3px;
      padding-right: 5px;
    }
  }


.fiters{
  @include font(1.4rem, 600, $main-color);
  line-height: 1.9rem;
  text-align: left;
  display: flex;
  gap: 5px;

  &::before{
   content: url("@/assets/images/icons/filers_mob.png");
}

  @media (min-width: 600px) {
    display: none;
  }

}

  .note{
  @include font (1.7rem, 600, #339DFF);  
  margin: 120px auto; 
}

.preloader{
  margin-top: 40%;
  margin-left: 50%;
}

.providerFeedback{
   margin-bottom: 2rem;
} 

.offersStatus{
  @include flex(row, flex-start, center, 2rem);
  list-style-type: none;
  margin-bottom: 4.5rem;
  margin-top: 4.5rem;

  @media (max-width: 600px) {
    gap: 6px;
    margin-top: 2rem;
  }

  .offersStatus__li{
    @include font(1.4rem, 500, $font-color2);
    @include flex(row, center, center, 1rem);
    line-height: 2.1rem;
    width: 112px;
    height: 37px;
    // background: #EEEEF0;
    border-radius: 1rem;
    cursor: pointer;

    @media (max-width:600px) {
      width: max-content;
      padding: .7rem 1rem;
    }
  }

 .active{
     background: #EEEEF0;
  }
}
.title{
  @include title_h2;
}
.text{
  @include font(1.7rem, 500, $font-color2);
  line-height: 2.6rem;
  text-align: left;
  margin: 2rem 0;
}

</style>