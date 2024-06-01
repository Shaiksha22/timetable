function generateTimeTable() {
  const numberOfClasses = document.getElementById('numberOfClasses').value;
  const timetable = document.getElementById('timetable');
  timetable.innerHTML = '';

  if (numberOfClasses < 1 || numberOfClasses > 6) {
      alert('Please enter a number of classes between 1 and 6.');
      return;
  }

  const startTime = 9;
  let currentTime = startTime;
  const classDuration = 1; // 1 hour
  const lunchStart = 12 + 10/60; // 12:10 PM in hours
  const lunchEnd = 13; // 1:00 PM in hours

  for (let i = 0; i < numberOfClasses; i++) {
      if (currentTime + classDuration <= lunchStart || currentTime >= lunchEnd) {
          addClassRow(currentTime);
          currentTime += classDuration;
      } else {
          addLunchRow();
          currentTime = lunchEnd;
          i--; // Repeat this iteration since lunch doesn't count as a class
      }
  }
}

function addClassRow(time) {
  const timetable = document.getElementById('timetable');
  const row = document.createElement('div');
  row.className = 'timetable-row';
  row.textContent = `Class from ${formatTime(time)} to ${formatTime(time + 1)}`;
  timetable.appendChild(row);
}

function addLunchRow() {
  const timetable = document.getElementById('timetable');
  const row = document.createElement('div');
  row.className = 'timetable-row';
  row.textContent = 'Lunch Break from 12:10 PM to 1:00 PM';
  timetable.appendChild(row);
}

function formatTime(time) {
  const hour = Math.floor(time);
  const minutes = (time - hour) * 60;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinutes = minutes === 0 ? '00' : minutes;
  return `${formattedHour}:${formattedMinutes} ${ampm}`;
}