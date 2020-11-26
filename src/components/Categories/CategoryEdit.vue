<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="formEditHandler">
        <div class="input-field">
          <select ref="select" v-model="selected">
            <option
                v-for="category of categories"
                :key="category.id"
                :value="category.id"
            >
              {{ category.namecat }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              type="text"
              id="name2"
              v-model.trim="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name2">Название</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите имя
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit2"
              type="number"
              v-model.number="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.required) && ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit2">Лимит</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.required"
          >
            Введите лимит
          </span>
          <span
              class="helper-text invalid"
              v-else-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальный лимит {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

let select = null;
let updateTextFields = null;

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      selected: null,
      title: '',
      limit: '',
    };
  },
  validations: {
    title: {
      required,
    },
    limit: {
      required,
      minValue: minValue(1000),
    },
  },
  methods: {
    ...mapActions('category', {
      UPDATE_CATEGORY: 'updateCategory',
    }),
    async formEditHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const dataForm = {
        id: this.selected,
        namecat: this.title,
        limitmoney: this.limit,
      };
      // console.log(dataForm);

      try {
        const res = await this.UPDATE_CATEGORY(dataForm);

        this.$message(res);

        this.$emit('updateCategory', dataForm);

        this.$nextTick(() => {
          select.destroy();
          select = M.FormSelect.init(this.$refs.select);
        });
      }
      catch (error) {
        throw error;
      }
    },
  },
  watch: {
    selected (id) {
      const {namecat, limitmoney} = this.categories.find(el => el.id === id);
      this.title = namecat;
      this.limit = limitmoney;
    },
  },
  created () {
    const {id, namecat, limitmoney} = this.categories[0];
    this.selected = id;
    this.title = namecat;
    this.limit = limitmoney;
  },
  mounted () {
    select = M.FormSelect.init(this.$refs.select);
    updateTextFields = M.updateTextFields();
  },
  destroyed () {
    if (select && select.destroy) {
      select.destroy();
    }

    if (updateTextFields && updateTextFields.destroy) {
      updateTextFields.destroy();
    }
  },
};
</script>

<style scoped>

</style>