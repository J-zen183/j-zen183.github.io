
function toIntro() {
    document.getElementById("intro").style.display = "block";
    document.getElementById("chooseTheme").style.display = "none";
    document.getElementById("screen-content").style.background = "url('images/intro2.png')";
}

function toTheme() {
  document.getElementById("airVehicle").hidden = true;
  document.getElementById("chooseTheme").style.display = "block";
}

function start() {
   document.getElementById('themeBtn').onclick = (function() {
      var themePage = document.getElementById("chooseTheme");
		document.getElementById("intro").style.display = "none";
    themePage.style.display = "block";
    document.getElementById("screen-content").style.background = "url('images/introDark.png')";
});
}
function chooseV1() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";
  
  document.getElementById("airVehicle").hidden = false;
}
function chooseV2() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";

  document.getElementById("jungleVehicle").hidden = false;
}
function chooseV3() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";

  document.getElementById("waterVehicle").hidden = false;
}

var myDude;
var myDudeW = 100;
var myObstacles = [];
var clouds;
var lane = 1;
var laneXvalues = [(window.innerWidth/2) - 250 - (myDudeW/2), (window.innerWidth/2) - (myDudeW/2), (window.innerWidth/2) + 250 - (myDudeW/2)];
var score;
var scoreText;
var highScoreText;
var intervals = [100, 80, 60, 50, 40, 30, 25, 20, 15, 10];
var intervalIndex = 0;
var vehicle;
var highscore = 0;
var colour = "kjdnkajsnd";

function startGame(id) {
  var page = document.getElementById("choice");
  page.style.display = "none";

  if (id == "plane") {
    vehicle = "images/planetop.png";
    //colour = "white";
    document.getElementById("background").src = "images/stars.gif";
  } else if (id == "rocket") {
    vehicle = "images/rocketTop.png";
    //colour = "white";
    document.getElementById("background").src = "images/stars.gif";
  } else if (id == "jeep") {
    vehicle = "images/jeeptop.png";
    //colour = "brown";
    document.getElementById("background").src = "images/green.gif";
  } else if (id == "ship") {
    vehicle = "images/shiptop.png";
    //colour = "gray;
    document.getElementById("background").src = "images/water.gif";
  }

  myGameArea.start();
  myDude = new component(myDudeW, myDudeW, vehicle,   
  window.innerWidth/2 - myDudeW/2, window.innerHeight - 250, 0, "image");
  //clouds = new component(200, 200, "images/cloud.png", 250, 0, 1, "image");
  scoreText = new component("30px", "Consolas", "black", 
  window.innerWidth/2 - 60, 30, 0, "text");
  highScoreText = new component("30px", "Consolas", "black", 
  window.innerWidth - 300, 30, 0, "text");
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = window.innerWidth - 50;
    this.canvas.height = window.innerHeight - 50;
    this.canvas.margin = 10;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas,     
    document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
    // Get the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  document.getElementById("score").innerHTML = score;
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function component(width, height, vehicle, x, y, speedY, type) {
  this.type = type;
      if (type == "image") {
        this.image = new Image();
        this.image.src = vehicle;
      }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = speedY;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillText(this.text, this.x, this.y);
    } else if (type == "image") {
      ctx.drawImage(this.image,
      this.x,
      this.y,
      this.width, this.height);
    } else {     ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

function updateGameArea() {
  var x, y;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myDude.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  score = myGameArea.frameNo;
  if(score > highscore){
    highscore = score;
  }
  switch(score){
    case 500: intervalIndex++; break;
    case 1000: intervalIndex++; break;
    case 1500: intervalIndex++; break;
    case 2000: intervalIndex++; break;
    case 2500: intervalIndex++; break;
    case 3000: intervalIndex++; break;
    case 3500: intervalIndex++; break;
    case 4000: intervalIndex++; break;
    case 4500: intervalIndex++; break;
  }
  if (myGameArea.frameNo == 1 || everyinterval(intervals[intervalIndex])) {
    var randLane = Math.floor(Math.random() * 3);
    x = laneXvalues[randLane];
    y = -30;
    myObstacles.push(new component(100, 20, "green", x, y, Math.floor(Math.random() * 4 ) + 3));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += myObstacles[i].speedY;
    myObstacles[i].update();
  }
  if (myGameArea.key && myGameArea.key == 37) {
    if(lane != 0){
      lane--;
      myDude.x = laneXvalues[lane];
    }
    myGameArea.key = false;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    if(lane != 2){
      lane++;
      myDude.x = laneXvalues[lane];
    }
    myGameArea.key = false;
  }
  scoreText.text = "SCORE: " + score;
  highScoreText.text = "HIGHSCORE: " + highscore;
  scoreText.update();
  highScoreText.update();
  myDude.newPos();
  myDude.update();
} 

function toIntro() {
    document.getElementById("intro").style.display = "block";
    document.getElementById("chooseTheme").style.display = "none";
    document.getElementById("screen-content").style.background = "url('images/intro2.png')";
}

function toTheme() {
  document.getElementById("airVehicle").hidden = true;
  document.getElementById("chooseTheme").style.display = "block";
}

function start() {
   document.getElementById('themeBtn').onclick = (function() {
      var themePage = document.getElementById("chooseTheme");
		document.getElementById("intro").style.display = "none";
    themePage.style.display = "block";
    document.getElementById("screen-content").style.background = "url('images/introDark.png')";
});
}
function chooseV1() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";
  
  document.getElementById("airVehicle").hidden = false;
}
function chooseV2() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";

  document.getElementById("jungleVehicle").hidden = false;
}
function chooseV3() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";

  document.getElementById("waterVehicle").hidden = false;
}

var myDude;
var myDudeW = 100;
var myObstacles = [];
var clouds;
var lane = 1;
var laneXvalues = [(window.innerWidth/2) - 250 - (myDudeW/2), (window.innerWidth/2) - (myDudeW/2), (window.innerWidth/2) + 250 - (myDudeW/2)];
var score;
var scoreText;
var highScoreText;
var intervals = [100, 80, 60, 50, 40, 30, 25, 20, 15, 10];
var intervalIndex = 0;
var vehicle;
var highscore = 0;
var colour = "kjdnkajsnd";

function startGame(id) {
  var page = document.getElementById("choice");
  page.style.display = "none";

  if (id == "plane") {
    vehicle = "images/planetop.png";
    //colour = "white";
    document.getElementById("background").src = "images/stars.gif";
  } else if (id == "rocket") {
    vehicle = "images/rocketTop.png";
    //colour = "white";
    document.getElementById("background").src = "images/stars.gif";
  } else if (id == "jeep") {
    vehicle = "images/jeeptop.png";
    //colour = "brown";
    document.getElementById("background").src = "images/green.gif";
  } else if (id == "ship") {
    vehicle = "images/shiptop.png";
    //colour = "gray;
    document.getElementById("background").src = "images/water.gif";
  }

  myGameArea.start();
  myDude = new component(myDudeW, myDudeW, vehicle,   
  window.innerWidth/2 - myDudeW/2, window.innerHeight - 250, 0, "image");
  //clouds = new component(200, 200, "images/cloud.png", 250, 0, 1, "image");
  scoreText = new component("30px", "Consolas", "black", 
  window.innerWidth/2 - 60, 30, 0, "text");
  highScoreText = new component("30px", "Consolas", "black", 
  window.innerWidth - 300, 30, 0, "text");
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = window.innerWidth - 50;
    this.canvas.height = window.innerHeight - 50;
    this.canvas.margin = 10;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas,     
    document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
    // Get the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  document.getElementById("score").innerHTML = score;
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function component(width, height, vehicle, x, y, speedY, type) {
  this.type = type;
      if (type == "image") {
        this.image = new Image();
        this.image.src = vehicle;
      }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = speedY;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillText(this.text, this.x, this.y);
    } else if (type == "image") {
      ctx.drawImage(this.image,
      this.x,
      this.y,
      this.width, this.height);
    } else {     ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

function updateGameArea() {
  var x, y;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myDude.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  score = myGameArea.frameNo;
  if(score > highscore){
    highscore = score;
  }
  switch(score){
    case 500: intervalIndex++; break;
    case 1000: intervalIndex++; break;
    case 1500: intervalIndex++; break;
    case 2000: intervalIndex++; break;
    case 2500: intervalIndex++; break;
    case 3000: intervalIndex++; break;
    case 3500: intervalIndex++; break;
    case 4000: intervalIndex++; break;
    case 4500: intervalIndex++; break;
  }
  if (myGameArea.frameNo == 1 || everyinterval(intervals[intervalIndex])) {
    var randLane = Math.floor(Math.random() * 3);
    x = laneXvalues[randLane];
    y = -30;
    myObstacles.push(new component(100, 20, "green", x, y, Math.floor(Math.random() * 4 ) + 3));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += myObstacles[i].speedY;
    myObstacles[i].update();
  }
  if (myGameArea.key && myGameArea.key == 37) {
    if(lane != 0){
      lane--;
      myDude.x = laneXvalues[lane];
    }
    myGameArea.key = false;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    if(lane != 2){
      lane++;
      myDude.x = laneXvalues[lane];
    }
    myGameArea.key = false;
  }
  scoreText.text = "SCORE: " + score;
  highScoreText.text = "HIGHSCORE: " + highscore;
  scoreText.update();
  highScoreText.update();
  myDude.newPos();
  myDude.update();
} 
