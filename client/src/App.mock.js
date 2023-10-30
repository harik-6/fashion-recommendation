import React, { useState, useEffect } from 'react';
import { RecommendationImages, Page, NavigationBar, Preloader } from './components';

const mockData = [
  {
    "id": 1,
    "type": " T-Shirt",
    "color": "Red",
    "image": {
      "id": "66CEU08LD0P5G3SSDHCV1698575755.2340846",
      "url": "https://5.imimg.com/data5/PU/AM/FH/SELLER-880799/red-cotton-t-shirts-500x500.jpg",
    }
  },
  {
    "id": 2,
    "type": " Formal shirt",
    "color": "Black",
    "image": {
      "id": "TCZQ7YLU7EH06BZ3TTRG1698575757.2046175",
      "url": "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7208127/2018/8/23/5dbc44c4-d171-4559-9944-37ce3dd1437f1535005234548-na-6341535005234394-1.jpg",
    }
  },
  {
    "id": 3,
    "type": " Jeans",
    "color": "White",
    "image": {
      "id": "N9SC7MCKD6LOFXP4UGM21698575759.003108",
      "url": "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-jean/5/t/s/15-16-years-wg-7-8-captainsparro-original-imagzzxpacw4buxg.jpeg?q=90",
    }
  }
]

const styles = {
  button: {
    width: "250px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "2px solid white",
    borderRadius: "16px",
    padding: "8px 0",
    backgroundColor: "#FFC436",
    cursor: 'pointer'
  },
  featurep: { margin: '2px', padding: '2px' }
}


function AppMock() {
  const [image, setImage] = useState(null);
  const [imageFeatures, setImageFeatures] = useState(null);
  const [showRec, setShowRec] = useState(false);
  const [loader, setLoader] = React.useState({ loading: false, message: '' });

  useEffect(() => {
    setTimeout(() => setImage("image"), 3000)
  }, [])


  function resetAll() {
    setTimeout(() => setImage("image"), 3000);
    setShowRec(false);
    setImageFeatures(null);
  }

  async function uploadImage() {
    setLoader({ loading: true, message: 'Analysing image for features' });
    setImageFeatures({
      "skin_color": "#FDF1CB",
      "skin_tone": "Fair",
      "gender": "Female",
      "age": 27
    });
    setTimeout(() => {
      setLoader({ loading: false, message: '' });
    }, 5 * 1000);
  }


  async function getRecommendations() {
    setLoader({ loading: true, message: 'Getting recommendations' });
    setTimeout(() => {
      setShowRec(true);
      setLoader({ loading: false, message: '' });
    }, 5 * 1000)
  }

  if (loader.loading) {
    return <Page>
      <NavigationBar />
      <Preloader message={loader.message} />
    </Page>
  }

  if (showRec) {
    return <Page>
      <NavigationBar />
      <RecommendationImages data={mockData} onBack={resetAll} />
    </Page>
  }

  return (
    <Page>
      <NavigationBar />
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        gap: "1.5rem"
      }} >
        <h3>Demo with sample image</h3>
        <img
          height="320px"
          width="220px"
          alt="sample-person"
          src="sample-image.avif"
        />
        {
          imageFeatures === null ? <></> : (
            <div >
              <p style={styles.featurep} >Skin color : {imageFeatures['skin_color']}</p>
              <p style={styles.featurep} >Skin tone : {imageFeatures['skin_tone']}</p>
              <p style={styles.featurep} >Gender : {imageFeatures['gender']}</p>
              <p style={styles.featurep} >Age : {imageFeatures['age']}</p>
              {/* <p>Shoulder : {imageFeatures['skin_color']}</p> */}
            </div>
          )
        }
        {
          imageFeatures === null ? (
            <button
              onClick={uploadImage}
              style={{ ...styles.button, opacity: image === null ? 0.5 : 1 }} disabled={image === null}  >
              Upload image
            </button>
          ) : (<button
            onClick={getRecommendations}
            style={{ ...styles.button }} >
            Get recommendation
          </button>)
        }
      </div>
    </Page>
  )

}




export default AppMock;
