<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="cur of currencies" :key="cur"
          >
            <td>{{ cur }}</td>
            <td>{{ rates[cur] }}</td>
            <td>{{ date | dataFilter }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCurrency',
  props: {
    rates: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    currencies: [],
  }),
  mounted () {
    this.currencies = Object.keys(this.rates);
  },
};
</script>

<style scoped>

</style>