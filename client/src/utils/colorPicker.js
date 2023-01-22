export default (rating) => {
  if (rating >= 7.5) return '#21d07a';
  if (rating >= 5.0) return '#d2d531';
  return 'red';
};
