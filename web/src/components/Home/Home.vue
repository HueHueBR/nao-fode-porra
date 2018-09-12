<script>
import '@/scss/_reset.scss';
import '@/components/Home/style.scss';

import Header from '@/components/Home/Header';
import Body from '@/components/Home/Body';

export default {
  name: 'Home',
  components: {
    Header,
    Body,
  },
};
</script>

<template lang="html">
  <div>
    <Header />
    <Body />
  </div>
</template>
