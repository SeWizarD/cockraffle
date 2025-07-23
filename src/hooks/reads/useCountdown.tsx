import { useState, useEffect } from "react"; 

const formatNumber = (num: number): string => {
  return num.toString().padStart(2, "0");
};

export default function useCountdown(timestamp: Date) {
  const [d, setD] = useState("00");
  const [h, setH] = useState("00"); 
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [ms, setMs] = useState("000");
  
  useEffect(() => {
    if (timestamp!= undefined){
      console.log("time actually there")
      console.log(timestamp)
      const interval = setInterval(() => {
        const targetDate = timestamp.getTime();
        const currentDate = new Date().getTime();
        
        const timeRemaining = Math.max(0, targetDate - currentDate);
  
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((timeRemaining % 1000) / 10);
  
        setD(formatNumber(days));
        setH(formatNumber(hours));
        setMin(formatNumber(minutes));
        setSec(formatNumber(seconds));
        setMs(formatNumber(milliseconds));
        console.log("%s", days)
        console.log("%s", hours)
        console.log("%s", minutes)
        console.log("%s", seconds)
        console.log("%s", milliseconds)
  
        if (timeRemaining === 0) {
          clearInterval(interval);
        }
      }, 10); // update every 100ms
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [timestamp]);

  return { d, h, min, sec, ms };
}