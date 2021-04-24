class PhotoFilter {
  constructor(initialState){
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
    }
  }
  nextPicture(){
    this.state = {
      ...this.state,
      currentPicture: this.state.currentPicture + 1,
    }
  }
  loadPicture(loadedPicture){
    this.state ={
      ...this.state,
      picture: this.state.picture.push(loadedPicture),
    }
  }
  savePicture(){
    return this.state.picture[this.state.currentPicture];
  }
  changeFilter(filterName, filterProperty) {
    this.state = {
      ...this.state,
      [filterName]: filterProperty
    }
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
})

const blur = document.querySelector('#blur');
blur.oninput = () => {
  document.querySelector('#blurResult').innerHTML = blur.value
  App.changeFilter('blur', blur.value)
  
}

const invert = document.querySelector('#invert');
invert.oninput = () => {
  document.querySelector('#invertResult').innerHTML = invert.value;
  App.changeFilter('invert', invert.value);
}

const sepia = document.querySelector('#sepia');
sepia.oninput = () => {
  document.querySelector('#sepiaResult').innerHTML = sepia.value;
  App.changeFilter('sepia', sepia.value);
  console.log(App)
}

const saturate = document.querySelector('#saturate');
saturate.oninput = () => {
  document.querySelector('#saturateResult').innerHTML = saturate.value;
  App.changeFilter('saturate', saturate.value);
  console.log(App)
}

const hue = document.querySelector('#hue');
hue.oninput = () => {
  document.querySelector('#hueResult').innerHTML = hue.value;
  App.changeFilter('hue', saturate.value);
  console.log(App);
}