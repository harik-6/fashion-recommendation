// import React, { useState } from 'react';
// import ApiService from './service';
// import ImageUploader from 'react-image-upload'
// import 'react-image-upload/dist/index.css'


// const mockData = [
//   {
//     "id": 1,
//     "type": "T-Shirt",
//     "color": "Blue",
//     "skin": "Light",
//     "height": "Short",
//     "weight": "Thin",
//     "shoulder": "Narrow",
//     "occasion": "wedding",
//     "image": {
//       "id": "66CEU08LD0P5G3SSDHCV1698575755.2340846",
//       "status": "processing",
//       "url": "https://audiospace-1-u9912847.deta.app/getpic?id=66CEU08LD0P5G3SSDHCV1698575755.2340846",
//       "servercode": 0
//     }
//   },
//   {
//     "id": 2,
//     "type": "Shirt",
//     "color": "Red",
//     "skin": "Dark",
//     "height": "Tall",
//     "weight": "Thin",
//     "shoulder": "Wide",
//     "occasion": "casual",
//     "image": {
//       "id": "TCZQ7YLU7EH06BZ3TTRG1698575757.2046175",
//       "status": "processing",
//       "url": "https://audiospace-1-u9912847.deta.app/getpic?id=TCZQ7YLU7EH06BZ3TTRG1698575757.2046175",
//       "servercode": 8
//     }
//   },
//   {
//     "id": 3,
//     "type": "Jeans",
//     "color": "Black",
//     "skin": "Light",
//     "height": "Medium",
//     "weight": "Average",
//     "shoulder": "N/A",
//     "occasion": "formal",
//     "image": {
//       "id": "N9SC7MCKD6LOFXP4UGM21698575759.003108",
//       "status": "processing",
//       "url": "https://audiospace-1-u9912847.deta.app/getpic?id=N9SC7MCKD6LOFXP4UGM21698575759.003108",
//       "servercode": 7
//     }
//   }
// ]

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
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '90vh'
//       }} >
//         <div className='page-loader' />
//         <h2>{loader.message}</h2>
//       </div>
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

// function RecommendationImages({ onBack }) {
//   return <div style={{
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: "center",
//     minHeight: "90vh",
//   }} >
//     <p onClick={onBack} style={{ textDecoration: 'underline', cursor: 'pointer' }} >{"< Back"}</p>
//     {
//       mockData.map((dress) => {
//         const dressName = dress.color + dress.type
//         return (
//           <>
//             <img
//               height="350px"
//               width="300px"
//               alt={dressName}
//               src={dress.image.url}
//             />
//             <p>
//               {dressName}
//             </p>
//           </>
//         )
//       })
//     }
//   </div>
// }

// function NavigationBar() {
//   return (
//     <div style={{
//       display: "flex",
//       color: "white",
//       justifyContent: "center",
//       backgroundColor: "#0C356A",
//     }} >
//       <h2>
//         Fashion recommendation
//       </h2>
//     </div>
//   )
// }

// function Page({ children }) {
//   return <div style={{
//     backgroundColor: 'grey',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     overflow: 'hidden'

//   }} >
//     <div style={{
//       maxHeight: "100vh",
//       minHeight: "100vh",
//       maxWidth: "425px",
//       backgroundColor: 'white',
//       overflow: 'scroll',
//       scrollbarWidth: "0px"
//     }} >
//       {children}
//     </div>
//   </div>
// }


// export default App;
