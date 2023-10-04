import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="pl4">
      <Tilt
        className="shadow-2 tilterinho"
        style={{ height: "150px", width: "150px" }}
        glareEnable={true}
        glareMaxOpacity={1}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="20px"
      >
        <div
          style={{
            height: "150px",
            width: "150px",
          }}
          className="tc pa3"
        >
          <img style={{ paddingTop: "5px" }} src={brain} alt="brain" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
