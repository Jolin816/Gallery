import './ViewPage.css'
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Caption from '../components/caption.jsx';
import ImageObject from '../classes/ImageObject.js';
import React from 'react';

function ViewPage() {

  // TEMPORARY

  const img1 = new ImageObject("https://i.natgeofe.com/n/0f6f9302-e62e-4841-bfd5-6cd8b96eac4a/POY1_16x9.jpg?w=1200","Eagles",2019,"Four eagles in the winter.", "Eric");
  const img2 = new ImageObject("https://i.natgeofe.com/n/1ac334a0-ac4e-4745-a292-169b0a349e8b/grand-peaks-mount-cook_16x9.jpg","Mountains",2023,"Misty mountains, black and white.", "Eric");
  const img3 = new ImageObject("https://mgm-website-production.oss-cn-hongkong.aliyuncs.com/uploads/2018/01/salvador-dali-1024.jpg","Dali",1950,"Famous portrait of artist Salvador Dali.", "Eric");
  

  // All images will be saved in a list of ImageObject elements
  const images = [img1, img2, img3];

  // State that keeps track of which image is currently being displayed
  const [page, setPage] = useState(1);

  // Handles inputs from left and right arrow buttons on keyboard
  const handleKeyDown = (event) => {
    const code = event.code;
    if (code == "ArrowRight" && page < (images.length - 1)) {
      paginate(1);
    } else if (code == "ArrowLeft" && page > 0) {
      paginate(-1);
    }
  };

  // Effect that adds an event listener everytime page is updated and removes
  // the listener once unmounted.
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [page]);

  // paginate(newDirection) takes input of 1 or -1 depending on the direction
  //   of the rotation. Updates page state and triggers slide transition.
  // effects:
  // *  affects state
  // *  modifies css  
  const paginate = (newDirection) => {

    if (newDirection > 0) {
      document.getElementById('image').style.animation="right_image_exit 0.5s ease-in";
      document.getElementById('caption').style.animation="right_caption_exit 0.5s ease-in";
      document.getElementById('toplight').style.animation="right_toplight_exit 0.5s ease-in";
    } else {
      document.getElementById('image').style.animation="left_image_exit 0.5s ease-in";
      document.getElementById('caption').style.animation="left_caption_exit 0.5s ease-in";
      document.getElementById('toplight').style.animation="left_toplight_exit 0.5s ease-in";
    }
    
    setTimeout(() => {

      setPage(page+newDirection);

      if (newDirection > 0) {
        document.getElementById('image').style.animation="right_image_enter 0.5s ease-out";
        document.getElementById('caption').style.animation="right_caption_enter 0.5s ease-out";
        document.getElementById('toplight').style.animation="right_toplight_enter 0.5s ease-out";
      } else {
        document.getElementById('image').style.animation="left_image_enter 0.5s ease-out";
        document.getElementById('caption').style.animation="left_caption_enter 0.5s ease-out";
        document.getElementById('toplight').style.animation="left_toplight_enter 0.5s ease-out";
      }

    }, 480);
  };
  
  return (
    <>
    <div id="body">

      <img id="toplight" src="assets/images/toplight.png"></img>

      {/* Left slide button */}
      {page > 0 && 
      <button id="left" onClick={() => paginate(-1)}>
      </button>
      }

      {/* Image being Displayed */}
      <img id = "image" src={images[page].url}></img>

      {/* Caption button */}
      <Popup trigger = 
        {<button id="caption"> </button>}
          modal nested
          contentStyle={{width: "44%"}}>
          {
            <Caption info= {images[page%(images.length)]} style = {{ width: "10%" }}/>
          } 
      </Popup>

      {/* Right slide button */}
      { page < images.length-1 && 
        <button id="right" onClick={() => paginate(1)}>
        </button>
      }
    </div>

    <div className='footer'>
      <p id="sitename">SITE NAME</p>
      <div style = {{width: "15%", height:"0px",border:"2px solid", color:"#9E9E9E"}}></div>
    </div>

    </>
  )
}

export default ViewPage;