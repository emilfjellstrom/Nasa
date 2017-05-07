//keys :NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo

const projectNasa = ((() => ({
  valueCheck() {
    if (lon.value > 180 || lon.value < -180 || lat.value > 90 || lat.value < -90 || lon.value == 0 || lat.value == 0){
      alert("Wrong input, specify between: lon 180/-180 and lat 90/-90");
    }
    else{
      projectNasa.nasaEarth();
    }
  },

  nasaEarth() {
  const lon = document.getElementById("lon").value;
  const lat = document.getElementById("lat").value; 
  let xhr = new XMLHttpRequest();
  let url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo`;

  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       var myObj = JSON.parse(this.responseText);
       projectNasa.postError(myObj);
      }
      else if (this.status == 404){
        alert("Error!");
      }
  };

  xhr.open("GET", url, false);
  xhr.send();
  console.log(xhr.status);
  console.log(xhr.statusText);
  },

  postError(myObj) {  
  if (myObj.error != null){
    document.getElementById("demo").innerHTML = `
  <input id="lon" placeholder="lon" value=""></input>
  <input id="lat" placeholder="lat" value=""></input>
  <button onclick="valueCheck()">nasaEarth</button>`;
  alert(`The image of this section cant be shown! Try again.\n\nError Message: ${myObj.error}`);
  }
  else{
    projectNasa.post(myObj);
  };
  },

  post(myObj) {
  document.getElementById("demo").innerHTML = `
  <input id="lon" placeholder="lon" value=""></input>
  <input id="lat" placeholder="lat" value=""></input>
  <button onclick="valueCheck();postNasa();">nasaEarth</button>
  <div id="democontainer" class="box">
  <img class="nasaImage" src="${myObj.url}">
  <p>Date of imagery ${myObj.date}</p>
  </div>`;
  }
})))();

function valueCheck(){
return projectNasa.valueCheck();
};
function postNasa(){
return  projectNasa.postError();
}


const apodNasa = ((() => ({

  Apod(){

  let xhr = new XMLHttpRequest();
  let url = `https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo`;

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
       apodNasa.post(myObj);
     }
      else if (this.status == 404){
        alert("Error!");
       }
   };

  xhr.open("GET", url, false);
  xhr.send();
  console.log(xhr.status);
  console.log(xhr.statusText);

},
  post(myObj) {
  if (myObj.copyright != null){
  document.getElementById("demo2").innerHTML = `
  <div id="rightcontainer">
  <button onclick="runApod();postApod();">nasaDaily</button>
  <div id="demo2container" class="box">
  <img class="nasaImage" src="${myObj.url}">
  <p>Image Credits: ${myObj.copyright}
  <p>Date of imagery ${myObj.date}</p>
  <h3>${myObj.title}</h3>
  <p>${myObj.explanation}</p>
  </div>
  </div>`; 
  }
  else{
  document.getElementById("demo2").innerHTML = `
  <div id="rightcontainer">
  <button onclick="runApod();postApod();">nasaDaily</button>
  <div id="demo2container" class="box">
  <img class="nasaImage" src="${myObj.url}">
  <p>Date of imagery ${myObj.date}</p>
  <h3>${myObj.title}</h3>
  <p>${myObj.explanation}</p>
  </div>
  </div>`;
  };
  }

})))();

function runApod(){
  return apodNasa.Apod();
};
function postApod(){
  return apodNasa.post();
};
