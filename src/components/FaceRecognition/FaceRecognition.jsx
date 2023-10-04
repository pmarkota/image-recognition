import React from "react";

export const FaceRecognition = (props) => {
  const { imageUrl } = props;
  return (
    <div className="flex-centerr">
      <img id="inputImage" alt="" src={imageUrl} width="500px" height="auto" />
    </div>
  );
};

export default FaceRecognition;
