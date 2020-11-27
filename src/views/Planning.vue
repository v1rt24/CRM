<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ USER_DATA.bill | priceFilter }}</h4>
    </div>

    <Preloader v-if="loading"/>

    <div class="center" v-else-if="!loading && !categories.length">
      Добавьте
      <router-link :to="{name: 'Record'}">новую запись</router-link>
    </div>

    <section v-else>
      <div
          v-for="cat of categories"
          :key="cat.id"
      >
        <p>
          <strong>{{ cat.namecat }}:</strong>
          {{ cat.spend | priceFilter }} из {{ cat.limitmoney | priceFilter }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate" :class="cat.progressColor"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import priceFilter from '@/filters/price.filter';

export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  methods: {
    ...mapActions('category', {
      FETCH_CATEGORIES: 'fetchCategories',
    }),
    ...mapActions('record', {
      FETCH_RECORDS: 'fetchRecords',
    }),
  },
  computed: {
    ...mapGetters('auth', {
      USER_DATA: 'getUser',
    }),
  },
  async mounted () {
    try {
      const records = await this.FETCH_RECORDS();
      const categories = await this.FETCH_CATEGORIES();

      this.categories = categories.map(cat => {
        const spend = records.
            filter(el => el.category_id === cat.id).
            filter(el => el.type === 'outcome').
            reduce((sum, item) => sum + +item.amount, 0)
        ;

        const percent = 100 * spend / cat.limitmoney;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';

        const tooltipValue = cat.limitmoney - spend;

        const tooltip = `${tooltipValue >= 0 ? 'Доступно: ' : 'Лимит превышен на: '} ${priceFilter(
            Math.abs(tooltipValue))}`;

        return {
          ...cat,
          spend,
          progressPercent,
          progressColor,
          tooltip,
        };
      });

      this.loading = false;
    }
    catch (error) {
      this.loading = false;
      console.log(error);
    }
  },
};
</script>

<style scoped>
.determinate {
  cursor: pointer;
}
</style>