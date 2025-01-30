let hours = 0, minutes = 0, seconds = 0;
let totalSeconds = 0;
let timer;
let isRunning = false;

// Wait for the DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", () => {
    const alarm = document.getElementById('alarmSound');

    // Update the display initially
    updateDisplay();

    // Button event listeners
    document.getElementById("startBtn").addEventListener("click", startTimer);
    document.getElementById("stopBtn").addEventListener("click", stopTimer);
    document.getElementById("resetBtn").addEventListener("click", resetTimer);
    document.getElementById("homeBtn").addEventListener("click", returnHome);

    document.getElementById("increaseHours").addEventListener("click", () => adjustTime("hours", 1));
    document.getElementById("decreaseHours").addEventListener("click", () => adjustTime("hours", -1));

    document.getElementById("increaseMinutes").addEventListener("click", () => adjustTime("minutes", 1));
    document.getElementById("decreaseMinutes").addEventListener("click", () => adjustTime("minutes", -1));

    document.getElementById("increaseSeconds").addEventListener("click", () => adjustTime("seconds", 1));
    document.getElementById("decreaseSeconds").addEventListener("click", () => adjustTime("seconds", -1));

    // Function to adjust time
    function adjustTime(unit, amount) {
        if (unit === 'hours') hours = Math.max(0, hours + amount);
        if (unit === 'minutes') minutes = Math.max(0, minutes + amount);
        if (unit === 'seconds') seconds = Math.max(0, seconds + amount);
        updateDisplay();
    }

    // Function to update timer display
    function updateDisplay() {
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Start timer function
    function startTimer() {
        if (isRunning) return;
        isRunning = true;

        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds <= 0) return;

        enterFullScreen();
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

    // Stop timer function
    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    // Reset timer function
    function resetTimer() {
        stopTimer();
        hours = 0;
        minutes = 0;
        seconds = 0;
        updateDisplay();
        document.getElementById('fullscreen').classList.remove('active');
        exitFullScreen();
    }

    // Show "Time's Up" screen
    function showTimeUpScreen() {
        document.getElementById('fullscreen').classList.remove('active');
        document.getElementById('timeUpScreen').classList.add('active');
        alarm.loop = true; // Enable looping
        alarm.play();
    }

    // Return to the main timer setup screen
    function returnHome() {
        document.getElementById('timeUpScreen').classList.remove('active');
        resetTimer();
        alarm.pause();
        alarm.currentTime = 0;
        exitFullScreen();
    }

    // Format time for display
    function formatTime(totalSeconds) {
        let h = Math.floor(totalSeconds / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // Fullscreen Functions
    function enterFullScreen() {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { 
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { 
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { 
            elem.msRequestFullscreen();
        }
    }

    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { 
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { 
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { 
            document.msExitFullscreen();
        }
    }

    // Register Service Worker for Offline Support
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js")
            .then(() => console.log("Service Worker Registered"))
            .catch((error) => console.log("Service Worker Registration Failed:", error));
    }
});
