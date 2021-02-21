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
    this.count = 0;
    this.listOfColors =  ['#3369e8', '#009925', '#eeb211', '#d50f25']
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.count ++;
    this.drawpie();
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
    ctx.clearRect(-500, -500, 500, 500);

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
    console.log("angle",anglediff)
    var fontsize = Math.abs(Math.floor(Math.sin(anglediff) * 290) - 3);
    console.log("font",fontsize)
    ctx.font = fontsize >= 30 || this.count < 3 ? "30px Arial" : fontsize + "px Arial";
    for (i = 0; i < this.count; i++) {
      ctx.fillStyle = 'White';
      angle = calculateAngle(this.count, i, 0) - middleOffset;
      ctx.save();
      ctx.translate(centre, centre);
      ctx.rotate(angle);
      ctx.fillText(i + 1, 290, 0);
      ctx.restore();
      //white Circle in the middle
    }
    drawwhite(c);
  }

  render(props) {
    return (
      <div>
        <canvas id="WheelSpin" width="750" height="750" onClick={this.handleClick} />
      </div>
    );
  }
}
function rotatepie(ctx, board) {
  ctx.rotate(Math.PI / 1000);
  board.drawpie();
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.Board = new Board();
    //this.Board = <Board one ={1}/>;
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
    this.set = setInterval(() => rotatepie(ctx, this.Board), 41.6666666667);
  }

  render() {
    return (this.Board.render());
  }
}

export default App;