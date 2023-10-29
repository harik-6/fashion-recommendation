const ApiService = {
  uploadImage: async (imageFile) => {
    let formData = new FormData();
    formData.append('image', imageFile);
    return new Promise((resolve, reject) => {
      return fetch(`http://localhost:9000/image`, {
        method: 'POST',
        body: formData
      })
        .then((response) => {
          return resolve(response.json());
        })
        .catch(error => {
          return reject({ error: 'error uploading image ' + error?.message })
        });
    })
  },
  getRecommendations: async (imageFeature) => {
    return new Promise((resolve, reject) => {
      return fetch(`http://localhost:9000/image`, {
        method: 'POST',
        body: JSON.stringify(imageFeature)
      })
        .then((response) => {
          return resolve(response.json());
        })
        .catch(error => {
          return reject({ error: 'error getting recommendations' + error?.message })
        });
    })
  }
}

export default ApiService;