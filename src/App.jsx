import { useState, Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particleOptions = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  particles: {
    number: {
      value: 30,
      density: {
        enable: false,
        value_area: 100,
      },
    },
    color: {
      value: "#fff",
    },
    shape: {
      type: "star",
      options: {
        sides: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 4,
      random: false,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    rotate: {
      value: 1,
      random: true,
      direction: "clockwise",
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 250,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: ["grab"],
      },
      onclick: {
        enable: false,
        mode: "bubble",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  background: {
    color: "linear-gradient(89deg, #ff5edf 0%, #04c8de 100%);",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = "9b6d8f5038614216ae79462f490b8447";
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = "irll654s37a0";
const APP_ID = "image-recognition";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
let IMAGE_URL = "";
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = (image) => {
    this.setState({ imageUrl: this.state.input });
    console.log(this.state.input + " " + this.state.imageUrl);
    IMAGE_URL = image;
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: image,
            },
          },
        },
      ],
    });
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  async componentDidMount() {
    await this.particlesInit(); // Call particlesInit in componentDidMount
  }

  particlesInit = async (main) => {
    console.log(main);
    // Assuming loadFull is a function you've defined elsewhere
    await loadFull(main);
  };

  render() {
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={this.particlesInit} // Use "this.particlesInit"
          // Assuming particleOptions is defined elsewhere
          options={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition image={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
