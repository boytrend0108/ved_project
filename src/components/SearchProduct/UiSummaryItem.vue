<template>
  <div class="item-box" :id="id" >
      <h2 class="item__name" > {{ title }}</h2>
      <div class="answer-wr">
        <p class="item__value" >{{ value }}</p>
        <font-awesome-icon 
          icon="pen-to-square" 
          class="icon-edit" 
          v-if="showEditBtn" 
        /> 
      </div> 
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

  export default {
    name: 'ui-summary-item',
    props:{ 
      title: String,
      value: [ String, Boolean, Number ],
      id: String
    },

    computed: {
      showEditBtn() {
      if (this.$route.path === "/search_product/") return true
      else return this.$route.query.status === "UNPUBLISHED" ? true : false
    },
    },

    methods: {
      ...mapMutations(["SHOW_DIALOG", "SET_SELECTED_ID"]),
      
      edit() {
        this.SET_SELECTED_ID(this.id)
        this.SHOW_DIALOG()
      }
    }
  }
</script>

<style lang="scss" scoped>

.wr {
  @include flex(row, space-between, center, 0);
  width: 100%;
}

.icon-edit {
  @include icon-edit;
  margin-right: 20px !important;
}

.answer-wr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
}

.icon-edit {
  min-width: 20px;
  min-height: 20px;
  color: $main-color;
  cursor: pointer;
}

.item-box{
  @include flex(column, flex-start, flex-start, 3px);
  border-bottom: 2px solid #ECF0F3;
  width: 100%;
  cursor: pointer;

  @media (max-width: 600px) {
   padding: 2rem 0;
  }
}
.item__name{
  @include font(14px, 500, inherit);
  line-height: 21px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    margin-top: 0;
  }
}
.item__value{
  @include font(14px, 600, $font-color2);
  line-height: 21px;
  text-align: left;
  overflow-wrap: break-word;
}



</style>