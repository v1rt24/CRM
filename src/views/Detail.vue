<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link :to="{name: 'History'}" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ rec.typeName }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="rec.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{ rec.description }}</p>
              <p>Сумма: {{ rec.amount }}</p>
              <p>Категория: {{ rec.nameCat }}</p>

              <small>{{ rec.time | dataFilter }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    rec: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>