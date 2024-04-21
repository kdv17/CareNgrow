document.addEventListener('DOMContentLoaded', function () {
    const dailyChartCanvas = document.getElementById('dailyChartContainer').getContext('2d');
    const dailyChart = new Chart(dailyChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Today'],
            datasets: [{
                label: 'Sleep Duration (minutes)',
                data: [/* Insert today's sleep duration */],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
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
});
