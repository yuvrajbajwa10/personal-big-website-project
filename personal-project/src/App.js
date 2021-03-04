import './App.css';
import React from 'react';
//import ReactDOM from 'react-dom';

function calculateAngle(count, i, x = 0) {
  return ((i + x) * 2 * (Math.PI / count) - (Math.PI / 2));
}
function drawwhite(c) {
  const ctx = c.getContext("2d");
  ctx.beginPath();
  var centre = 0;
  ctx.fillStyle = 'White';
  ctx.arc(centre, centre, 75, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.count = 25;
    this.listOfColors =  ['#3369e8', '#009925', '#eeb211', '#d50f25']
    this.handleClick = this.handleClick.bind(this);
    this.spin = this.spin.bind(this);
    this.currentrotation = 0;
    this.speed = 1000; // slow
    this.isStopping = false;
    this.roationSpeed = Math.PI / this.speed;
    this.startingStopping = false;
    this.audio = new Audio("src\pop-4.wav")
  } 
  handlerotation()
  {
    this.currentrotation = this.currentrotation + this.roationSpeed > 6.28318 ? this.currentrotation +this.roationSpeed - 6.28318: this.currentrotation + this.roationSpeed;
  }
  handleClick() {
    this.count ++;
    this.drawpie();
  }
  spin()
  {
    // Set the speed to 15 to 25 randomly
    this.speed = Math.floor( Math.random() * 25) + 15;

    // Set the speed to 10 to 15 randomly after 0.15 to 0.30 seconds
    setTimeout(() => {
      this.speed = Math.floor( Math.random() * 15) + 10;
    }, Math.floor( Math.random() * 300) + 150);
    
    // Set the speed to 20 to 30 randomly after 0.30 to 0.60 seconds
    setTimeout(() => {
      this.speed = Math.floor( Math.random() * 30) + 20;
    }, Math.floor( Math.random() * 600) + 300);
    // set is stopping to true
    this.isStopping = true;
    setTimeout(() => {
      // turn on the brakes after 2 to 4 seconds
      this.startingStopping =true;
    },(Math.floor(Math.random() * 3) + 2 + Math.random() )* 1000);//Stopping Speed is min 2 and max 4 seconds stopping time
  }
  //draw pie
  // important
  drawpie() {
    clearInterval(this.set);
    if (this.count === 0)
    {
      return;
    }
    const c = document.getElementById("WheelSpin");
    const ctx = c.getContext("2d");
    var middleOffset = (calculateAngle(this.count, 0, 0) - calculateAngle(this.count, 0, 1)) / 2;
    var angle;
    //font style
    ctx.textAlign = "centre";
    ctx.textBaseline = "middle";
    // clean board 
    ctx.save()
    ctx.translate(-400,-400)
    ctx.clearRect(0, 0, 800, 800);
    ctx.restore();
    // the actual quaters of the circle
    var centre = 0;
    var radius = 370;
    var i


    for (i = 0; i < this.count; i++) {
      ctx.fillStyle = this.listOfColors[i % 4];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // points of the arc of the quaters of the circle 
      ctx.arc(centre, centre, radius, calculateAngle(this.count, i, 0), calculateAngle(this.count, i, 1));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    //rotated text
    var anglediff = calculateAngle(this.count, i, 1) - calculateAngle(this.count, i, 0);
    var fontsize = Math.abs(Math.floor(Math.sin(anglediff) * 290) - 3);
    ctx.font = fontsize >= 30 || this.count < 3 ? "30px Arial" : fontsize + "px Arial";
    for (i = 0; i < this.count; i++) {
      ctx.fillStyle = 'White';
      angle = calculateAngle(this.count, i, 0) - middleOffset;
      ctx.save();
      //ctx.translate(centre, centre);
      ctx.rotate(angle);
      ctx.fillText(i + 1, 290, 0);
      ctx.restore();
      //white Circle in the middle
    }
    drawwhite(c);
    
    // draw the triangle
    ctx.save();
    ctx.rotate(-this.currentrotation);
    ctx.moveTo(340,0)
    ctx.arc(325,0,50,-Math.PI/8,Math.PI/8);
    ctx.closePath();
    ctx.fillStyle = "light";
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    //play the sound
    if (this.currentrotation % 2* Math.PI / this.count === 0)
    {
      this.audio.play();
    }

  }

  render(props) {
    return (
      <div>
        <canvas id="WheelSpin" width="750" height="750" onClick={this.handleClick} />
        <button onClick={this.spin}>Spin the wheel</button>
      </div>
    );
  }
}
function rotatepie(ctx, board) {
  
  board.speed = (board.speed < 1000 && board.startingStopping)? board.speed + Math.floor(Math.random() * 8) + 1  : board.speed;//stopping speed
  board.roationSpeed =  Math.PI / board.speed;
  if (board.isStopping && board.speed >= 1000)
  {
    board.roationSpeed = 0;
    if (board.startingStopping){
    var piOffset = Math.ceil(6.2831 - board.currentrotation / 6.2831 * board.count);
    var winner =  piOffset >0 ? piOffset: board.count + piOffset;
    alert(winner);
    }
    board.startingStopping = false; //turn off the brakes
  
  }
  ctx.rotate(board.roationSpeed);
  board.handlerotation();
  board.drawpie();
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.Board = new Board();
  }
  componentDidMount() {
    clearInterval(this.set);
    //var j = 1+1;
    var c = document.getElementById("WheelSpin");
    var ctx = c.getContext("2d");
    var centre = c.width / 2;
    ctx.translate(centre, centre);
    var radius = 370;
    // counter
    //ctx.font = "30px Arial";
    //ctx.fillText(0, 10, 50);
    ctx.beginPath();
    ctx.fillStyle = '#CCD1D1';
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    drawwhite(c);
    this.set = setInterval(() => rotatepie(ctx, this.Board), 20);
    
  }

  render() {
    return (this.Board.render());
  }
}

export default App;