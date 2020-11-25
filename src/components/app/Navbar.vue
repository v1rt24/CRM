<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('showSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ customTime | dataFilter('datatime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              ref="dropdown"
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link :to="{name: 'Profile'}" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import dataFilter from '@/filters/dataFilter';
import { mapActions } from 'vuex';

let dropdown = null;
let observeDataTime = null;

export default {
  name: 'Navbar',
  data: () => ({
    customTime: new Date(),
  }),
  methods: {
    ...mapActions('auth', {
      CLEAR_USER: 'logoutUser',
    }),
    logout () {
      this.CLEAR_USER();

      this.$router.push({
        name: 'Login',
        query: {
          message: 'logout',
        },
      });
    },
  },
  filters: {
    dataFilter,
  },
  mounted () {
    dropdown = M.Dropdown.init(this.$refs.dropdown);

    observeDataTime = setInterval(() => {
      this.customTime = new Date();
    }, 1000);
  },
  destroyed () {
    if (dropdown && dropdown.destroy) {
      dropdown.destroy();
    }

    if (observeDataTime) {
      clearInterval(observeDataTime);
    }
  },
};
</script>

<style scoped>

</style>