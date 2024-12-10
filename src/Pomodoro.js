import React, { useEffect, useState } from "react";

export default function Pomodoro() {
  const [workDuration, setWorkDuration] = useState(25);
  const [workSecond, setWorkSecond] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakSecond, setBreakSecond] = useState(300);
  const [type, setType] = useState("Work");
  const [timer, setTimer] = useState(false);
  const [resettimer, setResetTimer] = useState(true);
  useEffect(() => {
    if (timer && type === "Work") {
      if (workSecond > 0) {
        setTimeout(() => setWorkSecond(workSecond - 1), 1000);
      }
      if (workSecond === 0) {
        alert("Work time has ended");
        setType("Break");
        setWorkSecond(1500);
      }
    }
    if (timer && type === "Break") {
      if (breakSecond > 0) {
        setTimeout(() => setBreakSecond(breakSecond - 1), 1000);
      }
      if (breakSecond === 0) {
        alert("Break time has Ended");
        setType("Break");
        setBreakSecond(300);
      }
    }
  }, [workSecond, breakSecond, type, timer]);
  const formatSetter = (seconds) => {
    let minute = parseInt(seconds / 60).toString();
    let second = parseInt(seconds % 60).toString();
    if (second.length === 1) second = "0" + second;
    if (minute.length === 1) minute = "0" + minute;
    return minute + ":" + second;
  };
  function handleReset() {
    setWorkDuration(25);
    setBreakDuration(5);
    setWorkSecond(1500);
    setBreakSecond(300);
    setType("Work");
    setTimer(false);
    setResetTimer(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setWorkSecond(workDuration * 60);
    setBreakSecond(breakDuration * 60);
  }
  return (
    <div>
      <div>
        <h1>
          {type === "Work"
            ? formatSetter(workSecond)
            : formatSetter(breakSecond)}
        </h1>
        <h1>{type === "Work" ? "Work" : "Break"} - Time</h1>
      </div>
      <div>
        <button
          onClick={() => {
            setTimer(true);
            setResetTimer(false);
          }}
          disabled={timer}
        >
          Start
        </button>
        <button
          onClick={() => {
            setTimer(false);
            setResetTimer(false);
          }}
          disabled={!timer}
        >
          Stop
        </button>
        <button onClick={handleReset} disabled={resettimer}>
          Reset
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter Work time"
            value={workDuration}
            onChange={(e) => setWorkDuration(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Break time"
            value={breakDuration}
            onChange={(e) => setBreakDuration(e.target.value)}
          />
          <input type="submit" value="Set" />
        </form>
      </div>
    </div>
  );
}
