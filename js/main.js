function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min){
    return 'Ошибка: Числа равны, диапазона нет.';
  }
  else{
    if (min >= 0 && max >= 0)
    {
    return Math.floor(Math.random() * (max - min + 1)) + min;}
  }
  return 'Ошибка: Числа дожны быть больше 0.';
}
getRandomInteger(1, 1);



function getRandomLocation (min, max, one) {
  if (min > max) {
    return 'Ошибка: Минимальное число больше максимального';

  } else {
    if (min >= 0 && max >= 0)
    {
    return (Math.random() * (max - min) + min).toFixed(one);}
  }
  return 'Ошибка: Числа дожны быть больше 0.';
}
getRandomLocation(2,4,1);
