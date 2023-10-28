// const path = require('path');
const detectSkinTone = require('./skin-tone-finder');
const detectAgeAndGender = require('./age-gender-finder');
const detectShoulderType = require('./shoulder-type-finder');

async function extractFeature(image_path) {
  // const image_path = path.join(__dirname, '../images', 'dark.jpeg');
  const skin_tone_obj = await detectSkinTone(image_path);
  const age_gender_obj = await detectAgeAndGender(image_path);
  const shoulder_type = detectShoulderType(image_path);
  console.log("Extracted features ", {
    ...skin_tone_obj,
    ...age_gender_obj,
    shoulder_type
  })
  return {
    ...skin_tone_obj,
    ...age_gender_obj,
    shoulder_type
  }
}

const FeatureExtractor = {
  extractFeature
}

module.exports = FeatureExtractor;