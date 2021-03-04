
const typeBuilding = document.querySelector('#type');
const cellPrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const onTypeBuldingChange = function() {
  const price = minPrice[this.value];
  cellPrice.setAttribute('min', price);
  cellPrice.setAttribute('placeholder', price)
};

const onTimeInChange = function() {
  timeOut.selectedIndex = timeIn.selectedIndex;
};

const onTimeOutChange = function() {
  timeIn.selectedIndex = timeOut.selectedIndex;
};

typeBuilding.addEventListener('change', onTypeBuldingChange);

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);
