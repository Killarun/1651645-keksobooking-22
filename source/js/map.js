'use strict';
//import L from 'leaflet';
/* global L:readonly */

import { generatePopup } from './popup.js';

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
const fieldsForm = document.querySelectorAll('form input, form select, form textarea, form button');

const setDisabled = () => {
  formMain.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  fieldsForm.forEach(elem => elem.setAttribute('disabled', 'disabled'));
};
setDisabled();

const fillAddress = (coordinates) => {
  if (!formMain.classList.contains('ad-form--disabled')) {
    return mapAddress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  }
};

const resetAddressCoordinates = () => {
  fillAddress.value = (MARKER_START);
};

const setEnable = () => {
  formMain.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  fieldsForm.forEach(elem => elem.removeAttribute('disabled'));
  mapAddress.value = fillAddress(MARKER_START);
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
  iconUrl: 'img/main-pin.svg',
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
  const otherPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: PIN_SIZE,
    iconAnchor: PIN_POINTER,
  });

  adsOffers.slice(0, 10).forEach(function (ad) {
    const otherPinMarker = L.marker({
      lat: ad.location.lat,
      lng: ad.location.lng,
    }, {
      icon: otherPinIcon,
    });
    otherPinMarker.addTo(map);
    otherPinMarker.bindPopup(generatePopup(ad));
  });
  return adsOffers;
};

const returnMainMarkerPosition = (coordinates) => {
  marker.setLatLng(MARKER_START);
  mapAddress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const removeMarkers = () => {
  map.eachLayer((layer) => {
    if (layer.getElement) {
      layer.remove() }
  });
  marker.addTo(map);
};

export {
  map,
  MARKER_START,
  returnMainMarkerPosition,
  resetAddressCoordinates,
  addOtherPins,
  removeMarkers
};
