<template>
  <div class="wrapperPreloader">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer" :class="colorPreloader">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  computed: {
    colorPreloader () {
      const color = ['spinner-blue-only', 'spinner-red-only', 'spinner-yellow-only'];
      const count = ~~(Math.random() * color.length);
      return color[count];
    },
  },
};
</script>

<style scoped>
.wrapperPreloader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>