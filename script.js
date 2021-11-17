var grammar =
  "#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = Saif | Mustafa;";
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let questions = ["Hi there, do you like Minions?", "How about Bananas?"];
let things = ["Minions", "Bananas"];
var i=0;

document.body.onclick = startRecognition;
  
function startRecognition() {
  recognition.start();
};

recognition.onresult = processSpeech;

function processSpeech(event) {
  var inputSpeech = event.results[0][0].transcript;
  var questionText = document.getElementById("robotSpeech");
  var answerText = document.getElementById("answer");
  answerText.innerHTML = "You said: " + inputSpeech + ". They are awesome!";
  document.getElementById("robotSpeech").innerHTML = "How about Bananas?";
  recognition.stop();
}

recognition.onend = recognitionEnded;

function recognitionEnded() {
  console.log("onend happened");
  recognition.stop();
}

document.body.onclick = startRecognition;

function startBlinking() {
  setInterval(function () { 
    blink();
  }, 4000);
}
function blink() {
  document.getElementById('leftEye').style.display = "none";
  document.getElementById('leftPupil').style.display = "none";
  document.getElementById('rightEye').style.display = "none";
  document.getElementById('rightPupil').style.display = "none";
  setTimeout(function () {
    document.getElementById('leftEye').style.display = "inline";
    document.getElementById('leftPupil').style.display = "inline";
    document.getElementById('rightEye').style.display = "inline";
    document.getElementById('rightPupil').style.display = "inline";
  }, 500);
}

startBlinking();

var isEditing = false;

function handleMouseClick() {
  console.log("Clicked SVG");
}

function handleEyeMouseClick(event) {
  console.log("Clicked Eye");
  isEditing = !isEditing;
}

function handleMouseMove(event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  let text = document.getElementById("robotSpeech");
  // text.innerHTML = "X:" + mouseX + ", Y:" + mouseY;

  let eyeL = document.getElementById("leftPupil");
  let eyeR = document.getElementById("rightPupil");

  let rectLeft = document.getElementById("leftEye").getBoundingClientRect();
  let rectRight = document.getElementById("rightEye").getBoundingClientRect();
 
  
  /*
    ==== LEFT EYE =====
    x = 482.5
    y = -21.5
    width = 100
    height = 100
    top = -21.5
    right = 582.5
    bottom = 78.5
    left = 482.5 
  */
  
  /*
    ==== RIGHT EYE =====
    x = 1192.5
    y = -21.5
    width = 100
    height = 100
    top = -21.5
    right = 1292.5
    bottom = 78.5
    left = 1192.5 
  */
  
  // <=10% gives best results
  
  posX = 0.03 * (mouseX - (document.body.clientWidth - mouseX));
  posY = 0.05 * (mouseY - (document.body.clientHeight - mouseY));
  
  eyeL.style.transform = `translate(${posX}px, ${posY}px)`;
  eyeR.style.transform = `translate(${posX}px, ${posY}px)`;
  

}

// Change last optional variable (useCapture) to "true" to have events trickle down (from svg to circle) instead of bubbleing up (from circle to svg)
var svg = document.getElementById("faceSVG");
svg.addEventListener("click", handleMouseClick, false);
var leftEye = document.getElementById("leftEye");
leftEye.addEventListener("click", handleEyeMouseClick, false);