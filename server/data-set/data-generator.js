const dressTypes = require('./dress-types');
const dressColors = require('./dress-colors');
const skinTones = require('./skin-tones');
const heights = require('./heights');
const weights = require('./weights');
const shoulders = require('./shoulder-types');
const occasions = require('./occasions');

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const generateRandomRecord = () => ({
  type: getRandomItem(dressTypes),
  color: getRandomItem(dressColors),
  skin: getRandomItem(skinTones),
  height: getRandomItem(heights),
  weight: getRandomItem(weights),
  shoulder: getRandomItem(shoulders),
  occasion: getRandomItem(occasions)
});

const records = Array.from({ length: 10 }, generateRandomRecord);

console.log(records);
