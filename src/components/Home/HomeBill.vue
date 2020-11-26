<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line"
           v-for="cur of currencies" :key="cur"
        >
          <span>{{ getCurrency(cur) | priceFilter(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeBill',
  props: {
    rates: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    currencies: [],
  }),
  methods: {
    getCurrency (currency) {
      return ~~(this.base * this.rates[currency]);
    },
  },
  computed: {
    ...mapGetters('auth', {
      USER_INFO: 'getUser',
    }),
    base () {
      return this.USER_INFO.bill / (this.rates['RUB'] / this.rates['EUR']);
    },
  },
  mounted () {
    this.currencies = Object.keys(this.rates);
  },
};
</script>

<style scoped>

</style>