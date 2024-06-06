// Stopwatch Script
var stopwatch = document.getElementById('stopwatch');
var startPauseButton = document.getElementById('startPause');
var resetButton = document.getElementById('reset');
var lapButton = document.getElementById('lap');
var lapTimesTable = document.getElementById('lapTimes');

var startTime;
var elapsedTime = 0;
var timerInterval;
var laps = [];

function timeToString(time) {
    var diffInHrs = time / 3600000;
    var hh = Math.floor(diffInHrs);

    var diffInMin = (diffInHrs - hh) * 60;
    var mm = Math.floor(diffInMin);

    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec);

    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs);

    var formattedMM = mm.toString().padStart(2, "0");
    var formattedSS = ss.toString().padStart(2, "0");
    var formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function startPause() {
    if (startPauseButton.textContent === 'Start') {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            stopwatch.textContent = timeToString(elapsedTime);
        }, 10);
        startPauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Start';
    }
}

function reset() {
    clearInterval(timerInterval);
    stopwatch.textContent = "00:00:00";
    elapsedTime = 0;
    startPauseButton.textContent = 'Start';
    laps = [];
    lapTimesTable.innerHTML = '';
}

function lap() {
    var lapTime = timeToString(elapsedTime);
    laps.push(lapTime);
    var row = lapTimesTable.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = laps.length;
    cell2.innerHTML = lapTime;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

// Timer Script
let timerIntervalTimer;
let isRunningTimer = false;
let totalSeconds = 0;

const timerDisplay = document.getElementById('timer-display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startPauseTimer() {
    if (isRunningTimer) {
        clearInterval(timerIntervalTimer);
        startPauseBtn.textContent = 'Start';
    } else {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds > 0) {
            timerIntervalTimer = setInterval(() => {
                if (totalSeconds <= 0) {
                    clearInterval(timerIntervalTimer);
                    alert('Timer Ended.....!');
                } else {
                    totalSeconds--;
                    updateTimerDisplay();
                }
            }, 1000);
            startPauseBtn.textContent = 'Pause';
        }
    }
    isRunningTimer = !isRunningTimer;
}

function resetTimer() {
    clearInterval(timerIntervalTimer);
    totalSeconds = 0;
    isRunningTimer = false;
    updateTimerDisplay();
    startPauseBtn.textContent = 'Start';
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Local Time Script
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display clock immediately

// Selection Screen Logic
const selectionScreen = document.getElementById('selection-screen');
const selectTimerBtn = document.getElementById('select-timer');
const selectStopwatchBtn = document.getElementById('select-stopwatch');
const stopwatchSection = document.getElementById('stopwatch-section');
const timerSection = document.getElementById('timer-section');

selectTimerBtn.addEventListener('click', () => {
    selectionScreen.style.display = 'none';
    timerSection.classList.remove('hidden');
});

selectStopwatchBtn.addEventListener('click', () => {
    selectionScreen.style.display = 'none';
    stopwatchSection.classList.remove('hidden');
});
