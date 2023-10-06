<template>
  <form  class="customerFeedback" >
    <h2 class="form-title"> Оцените работу специалиста </h2>
    <my-note :note="note"/>
    <textarea class="msg" placeholder="Отзыв" v-model="msg" />
    <div class="rating">
      <p class="rating_stars">Ваша оценка</p>
      <my-rating class="rating_stars" @rating="setRating"/>
    </div>
    <my-blue-btn 
      class="btn" 
      @click.prevent="sendCustomerFeedback"
      :disable="isBtnDisable"
      :class="{'disabled': isBtnDisable}"> Отправить </my-blue-btn>
      <my-semipolar-spinner v-if="showPreloader" style="margin: 20px auto"/>
  </form>
</template>

<script >
import MyRating from "@/components/UI/MyRating.vue"
import axios from "@/api/axios";
import { ref, computed} from 'vue';
import { mapGetters } from 'vuex';


export default {
  name: "customer-feedback-form",
  components: { MyRating },
  props: {
    user_id: [String, Number]
  },
  computed: {
    ...mapGetters(["CURRENT_USER"])
  },

  setup(props, ctx) {
    // defineEmits(['feedback'])
    let msg = ref('')
    let rating = ref(0)
    let showPreloader = ref(false)
    const note = ref("Помогите нам улучшить сервис — оставьте отзыв о работе специалиста")

    function setRating(score) {
      rating = score
      isBtnDisable = false
    }

    async function sendCustomerFeedback() {
      showPreloader.value = true
      try {
         await axios({
          method: "post",
          url: "/review/user",
          data: {
           "user_id":props.user_id,
            "grade": rating,
            "review": msg.value
          } 
        })
        console.log("Oтзыв отправлен")
        ctx.emit('feedback')
        showPreloader.value= false
      } catch (err) {
        console.log(err, "Ошибка отправки ордера")
      }
    }
    
    let isBtnDisable = computed(() => {
      if (msg.value || rating.value) return false
      else return true
    })
    return {note, msg, rating, setRating, sendCustomerFeedback, isBtnDisable, showPreloader}
  }
}



</script>

<style lang="scss" scoped>

.disabled {
  @include disabled;
}

.rating_stars {
  margin-top: 20px;
}

.btn {
  margin-top: 45px;
}

.rating_stars {
  @include font (17px, 600, $font-color2);
}

.rating_stars {
  margin-top: 20px;
}

.rating {
  @include flex(row, flex-start, center, 10px);
}

.customerFeedback {
  @include form;
}
.form-title {
@include title_h2;
margin-bottom: 20px;
}

.msg {
  @include text-area;
  margin-top: 40px;
}

::placeholder {
  @include placeholder;
}
</style>