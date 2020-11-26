<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>

    <section>
      <Preloader v-if="loading"/>

      <div class="row" v-else>
        <CategoryCreate
            @categoryCreated="categoryCreated"
        />

        <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length"
            @updateCategory="updateCategory"
        />

        <p class="center" v-else>Добавьте категорию</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Categories/CategoryCreate';
import CategoryEdit from '@/components/Categories/CategoryEdit';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    loading: true,
  }),
  methods: {
    ...mapActions('category', {
      FETCH_CATEGORIES: 'fetchCategories',
    }),
    categoryCreated (category) {
      this.categories.push(category);
    },
    updateCategory (cat) {
      const category = this.categories.find(el => el.id === cat.id);
      category.namecat = cat.namecat;
      category.limitmoney = cat.limitmoney;
    },
  },
  components: {CategoryEdit, CategoryCreate},
  async mounted () {
    try {
      this.categories = await this.FETCH_CATEGORIES();
      this.loading = false;
    }
    catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>

</style>