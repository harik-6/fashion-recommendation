import React from 'react';

function RecommendationImages({ onBack, data }) {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    minHeight: "90vh",
  }} >
    <p onClick={onBack} style={{ textDecoration: 'underline', cursor: 'pointer' }} >{"< Back"}</p>
    {
      data.map((dress) => {
        const dressName = dress.color + dress.type
        return (
          <>
            <img
              height="350px"
              width="300px"
              alt={dressName}
              src={dress.image.url}
            />
            <p>
              {dressName}
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
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }} >
    <div style={{
      maxHeight: "100vh",
      minHeight: "100vh",
      maxWidth: "425px",
      minWidth: "425px",
      backgroundColor: 'white',
      overflow: 'scroll',
      scrollbarWidth: "0px"
    }} >
      {children}
    </div>
  </div>
}


function Preloader({ message }) {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh'
  }} >
    <div className='page-loader' />
    <h2>{message}</h2>
  </div>
}

export {
  RecommendationImages, NavigationBar, Page, Preloader
};
