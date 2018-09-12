<script>
export default {
  methods: {
    handleCtaClick() {
    },
  },
};
</script>

<template lang="html">
  <article>
    <h1 class="heading-title">
      Não fode, porra!
    </h1>
    <p class="content">
      Ferramenta de controle social, pra gente acabar de vez com essa baderna!
    </p>
    <div class="cta">
      <button class="cta__button" v-on:click="handleCtaClick()">
        Como assim?
        <span class="cta__arrow cta__arrow--down"></span>
      </button>
    </div>
  </article>
</template>
