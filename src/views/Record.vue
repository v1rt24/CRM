<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Preloader v-if="loading"/>

    <div class="center" v-else-if="!loading && !categories.length">
      Сначала
      <router-link :to="{name: 'Categories'}">Создайте категорию</router-link>
    </div>

    <form class="form" @submit.prevent="newRecordHandler" v-else>
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

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"
        >
        <label for="amount">Сумма</label>
        <span
            v-if="$v.amount.$dirty && !$v.amount.required"
            class="helper-text invalid"
        >
          Введите сумму
        </span>
        <span
            v-else-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
        >
          Сумма должна быть не менее {{ $v.amount.$params.minValue.min }} ₽
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
        >
          Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

let select = null;

export default {
  name: 'Record',
  data: () => ({
    loading: true,

    categories: [],

    selected: null,
    type: 'income',
    amount: '',
    description: '',
  }),
  validations: {
    amount: {
      required,
      minValue: minValue(1),
    },
    description: {
      required,
    },
  },
  methods: {
    ...mapActions('category', {
      FETCH_CATEGORIES: 'fetchCategories',
    }),
    ...mapActions('record', {
      CREATE_RECORD: 'createRecord',
      UPDATE_USER_BILL: 'updateUserBill',
    }),
    async newRecordHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      if (this.canCreateRecord) {
        try {
          const res = await this.CREATE_RECORD({
            category_id: this.selected,
            type: this.type,
            amount: this.amount,
            description: this.description,
            user_id: this.USER_DATA.id,
          });

          const bill = this.type === 'income'
              ? +this.USER_DATA.bill + this.amount
              : +this.USER_DATA.bill - this.amount;

          await this.UPDATE_USER_BILL(bill);

          this.amount = this.description = '';
          this.$v.$reset();

          this.$message(messages[res.code]);
        }
        catch (error) {
          this.$error(messages[error.code]);
          console.log(error);
        }
      }
      else {
        const sum = this.amount - +this.USER_DATA.bill;
        this.$message(`Превышен лимит счёта на: ${sum} ₽ / Пополните счёт`);
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      USER_DATA: 'getUser',
    }),
    canCreateRecord () {
      if (this.type === 'income') {
        return true;
      }

      return this.USER_DATA.bill >= this.amount;
    },
  },
  async mounted () {
    try {
      this.categories = await this.FETCH_CATEGORIES();
      this.loading = false;

      if (this.categories.length) {
        this.selected = this.categories[0].id;
      }

      this.$nextTick(() => {
        select = M.FormSelect.init(this.$refs.select);
      });
    }
    catch (error) {
      throw error;
    }
  },
  destroyed () {
    if (select && select.destroy) {
      select.destroy();
    }
  },
};
</script>

<style scoped>

</style>