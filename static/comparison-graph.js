document.addEventListener('DOMContentLoaded', function () {
    const comparisonChartCanvas = document.getElementById('comparisonChartContainer').getContext('2d');
    const comparisonChart = new Chart(comparisonChartCanvas, {
        type: 'line',
        data: {
            labels: ['Date1', 'Date2', 'Date3'], // Add dates for comparison
            datasets: [{
                label: 'Sleep Duration (minutes)',
                data: [/* Insert sleep durations for comparison */],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
