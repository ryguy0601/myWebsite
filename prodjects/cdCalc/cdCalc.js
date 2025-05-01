document.addEventListener('DOMContentLoaded', () => {
    const startAmountInput = document.getElementById('startAmount');
    const apyInput = document.getElementById('apy');
    const timeInput = document.getElementById('time');
    const calculateButton = document.getElementById('calculate');
    const clearButton = document.getElementById('clear');
    const chartCanvas = document.getElementById('myChart');
    const ctx = chartCanvas.getContext('2d');
    let myChart; // To store the chart instance


    //todo add decimals to the input fields
    // const numberInputs = document.querySelectorAll('input[type="number"]'); // Select all text inputs

    // numberInputs.forEach(input => {
    //     input.addEventListener('input', function() {
    //         console.log(`Input value changed: ${this.value}`);
    //         this.value = this.value.replace(/[^0-9 ]/g, ''); // Keep only numbers
    //     });
    // });


    function getCSSVar(propertyName) {
        // console.log(`Getting CSS variable: ${propertyName}`);
        // console.log( getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim());
        return getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();
    }

    function calculateCD() {
        let principal = parseFloat(startAmountInput.value);
        let annualRate = parseFloat(apyInput.value) / 100;
        let months = parseInt(timeInput.value);

        if (isNaN(principal) ) {
            principal = 0;
        }
        if (isNaN(annualRate)) {
            annualRate = 0;
        }
        if (isNaN(months)) {
            months = 0;
        }


        if (principal < 0 || annualRate < 0 || months < 0) {
            alert('Please enter valid positive numbers for all fields.');
            return;
        }

        const monthlyRate = annualRate / 12;
        const futureValue = principal * Math.pow(1 + annualRate, months);
        // console.log(`Future Value: $${futureValue.toFixed(2)}`);

        // Generate data for the chart
        const labels = [];
        const data = [];
        let currentBalance = principal;
        for (let i = 0; i <= months; i++) {
            labels.push(`Month ${i}`);
            data.push(currentBalance.toFixed(2));
            currentBalance *= (1 + monthlyRate);
        }

        renderChart(labels, data);
    }

    function renderChart(labels, data) {
        if (myChart) {
            myChart.destroy(); // Destroy the previous chart if it exists
        }

        chartCanvas.width = 400; // Set the width of the canvas
        chartCanvas.height = 200; // Set the height of the canvas

        let graphBackgroundColor = getCSSVar('--graph-bg-Color');
        let graphLineColor = getCSSVar('--accent-Color');
        let graphTextColor = getCSSVar('--text-Color');
        let graphAxisColor = getCSSVar('--graph-Axis-Color');

        myChart = new Chart(ctx, {
            type: 'line',
            // backgroundColor: graphBackgroundColor,
            data: {
                labels: labels,
                datasets: [{
                    label: 'CD Value Over Time',
                    data: data,
                    fill: false,
                    borderColor: graphLineColor,
                    backgroundColor: graphBackgroundColor,
                    // tension: 0
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                color: graphTextColor, // Sets the default color for text elements in the chart
                scales: {
                    x: {
                        grid: {
                            color: graphAxisColor,
                        },
                        ticks: {
                            color: graphTextColor,
                        },
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: graphAxisColor,
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return '$' + value;
                            },
                            color: graphTextColor,
                        }
                    }
                }
            }
        });
    }

    function clearInputs() {
        startAmountInput.value = '';
        apyInput.value = '';
        timeInput.value = '';
        if (myChart) {
            myChart.destroy(); // Clear the chart
            myChart = null;
        }
    }

    calculateButton.addEventListener('click', calculateCD);
    clearButton.addEventListener('click', clearInputs);
    startAmountInput.addEventListener('input', calculateCD);
    apyInput.addEventListener('input', calculateCD);
    timeInput.addEventListener('input', calculateCD);
});