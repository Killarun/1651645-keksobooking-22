function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min || min < 0) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInteger(1, 1);


function getRandomNumber (min, max, range) {
  if (max <= min || min < 0)  {
    return null;
  }
  return Number((Math.random() * (max - min) + min).toFixed(range));
}
getRandomNumber(2,10,2);
