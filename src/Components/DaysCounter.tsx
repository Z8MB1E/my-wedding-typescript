import { useEffect, useState } from "react";
const { DateTime } = require("luxon");

const DaysCounter: React.FC<{ useFullCountdown?: boolean }> = (props) => {
  const [forceFullCountdown, setForceFullCountdown] = useState(false);

  const checkTimeLeft = () => {
    var end = DateTime.fromSQL("2022-05-15 14:00:00 -04:00");
    var start = DateTime.now();

    var diffInDaysMinutesSeconds = end.diff(start, [
      "days",
      "hours",
      "minutes",
      "seconds",
    ]);

    var diffObject = diffInDaysMinutesSeconds.toObject();
    return {
      days: Math.floor(diffObject.days),
      hours: Math.floor(diffObject.hours),
      minutes: Math.floor(diffObject.minutes),
      seconds: Math.floor(diffObject.seconds),
    };
  };

  // Check for less than 30 days and enable useFullCountdown
  useEffect(() => {
    if (countdownTime.days <= 30) setForceFullCountdown(true);
  }, []);

  // Countdown loop
  useEffect(() => {
    // if (props.useFullCountdown) {
    //   if (!forceFullCountdown) return;
    // };

    const timer = setTimeout(() => {
      setCountdownTime(checkTimeLeft());
      setTimeLeft(
        `${countdownTime.days} DAYS, ${countdownTime.hours} HOURS, ${countdownTime.minutes} MINUTES, ${countdownTime.seconds} SECONDS TO GO!`
      );
      // console.log(countdownTime);
    }, 1000);

    return () => clearTimeout(timer);
  });

  // I don't like putting these state declarations down here, but it had to be done.
  const [countdownTime, setCountdownTime] = useState(checkTimeLeft());
  const [timeLeft, setTimeLeft] = useState("Counting the days...");

  return (
    <>
      <h3 className="days-counter">MAY 15, 2022 &bull; TROY, OH</h3>
      <h3 className="days-counter">
        {countdownTime.seconds < 0 ? (
        <>
          <p><span className="fs-2 fw-bold">WE'RE GETTING MARRIED!</span></p>
        </>
        ) : (props.useFullCountdown || forceFullCountdown ? (
          <>
            <p>
              {countdownTime.days > 0 ? (<><span className="fs-2 fw-bold">{countdownTime.days}</span> {countdownTime.days > 1 ? "DAYS" : "DAY"},&nbsp;</>) : ''}
              {countdownTime.hours > 0 ? (<><span className="fs-2 fw-bold">{countdownTime.hours}</span> {countdownTime.hours > 1 ? "HOURS" : "HOUR"},&nbsp;</>) : ''}
              {countdownTime.minutes > 0 ? (<><span className="fs-2 fw-bold">{countdownTime.minutes}</span> {countdownTime.minutes > 1 ? "MINUTES" : "MINUTE"},&nbsp;</>) : ''}
              <span className="fs-2 fw-bold">{countdownTime.seconds}</span>{" "}
              SECONDS
              <br />
              TO GO!
            </p>
          </>
        ) : (
          <p>
            <span className="fs-2 fw-bold">{countdownTime.days}</span> DAYS TO
            GO!
          </p>
        ))}
      </h3>
    </>
  );
};

export default DaysCounter;
