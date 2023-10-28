const getMlDistanceRecommendation = require('./ml-distance');

async function getPersonRecommendation(raw_user_features) {
  console.log(`Calling get ml distance recommendation ${raw_user_features}`);
  const personRecoms = await getMlDistanceRecommendation(raw_user_features);
  return personRecoms;
}

// async function getPeerRecommendation() {

// }

const RecommendationEngine = {
  getPersonRecommendation,
  // getPeerRecommendation
}

module.exports = RecommendationEngine