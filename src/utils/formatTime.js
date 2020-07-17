export const formatTime = sec => {
  if (sec === undefined) return null;
  if (typeof(sec) !== 'number') return null;
  if (sec < 0) return null;

  const seconds = Math.floor(sec%60);
  const minutes = Math.floor(sec/60%60);
  const hours = Math.floor(sec/3600);
  const strTime = [(hours + '').padStart(2, '0'), (minutes + '').padStart(2, '0'), (seconds + '').padStart(2, '0')];
  return strTime.join(':');
};