/* global L:readonly */
import { getSimilarOffers } from './data.js';
import {  generatePopup } from './popup.js';
const MARKER_START = {
  lat: 35.68943,
  lng: 139.69276,
};
const MAP_ZOOM = 10;
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_POINTER = [26, 52];
const PIN_SIZE = [46, 46];
const PIN_POINTER = [23, 46];
const formMain = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const mapAddress = document.querySelector('#address');
const adsOffers = getSimilarOffers(10);
const fieldsForm = document.querySelectorAll('form input, form select, form textarea, form button');




const setDisabled = function () {

  formMain.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  fieldsForm.forEach(elem => elem.setAttribute('disabled', 'disabled'));
};
setDisabled();

const fillAdress = function (coordinates) {
  if (!formMain.classList.contains('ad-form--disabled')) {
    return mapAddress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;

  }

}

const setEnable = function () {
  formMain.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');

  fieldsForm.forEach(elem => elem.removeAttribute('disabled', 'disabled'));
  mapAddress.value = fillAdress(MARKER_START);
  mapAddress.setAttribute('readonly', 'readonly');
};

const map = L.map('map-canvas')
  .on('load', setEnable)
  .setView(MARKER_START, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_POINTER,
});

const marker = L.marker(
  MARKER_START, {
    draggable: true,
    icon: mainPinIcon,
  });

marker.addTo(map);

marker.on('move', (evt) => {
  mapAddress.value = (evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5));
});

const addOtherPins = (adsOffers) => {
  adsOffers.forEach((otherPinIcon) => {
    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: PIN_SIZE,
      iconAnchor: PIN_POINTER,
    });
    L.marker(Object.values(otherPinIcon.location), {icon: pinIcon}).addTo(map)
      .bindPopup(generatePopup(otherPinIcon), {keepInView: true});
  });
}
addOtherPins(adsOffers);
