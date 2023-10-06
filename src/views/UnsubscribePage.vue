<!-- eslint-disable no-const-assign -->
<template>
  <form  
    class="form" 
    id="login-form"
    @submit.prevent="onSubmit"
    v-if="!success"
  >
    <div class="form__title-box">
      <h2 class="form__title">Отписаться от рассылки</h2>
    </div>
    
    <div class="input-box form__input-box">
      <label for="email" class="input-box__label">E-mail</label>
      <input 
        placeholder="E-mail"
        autocomplete="email"
        class="input-box__input"
        type="email" 
        id="email" 
        @input="validation"
        v-model.trim="email"
      />
      <p v-if="err" class="input-box__error"> {{ err }} </p>
    </div>

    <my-btn 
      type="submit" 
      class="form__btn"
      :class="{ form__btn_active: !!err }"
    >Отписаться</my-btn>
    
    <my-big-spinner v-if="showPreloader"/>
  </form>

  <SuccessUnsubscribe v-else />
</template>

<script setup>
import { ref } from 'vue';
import { emailValidation } from '@/helpers/validation';
import { useStore } from "vuex";
import SuccessUnsubscribe from '@/components/Form/SuccessUnsubscribe.vue';

const store = useStore();
const email = ref('');
const showPreloader = ref(false);
const success = ref(false);
let err = ref('');

const validation = event => {
  err.value = emailValidation(event);
};

const onSubmit = async () => {
  showPreloader.value = true;
  try {
    await store.dispatch("UNSUBSCRIBE", email.value);
    showPreloader.value = false;
    success.value = true;
  } catch (e) {
    err.value = e;
    showPreloader.value = false;
  }
};
</script>


<style lang="scss" scoped>
.form {
  @include form;
  max-width: 50rem;
  width: 100%;
  background-color: #fff;
  border-radius: 2rem;
  padding: 5rem;

  &__input-box {
    position: relative;
  }

  &__title-box {
    @include flex(row, flex-start, center, 14px)
  }

  &__title {
    @include form-title;
    margin-bottom: 0;
    text-align: left;
  }

  &__btn {
    @include btn;

    &_active {
      opacity: 0.5;
      cursor:not-allowed
    }
  }
} 

.input-box {
  @include input-box;

  &__label {
    @include form-label
  }

  &__input {
    @include input-login
  }

  &__error {
    position: absolute;
    top: 8.5rem;
    @include errorMsg;
  }
}
</style>
