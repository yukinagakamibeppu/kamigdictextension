// this is the code which will be injected into a given page...
// Script for https://www.google.com/search?q=definition

(function() {
  console.log("main.js func start");

  var IMG_SEARCH_QUERY_URL = "https://www.google.com/search?tbm=isch&q=";

  // Adjust layout
  document.getElementById("center_col").setAttribute("style", "margin-left: 0; width:400px");
  document.getElementById("searchform").setAttribute("style", "display: none");
  document.getElementById("sfcnt").setAttribute("style", "display: none");
  document.getElementById("top_nav").setAttribute("style", "display: none");
  document.getElementById("appbar").setAttribute("style", "display: none");
  //document.getElementById("foot").setAttribute("style", "display: none");
  //document.getElementById("extrares").setAttribute("style", "display: none");

  // Prepare iframe for image preview
  var iframe = document.createElement("iframe");
  var iframeStyle = "position:absolute; top:0px; left:402px; width: 800px; height:1600px;";
  iframeStyle += "border: 0; transform: scale(0.5, 0.5); transform-origin: top left";
  iframe.setAttribute("style", iframeStyle);
  document.body.appendChild(iframe);
  iframe.src = IMG_SEARCH_QUERY_URL + "dictionary";

  // Execute setup repeatedly because the page reloads elements after event...
  var dictInput = null; // Dictionary search input element
  var INTERVAL_MILLISEC = 500;
  setInterval(function() {
    console.log("interval func called");

    // Find dictionary input tag
    var input = document.querySelector("input.dw-sbi");
    if (!input) {
      console.error("Target input element not found");
      return;
    }
    if (dictInput != input) {
      console.log("input tag recreated");
      dictInput = input;

      // Adjust input tag layout
      document.querySelector("div.dw-sb-cont").setAttribute("style", "width: 170px;");
    }

    // It seems page removes event listeners from input automatically even if the element stays the same
    dictInput.addEventListener("change", handleDictInputChange);

  }, INTERVAL_MILLISEC);

  // Handle dictionary search input change event
  function handleDictInputChange(event) {
    console.log("handle input event");

    var text = event.target.value;
    if (text != null && text.length > 1) {
      iframe.src = "https://www.google.com/search?tbm=isch&q=" + text;
    }

    // Delay execution because google reload element...
    setTimeout(function() {
      // Play pronounce audio
      var pronunciationAudio = document.querySelector("audio");
      if (pronunciationAudio) {
        pronunciationAudio.play();
      }

      // "Translate" area
      var translateEl = document.querySelector("div.lr_dct_trns");
      if (translateEl) {
        var style = "position:absolute; top:-60px; left:188px;";
        style += "background-color: rgba(0,0,0,0.1);";
        style += "max-height: 255px; overflow:auto;";
        //style += "transform: scale(0.7); transform-origin: left top;"
        translateEl.setAttribute("style", style);
      }

      // Word use image
      var wordUseImg = document.querySelector("#lr_dct_img_use");
      if (wordUseImg) {
        wordUseImg.setAttribute("style", "transform: scale(0.5); transform-origin: left top;");
      }

    }, 500);
  }


})();
