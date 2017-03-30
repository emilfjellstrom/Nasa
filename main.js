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
        myObj = JSON.parse(this.responseText);
        document.getElementById("demo").innerHTML = myObj;
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

  postError() {
  if (myObj.error != null){
    document.getElementById("demo").innerHTML = `
  <input id="lon" placeholder="lon" value=""></input>
  <input id="lat" placeholder="lat" value=""></input>
  <button onclick="valueCheck()">nasaEarth</button>`;
  alert(`The image of this section cant be shown! Try again.\n\nError Message: ${myObj.error}`);
  }
  else{
    projectNasa.post();
  };
  },

  post() {
  document.getElementById("demo").innerHTML = `
  <input id="lon" placeholder="lon" value=""></input>
  <input id="lat" placeholder="lat" value=""></input>
  <button onclick="valueCheck()">nasaEarth</button>
  <div id="democontainer" class="box">
  <img class="nasaImage" src="${myObj.url}">
  <p>Date of imagery ${myObj.date}</p>
  </div>`;
  }
})))();

function valueCheck(){
return projectNasa.valueCheck(), projectNasa.postError();
};

const addClass = document.getElementById("addBox");
addClass.addEventListener("click", addBox);

function addBox(){
  document.getElementById("demo2container").classList.add("box");
}

function nasaDaily(){
const url = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";


$.ajax({
  url,
  success(result) {
  if("copyright" in result) {
    $("#copyright").text(`Image Credits: ${result.copyright}`);
  }
  else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  
  if(result.media_type == "video") {
    $("#apod_img_id").css("display", "none"); 
    $("#apod_vid_id").attr("src", result.url);
  }
  else {
    $("#apod_vid_id").css("display", "none"); 
    $("#apod_img_id").attr("src", result.url);
  }
  $("#apod_explaination").text(result.explanation);
  $("#apod_title").text(result.title);
},
  error(error) {
    console.log("Error", error);
 } 
});
};
