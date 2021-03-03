/* global L:readonly */
import { getSimilarOffers } from './data.js';
import {  generatePopup } from './popup.js';


const formMain = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const mapAddress = document.querySelector('#address');
const adsOffers = getSimilarOffers(10);
const fieldsForm = document.querySelectorAll('form input, form select, form textarea, form button');
const MARKER_START = {
  lat: 35.68643,
  lng: 139.70627,
};

fieldsForm.forEach(elem => elem.setAttribute('disabled', 'disabled'));

const setDisabled = function () {

  formMain.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
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
  .setView(MARKER_START, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  MARKER_START, {
    draggable: true,
    icon: mainPinIcon,
  });

marker.addTo(map);

marker.on('moveend', (evt) => {
  mapAddress.value = (evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5));
});

const addOtherPins = (adsOffers) => {
  adsOffers.forEach((otherPinIcons) => {
    const pinIcons = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [46, 46],
      iconAnchor: [23, 46],
    });
    L.marker(Object.values(otherPinIcons.location), {icon: pinIcons}).addTo(map)
      .bindPopup(generatePopup(otherPinIcons), {keepInView: true});
  });
}
addOtherPins(adsOffers);
