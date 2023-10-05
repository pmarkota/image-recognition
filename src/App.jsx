import { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleOptions from "./configs/ParticleOptions";

const PAT = "9b6d8f5038614216ae79462f490b8447";
const USER_ID = "irll654s37a0";
const APP_ID = "image-recognition";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map((box) => {
      return box.region_info.bounding_box;
    });
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const box = clarifaiFace.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
    return box;
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  useEffect(() => {
    setBox(box);
  }, [box]);

  async function loadParticles(main) {
    await loadFull(main);
  }
  // The empty dependency array ensures this effect runs only once, like componentDidMount

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const onRouteChange = (pRoute) => {
    if (pRoute === "signout") {
      setIsSignedIn(false);
    } else if (pRoute === "home") {
      setIsSignedIn(true);
    }
    setRoute(pRoute);
  };
  //? This is the new onButtonSubmit function
  const onButtonSubmit = () => {
    setImageUrl(input);
  };
  //? This useEffect hook will run every time the imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: imageUrl, // Use imageUrl directly here
              },
            },
          },
        ],
      });

      console.log("this is the raw  + " + raw);
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
        },
        body: raw,
      };
      fetch(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          "/versions/" +
          MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const a = displayFaceBox(calculateFaceLocation(result));
        })
        .catch((error) => console.log("error", error));
    }
  }, [imageUrl]);

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={loadParticles}
        options={particleOptions}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
