const axios = require('axios');

let options = {
  method: 'POST',
  url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'f54227bb62mshfd38f805f8f2a46p1d757ejsn9240ecbf2581',
    'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
  },
};

async function generateImageUrl(image_text) {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('text', image_text);
    console.log(`making call to rapid api for text ${image_text}`);
    const response = await axios.request({
      ...options,
      data: encodedParams,
    });
    console.log(`result from rapidapi url for text ${image_text} : ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.log(`error in generating image for text ${image_text} ${JSON.stringify(error)}`)
    console.error(error);
  }
}

const ImageGeneratorService = {
  generateImageUrl
}

module.exports = ImageGeneratorService;