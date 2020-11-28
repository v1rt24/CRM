export default {
  data () {
    return {
      page: +this.$route.query.page || 1,
      pageCount: 0,
      allArray: [],
      arrayItem: [],
    };
  },
  methods: {
    paginateHandler (arr, crash) {
      this.allArray = this.chunk(arr, crash);
      this.pageCount = this.allArray.length;
      this.arrayItem = this.allArray[this.page - 1] || this.allArray[0];
    },
    chunk (arr, crash) {
      const subArr = [];
      for (let i = 0; i < Math.ceil(arr.length / crash); i++) {
        subArr[i] = arr.slice((i * crash), (i * crash) + crash);
      }
      return subArr;
    },
    clickHandler (page) {
      this.arrayItem = this.allArray[page - 1] || this.allArray[0];
      this.$router.push({
        query: {
          page: page
        }
      });
    },
  },
};