import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import styles from "./Sidebar.module.css";

const CurrentTime = () => {
  console.log("Current time component rendered");
  const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrTime(new Date().toLocaleTimeString());
      console.log(currTime);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  },[currTime])
  
  return (
    <div className={`${styles.timeContainer}`}>
      <FaClock className={`${styles.timeIcon}`} />
      <span className={`${styles.timeText}`}>{currTime}</span>
    </div>
  );
};

export default CurrentTime;
