<template>
  <div class="headerNavMob">
    <ul class="order__header_mob"  v-if="showNav">
      <li 
        @click="goTo"
        class="nav_li" 
        :id="SITE_ROLE === 'customer' ? 'order': 'application'"
        :class="setActive">
        <svg id="order" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2872_2997)">
            <path 
            :class="setActive" 
            d="M7.5 11.875H12.5" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path 
            :class="setActive"
            d="M7.5 9.375H12.5" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path 
            
            :class="setActive"
            d="M12.5 3.125H15.625C15.7908 3.125 15.9497 3.19085 16.0669 3.30806C16.1842 3.42527 16.25 3.58424 16.25 3.75V16.875C16.25 17.0408 16.1842 17.1997 16.0669 17.3169C15.9497 17.4342 15.7908 17.5 15.625 17.5H4.375C4.20924 17.5 4.05027 17.4342 3.93306 17.3169C3.81585 17.1997 3.75 17.0408 3.75 16.875V3.75C3.75 3.58424 3.81585 3.42527 3.93306 3.30806C4.05027 3.19085 4.20924 3.125 4.375 3.125H7.5" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path 
            :class="setActive"
            d="M6.875 5.625V5C6.875 4.1712 7.20424 3.37634 7.79029 2.79029C8.37634 2.20424 9.1712 1.875 10 1.875C10.8288 1.875 11.6237 2.20424 12.2097 2.79029C12.7958 3.37634 13.125 4.1712 13.125 5V5.625H6.875Z" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2872_2997">
              <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
        </svg>
          Заявка
      </li>

      
      <li 
        v-if="SITE_ROLE === 'customer'"
        @click="goToChats"
        class="nav_li" 
        :id="'chats'"
        :class="{'active': this.$route.name === `customer-chats`, 'disabled': this.$route.params.id === `0`}">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2964_5113)">
            <path
            :class="{'active': this.$route.name === `customer-chats`, 'disabled': this.$route.params.id === `0`}"
            d="M5.59219 11.25L2.5 13.75V3.75C2.5 3.58424 2.56585 3.42527 2.68306 3.30806C2.80027 3.19085 2.95924 3.125 3.125 3.125H13.125C13.2908 3.125 13.4497 3.19085 13.5669 3.30806C13.6842 3.42527 13.75 3.58424 13.75 3.75V10.625C13.75 10.7908 13.6842 10.9497 13.5669 11.0669C13.4497 11.1842 13.2908 11.25 13.125 11.25H5.59219Z" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path 
            :class="{'active': this.$route.name === `customer-chats`, 'disabled': this.$route.params.id === `0`}"
            d="M6.25 11.25V14.375C6.25 14.5408 6.31585 14.6997 6.43306 14.8169C6.55027 14.9342 6.70924 15 6.875 15H14.4078L17.5 17.5V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H13.75" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_2964_5113">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
          Чаты
      </li>

      <li 
        v-if="SITE_ROLE === 'provider'"
        @click="goToChat"
        class="nav_li" 
        :id="'chat'"
        :class="{'active': this.$route.name === `provider-chat`, 'disabled': isChatBtnDisable}"
        :disabled="isChatBtnDisable"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" :disabled="isChatBtnDisable">
          <g clip-path="url(#clip0_2964_5113)">
            <path
            :disabled="isChatBtnDisable"
            :class="{'active': this.$route.name === `provider-chat`, 'disabled': this.$route.params.id === `0`}"
            d="M5.59219 11.25L2.5 13.75V3.75C2.5 3.58424 2.56585 3.42527 2.68306 3.30806C2.80027 3.19085 2.95924 3.125 3.125 3.125H13.125C13.2908 3.125 13.4497 3.19085 13.5669 3.30806C13.6842 3.42527 13.75 3.58424 13.75 3.75V10.625C13.75 10.7908 13.6842 10.9497 13.5669 11.0669C13.4497 11.1842 13.2908 11.25 13.125 11.25H5.59219Z" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path 
            :disabled="isChatBtnDisable"
            :class="{'active': this.$route.name === `provider-chat`, 'disabled': this.$route.params.id === `0`}"
            d="M6.25 11.25V14.375C6.25 14.5408 6.31585 14.6997 6.43306 14.8169C6.55027 14.9342 6.70924 15 6.875 15H14.4078L17.5 17.5V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H13.75" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_2964_5113">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
          Чат
      </li>


      <li 
        v-if="$route.query.status !== 'PUBLISHED'"
        @click="goTo"
        class="nav_li"
        id="contracts"
        :class="{'active': this.$route.path === `/${SITE_ROLE}/contracts/${this.$route.params.id}`,
                      'disabled': this.$route.params.id === `0`}" >
        <svg id="contracts" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
        :class="{'active': this.$route.path === `/${SITE_ROLE}/contracts/${this.$route.params.id}`,
                  'disabled': this.$route.params.id === `0`}"
          d="M13.625 16.5H2.375C2.20924 16.5 2.05027 16.4342 1.93306 16.3169C1.81585 16.1997 1.75 16.0408 1.75 15.875V2.125C1.75 1.95924 1.81585 1.80027 1.93306 1.68306C2.05027 1.56585 2.20924 1.5 2.375 1.5H9.875L14.25 5.875V15.875C14.25 16.0408 14.1842 16.1997 14.0669 16.3169C13.9497 16.4342 13.7908 16.5 13.625 16.5Z" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>Договоры
      </li> 
        
      <li 
        v-if="$route.query.status !== 'PUBLISHED'"
        @click="goTo"
        class="nav_li" 
        id="bills" 
        :class="{'active': this.$route.path === `/${SITE_ROLE}/bills/${this.$route.params.id}`,
                      'disabled': this.$route.params.id === `0`}" >
      <svg id="bills" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
      :class="{'active': this.$route.path === `/${SITE_ROLE}/bills/${this.$route.params.id}`,
                      'disabled': this.$route.params.id === `0`}"
      d="M1.5 14.25V2.375C1.5 2.20924 1.56585 2.05027 1.68306 1.93306C1.80027 1.81585 1.95924 1.75 2.125 1.75H15.875C16.0408 1.75 16.1997 1.81585 16.3169 1.93306C16.4342 2.05027 16.5 2.20924 16.5 2.375V14.25L14 13L11.5 14.25L9 13L6.5 14.25L4 13L1.5 14.25Z" stroke="#416782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> 
      </svg>
        Счета 
      </li>
    </ul>   
  </div>
</template>

<script>
import { orderDocumentsNav } from '@/helpers/navigation';
import { mapGetters } from 'vuex';
  export default {
    name: 'header-docs-mob',

    data() {
      return {
        isDesktop: true,
        showChats: true,
      }
    },

  computed: {
    ...mapGetters([
      'SITE_ROLE', 'PROVIDER_OFFERS', 'USER_BY_ID', "IS_OFFER_SENDED"
    ]),

    setActive() {
      return {
        'active': this.$route.path === `/${this.SITE_ROLE}/${this.SITE_ROLE === 'customer' ? 'order' : 'application'}/${this.$route.params.id}` || this.$route.query.module === 'select_company'}
    },

    isChatBtnDisable() {
      if ( this.$route.query.offer_id || this.IS_OFFER_SENDED) return false
       else return true
    },
  
 
    showNav() {
      if (this.$route.name === 'provider-chat') return false
      if (this.$route.query.type === "cost") return false
      if (this.$route.query.type === "search") return false
      if (this.$route.params.id && !this.isDesktop) return true
      if (this.$route.name === 'customer-chats') return true
      return false 
    }
  }, 

    methods: {
    goTo(event) {
      orderDocumentsNav(event)
    },

    goToChat() {
      if (this.isChatBtnDisable) return
      this.$router.push(`/provider/chat/${this.$route.params.id}?&status=${this.$route.query.status}&offer_id=${this.$route.query.offer_id}&guest_id=${this.USER_BY_ID.uid}`)
    },

    goToChats() {
      if(this.SITE_ROLE === 'customer') {
        this.$router.push(`/customer/chats/${this.$route.params.id}?&status=${this.$route.query.status}&type=${this.$route.query.type}`)
      } else { this.$router.push(`/provider/chats`)}
    },

    isDesktopFn() {
      if(window.innerWidth < 600) {
       this.isDesktop = false
      } else this.isDesktop = true
    }
  },

  mounted() {
    this.isDesktopFn()
    window.addEventListener('resize', () => {
      this.isDesktopFn()
    })
  }

  }
</script>

<style lang="scss" scoped>


.nav_li{
  @include flex(column, center, center, .5rem);
  @include font(1.3rem, 500, $font-color2);
  line-height: 18px;
}

.order__header_mob{
  background-color: #FFFF;
  list-style-type: none;
  width: 100%;
  @include flex(row, space-evenly, center, 1.6rem);
  border-top: 1px solid #D9E1E7;
  padding: 1rem 0;
}

.active{
  color: $main-color;
  stroke: $main-color;
}

.disabled {
  @include disabled;
}

</style>