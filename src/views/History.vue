<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Preloader v-if="loading"/>

    <div class="center" v-else-if="!loading && !records.length">
      Добавьте
      <router-link :to="{name: 'Record'}">Запись</router-link>
    </div>

    <div v-else>
      <div class="history-chart">
        <canvas ref="canvas"></canvas>
      </div>

      <section>
        <HistoryTable
            :records="arrayItem"
        />
      </section>

      <Paginate
          v-if="pageCount > 1"
          v-model="page"
          :pageCount="pageCount"
          prevText="<span class='material-icons prev'>arrow_back_ios</span>"
          nextText="<span class='material-icons next'>arrow_forward_ios</span>"
          containerClass="pagination"
          pageClass="waves-effect"
          :clickHandler="clickHandler"
      />
    </div>
  </div>
</template>

<script>
import HistoryTable from '@/components/History/HistoryTable';
import { mapActions } from 'vuex';
import pageMixin from '@/mixins/pagination.mixin';
import { Pie } from 'vue-chartjs';

export default {
  name: 'History',
  extends: Pie,
  data: () => ({
    loading: true,
    records: [],
  }),
  methods: {
    ...mapActions('category', {
      FETCH_CATEGORIES: 'fetchCategories',
    }),
    ...mapActions('record', {
      FETCH_RECORDS: 'fetchRecords',
    }),
    chartSetup (categories, records) {
      this.renderChart({
        labels: categories.map(cat => cat.namecat),
        datasets: [
          {
            label: 'Расходы по категориям',
            data: categories.map(cat => {
              return records.
                  filter(rec => rec.category_id === cat.id && rec.type === 'outcome').
                  reduce((total, item) => total + +item.amount, 0);
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          }],
      });
    },
  },
  components: {HistoryTable},
  mixins: [pageMixin],
  async mounted () {
    const categories = await this.FETCH_CATEGORIES();
    this.records = await this.FETCH_RECORDS();

    const res = this.records.map(rec => {
      return {
        ...rec,
        nameCat: categories.find(cat => cat.id === rec.category_id).namecat,
        typeName: rec.type === 'outcome' ? 'Расход' : 'Доход',
        typeClass: rec.type === 'outcome' ? 'red' : 'green',
      };
    });

    this.paginateHandler(res, 3);

    this.loading = false;

    this.$nextTick(() => {
      this.chartSetup(categories, this.records);
    });
  },
};
</script>

<style>
.pagination li a {
  outline: none;
}

.prev,
.next {
  transform: translateY(4px);
}
</style>