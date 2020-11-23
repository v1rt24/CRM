<template>
  <ul class="sidenav app-sidenav open">
    <router-link
        v-for="link of links" :key="link.url"
        tag="li"
        :to="{name: link.url}"
        exact-active-class="active"
    >
      <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Menu',
  data: () => ({
    links: [
      {url: 'Home', title: 'Счёт'},
      {url: 'History', title: 'История'},
      {url: 'Planning', title: 'Планирование'},
      {url: 'Record', title: 'Новая запись'},
      {url: 'Categories', title: 'Категории'},
    ],
  }),
};
</script>

<style scoped>

</style>