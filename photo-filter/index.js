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
      saturare: 100,
      hue: 0,
    };
    const filterInputs = document.querySelectorAll(".filters label > input");
    const filterOutputs = document.querySelectorAll(".filters label > output");
    filterInputs.forEach((item) => {
      item.value = 0;
    });
    filterOutputs.forEach((item) => {
      item.innerHTML = 0;
    });
    this.createPictureUrl();
  }
  nextPicture() {
    if (this.state.currentPicture > 19) {
      this.state = {
        ...this.state,
        currentPicture: 1,
      };
    } else {
      this.state = {
        ...this.state,
        currentPicture: this.state.currentPicture + 1,
      };
    }
    this.createPictureUrl();
  }
  loadPicture(loadedPicture) {
    this.createPictureUrl(loadedPicture);
  }
  savePicture() {
    const link = document.createElement('a');
    link.download = 'downloadPicture.png';
    link.href = this.state.downLoadImage.toDataURL("image/png")
    link.click();
  }
  changeFilter(filterName, filterProperty) {
    this.state = {
      ...this.state,
      [filterName]: filterProperty,
    };
    this.createPictureUrl();
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
  pictureInit() {
    const date = `${new Date().getHours()}:${new Date().getMinutes()}`;
    console.log(date);
    switch (true) {
      case date > "6:0" && date < "11:59":
        this.state = {
          ...this.state,
          currentUrl: "./assets/images/morning/",
        };
        break;
      case date > "12:0" && date < "17:59":
        this.state = {
          ...this.state,
          currentUrl: "./assets/images/day/",
        };
        break;
      case date > "18:0" && date < "23:59":
        this.state = {
          ...this.state,
          currentUrl: "./assets/images/evening/",
        };
        break;
      case date > "00:00" && date < "5:59":
        this.state = {
          ...this.state,
          currentUrl: "./assets/images/night/",
        };
        break;
    }
    this.createPictureUrl();
  }

  createPictureUrl(loadImage) {
    const image = new Image(500, 500);
    let source;
    if (loadImage) {
      source = URL.createObjectURL(loadImage);
    } else {
      source = `${this.state.currentUrl}${
        this.state.currentPicture < 10
          ? "0" + this.state.currentPicture
          : this.state.currentPicture
      }.jpg`;
    }
    image.src = source;
    image.addEventListener("load", (e) => {
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.filter = `sepia(${this.state.sepia / 100}) blur(${
        this.state.blur * 2
      }px) invert(${this.state.invert}%) saturate(${
        this.state.saturate
      }%) hue-rotate(${this.state.hue}deg)`;
      ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
      this.state = {
        ...this.state,
        downLoadImage: canvas,
      };
    });
  }

  init() {
    this.pictureInit();

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
      this.changeFilter("hue", hue.value);
    };

    const fullSreenIcon = document.querySelector(".fullscreen");
    fullSreenIcon.addEventListener("click", () => {
      if (this.state.fullScreen) {
        this.closeFullScreen();
      } else {
        this.openFullScreen();
      }
    });
      
    const buttonContainer = document.querySelector(".btn-container");
    const buttons = document.querySelectorAll(".btn");
    buttonContainer.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        buttons.forEach((item) => item.classList.remove("btn-active"));
        event.target.classList.add("btn-active");
      }
    })
    const resetBtn = document.querySelector(".btn-reset");
    resetBtn.addEventListener("click", () => {
      this.reset();
    });
    const nextBtn = document.querySelector(".btn-next");
    nextBtn.addEventListener("click", () => {
      this.nextPicture();
    });
    const saveBtn = document.querySelector(".btn-save");
    saveBtn.addEventListener('click',() => {
      this.savePicture()
    })
    const loadBtn = document.querySelector("#btnInput");
    loadBtn.oninput = (event) => {
      this.loadPicture(event.target.files[0])
    };
  }
}

const App = new PhotoFilter({
  blur: 0,
  invert: 0,
  sepia: 0,
  saturate: 100,
  hue: 0,
  fullScreen: false,
  currentPicture: 1,
  currentUrl: "",
  downLoadImage: ''
});

App.init();
