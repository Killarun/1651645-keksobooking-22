'use strict'

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min || min < 0) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomShuffleArrayElement = function (elements) {

  const clonedElements = elements.slice(0);
  for (let i = clonedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = swap;
  }
  return clonedElements;
}

