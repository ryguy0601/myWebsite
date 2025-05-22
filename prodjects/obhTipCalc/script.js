function createTransposedTable(num, idPrefix) {
    let props = [];
    if (idPrefix === 'server' || idPrefix === 'bartender') {
        props = [
            { label: "Name", input: (i) => `<input type="text" placeholder="${idPrefix} ${i + 1} name" class="name">` },
            { label: "Am/Pm", input: (i) => `
                <label style="display:inline-block;margin-right:8px;">
                <input type="radio" name="${idPrefix}-ampm-${i}" value="AM" class="am-pm" checked> AM
                </label>
                <label style="display:inline-block;">
                <input type="radio" name="${idPrefix}-ampm-${i}" value="PM" class="am-pm"> PM
                </label>
            `},
            { label: "Start Time", input: () => `<input type="time" class="start-time">` },
            { label: "End Time", input: () => `<input type="time" class="end-time" readonly>` },
            { label: "Total Hours", input: () => `<span class="total-hours"></span>` },
            { label: "Cash Tips", input: () => `<input type="number" class="${idPrefix}CashTip">` },
            { label: "CC Tips", input: () => `<input type="number" class="${idPrefix}CreditTip">` },
            { label: "Total Tips", input: () => `<span class="totalTips"></span>` },
            { label: "Gross Sales", input: () => `<input type="number" class="grossSales">` },
            { label: "Net Sales", input: () => `<span class="netSales"></span>` },
            { label: "Total Tips out", input: () => `<span class="total-tips-earned"></span>` }
        ];
    } else {
        props = [
            { label: "Name", input: (i) => `<input type="text" placeholder="${idPrefix} ${i + 1} name" class="name">` },
            { label: "Am/Pm", input: (i) => `
                <label style="display:inline-block;margin-right:8px;">
                <input type="radio" name="${idPrefix}-ampm-${i}" value="AM" class="am-pm" checked> AM
                </label>
                <label style="display:inline-block;">
                <input type="radio" name="${idPrefix}-ampm-${i}" value="PM" class="am-pm"> PM
                </label>
            `},
            { label: "Start Time", input: () => `<input type="time" class="start-time">` },
            { label: "End Time", input: () => `<input type="time" class="end-time" disabled>` },
            { label: "Total Hours", input: () => `<span class="total-hours"></span>` },
            { label: "Total Cash Tips out", input: () => `<span class="total-cash-tips-earned-barback"></span>` },
            { label: "Total CC Tips out", input: () => `<span class="total-cc-tips-earned-barback"></span>` },
            { label: "Total Tips out", input: () => `<span class="total-tips-earned-barback"></span>` },
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
    document.getElementById(tableId).addEventListener('change', function (e) {
        // Find column index
        const td = e.target.closest('td');
        if (!td) return;
        const colIndex = Array.from(td.parentNode.children).indexOf(td) - 1;
        if (colIndex < 0) return;

        // Get all rows
        const rows = Array.from(document.getElementById(tableId).rows);

        // Calculate total hours
        if (e.target.classList.contains('start-time') || e.target.classList.contains('end-time')) {
            const startInput = rows[2].cells[colIndex + 1].querySelector('.start-time');
            const endInput = rows[3].cells[colIndex + 1].querySelector('.end-time');
            if (startInput.value && endInput.value) {
                const start = new Date(`1970-01-01T${startInput.value}:00`);
                const end = new Date(`1970-01-01T${endInput.value}:00`);
                let hours = (end - start) / (1000 * 60 * 60);
                if (hours < 0) hours += 24;
                rows[4].cells[colIndex + 1].querySelector('.total-hours').innerText = hours.toFixed(1);
            } else {
                rows[4].cells[colIndex + 1].querySelector('.total-hours').innerText = '';
            }
        }

        // Calculate total tips
        if (e.target.classList.contains(`${idPrefix}CashTip`) || e.target.classList.contains(`${idPrefix}CreditTip`)) {
            const cash = parseFloat(rows[5].cells[colIndex + 1].querySelector(`.${idPrefix}CashTip`).value) || 0;
            const credit = parseFloat(rows[6].cells[colIndex + 1].querySelector(`.${idPrefix}CreditTip`).value) || 0;
            rows[6].cells[colIndex + 1].querySelector('.totalTips').innerText = (cash + credit).toFixed(2);

            const totalTips = document.querySelectorAll(`.totalTips`);
            let total = 0;
            totalTips.forEach((i) => {
                total += parseFloat(i.innerText) || 0;
            });
            document.getElementById('TotalTipsForDay').innerText = total.toFixed(2);
        }

        // Calculate net sales
        if (e.target.classList.contains('grossSales') || e.target.classList.contains(`${idPrefix}CreditTip`)) {
            const gross = parseFloat(rows[8].cells[colIndex + 1].querySelector(`.grossSales`).value) || 0;
            const ccTips = parseFloat(rows[6].cells[colIndex + 1].querySelector(`.${idPrefix}CreditTip`).value) || 0;
            const tax = parseFloat(document.getElementById('taxPercent').value) || 0;
            //Net Sales = (Gross Sales - Credit Card Tips) / (1 + (Tax Rate / 100))
            let netSales = gross - ccTips;
            const taxAmount = 1 + (tax / 100);
            netSales /= taxAmount;
            rows[8].cells[colIndex + 1].querySelector(`.netSales`).innerText = netSales.toFixed(2);


            // Calculate total sales for the day
            const totalSales = document.querySelectorAll(`.netSales`);
            let total = 0;
            totalSales.forEach((i) => {
                total += parseFloat(i.innerText) || 0;
            });
            document.getElementById('TotalSalesForDay').innerText = total.toFixed(2);

        }

        calcHostTips()
        calcBarBackTips()
        calcBartenderServerTips()
        amPmCutOff()
    });
}

//am/pm cut off time set end time cutoff if server/bartender is AM
function amPmCutOff() {
    const ampmCutOff = document.getElementById('AmPmCutOff').value || '';

    const tables = ['serverTable', 'bartenderTable', 'barBackTable', 'hostTable'];
    tables.forEach(tableId => {
        const rows = Array.from(document.getElementById(tableId).rows);
        if (!rows.length) return;
        // Am/Pm row is index 1, End Time row is index 3
        const ampmRow = rows[1];
        const endTimeRow = rows[3];
        for (let i = 1; i < ampmRow.cells.length; i++) {
            const amRadio = ampmRow.cells[i].querySelector('input.am-pm[value="AM"]');
            const pmRadio = ampmRow.cells[i].querySelector('input.am-pm[value="PM"]');
            const endTimeInput = endTimeRow.cells[i].querySelector('.end-time');
            if (amRadio && endTimeInput) {
                if (amRadio.checked) {
                    endTimeInput.value = ampmCutOff;
                    endTimeInput.setAttribute('readonly', true);
                } else if (pmRadio && pmRadio.checked) {
                    endTimeInput.removeAttribute('readonly');
                }
            }
        }
    });
}



function calcBarBackTips() {
    try {
        console.log('Calculating barback tips...');
        const barBackrows = Array.from(document.getElementById('barBackTable').rows);
        const barBackTipPercent = parseFloat(document.getElementById('barBackTipPercent').value) / 100;

        let totalBarBackHours = 0;
        // barBackrows[3] is the "Total Hours" row for barBack table
        for (let i = 1; i < barBackrows[4].cells.length; i++) {
            const val = parseFloat(barBackrows[4].cells[i].querySelector('.total-hours').innerText) || 0;
            totalBarBackHours += val;
        }

        // Set total tips earned for each barback
        const totalSales = parseFloat(document.getElementById('TotalSalesForDay').innerText) || 0;
        const totalBarBackTips = totalSales * barBackTipPercent;
        let tipPerHour = totalBarBackHours > 0 ? totalBarBackTips / totalBarBackHours : 0;
        // barBackrows[6] is the "Total Tips out" row for barBack table
        for (let i = 1; i < barBackrows[4].cells.length; i++) {
            const hours = parseFloat(barBackrows[4].cells[i].querySelector('.total-hours').innerText) || 0;
            const tipsEarned = hours * tipPerHour;
            barBackrows[7].cells[i].querySelector('.total-tips-earned-barback').innerText = tipsEarned.toFixed(2);
        }
    } catch (err) {
        console.log('Error calculating barback tips:', err);
    }
}

function calcHostTips() {
    try {
        console.log('Calculating host tips...');
        const hostRows = Array.from(document.getElementById('hostTable').rows);
        const hostTipPercent = parseFloat(document.getElementById('hostTipPercent').value) / 100;

        let totalHostHours = 0;
        // hostRows[3] is the "Total Hours" row for host table
        for (let i = 1; i < hostRows[4].cells.length; i++) {
            const val = parseFloat(hostRows[4].cells[i].querySelector('.total-hours').innerText) || 0;
            totalHostHours += val;
        }

        // Set total tips earned for each host
        const totalSales = parseFloat(document.getElementById('TotalSalesForDay').innerText) || 0;
        const totalHostTips = totalSales * hostTipPercent;
        let tipPerHour = totalHostHours > 0 ? totalHostTips / totalHostHours : 0;
        // hostRows[6] is the "Total Tips out" row for host table
        for (let i = 1; i < hostRows[4].cells.length; i++) {
            const hours = parseFloat(hostRows[4].cells[i].querySelector('.total-hours').innerText) || 0;
            const tipsEarned = hours * tipPerHour;
            hostRows[7].cells[i].querySelector('.total-tips-earned-barback').innerText = tipsEarned.toFixed(2);
        }
    } catch (err) {
        console.log('Error calculating host tips:', err);
    }
}

function calcBartenderServerTips() {
    console.log('Calculating bartender/server tips...');

    const bartenderRows = Array.from(document.getElementById('bartenderTable').rows) || [];
    const serverRows = Array.from(document.getElementById('serverTable').rows) || [];
    const bothRows = [bartenderRows, serverRows];


    let totalTips = parseFloat(document.getElementById(`TotalTipsForDay`).innerText) || 0;

    //if there are barbacks/hosts, subtract their tips from the total tips
    if( document.getElementById('numBarBacks').value > 0 && document.getElementById('numHosts').value > 0) {
        totalTips -= parseFloat(document.getElementById(`TotalSalesForDay`).innerText) * ((document.getElementById('barBackTipPercent').value / 100) + (document.getElementById('hostTipPercent').value / 100));
    }else if (document.getElementById('numBarBacks').value > 0) {
        totalTips -= parseFloat(document.getElementById(`TotalSalesForDay`).innerText) * (document.getElementById('barBackTipPercent').value / 100);
    } else if (document.getElementById('numHosts').value > 0) {
        totalTips -= parseFloat(document.getElementById(`TotalSalesForDay`).innerText) * (document.getElementById('hostTipPercent').value / 100);
    }

    let totalHours = 0;
    bothRows.forEach(rows => {
        for (let i = 1; i < rows[4].cells.length; i++) {
            const val = parseFloat(rows[4].cells[i].querySelector('.total-hours').innerText);
            totalHours += val;
        }
    });

    // Set total tips earned for each bartender and server
    let tipPerHour = totalHours > 0 ? totalTips / totalHours : 0;
    bothRows.forEach(rows => {
        for (let i = 1; i < rows[4].cells.length; i++) {
            const hours = parseFloat(rows[4].cells[i].querySelector('.total-hours').innerText) || 0;
            const tipsEarned = hours * tipPerHour;
            rows[10].cells[i].querySelector('.total-tips-earned').innerText = tipsEarned.toFixed(2);
        }  
    });
}

window.addEventListener('load', function () {
    const tableConfigs = [
        { numId: 'numServers', tableId: 'serverTable', prefix: 'server' },
        { numId: 'numBartenders', tableId: 'bartenderTable', prefix: 'bartender' },
        { numId: 'numBarBacks', tableId: 'barBackTable', prefix: 'barBack' },
        { numId: 'numHosts', tableId: 'hostTable', prefix: 'host' }
    ];

    tableConfigs.forEach(cfg => {
        document.getElementById(cfg.numId).addEventListener('change', function () {
            const num = parseInt(document.getElementById(cfg.numId).value, 10) || 0;
            document.getElementById(cfg.tableId).innerHTML = createTransposedTable(num, cfg.prefix);
            amPmCutOff();
        });
        addTransposedListeners(cfg.tableId, cfg.prefix);
        // Initialize tables with 0 rows
        document.getElementById(cfg.tableId).innerHTML = createTransposedTable(0, cfg.prefix);
        // Set default values
        document.getElementById(cfg.numId).value = 0;
    });

    document.getElementById('AmPmCutOff').value = '';
    document.getElementById('taxPercent').value = 8.875;
    document.getElementById('barBackTipPercent').value = 4;
    document.getElementById('hostTipPercent').value = 1;

    document.getElementById('barBackTipPercent').addEventListener('change', function () {
        calcBarBackTips()
        calcBartenderServerTips()
    });
    document.getElementById('hostTipPercent').addEventListener('change', function () {
        calcHostTips()
        calcBartenderServerTips()
    });

    document.getElementById('AmPmCutOff').addEventListener('change', function () {
        amPmCutOff()
    });



});