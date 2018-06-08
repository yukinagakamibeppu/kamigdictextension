// this is the code which will be injected into a given page...
// Script for https://www.google.com/search?q=definition

(function() {
  console.log("main.js func start");

  // Adjust position
  document.getElementById("center_col").setAttribute("style", "margin-left: 0; width:500px");
  document.getElementById("searchform").setAttribute("style", "display: none");
  document.getElementById("sfcnt").setAttribute("style", "display: none");
  document.getElementById("top_nav").setAttribute("style", "display: none");
  document.getElementById("appbar").setAttribute("style", "display: none");
  document.getElementById("foot").setAttribute("style", "display: none");
  document.getElementById("extrares").setAttribute("style", "display: none");

  // Prepare iframe for image preview
  var iframe = document.createElement("iframe");
  iframe.setAttribute("style", "position:absolute; top:0px; left:502px; width: 400px; height:800px;");
  document.body.appendChild(iframe);
  //iframe.addEventListener("load", function() {
  //  // hide tag filter buttons
  //  document.getElementById("taw").setAttribute("style", "display: none");
  //});


  var input = null;
  function setInputChangeEvent() {
    console.log("setInputChangeEvent called");

    var inputList = document.getElementsByClassName("dw-sbi");
    if (inputList.length <= 0) {
      console.error("Target input element not found");
      return;
    }
    if (input != inputList[0]) {
      console.log("input tag recreated...?");
    }
    input = inputList[0];


    input.addEventListener("change", function(event) {
      console.log("handle input event");

      var text = event.target.value;
      if (text != null && text.length > 1) {
        iframe.src = "https://www.google.com/search?tbm=isch&q=" + text;
      }

      setTimeout(function() {
        // Play pronounce
        var audioTags = document.getElementsByTagName("audio");
        if (audioTags.length > 0) {
          audioTags[0].play();
        }

        // Delay execution because google reload element...
        var els = document.getElementsByClassName("lr_dct_trns");
        if (els.length <= 0) {
          console.log("element lr_dct_trns not found");
          return;
        }
        var attr = "position:absolute; top:-60px; left:300px; background-color: rgba(0,0,0,0.1);";
        attr += "max-height: 255px; overflow:auto";
        els[0].setAttribute("style", attr);

      }, 500);

    });

  }

  // Reset event by timer because handlers are removed automatically
  var startTime = new Date().getTime();
  var timer = setInterval(function() {
    setInputChangeEvent();

    // If too long, kill timer
    var now = new Date().getTime();
    var diffMilliSec = now - startTime;
    var diffMin = Math.floor(diffMilliSec / (1000 * 60));
    if (diffMin > 180) {
      clearInterval(timer);
    }
  }, 500);

})();
