// import React, { useState } from 'react';
// import ApiService from './service';
// import { RecommendationImages, Page, NavigationBar, Preloader } from './components';
// import ImageUploader from 'react-image-upload'
// import 'react-image-upload/dist/index.css'


// const styles = {
//   button: {
//     width: "250px",
//     fontSize: "18px",
//     fontWeight: "bold",
//     border: "2px solid white",
//     borderRadius: "16px",
//     padding: "8px 0",
//     backgroundColor: "#FFC436",
//     cursor: 'pointer'
//   },
//   featurep: { margin: '2px', padding: '2px' }
// }


// function App() {
//   const [image, setImage] = useState(null);
//   const [imageFeatures, setImageFeatures] = useState(null);
//   const [showRec, setShowRec] = useState(false);
//   const [recommendations, setRecommendations] = useState([]);
//   const [loader, setLoader] = React.useState({ loading: false, message: '' });

//   function resetAll() {
//     setImage(null)
//     setShowRec(false)
//     setImageFeatures(null);
//   }

//   function getImageFileObject(imageFile) {
//     setImage(imageFile["file"]);
//   }

//   function runAfterImageDelete(file) {
//     resetAll();
//   }

//   async function uploadImage() {
//     setLoader({ loading: true, message: 'Analysing image for features' });
//     let tempImage = image;
//     const features = await ApiService.uploadImage(image);
//     setImageFeatures(features);
//     setImage(tempImage);
//     setLoader({ loading: false, message: '' });
//   }


//   async function getRecommendations() {
//     setLoader({ loading: true, message: 'Getting recommendations' });
//     const recos = await ApiService.getRecommendations(imageFeatures);
//     setRecommendations(recos);
//     setTimeout(() => {
//       setShowRec(true);
//       setLoader({ loading: false, message: '' });
//     }, 10 * 1000)
//   }

//   if (loader.loading) {
//     return <Page>
//       <NavigationBar />
//       <Preloader message={loader.message} />
//     </Page>
//   }

//   if (showRec) {
//     return <Page>
//       <NavigationBar />
//       <RecommendationImages data={recommendations} onBack={resetAll} />
//     </Page>
//   }

//   return (
//     <Page>
//       <NavigationBar />
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "90vh",
//         gap: "1.5rem"
//       }} >
//         <h3>Upload your photo</h3>
//         <ImageUploader
//           style={{ transform: "scale(1.5)", marginBottom: '32px' }}
//           onFileAdded={(img) => getImageFileObject(img)}
//           onFileRemoved={(img) => runAfterImageDelete(img)}
//         />
//         {
//           imageFeatures === null ? <></> : (
//             <div >
//               <p style={styles.featurep} >Skin color : {imageFeatures['skin_color']}</p>
//               <p style={styles.featurep} >Skin tone : {imageFeatures['skin_tone']}</p>
//               <p style={styles.featurep} >Gender : {imageFeatures['gender']}</p>
//               <p style={styles.featurep} >Age : {imageFeatures['age']}</p>
//               {/* <p>Shoulder : {imageFeatures['skin_color']}</p> */}
//             </div>
//           )
//         }
//         {
//           imageFeatures === null ? (
//             <button
//               onClick={uploadImage}
//               style={{ ...styles.button, opacity: image === null ? 0.5 : 1 }} disabled={image === null}  >
//               Upload image
//             </button>
//           ) : (<button
//             onClick={getRecommendations}
//             style={{ ...styles.button }} >
//             Get recommendation
//           </button>)
//         }
//       </div>
//     </Page>
//   )

// }


// export default App;
