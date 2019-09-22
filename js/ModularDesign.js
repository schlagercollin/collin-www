// Store the canvas object into a variable
function createCanvas(hWidth,hHeight) {

  canvasWidth = hWidth.toString();
  canvasHeight = hHeight.toString();
  $myCanvas = $('#myCanvas');
  $myCanvas.attr("width",canvasWidth);
  $myCanvas.attr("height",canvasHeight);

};

var hWidth = 500;
var hHeight = 500;

var INIT_VALUE = 0;

var dotNumber = 500;
var points = [];
var incremental = INIT_VALUE;
var increment = 0.25;
var incrementalp = 2;

function initializeCircle(offsetX,offsetY,radius,parameter) {
    points = [];
    for (i=0; i<dotNumber; i++) {
        $myCanvas.drawRect({
            strokeStyle: 'black',
            strokeWidth: 1,
            x: radius*(Math.cos(Math.cos(parameter/100*2*Math.PI)*2*Math.PI*(i/dotNumber)))+(offsetX), 
            y: radius*(Math.sin(2*Math.PI*(i/dotNumber)))+(offsetY),
            fromCenter: false,
            width: 1,
            height: 1
        });
        points.push([radius*(Math.cos(Math.cos(parameter/100*2*Math.PI)*2*Math.PI*(i/dotNumber)))+(offsetX),
                     radius*(Math.sin(2*Math.PI*(i/dotNumber)))+(offsetY)]);
  
    };

    drawLines(incremental);

};

var parametrics = null;
var animation = null;
var mySlider = null;

$("#slider").click(function() { 
   incremental = Number(slider.value);
   $myCanvas.clearCanvas();
   drawLines(incremental);
});

function pauseAnimation(){
  $('#starter').attr("disabled",false);
  $('#experimental').attr("disabled",true);
  clearInterval(animation);
  clearInterval(parametrics);
};

function resumeAnimation(){
  $('#starter').attr("disabled",true);
    $('#experimental').attr("disabled",false);
  animation = setInterval(animateLines, 100);
};

function parametric(){
  $myCanvas.clearCanvas();
  $('#experimental').attr("disabled",true);
  $('#pauseExperimental').attr("disabled",false);
  parametrics = setInterval(animateCircle, 100);
};

function pauseExperimental(){
  $('#experimental').attr("disabled",false);
  $('#pauseExperimental').attr("disabled",true);
  clearInterval(parametrics);
  incrementalp = 2-increment;
};

function animateLines(){
    incremental = Number(increment + incremental);
    mySlider.slider("value", 100);
    // console.log(incremental);
    $myCanvas.clearCanvas();
    drawLines(incremental);
};

function animateCircle(){
    incrementalp = Number(increment+incrementalp);
    initializeCircle(hHeight/2, hHeight/2, hHeight/2 - 10,incrementalp);

};

var isAnimating = 0;
var isExperimental = 0;

$("#myCanvas").click(function(e){
    if (isAnimating){
        pauseAnimation();
    } else {
        resumeAnimation();
    }
    isAnimating = 1 - isAnimating;
});

$("#myCanvas").dblclick(function(e){
    if (isExperimental){
        pauseExperimental();
    } else {
        parametric();
    }
    isExperimental = 1 - isExperimental;
});


function drawLines(mod){
for (i=0; i<dotNumber; i++) {
  $myCanvas.drawLine({
  strokeStyle: 'black',
  strokeWidth: 1,
  x1: points[Math.floor((i*mod)%dotNumber)][0], y1: points[Math.floor((i*mod)%dotNumber)][1],
  x2: points[i][0], y2: points[i][1]
});
};
};


function resetDesign(){
    $myCanvas.clearCanvas();
    clearInterval(parametrics);
    clearInterval(animation);

    isAnimating = 0;
    isExperimental = 0;

    incremental = INIT_VALUE;
    increment = 0.25;
    incrementalp = 2;

    createCanvas(hWidth,hHeight);
    initializeCircle(hHeight/2, hHeight/2, hHeight/2 - 10,incrementalp);
};
    

$( document ).ready(function() {
    hWidth = 500;
    hHeight = 500;
    createCanvas(hWidth,hHeight);
    initializeCircle(hHeight/2, hHeight/2, hHeight/2 - 10,incrementalp);
    mySlider = $("#slider").slider();
});


