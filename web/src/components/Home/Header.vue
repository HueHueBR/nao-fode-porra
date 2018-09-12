<template lang="html">
  <header class="spent-header">
    <p class="spent-header__total">
      R$ {{ totalSpent }}
    </p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      totalSpent: '140.115.198,00',
    };
  },
};
</script>
