const shoulderType = require('../data-set/shoulder-types');

function detectShoulderType(image_path) {
  console.log('Detecting shoulder type....');
  const difference = (shoulderType.length - 1);
  let random_index = Math.random();
  random_index = Math.floor(random_index * difference);
  return shoulderType[random_index];
}

module.exports = detectShoulderType