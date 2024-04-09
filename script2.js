let sleepData = [];
let myChart;

function addSleepEntry() {
    const date = document.getElementById('date-input').value;
    const sleepTime = document.getElementById('sleep-time-input').value;
    const wakeTime = document.getElementById('wake-time-input').value;
    sleepData.push({ date: date, sleepTime: sleepTime, wakeTime: wakeTime });
    updateGraph(sleepData);
}

function updateGraph(data) {
    const ctx = document.getElementById('sleepChart').getContext('2d');
    const labels = data.map(entry => entry.date);
    const sleepTimes = data.map(entry => calculateSleepHours(entry.sleepTime, entry.wakeTime));

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sleep Time',
                data: sleepTimes,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of the points
                pointBorderColor: 'rgba(255, 255, 255, 1)', // Color of the point borders
                pointRadius: 5,
                pointHoverRadius: 8
            }]
            
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



function calculateSleepHours(sleepTime, wakeTime) {
    const sleep = parseTime(sleepTime);
    const wake = parseTime(wakeTime);

    let sleepHours = (wake - sleep) / (1000 * 60 * 60); // Difference in hours

    // Handle case when sleep time is after wake-up time (e.g., sleep at 23:00, wake up at 07:00)
    if (sleepHours < 0) {
        sleepHours += 24;
    }

    return sleepHours.toFixed(1);
}

function parseTime(time) {
    const [hours, minutes] = time.split(':');
    let parsedHours = parseInt(hours, 10);
    const isPM = time.toLowerCase().includes('pm');
    if (isPM && parsedHours !== 12) {
        parsedHours += 12;
    } else if (!isPM && parsedHours === 12) {
        parsedHours = 0;
    }
    return new Date(`2000-01-01T${parsedHours}:${minutes}`);
}
