
 function adjustTime(time) {
  let totalNumberOfSeconds = Math.floor(time);
  let hours = parseInt(totalNumberOfSeconds / 3600);
  let minutes = parseInt((totalNumberOfSeconds - hours * 3600) / 60);
  const seconds = Math.floor(
    totalNumberOfSeconds - (hours * 3600 + minutes * 60)
  );
  const result =
    (minutes < 10 ? +minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  return result;
}

