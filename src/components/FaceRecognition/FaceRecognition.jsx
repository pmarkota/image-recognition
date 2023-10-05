import React, { useEffect, useState } from "react";
import "../FaceRecognition/FaceRecognition.css";

export const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="flex-centerr ma">
      <div className="absolute mt2" id="bounding-box">
        {" "}
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
