const { exec } = require('child_process');
const convert = require('color-convert');
const fs = require('fs');

const skinToneRanges = {
  'light': [[90, -10, 10], [100, 20, 40]],
  'medium-light': [[70, 10, 10], [90, -10, 10]],
  'medium': [[50, 20, 10], [70, 10, 10]],
  'medium-dark': [[30, 30, 10], [50, 20, 10]],
  'dark': [[10, 40, 10], [30, 30, 10]]
};

function classifySkinTone(hexColor) {
  // Convert the RGB color to CIELAB color space
  const rgbColor = convert.hex.rgb(hexColor);
  const labColor = convert.rgb.lab(rgbColor);

  // Adjust the skin tone ranges based on the input color
  const adjustedSkinToneRanges = {};
  for (const [skinTone, [lowerRange, upperRange]] of Object.entries(skinToneRanges)) {
    const labLowerRange = convert.rgb.lab(lowerRange);
    const labUpperRange = convert.rgb.lab(upperRange);
    const distanceLower = Math.sqrt((labColor[0] - labLowerRange[0]) ** 2 +
      (labColor[1] - labLowerRange[1]) ** 2 +
      (labColor[2] - labLowerRange[2]) ** 2);
    const distanceUpper = Math.sqrt((labColor[0] - labUpperRange[0]) ** 2 +
      (labColor[1] - labUpperRange[1]) ** 2 +
      (labColor[2] - labUpperRange[2]) ** 2);
    const maxDistance = Math.max(distanceLower, distanceUpper);
    const scaleFactor = maxDistance / Math.sqrt(3); // Scale factor to ensure that the adjusted range covers the input color
    const adjustedLowerRange = [
      Math.max(labLowerRange[0] - scaleFactor, 0),
      Math.max(labLowerRange[1] - scaleFactor, -128),
      Math.max(labLowerRange[2] - scaleFactor, -128)
    ];
    const adjustedUpperRange = [
      Math.min(labUpperRange[0] + scaleFactor, 100),
      Math.min(labUpperRange[1] + scaleFactor, 128),
      Math.min(labUpperRange[2] + scaleFactor, 128)
    ];
    adjustedSkinToneRanges[skinTone] = [convert.lab.rgb(adjustedLowerRange), convert.lab.rgb(adjustedUpperRange)];
  }

  // Calculate the distance between the input color and each skin tone range
  const distances = {};
  for (const [skinTone, [lowerRange, upperRange]] of Object.entries(adjustedSkinToneRanges)) {
    const distanceLower = Math.sqrt((rgbColor[0] - lowerRange[0]) ** 2 +
      (rgbColor[1] - lowerRange[1]) ** 2 +
      (rgbColor[2] - lowerRange[2]) ** 2);
    const distanceUpper = Math.sqrt((rgbColor[0] - upperRange[0]) ** 2 +
      (rgbColor[1] - upperRange[1]) ** 2 +
      (rgbColor[2] - upperRange[2]) ** 2);
    distances[skinTone] = Math.min(distanceLower, distanceUpper);
  }

  // Find the skin tone with the smallest distance to the input color
  let nearestSkinTone = 'unknown';
  let smallestDistance = Infinity;
  for (const [skinTone, distance] of Object.entries(distances)) {
    if (distance < smallestDistance) {
      nearestSkinTone = skinTone;
      smallestDistance = distance;
    }
  }

  return nearestSkinTone;
}

async function runPySkinFinder(image_path) {
  const cmd = `stone -i ${image_path}`;
  console.log(`Executing command ${cmd}`)
  return new Promise((resolve, reject) => {
    return exec(cmd, (error, _, stderr) => {
      if (error) {
        return reject(`error: ${error.message}`);
      }
      if (stderr) {
        return reject(`stderr: ${stderr}`);
      }
      return resolve(true);
    });
  })
}

async function writeSkinToneToResulFile(image_path) {
  try {
    await runPySkinFinder(image_path);
  } catch (err) {
    console.log(`error in writing skin tone to file ${err}`);
  }
}

function readSkinToneFromFile() {
  try {
    const file_path = './result.csv';
    const resultsFile = fs.readFileSync(file_path, 'utf-8');
    const result = resultsFile.split("\n")[1].split(",")[7];
    fs.rmSync(file_path)
    const skin_tone = classifySkinTone(result);
    return {
      skin_color: result,
      skin_tone
    };
  } catch (e) {
    console.log(`error in detecting skin tone ${e}`)
    throw new Error(e);
  }
}

async function detectSkinTone(image_path) {
  console.log("Detecting Skin color and Skin tone...")
  await writeSkinToneToResulFile(image_path);
  return readSkinToneFromFile()
}

module.exports = detectSkinTone;