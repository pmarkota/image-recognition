import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
  const { onInputChange, onButtonSubmit } = props;
  return (
    <div>
      <p className="f3 tc black">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="flex-centerr">
        <div className="form flex-centerr pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            id="input"
            onChange={onInputChange}
          />
          <button
            className="tc w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              onButtonSubmit(document.getElementById("input").value);
            }}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
