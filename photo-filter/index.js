class PhotoFilter {
  constructor(initialState) {
    this.state = initialState;
  }
  reset() {
    this.state = {
      ...this.state,
      blur: 0,
      invert: 0,
      sepia: 0,
      saturare: 0,
      hue: 0,
    };
    const filterInputs = document.querySelectorAll(".filters label > input");
    const filterOutputs = document.querySelectorAll(".filters label > output");
    console.log(filterOutputs)
    filterInputs.forEach(item  =>{
      console.log(filterInputs)
      console.log(item.value)
      item.value = 0;
    })
    filterOutputs.forEach(item  =>{
      item.innerHTML = 0;
    })
  }
  nextPicture() {
    this.state = {
      ...this.state,
      currentPicture: this.state.currentPicture + 1,
    };
  }
  loadPicture(loadedPicture) {
    this.state = {
      ...this.state,
      picture: this.state.picture.push(loadedPicture),
    };
  }
  savePicture() {
    return this.state.picture[this.state.currentPicture];
  }
  changeFilter(filterName, filterProperty) {
    this.state = {
      ...this.state,
      [filterName]: filterProperty,
    };
  }
  openFullScreen() {
    this.state = {
      ...this.state,
      fullScreen: true,
    };
    document.querySelector("html").requestFullscreen();
  }
  closeFullScreen() {
    this.state = {
      ...this.state,
      fullScreen: false,
    };
    document.exitFullscreen();
  }

  init() {
    const blur = document.querySelector("#blur");
    blur.oninput = () => {
      document.querySelector("#blurResult").innerHTML = blur.value;
      this.changeFilter("blur", blur.value);
    };

    const invert = document.querySelector("#invert");
    invert.oninput = () => {
      document.querySelector("#invertResult").innerHTML = invert.value;
      this.changeFilter("invert", invert.value);
    };

    const sepia = document.querySelector("#sepia");
    sepia.oninput = () => {
      document.querySelector("#sepiaResult").innerHTML = sepia.value;
      this.changeFilter("sepia", sepia.value);
    };

    const saturate = document.querySelector("#saturate");
    saturate.oninput = () => {
      document.querySelector("#saturateResult").innerHTML = saturate.value;
      this.changeFilter("saturate", saturate.value);
    };

    const hue = document.querySelector("#hue");
    hue.oninput = () => {
      document.querySelector("#hueResult").innerHTML = hue.value;
      this.changeFilter("hue", saturate.value);
    };

    const fullSreenIcon = document.querySelector(".fullscreen");

    fullSreenIcon.addEventListener("click", (event) => {
      if (this.state.fullScreen) {
        this.closeFullScreen();
      } else {
        
        this.openFullScreen()
      }
    });

    const resetBtn = document.querySelector('.btn-reset');
    resetBtn.addEventListener("click", (event) => {
      this.reset()
    })
  }
}

const App = new PhotoFilter({
  blur: 0,
  invert: 0,
  sepia: 0,
  saturate: 0,
  hue: 0,
  fullScreen: false,
  picture: [],
  currentPicture: 0,
});

App.init();