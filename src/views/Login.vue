<template>
  <form class="card auth-card" @submit.prevent="loginHandler">
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
            v-else-if="$v.email.$dirty && !$v.email.email"
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
            :class="{invalid: $v.password.$dirty && !$v.password.required}"
        >
        <label for="password">Пароль</label>
        <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
        >Введите пароль</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link :to="{name: 'Registration'}">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions('auth', {
      AUTH_USER: 'authUser',
    }),
    async loginHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };
      // console.log(formData);

      try {
        const res = await this.AUTH_USER(formData);
        this.$router.push({name: 'Home'});
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
};
</script>

<style scoped>

</style>