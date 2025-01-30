let hours = 0, minutes = 0, seconds = 0;
let totalSeconds = 0;
let timer;
let isRunning = false;
let alarm = document.getElementById('alarmSound');

function adjustTime(unit, amount) {
    if (unit === 'hours') hours = Math.max(0, hours + amount);
    if (unit === 'minutes') minutes = Math.max(0, minutes + amount);
    if (unit === 'seconds') seconds = Math.max(0, seconds + amount);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds <= 0) return;

    document.getElementById('fullscreen').classList.add('active');
    document.getElementById('countdown').textContent = formatTime(totalSeconds);

    timer = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timer);
            isRunning = false;
            showTimeUpScreen();
        } else {
            totalSeconds--;
            document.getElementById('countdown').textContent = formatTime(totalSeconds);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
    document.getElementById('fullscreen').classList.remove('active');
}

function showTimeUpScreen() {
    document.getElementById('fullscreen').classList.remove('active');
    document.getElementById('timeUpScreen').classList.add('active');
    alarm.play();
}

function returnHome() {
    document.getElementById('timeUpScreen').classList.remove('active');
    resetTimer();
    alarm.pause();
    alarm.currentTime = 0;
}

function formatTime(totalSeconds) {
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

updateDisplay();
