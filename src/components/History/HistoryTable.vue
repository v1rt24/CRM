<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="(rec, idx) of records"
        :key="rec.id"
    >
      <td>{{ idx + 1 }}</td>
      <td>{{ rec.amount | priceFilter }}</td>
      <td>{{ rec.time | dataFilter }}</td>
      <td>{{ rec.nameCat }}</td>
      <td>
        <span class="white-text badge" :class="rec.typeClass">{{ rec.typeName }}</span>
      </td>
      <td>
        <button
            class="btn-small btn"
            v-tooltip="'Открыть страницу <br> детального просмотра'"
            @click="pageDetail(rec)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    pageDetail (rec) {
      this.$router.push({
        name: 'Detail',
        params: {
          rec,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>