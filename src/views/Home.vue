<template>
  <div>
    <div class="page-title">
      <h3>Счёт</h3>

      <button class="btn waves-effect waves-light btn-small" @click="loadData">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Preloader
        v-if="loader"
    />

    <div
        class="row"
        v-if="!loader"
    >
      <HomeBill
          :rates="currency.rates"
      />

      <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/Home/HomeBill';
import HomeCurrency from '@/components/Home/HomeCurrency';
import { mapActions } from 'vuex';
import messages from '@/utils/messages';

export default {
  name: 'Home',
  data: () => ({
    loader: true,
    currency: null,
  }),
  methods: {
    ...mapActions('home', {
      FETCH_CURRENCY: 'fetchCurrency',
    }),
    async loadData () {
      try {
        this.loader = true;
        this.currency = await this.FETCH_CURRENCY();
        this.loader = false;
      }
      catch (error) {
        this.$error(messages[error.code]);
        console.log(error);
      }
    },
  },
  components: {HomeCurrency, HomeBill},
  mounted () {
    this.loadData();
  },
};
</script>

<style scoped>

</style>