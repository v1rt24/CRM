<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="name">Название</label>
          <span
              class="helper-text invalid"
              v-if="$v.name.$dirty && !$v.name.required"
          >
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.required) || ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">Лимит</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.required"
          >
            Введите начальную сумму
          </span>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная начальная сумма {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'CategoryCreate',
  data: () => ({
    name: '',
    limit: '',
  }),
  validations: {
    name: {
      required,
    },
    limit: {
      required,
      minValue: minValue(1000),
    },
  },
  methods: {
    ...mapActions('category', {
      CREATE_CATEGORIES: 'createCategories',
    }),
    async createHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const dataForm = {
        namecat: this.name,
        limitmoney: this.limit,
      };
      // console.log(dataForm);

      try {
        const category = await this.CREATE_CATEGORIES(dataForm);
        this.name = this.limit = '';
        this.$v.$reset();
        this.$message(`Категория ${category.namecat} создана`);

        this.$emit('categoryCreated', category);
      }
      catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>

</style>