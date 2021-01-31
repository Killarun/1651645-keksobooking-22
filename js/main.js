function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max < min || min < 0) {
    return false;
  }
  else{
    return Math.floor(Math.random() * (max - min + 1)) + min;}
}
getRandomInteger(1, 10);

function getRandomPosition (firstCoordinate, secondCoordinate, range) {
  if (secondCoordinate <= firstCoordinate || firstCoordinate < 0)  {
    return false;

  } else {

    return Number((Math.random() * (secondCoordinate - firstCoordinate) + firstCoordinate).toFixed(range));
  }
}
getRandomPosition(2,10,2);
