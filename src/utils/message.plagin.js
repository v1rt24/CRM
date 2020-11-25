export default {
  install (Vue, options) {
    Vue.prototype.$message = text => {
      M.toast({html: text});
    };

    Vue.prototype.$error = error => {
      M.toast({html: `[Ошибка]: ${error}`});
    };
  },
};