import React from 'react';
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'

const mockData = [
  {
    "id": "sfw",
    "image": "https://i0.wp.com/me99.in/wp-content/uploads/2021/08/Royal-Blue-Plain-T-Shirt.png?fit=1440%2C1608&ssl=1",
    "name": "Blue T-shirt"
  },
  {
    "id": "qoisufh",
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8fDA%3D',
    name: 'Red skirt'
  },
  {
    id: "27r",
    image: "https://images.meesho.com/images/products/158975668/napsf_512.webp",
    name: "Black jean"
  }
]

function App() {
  const [image, setImage] = React.useState(null);
  const [showRec, setShowRec] = React.useState(false);

  function resetAll() {
    setImage(null)
    setShowRec(false)
  }

  function getImageFileObject(imageFile) {
    setImage(imageFile["file"]);
  }

  function runAfterImageDelete(file) {
    setImage(null);
  }

  function showRecommendations() {
    setShowRec(true);
  }

  if (showRec) {
    return <Page>
      <NavigationBar />
      <RecommendationImages onBack={resetAll} />
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

        <ImageUploader
          style={{ transform: "scale(1.5)" }}
          onFileAdded={(img) => getImageFileObject(img)}
          onFileRemoved={(img) => runAfterImageDelete(img)}
        />
        <h3>Upload your photo</h3>
        <button
          onClick={showRecommendations}
          style={{
            width: "250px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "2px solid white",
            borderRadius: "16px",
            padding: "8px 0",
            backgroundColor: "#FFC436",
            cursor: 'pointer',
            opacity: image === null ? 0.5 : 1
          }} disabled={image === null}  >
          Get recommendations
        </button>
      </div>
    </Page>
  )

}

function RecommendationImages({ onBack }) {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    minHeight: "90vh",
  }} >
    <p onClick={onBack} style={{ textDecoration: 'underline', cursor: 'pointer' }} >{"< Back"}</p>
    {
      mockData.map((dress) => {
        return (
          <>
            <img
              height="350px"
              width="300px"
              alt={dress.name}
              src={dress.image}
            />
            <p>
              {dress.name}
            </p>
          </>
        )
      })
    }
  </div>
}

function NavigationBar() {
  return (
    <div style={{
      display: "flex",
      color: "white",
      justifyContent: "center",
      backgroundColor: "#0C356A",
    }} >
      <h2>
        Fashion recommendation
      </h2>
    </div>
  )
}

function Page({ children }) {
  return <div style={{
    backgroundColor: 'grey',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden'

  }} >
    <div style={{
      maxHeight: "100vh",
      minHeight: "100vh",
      maxWidth: "425px",
      backgroundColor: 'white',
      overflow: 'scroll',
      scrollbarWidth: "0px"
    }} >
      {children}
    </div>
  </div>
}


export default App;
