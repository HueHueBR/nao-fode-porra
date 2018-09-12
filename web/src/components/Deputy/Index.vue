<script>
import axios from 'axios';

export default {
  name: 'Index',
  mounted() {
    axios
    .get('/static/deputy/:id.json'.replace(':id', this.$route.params.id))
    .then((result) => {
      this.$nextTick(() => {
        this.msg = result.data.msg;
      });
    });
  },
  data() {
    return {
      msg: '',
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<template lang="html">
  <h1>
    Deputy #{{id}}
    {{msg}}
  </h1>
</template>
