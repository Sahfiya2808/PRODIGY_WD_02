import React, { useState, useRef } from 'react';
import './stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000).toString().padStart(3, '0');
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
  
  

  const startStopwatch = () => {
    if (!running) {
      const startTime = Date.now() - time * 1000;
      intervalRef.current = setInterval(() => {
        setTime((Date.now() - startTime) / 1000);
      }, 1);
    } else {
      clearInterval(intervalRef.current);
    }
    setRunning(!running);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    setLapTimes([]);
  };

  const recordLap = () => {
    setLapTimes([...lapTimes, formatTime(time)]);
  };

  return (
    <div className="stopwatch">
      <h2 className="title">Stopwatch</h2>
      
      <img src={'https://clipart-library.com/images/Aibrd8g8T.gif'} alt="Stopwatch" style={{ width: '300px', height: '300px' }}/> 
      <div className="display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startStopwatch}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={recordLap}>Lap</button>
      </div>
      <div className="laps">
        <h3>Lap Times</h3>
        <ul>
          {lapTimes.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;
