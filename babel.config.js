module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
};

const arr = [1, 2, 3];

if (!~arr.indexOf(1)) {
  console.log('Нашлось');
}
else {
  console.log('Не нашлось');
}
