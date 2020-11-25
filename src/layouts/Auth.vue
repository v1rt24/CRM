<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import messages from '@/utils/messages';

export default {
  name: 'Auth',
  computed: {
    ...mapGetters('error', {
      ERROR: 'getError',
    }),
  },
  watch: {
    ERROR (val) {
      if (val) {
        /*if (val === 'Failed to fetch') {
          this.$error(messages[val]);
          return;
        }
        this.$error(val || 'Что-то пошло не так');*/

        this.$error(val === 'Failed to fetch' ? messages[val] : val || 'Что-то пошло не так');
      }
    },
  },
};
</script>

<style scoped>

</style>