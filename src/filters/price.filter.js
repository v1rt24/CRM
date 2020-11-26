export default (price, valuta = 'RUB') => {
  return new Intl.NumberFormat(valuta, {
    currency: valuta,
    style: 'currency',
  }).format(price);
}