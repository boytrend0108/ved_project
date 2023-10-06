<template>
  <div class="faqComp">
    <ul class="faqComp__ul">Частозадаваемые вопросы
      <li class="faqComp__li">
        <router-link  to="/">Это бесплатно?</router-link>
      </li>
      <li class="faqComp__li">
        <router-link to="/">Кто гарантирует результат поставки?</router-link>
      </li>
      <li class="faqComp__li">
        <router-link to="/">Что делать, если я недоволен работой специалист </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'faq-comp'
  }
</script>

<style lang="scss" scoped>
.faqComp__ul {
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #244156;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.faqComp__li {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  text-decoration: underline;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #339DFF;
}
.faqComp {
  padding: 3rem 70px;
  height: 164px;
  border: 2px solid #D9E1E7;
  border-radius: 10px;
}
</style>