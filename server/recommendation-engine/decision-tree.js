const DecisionTree = require('decision-tree');
const training_data = [
  { type: 'T-Shirt', color: 'Blue', skinColor: 'Light', height: 'Short', weight: 'Thin', shoulderLength: 'Narrow', },
  { type: 'Jeans', color: 'Black', skinColor: 'Dark', height: 'Tall', weight: 'Heavy', shoulderLength: 'Wide', },
  { type: 'Sweater', color: 'Red', skinColor: 'Light', height: 'Tall', weight: 'Thin', shoulderLength: 'Narrow', },
  { type: 'Shorts', color: 'Green', skinColor: 'Dark', height: 'Short', weight: 'Heavy', shoulderLength: 'Wide', },
  { type: 'Hoodie', color: 'Yellow', skinColor: 'Light', height: 'Tall', weight: 'Heavy', shoulderLength: 'Wide', },
  { type: 'Jacket', color: 'Yellow', skinColor: 'Light', height: 'Tall', weight: 'Heavy', shoulderLength: 'Wide', }
];
const target_feature = 'type';
const training_features = ['skinColor', 'height', 'weight']
var dt = new DecisionTree(target_feature, training_features);
dt.train(training_data);
var predicted_class = dt.predict({
  skinColor: 'Light',
  height: 'Tall',
  weight: 'Heavy'
});
console.log(predicted_class);