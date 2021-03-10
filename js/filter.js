const quantityRooms = document.querySelector('#room_number');
const quantityGuestsPlace = document.querySelector('#capacity');
const quantityGuestValues = quantityGuestsPlace.children;


const disablePlace = function (listElements) {
  for (const currentValue of listElements) {
    currentValue.setAttribute('disabled', 'disabled');
  }
};

const onCheckRooms= function () {
  disablePlace(quantityGuestValues);
  if (this.value === '1') {
    quantityGuestsPlace.options[2].removeAttribute('disabled');
    quantityGuestsPlace.value = '1';
  } else if (this.value === '2') {
    quantityGuestsPlace.options[1].removeAttribute('disabled');
    quantityGuestsPlace.options[2].removeAttribute('disabled');
    if (quantityGuestsPlace.value === '0' || quantityGuestsPlace.value === '3') {
      quantityGuestsPlace.value = '2';
    }
  } else if (this.value === '3') {
    quantityGuestsPlace.options[0].removeAttribute('disabled');
    quantityGuestsPlace.options[1].removeAttribute('disabled');
    quantityGuestsPlace.options[2].removeAttribute('disabled');
    if (quantityGuestsPlace.value === '0') {
      quantityGuestsPlace.value = '3';
    }
  } else if (this.value === '100') {
    quantityGuestsPlace.options[3].removeAttribute('disabled');
    quantityGuestsPlace.value = '0';
  }
};


quantityRooms.addEventListener('change', onCheckRooms);
