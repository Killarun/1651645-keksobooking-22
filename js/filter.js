'use strict';

import {removeMarkers} from './map.js';
import {removePopup} from './map.js';
import {addOtherPins} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const houseTypes = mapFilters.querySelector('#housing-type');


// Types filter
const filterHouseTypes = function(typeElements) {
  houseTypes.addEventListener('change', () => {
    if (houseTypes.value === 'any') {
      addOtherPins(typeElements);
      removePopup();
    } else {
      const otherHouseTypes = typeElements.filter(element => element.offer.type === houseTypes.value);
      removeMarkers();
      addOtherPins(otherHouseTypes);
    }
  });
};


export {filterHouseTypes};
