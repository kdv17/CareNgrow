const sleepTimeInput = document.getElementById('sleep-time');
const wakeUpTimeInput = document.getElementById('wake-up-time');
const addEntryButton = document.getElementById('add-entry');
const sleepChart = document.getElementById('sleep-chart').getContext('2d');

let data = {
    labels: [],
    datasets: [{
        label: 'Sleep Time (hours)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

let sleepTrackerChart = new Chart(sleepChart, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

addEntryButton.addEventListener('click', () => {
    const sleepTime = sleepTimeInput.value;
    const wakeUpTime = wakeUpTimeInput.value;

    if (sleepTime && wakeUpTime) {
        const sleepDate = new Date().toISOString().split('T')[0];
        const sleepHours = calculateSleepHours(sleepTime, wakeUpTime);
        
        sleepTrackerChart.data.labels.push(sleepDate);
        sleepTrackerChart.data.datasets[0].data.push(sleepHours);
        sleepTrackerChart.update();
        
        sleepTimeInput.value = '';
        wakeUpTimeInput.value = '';
    }
});

function calculateSleepHours(sleepTime, wakeUpTime) {
    const sleep = new Date(`2000-01-01T${sleepTime}`);
    const wake = new Date(`2000-01-01T${wakeUpTime}`);
    let sleepHours = (wake - sleep) / 1000 / 60 / 60;

    // Handle case when sleep time is after wake-up time (e.g., sleep at 23:00, wake up at 07:00)
    if (sleepHours < 0) {
        sleepHours += 24;
    }

    return sleepHours.toFixed(1);
}
