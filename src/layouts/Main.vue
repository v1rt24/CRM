<template>
  <div>
    <div class="app-main-layout">

      <Navbar
          @showSidebar="isSidebar = !isSidebar"
      />

      <Menu
          v-model="isSidebar"
      />

      <main class="app-content" :class="{full: !isSidebar}">
        <div class="app-page">

          <router-view/>

        </div>
      </main>

      <div class="fixed-action-btn" v-if="isFloating">
        <router-link
            v-tooltip="'Добавить новую запись'" data-position="left"
            class="btn-floating btn-large blue"
            :to="{name: 'Record'}"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/app/Menu';
import Navbar from '@/components/app/Navbar';

export default {
  name: 'Main',
  data: () => ({
    isSidebar: true,
  }),
  computed: {
    isFloating () {
      return this.$route.path !== '/record';
    },
  },
  components: {
    Navbar,
    Menu,
  },
};
</script>

<style scoped>

</style>