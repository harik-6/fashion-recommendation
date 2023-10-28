const { similarity } = require('ml-distance');

const dressTypes = [
  { id: 1, type: 'T-Shirt', color: 'Blue', skin: 'Light', height: 'Short', weight: 'Thin', shoulder: 'Narrow', occasion: 'wedding' },
  { id: 2, type: 'Shirt', color: 'Red', skin: 'Dark', height: 'Tall', weight: 'Thin', shoulder: 'Wide', occasion: 'casual' },
  { id: 3, type: 'Jeans', color: 'Black', skin: 'Light', height: 'Medium', weight: 'Average', shoulder: 'N/A', occasion: 'formal' },
  // Add more dress types here...
];

const getMlDistanceRecommendation = (raw_user_features) => {
  console.log("Raw user features ", raw_user_features);
  // Define the feature vectors for each dress type
  const featureVectors = dressTypes.map(dressType => [
    dressType.skin === 'Light' ? 1 : -1,
    dressType.height === 'Short' ? 1 : dressType.height === 'Medium' ? 2 : 3,
    dressType.weight === 'Thin' ? 1 : dressType.weight === 'Average' ? 2 : 3,
    dressType.shoulder === 'Narrow' ? 1 : dressType.shoulder === 'Wide' ? -1 : 0,
    dressType.occasion === 'wedding' ? 1 : dressType.occasion === 'casual' ? -1 : 0
  ]);
  // Define the feature vector for the user's inputs
  const userFeatures = [
    'Light' === 'Light' ? 1 : -1,
    'Short' === 'Short' ? 1 : 'Medium' === 'Short' ? 2 : 3,
    'Thin' === 'Thin' ? 1 : 'Average' === 'Thin' ? 2 : 3,
    // Add more user inputs here...
  ];
  // Calculate the similarity scores between the user's features and the dress type features
  const similarityScores = featureVectors.map(vector => similarity.cosine(userFeatures, vector));
  console.log(`Similarity scores ${similarityScores}`);
  // Get the top 3 recommended types of dresses for the user
  const recommendedIds = similarityScores.map((score, index) => ({
    id: dressTypes[index].id,
    score
  })).sort((a, b) => b.score - a.score).slice(0, 3).map(data => data.id);
  const recommendedDress = dressTypes.filter(dress => recommendedIds.indexOf(dress.id) !== -1);
  console.log(`Recommended dress types: ${JSON.stringify(recommendedDress)}`);
  return recommendedDress;
}

module.exports = getMlDistanceRecommendation;