import { useState, useEffect } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown-timer">
      <div className="timer-box">
        <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="timer-label">Hours</span>
      </div>
      <div className="timer-box">
        <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="timer-label">Mins</span>
      </div>
      <div className="timer-box">
        <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="timer-label">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
