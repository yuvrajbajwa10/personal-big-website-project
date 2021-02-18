import './App.css';
import React, { useState } from 'react';
//import ReactDOM from 'react-dom';



function Board() {

  const [count, setCount] = useState(1);
  // colors = blue green yellow red
  const listOfColors = ['#3369e8', '#009925', '#eeb211', '#d50f25']


  const drawwhite = (c) => {
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = 'White';
    ctx.arc(c.width / 2, c.width / 2, 75, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

  }


  const drawgrey = () => {
    var c = document.getElementById("WheelSpin");
    if (c != null) {
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = 'light grey';
      ctx.moveTo(c.width / 2, c.width / 2);
      ctx.arc(c.width / 2, c.width / 2, c.width / 2 - 5, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      drawwhite(c);
    }

  }

  const drawpie = () => {
    const c = document.getElementById("WheelSpin");
    const ctx = c.getContext("2d");

    setCount(count + 1);

    // clean board 

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'Black';

    // counter
    ctx.font = "30px Arial";
    ctx.fillText(count, 10, 50);

    // the actual quaters of the circle
    var i
    for (i = 0; i < count; i++) {
      ctx.fillStyle = listOfColors[i % 4];
      ctx.beginPath();
      ctx.moveTo(c.width / 2, c.width / 2);
      // points of the arc of the quaters of the circle 
      ctx.arc(c.width / 2, c.width / 2, c.width / 2 - 5, i * 2 * (Math.PI / count) - (Math.PI / 2),
        (i + 1) * 2 * (Math.PI / count) - (Math.PI / 2));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    //white Circle
    drawwhite(c);

  }

  return (
    <div>
      <canvas id="WheelSpin" width="750" height="750" on={drawgrey} onClick={drawpie}/>

    </div>
  )

}

function App() {
  return (
    <div className="BackgroundBigCircle">
      <Board />
    </div>
  )

}

export default App;
