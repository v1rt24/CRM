<template>
  <div>
    <component :is="layout"></component>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout () {
      const nameLayout = this.$route.meta.layout || 'Auth';
      return () => import(`@/layouts/${nameLayout}`);
    },
  },
};
</script>

<style scoped>

</style>