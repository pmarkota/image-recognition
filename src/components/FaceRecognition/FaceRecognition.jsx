import React, { useEffect, useState } from "react";
import "../FaceRecognition/FaceRecognition.css";

export const FaceRecognition = ({ imageUrl, box }) => {
  const faces = box.map((face, i) => {
    return (
      <div
        key={i}
        className="bounding-box"
        style={{
          top: face.topRow,
          left: face.leftCol,
          bottom: face.bottomRow,
          right: face.rightCol,
        }}
      ></div>
    );
  });
  return (
    <div className="flex-centerr ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {faces}
      </div>
    </div>
  );
};

export default FaceRecognition;
