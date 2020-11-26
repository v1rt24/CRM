<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate
            @categoryCreated="categoryCreated"
        />

        <CategoryEdit/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/Categories/CategoryCreate';
import CategoryEdit from '@/components/Categories/CategoryEdit';

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
  }),
  methods: {
    categoryCreated (category) {
      this.categories.push(category);
    },
  },
  components: {CategoryEdit, CategoryCreate},
};
</script>

<style scoped>

</style>