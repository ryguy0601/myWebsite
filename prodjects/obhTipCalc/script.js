function createTransposedTable(num, idPrefix) {
    let props = [];
    if (idPrefix === 'server' || idPrefix === 'bartender') {
        props = [
            { label: "Name", input: (i) => `<input type="text" placeholder="${idPrefix} ${i + 1} name" class="name">` },
            { label: "Start Time", input: () => `<input type="time" class="start-time">` },
            { label: "End Time", input: () => `<input type="time" class="end-time">` },
            { label: "Total Hours", input: () => `<span class="total-hours"></span>` },
            { label: "Cash Tips", input: () => `<input type="number" class="${idPrefix}CashTip">` },
            { label: "Credit Card Tips", input: () => `<input type="number" class="${idPrefix}CreditTip">` },
            { label: "Tips Towards Pool", input: () => `<span class="totalTips"></span>` },
            { label: "Total Sales", input: () => `<input type="number" class="totalSales">` },
            { label: "Total Tips Earned", input: () => `<span class="total-tips-earned"></span>` }
        ];
    } else {
        props = [
            { label: "Name", input: (i) => `<input type="text" placeholder="${idPrefix} ${i + 1} name" class="name">` },
            { label: "Start Time", input: () => `<input type="time" class="start-time">` },
            { label: "End Time", input: () => `<input type="time" class="end-time">` },
            { label: "Total Hours", input: () => `<span class="total-hours"></span>` },
            { label: "Total Tips Earned", input: () => `<span class="total-tips-earned-barback"></span>` },
        ];
    }
    let rows = [];
    for (let r = 0; r < props.length; r++) {
        let row = `<tr><th class='sticky-label'>${props[r].label}</th>`;
        for (let c = 0; c < num; c++) {
            row += `<td>${props[r].input(c)}</td>`;
        }
        row += `</tr>`;
        rows.push(row);
    }
    return rows.join('');
}

function addTransposedListeners(tableId, idPrefix) {
    document.getElementById(tableId).addEventListener('input', function (e) {
        // Find column index
        const td = e.target.closest('td');
        if (!td) return;
        const colIndex = Array.from(td.parentNode.children).indexOf(td) - 1;
        if (colIndex < 0) return;

        // Get all rows
        const rows = Array.from(document.getElementById(tableId).rows);

        // Calculate total hours
        if (e.target.classList.contains('start-time') || e.target.classList.contains('end-time')) {
            const startInput = rows[1].cells[colIndex + 1].querySelector('.start-time');
            const endInput = rows[2].cells[colIndex + 1].querySelector('.end-time');
            if (startInput.value && endInput.value) {
                const start = new Date(`1970-01-01T${startInput.value}:00`);
                const end = new Date(`1970-01-01T${endInput.value}:00`);
                let hours = (end - start) / (1000 * 60 * 60);
                if (hours < 0) hours += 24;
                rows[3].cells[colIndex + 1].querySelector('.total-hours').innerText = hours.toFixed(1);
            } else {
                rows[3].cells[colIndex + 1].querySelector('.total-hours').innerText = '';
            }
        }

        // Calculate total tips
        if (e.target.classList.contains(`${idPrefix}CashTip`) || e.target.classList.contains(`${idPrefix}CreditTip`)) {
            const cash = parseFloat(rows[4].cells[colIndex + 1].querySelector(`.${idPrefix}CashTip`).value) || 0;
            const credit = parseFloat(rows[5].cells[colIndex + 1].querySelector(`.${idPrefix}CreditTip`).value) || 0;
            rows[6].cells[colIndex + 1].querySelector('.totalTips').innerText = (cash + credit).toFixed(2);

            const totalTips = document.querySelectorAll(`.totalTips`);
            let total = 0;
            totalTips.forEach((i) => {
                total += parseFloat(i.innerText) || 0;
            });
            document.getElementById('TotalTipsForDay').innerText = total.toFixed(2);
        }

        // Calculate total sales
        if (e.target.classList.contains('totalSales')) {
            const sales = document.querySelectorAll(`.totalSales`);
            let totalSales = 0;
            sales.forEach((i) => {
                i.innerText = parseFloat(i.value) || 0;
                totalSales += parseFloat(i.value) || 0;
            });

            document.getElementById('TotalSalesForDay').innerText = totalSales.toFixed(2);

        }


        calcBarBackTips()
        calcBartenderServerTips()


    });
}

function calcBarBackTips() {
    try {
        const barBackrows = Array.from(document.getElementById('barBackTable').rows);
        const barBackTipPercent = parseFloat(document.getElementById('barBackTipPercent').value) / 100;

        let totalBarBackHours = 0;
        // barBackrows[3] is the "Total Hours" row for barBack table
        for (let i = 1; i < barBackrows[3].cells.length; i++) {
            const val = parseFloat(barBackrows[3].cells[i].querySelector('.total-hours').innerText) || 0;
            totalBarBackHours += val;
        }

        // Set total tips earned for each barback
        const totalSales = parseFloat(document.getElementById('TotalSalesForDay').innerText) || 0;
        const totalBarBackTips = totalSales * barBackTipPercent;
        let tipPerHour = totalBarBackHours > 0 ? totalBarBackTips / totalBarBackHours : 0;
        // barBackrows[4] is the "Total Tips Earned" row for barBack table
        for (let i = 1; i < barBackrows[3].cells.length; i++) {
            const hours = parseFloat(barBackrows[3].cells[i].querySelector('.total-hours').innerText) || 0;
            const tipsEarned = hours * tipPerHour;
            barBackrows[4].cells[i].querySelector('.total-tips-earned-barback').innerText = tipsEarned.toFixed(2);
        }
    } catch (err) {
        console.log('Error calculating barback tips:', err);
    }
}

function calcBartenderServerTips() {
    console.log('Calculating bartender/server tips...');

    const bartenderRows = Array.from(document.getElementById('bartenderTable').rows) || [];
    // console.log('Bartender rows:', bartenderRows[0].cells);
    const serverRows = Array.from(document.getElementById('serverTable').rows) || [];

    // Combine bartender and server rows if both exist, otherwise use whichever exists
    let bothRows = [];
    if (bartenderRows.length && serverRows.length) {
        // Assume both tables have the same structure (same number of rows)
        for (let i = 0; i < bartenderRows.length; i++) {
            // Merge cells from both tables for each row
            const mergedRow = bartenderRows[i].cloneNode(true);
            // Skip the header cell for serverRows (avoid duplicate row labels)
            for (let j = 1; j < serverRows[i].cells.length; j++) {
                mergedRow.appendChild(serverRows[i].cells[j].cloneNode(true));
            }
            bothRows.push(mergedRow);
        }
    } else if (bartenderRows.length) {
        bothRows = bartenderRows;
    } else {
        bothRows = serverRows;
    }


    let totalTips = parseFloat(document.getElementById(`TotalTipsForDay`).innerText) || 0;

    //if there are barbacks, subtract their tips from the total tips
    if( document.getElementById('numBarBacks').value > 0) {
        // console.log('Barback tip percent:', document.getElementById('barBackTipPercent').value);
        totalTips -= parseFloat(document.getElementById(`TotalSalesForDay`).innerText) * document.getElementById('barBackTipPercent').value / 100;

    }


    let totalHours = 0;
    for (let i = 1; i < bothRows[3].cells.length; i++) {
        const val = parseFloat(bothRows[3].cells[i].querySelector('.total-hours').innerText);
        // console.log('Total hours for each bartender/server:', val);
        totalHours += val;
    }
    // console.log('Total hours:', totalHours);

    // Set total tips earned for each bartender and server
    let tipPerHour = totalHours > 0 ? totalTips / totalHours : 0;
    for (let i = 1; i < bothRows[3].cells.length; i++) {
        const hours = parseFloat(bothRows[3].cells[i].querySelector('.total-hours').innerText) || 0;
        const tipsEarned = hours * tipPerHour;
        // console.log('Tips earned:', tipsEarned);
        // console.log('',document.querySelectorAll('.total-tips-earned')[0]);
        document.querySelectorAll('.total-tips-earned')[i-1].innerText = tipsEarned.toFixed(2);
        // console.log('bothRows[8].cells[i].querySelector(.total-tips-earned):', bothRows[8].cells[i].querySelector('.total-tips-earned'));
    }  
}

window.addEventListener('load', function () {
    document.getElementById('numServers').addEventListener('change', function () {
        const numServers = parseInt(document.getElementById('numServers').value, 10) || 0;
        document.getElementById('serverTable').innerHTML = createTransposedTable(numServers, 'server');
    });
    addTransposedListeners('serverTable', 'server');

    document.getElementById('numBartenders').addEventListener('change', function () {
        const numBartenders = parseInt(document.getElementById('numBartenders').value, 10) || 0;
        document.getElementById('bartenderTable').innerHTML = createTransposedTable(numBartenders, 'bartender');
    });
    addTransposedListeners('bartenderTable', 'bartender');

    document.getElementById('numBarBacks').addEventListener('change', function () {
        const numBarBacks = parseInt(document.getElementById('numBarBacks').value, 10) || 0;
        document.getElementById('barBackTable').innerHTML = createTransposedTable(numBarBacks, 'barBack');
    });
    addTransposedListeners('barBackTable', 'barBack');

    // Initialize tables with 0 rows
    document.getElementById('serverTable').innerHTML = createTransposedTable(0, 'server');
    document.getElementById('bartenderTable').innerHTML = createTransposedTable(0, 'bartender');
    document.getElementById('barBackTable').innerHTML = createTransposedTable(0, 'barBackTable');

    // Set default values
    document.getElementById('barBackTipPercent').value = 4;
    document.getElementById('numBarBacks').value = 0;
    document.getElementById('numBartenders').value = 0;
    document.getElementById('numServers').value = 0;

    document.getElementById('barBackTipPercent').addEventListener('change', function () {
        calcBarBackTips()
        calcBartenderServerTips()
        // console.log(1);
    });



});