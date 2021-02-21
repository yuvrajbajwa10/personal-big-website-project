import './App.css';
import React, { useState } from 'react';
//import ReactDOM from 'react-dom';

function calculateAngle(count, i, x = 0)
{
  return ((i + x )* 2 * (Math.PI / count) - (Math.PI / 2));
}


function drawwhite(c){
  const ctx = c.getContext("2d");
  ctx.beginPath();
  var centre = c.width /2;
  ctx.fillStyle = 'White';
  ctx.arc(centre, centre, 75, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

}

function Board() {

  const [count, setCount] = useState(1);
  // colors = blue green yellow red
  const listOfColors = ['#3369e8', '#009925', '#eeb211', '#d50f25']

  //draw pie
  // important
  const drawpie = () => {
    const c = document.getElementById("WheelSpin");
    const ctx = c.getContext("2d");
    setCount(count + 1);
    var middleOffset = (calculateAngle(count,0,0) - calculateAngle(count,0,1)) / 2 ;
    var angle;
    var xx;
    var yy;
    var startX;
    var startY;
    //font style
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // clean board 
    ctx.clearRect(0, 0, c.width, c.height);
    
    // counter
    ctx.fillStyle = 'Black';
    ctx.font = "30px Arial";
    ctx.fillText(count, 50, 50);

    // the actual quaters of the circle
    var centre = c.width /2;
    var radius = centre -5;
    var i
    for (i = 0; i < count; i++) {
    ctx.fillStyle = listOfColors[i % 4];
    ctx.beginPath();
    ctx.moveTo(c.width / 2, c.width / 2);
    // points of the arc of the quaters of the circle 
    ctx.arc(centre,centre, radius, calculateAngle(count,i,0),calculateAngle(count,i,1));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    //rotated text
    ctx.fillStyle = 'White';
    angle = Math.PI /2 -calculateAngle(count,i,0) + middleOffset;
    xx = Math.sin(angle) * 290;
    yy = Math.cos(angle) * 290;
    startX = xx + c.width/2;
    startY = yy + c.width/2;
    ctx.fillText(i + 1 , startX, startY);

  }
    //white Circle in the middle
    drawwhite(c);
  }

  return (
    <div>
      <canvas id="WheelSpin" width="750" height="750" onClick={drawpie}/>
    </div>
  )

}

class App extends React.Component {
  componentDidMount()
   {
    var c = document.getElementById("WheelSpin");
    if (c != null)
     {
      var ctx = c.getContext("2d");
      var centre = c.width /2;
      var radius = centre -5;
      // counter
      ctx.font = "30px Arial";
      ctx.fillText(0, 10, 50);
      ctx.beginPath();
      ctx.fillStyle = '#CCD1D1';
      ctx.arc(centre, centre, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      drawwhite(c);
   
      }
    }
  render(){
    return(<Board />);  
    }
}

export default App;