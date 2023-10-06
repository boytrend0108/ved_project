<template>
  <div class="form-requisites">
    <div class="form-item">
      <h2 class="form-item__title">Информация о пользователе</h2>
      <div class="form-item__box">
        <p class="form-item__key">ФИО :</p>
        <p class="form-item__value"> {{ user.full_name }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Email :</p>
        <p class="form-item__value"> {{ user.email }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Телефон :</p>
        <p class="form-item__value"> {{ user.phone_number }}</p>
      </div>
    </div>

    <div class="form-item">
      <h2 class="form-item__title">Информация о фирме </h2>
      <div class="form-item__box">
        <p class="form-item__key">Название фирмы:</p>
        <p class="form-item__value"> {{ firm.org_type + ' ' +  firm.long_name }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">ИНН:</p>
        <p class="form-item__value"> {{ firm.inn }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">КПП :</p>
        <p class="form-item__value"> {{ firm.kpp }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">ОГРН :</p>
        <p class="form-item__value"> {{ firm.ogrn }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Юридический адрес :</p>
        <p class="form-item__value"> {{ firm.ogrn }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">ОГРН :</p>
        <p class="form-item__value"> {{ firm.ogrn }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Телефон :</p>
        <p class="form-item__value"> {{ firm.phone_number }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Email :</p>
        <p class="form-item__value"> {{ firm.email }}</p>
      </div>
    </div>

    <div class="form-item">
    <h2 class="form-item__title">Информация о банковском счете </h2>
      <div class="form-item__box">
        <p class="form-item__key">Банк :</p>
        <p class="form-item__value"> {{ bank.name }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">БИК :</p>
        <p class="form-item__value"> {{ bank.bic }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Расчетный счет :</p>
        <p class="form-item__value"> {{ bank.ras_schet }}</p>
      </div>
      <div class="form-item__box">
        <p class="form-item__key">Корресп. счет :</p>
        <p class="form-item__value"> {{ bank.kor_schet }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['requisites']);
// eslint-disable-next-line vue/no-setup-props-destructure
const { user, firm, bank } = props.requisites;
</script>

<style lang="scss" scoped> 
.form-requisites {
   padding: 4.5rem;

   @media (max-width: 600px) {
     padding: 1.5rem;
     min-height: 100vh;
     height: fit-content;
   }
 }

 .form-item {
   margin-bottom: 2.3rem;
 }

 .form-item__title {
   @include title_h3;
   text-align: left;
   margin-bottom: 1.5rem;

   @media (max-width: 600px) {
     margin-bottom: 1rem;
   }
 }

 .form-item__box {
   @include flex(row, flex-start, center, .6rem);
   margin-bottom: 1rem;
   margin-left: 1rem;
   flex-wrap: wrap;

   @media (max-width:600px) {
     margin-bottom: .5rem;
   }
 }

 .form-item__key {
   @include font (1.7rem, 600, $font-color2);

   @media (max-width:600px) {
     font-size: 1.4rem;
   }
 }

 .form-item__value {
   @include font (1.7rem, 500, $font-color2);

   @media (max-width:600px) {
     font-size: 1.4rem;
   }
 }
</style>