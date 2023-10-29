const app = require('express')();
const port = 9000;
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const FeatureExtractor = require('./feature-extractor/index');
const RecommendationEngine = require('./recommendation-engine/index');
const ImageGeneratorService = require('./image-generator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imageDestination = path.join(__dirname, 'images');
    cb(null, imageDestination);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + ".png";
    cb(null, fileName);
  }
});
const upload = multer({ storage });

app.use(cors());

app.post('/image', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  console.log(`Image uploaded to ${imagePath}`);
  console.log('Extracting feature');
  const feature = await FeatureExtractor.extractFeature(imagePath);
  res.status(200).json(feature);
});

app.post('/recommendation', async (req, res) => {
  const raw_user_features = req.body;
  console.log(`Raw user features ${raw_user_features}`);
  let recommendations = await RecommendationEngine.getPersonRecommendation(raw_user_features);
  for (let i = 0; i < recommendations.length; i++) {
    let rec = recommendations[i];
    const image_text = `a ${rec.color} ${rec.type}`;
    console.log(`generating image for text ${image_text}`);
    rec['image'] = await ImageGeneratorService.generateImageUrl(image_text);
    recommendations[i] = rec;
  }
  res.status(200).json(recommendations);
});

app.listen(port, () => {
  console.log('Application server running in port ' + port);
})