<template>
  <ul class='error-messages scale-in-ver-center  '>
    <li class="li" v-if='VALIDATION_ERRORS' >
      {{ errorMessages }}
    </li>
  </ul>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'validation-errors',
  computed: { 
    ...mapGetters([
      'VALIDATION_ERRORS'
    ]),

    errorMessages() {
        const errorMessage = this.VALIDATION_ERRORS
        return errorMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.li {
       list-style-type: none;
       font-size: 2rem;
       color: red;
       padding: 1rem;
       font-weight: bold;
       text-decoration: none;
       padding: 0.5rem;

       @media (max-width:600px) {
        @include font(14px, 500, red );
       }

     }

   .error-messages{
    min-height: 20px;
   }

   .scale-in-ver-center {
	-webkit-animation: scale-in-ver-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-ver-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
 
@-webkit-keyframes scale-in-ver-center {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
}
@keyframes scale-in-ver-center {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
}
   
}
</style>