<template>
  <form class="card auth-card" @submit.prevent="regHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
        >
          Введите почту
        </small>
        <small
            v-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
        >
          Некорректная почта
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
        >
          Введите пароль
        </small>
        <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
        >
          Пароль должен быть не менее {{ $v.password.$params.minLength.min }}
          <br>
          Вы ввели {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
        >
          Введите имя
        </small>
      </div>
      <div class="input-field">
        <input
            id="bill"
            type="text"
            v-model.number="bill"
            :class="{invalid: ($v.bill.$dirty && !$v.bill.required) || ($v.bill.$dirty && !$v.bill.minValue)}"
        >
        <label for="bill">Введите начальную сумму</label>
        <small
            v-if="$v.bill.$dirty && !$v.bill.required"
            class="helper-text invalid"
        >
          Введите начальную сумму
        </small>
        <small
            v-if="$v.bill.$dirty && !$v.bill.minValue"
            class="helper-text invalid"
        >
          Сумма должна быть не менее {{ $v.bill.$params.minValue.min }} ₽
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="check"/>
          <span
              :class="{error: $v.check.$dirty && !$v.check.checked}"
          >
            С правилами согласен
          </span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{name: 'Login'}">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength, minValue } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'Registration',
  data: () => ({
    email: '',
    password: '',
    name: '',
    bill: '',
    check: false,
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
    },
    bill: {
      required,
      minValue: minValue(1000),
    },
    check: {
      checked: val => val,
    },
  },
  methods: {
    ...mapActions('auth', {
      REGISTRATION_USER: 'registrationUser',
    }),
    async regHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        bill: this.bill,
      };

      try {
        await this.REGISTRATION_USER(formData);
        this.$router.push({name: 'Home'});
      }
      catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: #f44336;
}
</style>