let sleepData = [];

function addSleepData() {
    const sleepTime = document.getElementById('sleepTime').value;
    const wakeUpTime = document.getElementById('wakeUpTime').value;
    const sleepDuration = calculateSleepDuration(sleepTime, wakeUpTime);
    sleepData.push({
        date: new Date().toLocaleDateString(),
        sleepTime: sleepTime,
        wakeUpTime: wakeUpTime,
        sleepDuration: sleepDuration
    });
    console.log(sleepData);
}

function calculateSleepDuration(sleepTime, wakeUpTime) {
    const [sleepHour, sleepMinute] = sleepTime.split(':').map(Number);
    const [wakeUpHour, wakeUpMinute] = wakeUpTime.split(':').map(Number);
    let duration = (wakeUpHour * 60 + wakeUpMinute) - (sleepHour * 60 + sleepMinute);
    if (duration < 0) {
        duration += 24 * 60; // Add 24 hours if wake up time is before sleep time (overnight duration)
    }
    return duration;
}

function showDailyGraph() {
    // Redirect to dailyGraph.html
    window.location.href = 'dailyGraph.html';
}

function showComparisonGraph() {
    // Redirect to comparisonGraph.html
    window.location.href = 'comparisonGraph.html';
}
