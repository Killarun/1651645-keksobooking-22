import {getSimilarOffers} from './data.js';
import {getPops} from './popup.js';

const SIMILAR_OFFER_COUNT = 10;

const testDataArray = getSimilarOffers(SIMILAR_OFFER_COUNT);
const newData = testDataArray[0];

getPops(newData);
