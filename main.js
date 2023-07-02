/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words

const EasyWords = [
  "Calling",
  "Phone",
  "Quran",
  "Arabic",
  "English",
  "Hello",
  "Code",
  "Town",
  "Scala",
  "Styling",
  "Cascade",
  "Coding",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

const NormalWords = [
  "Calling",
  "Phone",
  "Quran",
  "Arabic",
  "English",
  "Hello",
  "Code",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Paradigm",
  "Styling",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

const HardWords = [
  "Calling",
  "Programming",
  "Javascript",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Working",
  "Dependencies",
  "living"
];
const words=[];
// Default Level
if(localStorage.getItem("defaultLevelName")==undefined)
{
  localStorage.setItem("defaultLevelName","Normal");
  localStorage.setItem("myArray",NormalWords);
}

let ArrayFromLocalStorage=localStorage.getItem("myArray");
const split_string = ArrayFromLocalStorage.split(",");


 for(i=0;i<split_string.length;i++){
   words.push(split_string[i]);
 }

  
  // Setting Levels
  const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
  };
  


  
  
  let defaultLevelName = localStorage.getItem("defaultLevelName"); // Change Level From Here
  let defaultLevelSeconds = lvls[defaultLevelName];
  
  // Catch Selectors
  let startButton = document.querySelector(".start");
  let lvlNameSpan = document.querySelector(".message .lvl");
  let lvlNameSpanMyLevel = document.querySelector(".header .myLevel");
  let secondsSpan = document.querySelector(".message .seconds");
  let theWord = document.querySelector(".the-word");
  let upcomingWords = document.querySelector(".upcoming-words");
  let input = document.querySelector(".input");
  let timeLeftSpan = document.querySelector(".time span");
  let scoreGot = document.querySelector(".score .got");
  let scoreTotal = document.querySelector(".score .total");
  let finishMessage = document.querySelector(".finish");
  let replay=document.querySelector(".replay");
  // Setting Level Name + Seconds + Score

  
  
  lvlNameSpan.innerHTML = defaultLevelName;
  lvlNameSpanMyLevel.innerHTML= defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words.length;

  function easyLvl(){
    defaultLevelName="Easy"
    document.getElementById("aa").classList.remove("hard");
    document.getElementById("aa").classList.remove("normal");
    document.getElementById("aa").classList.add("easy");
    let defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    lvlNameSpanMyLevel.innerHTML= defaultLevelName;
    localStorage.setItem("defaultLevelName","Easy");
    localStorage.setItem("myArray",EasyWords);
    let ArrayFromLocalStorage=localStorage.getItem("myArray");
    const split_string = ArrayFromLocalStorage.split(",");
    words.length=0;
    for(i=0;i<split_string.length;i++){
      words.push(split_string[i]);
    }
    console.log(words);
    scoreTotal.innerHTML = words.length;
  }

  function normalLvl(){
    defaultLevelName="Normal"
    document.getElementById("aa").classList.remove("easy");
    document.getElementById("aa").classList.remove("hard");
    document.getElementById("aa").classList.add("normal");
    let defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    lvlNameSpanMyLevel.innerHTML= defaultLevelName;
    localStorage.setItem("defaultLevelName","Normal");
    localStorage.setItem("myArray",NormalWords);
    let ArrayFromLocalStorage=localStorage.getItem("myArray");
    const split_string = ArrayFromLocalStorage.split(",");
    words.length=0;
    for(i=0;i<split_string.length;i++){
      words.push(split_string[i]);
    }
    console.log(words);
    scoreTotal.innerHTML = words.length;
  }

  function hardLvl(){
    defaultLevelName="Hard"
    document.getElementById("aa").classList.remove("easy");
    document.getElementById("aa").classList.remove("normal");
    document.getElementById("aa").classList.add("hard");
    let defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    lvlNameSpanMyLevel.innerHTML= defaultLevelName;
    localStorage.setItem("defaultLevelName","Hard");
    localStorage.setItem("myArray",HardWords);
    let ArrayFromLocalStorage=localStorage.getItem("myArray");
    const split_string = ArrayFromLocalStorage.split(",");
    words.length=0;
    for(i=0;i<split_string.length;i++){
      words.push(split_string[i]);
    }
    console.log(words);
    scoreTotal.innerHTML = words.length;
  }
  
  // Disable Paste Event
  input.onpaste = function () {
    return false;
  }
  
  // Start Game
  startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
  }
  
  function genWords() {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Remove WordFrom Array
    words.splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = '';
    // Generate Words
    for (let i = 0; i < words.length; i++) {
      // Create Div Element
      let div = document.createElement("div");
      let txt = document.createTextNode(words[i]);
      div.appendChild(txt);
      upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
  }
  
  function startPlay() {
    if(words.length===34)
    {
        timeLeftSpan.innerHTML = defaultLevelSeconds+3;
    }
    else{
      
      if(secondsSpan.innerHTML == "5" ){
        defaultLevelSeconds = 5
      }
      else if(secondsSpan.innerHTML == "3" ){
        defaultLevelSeconds = 3
      }
      else{
        defaultLevelSeconds = 2
      }
        timeLeftSpan.innerHTML = defaultLevelSeconds;
    }
    let start = setInterval(() => {
      timeLeftSpan.innerHTML--;
      if (timeLeftSpan.innerHTML === "0") {
        // Stop Timer
        clearInterval(start);
        // Compare Words
        if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
          // Empty Input Field
          input.value = '';
          // Increase Score
          scoreGot.innerHTML++;
          if (words.length > 0) {
            // Call Generate Word Function
            genWords();
          } else {
            let span = document.createElement("span");
            span.className = 'good';
            let spanText = document.createTextNode("Congratz");
            span.appendChild(spanText);
            finishMessage.classList.add("box-shadow-blue");
            finishMessage.classList.remove("display-none");
            finishMessage.prepend(span);
            // Remove Upcoming Words Box
            upcomingWords.remove();
          }
        } else {
          let span = document.createElement("span");
          span.className = 'bad';
          let spanText = document.createTextNode("Game Over");
          span.appendChild(spanText);
          finishMessage.classList.add("box-shadow-red");
          finishMessage.classList.remove("display-none");
          finishMessage.prepend(span);
        }
      }
    }, 1000);
  }

  replay.onclick=function(){
        location.reload();
  }


