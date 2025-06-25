class calculator {
    constructor() {
        console.log('Calculator initialized');

        // this.servers = []
        // this.addServer(new ServerBartender('Casey', 'AM', '11:30', '16:00', 54, 60, 784.06, 34.07, 'bartender'));           //45          55.32
        // this.addServer(new ServerBartender('Caleigh', 'AM', '11:30', '16:00', 36, 50.65, 482.73, 34.76, 'server'));         //45          55.32
        // this.addServer(new ServerBartender('Casey', 'PM', '16:00', '17:00', 0, 60, 784.06, 34.07, 'bartender'));            //33          16.45
        // this.addServer(new ServerBartender('Caleigh', 'PM', '16:00', '21:30', 365, 95.65, 2607.43, 202.09, 'server'));      //183         90.47
        // this.addServer(new ServerBartender('Mike', 'PM', '17:00', '21:30', 86, 35, 1438.71, 83.84, 'bartender'));           //150(140)    74.02
        // this.addServer(new ServerBartender('Ariana', 'PM', '16:00', '22:00', 114, 238.21, 2326.44, 164.94, 'server'));      //199         98.78
        // //test barback
        // this.barbacks = [new BarbackHost('Lucas', 'PM', '16:00', '21:00', 'barback')];                                      //40          41.33
        // this.barbacks.push(new BarbackHost('Caua', 'PM', '17:00', '22:00', 'barback'));                                     //40          41.33
        // //test host
        // this.hosts = [new BarbackHost('Rhianna', 'PM', '16:00', '21:00', 'host')];                                          //19
        // Initialize empty arrays for servers, barbacks, and hosts
        

        this.servers = [];
        this.barbacks = [];
        this.hosts = [];
        this.bbTipPercent = 0.04; // Default barback tip percentage
        this.hostTipPercent = 0.01; // Default host tip percentage
    }

    addServer(server) {
        // Check if a server with the same name already exists
        if (this.servers.some(s => s.getName().toUpperCase() === server.getName().toUpperCase())) {
            if (this.servers.some(s => (s.getAmPm() ==='AM' &&  server.getAmPm() === 'PM'))) {
                let pmNetSales = server.getNetSales();
                let amNetSales = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getNetSales();
                let pmCC = server.getCardTips();
                let amCC = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getCardTips();

                pmNetSales = parseFloat(pmNetSales).toFixed(2);
                amNetSales = parseFloat(amNetSales).toFixed(2);
                pmCC = parseFloat(pmCC).toFixed(2);
                amCC = parseFloat(amCC).toFixed(2);

                server.setNetSales(pmNetSales - amNetSales);
                server.setCardTips(pmCC - amCC);


            }
            if (this.servers.some(s => (s.getAmPm() ==='PM' &&  server.getAmPm() === 'AM'))) {
                let pmNetSales = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getNetSales();
                let amNetSales = server.getNetSales();
                let pmCC = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getCardTips();
                let amCC = server.getCardTips();

                pmNetSales = parseFloat(pmNetSales).toFixed(2);
                amNetSales = parseFloat(amNetSales).toFixed(2);
                pmCC = parseFloat(pmCC).toFixed(2);
                amCC = parseFloat(amCC).toFixed(2);

                s.setNetSales(pmNetSales - amNetSales);
                s.setCardTips(pmCC - amCC);

            }
        }
        this.servers.push(server);
        console.log(server)
    }
    addBarback(barback) {
        this.barbacks.push(barback);
    }
    addHost(host) {
        this.hosts.push(host);
    }

    editServer(index, server) {
        if (this.servers.some(s => s.getName().toUpperCase() === server.getName().toUpperCase())) {
            if (this.servers.some(s => (s.getAmPm() ==='AM' &&  server.getAmPm() === 'PM'))) {
                let pmNetSales = server.getNetSales();
                let amNetSales = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getNetSales();
                let pmCC = server.getCardTips();
                let amCC = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getCardTips();

                pmNetSales = parseFloat(pmNetSales).toFixed(2);
                amNetSales = parseFloat(amNetSales).toFixed(2);
                pmCC = parseFloat(pmCC).toFixed(2);
                amCC = parseFloat(amCC).toFixed(2);

                server.setNetSales(pmNetSales - amNetSales);
                server.setCardTips(pmCC - amCC);

            }
            if (this.servers.some(s => (s.getAmPm() ==='PM' &&  server.getAmPm() === 'AM'))) {
                let pmNetSales = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getNetSales();
                let amNetSales = server.getNetSales();
                let pmCC = this.servers.find(s => s.getName().toUpperCase() === server.getName().toUpperCase() && s.getAmPm() === 'AM').getCardTips();
                let amCC = server.getCardTips();

                pmNetSales = parseFloat(pmNetSales).toFixed(2);
                amNetSales = parseFloat(amNetSales).toFixed(2);
                pmCC = parseFloat(pmCC).toFixed(2);
                amCC = parseFloat(amCC).toFixed(2);

                s.setNetSales(pmNetSales - amNetSales);
                s.setCardTips(pmCC - amCC);

            }
        }
        if (index >= 0 && index < this.servers.length) {
            this.servers[index] = server;
        } else {
            console.error('Index out of bounds for servers array');
        }
    }
    editBarback(index, barback) {
        if (barback.getType() === 'host') {
            this.hosts.push(barback);
            this.barbacks.splice(index, 1); // Remove from barbacks if it's a host
        } else {
            this.barbacks[index] = barback;
        }
    }
    editHost(index, host) {
        if( host.getType() === 'barback') {
            this.barbacks.push(host);
            this.hosts.splice(index, 1); // Remove from hosts if it's a barback
        } else {
            this.hosts[index] = host;
        }
    }

    getTotalSales(shift) {
        let totalSales = 0;
        this.servers.forEach(server => {
            // console.log(server.ge)
            if(server.getAmPm() === shift){
                totalSales += server.getGrossSales();
            }
        });
        return totalSales;
    }

    calcBBTotalTips() {
        this.barbacks.forEach(barback =>{
            const sameShiftServers = this.servers.filter(
                s => s.getType() === 'server' && s.getAmPm() === barback.getAmPm()
            );
            let barbackTotalHours = this.barbacks
                .filter(b => b.getAmPm() === barback.getAmPm())
                .reduce((sum, b) => sum + b.getTotalHours(), 0);
            
            let barbackTotalCashTips = sameShiftServers.reduce((sum, server) => sum + server.getBarbackCashTips(this.bbTipPercent), 0);
            let barbackTotalCardTips = sameShiftServers.reduce((sum, server) => sum + server.getBarbackCardTips(this.bbTipPercent), 0);

            let barbackTipCashPerHour = barbackTotalCashTips / barbackTotalHours;
            let barbackTipCardPerHour = barbackTotalCardTips / barbackTotalHours;
            let cashTipOut = barbackTipCashPerHour * barback.getTotalHours();
            let ccTipOut = barbackTipCardPerHour * barback.getTotalHours();

            barback.setCashtipOut(cashTipOut.toFixed(2));
            barback.setCardtipOut(ccTipOut.toFixed(2));


        });
    }

    calcHostTotalTips(){
        this.hosts.forEach(host =>{
            const sameShiftServers = this.servers.filter(
                s => s.getType() === 'server' && s.getAmPm() === host.getAmPm()
            );
            let hostTotalHours = this.hosts
                .filter(h => h.getAmPm() === host.getAmPm())
                .reduce((sum, h) => sum + h.getTotalHours(), 0);

                let hostTotalTips = sameShiftServers.reduce((sum, server) => sum + server.getHostTips(this.hostTipPercent), 0);
                let hostTipPerHour = hostTotalTips / hostTotalHours;
                let tipOut = hostTipPerHour * host.getTotalHours();
                host.setCashtipOut(tipOut.toFixed(2));
            
        });

    }


    calcServerTotalTips() {

        // console.log(totalCardTips)

        this.servers.forEach(server => {
            let serverTotalHours = 0;
            this.servers.forEach(s => {
                if (s.getAmPm() === server.getAmPm()) {
                    serverTotalHours += s.getTotalHours();
                }
            });
            let totalCashTips = 0;
            this.servers.forEach(s => {
                if (s.getAmPm() === server.getAmPm()) {
                    totalCashTips += s.getCashTips();
                }
            });
            let totalCardTips = 0;
            this.servers.forEach(s => {
                if (s.getAmPm() === server.getAmPm()) {
                    totalCardTips += s.getCardTips();
                }
            });

            let tipCashPerHour = serverTotalHours > 0 ? totalCashTips / serverTotalHours : 0;
            let tipCardPerHour = serverTotalHours > 0 ? totalCardTips / serverTotalHours : 0;

            let cashTipOut = tipCashPerHour * server.getTotalHours()
            let ccTipOut = (tipCardPerHour * server.getTotalHours());

            ccTipOut = ccTipOut.toString().match(/(\d+(\.\d{0,2})?)/);
            ccTipOut = parseFloat(ccTipOut)//makes it not round to 2 decimals and just cuts it off

            server.setCashtipOut(cashTipOut.toFixed(2));
            server.setCardtipOut(ccTipOut.toFixed(2));

        });

    }


    drawEmployeeListHead() {
        // Create table header
        const headerRow = `
            <thead>
                <tr style='font-size:12px'>
                    <th>Name</th>
                    <th >Hours</th>
                    <th>Cash<br/>Tips</th>
                    <th>CC<br/>Tips</th>
                    <th>Total<br/>Tips</th>
                </tr>
            </thead>
        `;
        document.querySelector('#EmployeeTipList .popover-body > table').innerHTML = headerRow;
    }

    getEmployeeTips() {
        this.calcServerTotalTips();

        if(this.barbacks.length > 0) {
            this.calcBBTotalTips();
        }
        if(this.hosts.length > 0) {
            this.calcHostTotalTips();
        }

        // Clear existing content
        this.drawEmployeeListHead();

        // Generate rows with delete buttons
        const serverRows = this.servers.map((server, i) => `
            <tr>
            <td style="max-width: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${server.getName()}</td>
            <td style="width: 3ch; text-overflow: ellipsis; white-space: nowrap;">${server.getTotalHours()}</td>
            <td>$${parseFloat(server.getCashtipOut()).toFixed(2)}</td>
            <td>$${parseFloat(server.getCardtipOut()).toFixed(2)}</td>
            <td>$${parseFloat(server.getTotalTipOut()).toFixed(2)}</td>
            </tr>
        `).join('');

        const barbackRows = this.barbacks.map((barback, i) => `
            <tr>
            <td style="max-width: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${barback.getName()}</td>
            <td style="width: 3ch; text-overflow: ellipsis; white-space: nowrap;">${barback.getTotalHours()}</td>
            <td>$${parseFloat(barback.getCashtipOut()).toFixed(2)}</td>
            <td>$${parseFloat(barback.getCardtipOut()).toFixed(2)}</td>
            <td>$${parseFloat(barback.getTotalTipOut()).toFixed(2)}</td>
            </tr>
        `).join('');

        const hostRows = this.hosts.map((host, i) => `
            <tr>
            <td style="max-width: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${host.getName()}</td>
            <td style="width: 3ch; text-overflow: ellipsis; white-space: nowrap;">${host.getTotalHours()}</td>
            <td>$${parseFloat(host.getCashtipOut()).toFixed(2)}</td>
            <td>$0.00</td>
            <td>$${parseFloat(host.getTotalTipOut()).toFixed(2)}</td>
            </tr>
        `).join('');

        document.querySelector('#EmployeeTipList .popover-body > table').innerHTML += `
        <tbody>
            ${serverRows}
            ${barbackRows}
            ${hostRows}
        </tbody>
        `;


    }


    handleEdit(type, index) {
        const serverPopover = document.getElementById('AddServer');
        const barbackPopover = document.getElementById('AddBarback');
        const editEmployeePopover = document.getElementById('EditEmployees');
        let saveBtn
        if (type === 'server') {
            const server = this.servers[index];
            document.getElementById('serverName').value = server.getName();
            document.querySelector(`input[name="shift"][value="${server.getAmPm().toUpperCase()}"]`).checked = true;
            document.getElementById('serverHoursStart').value = server.getStartTime();
            document.getElementById('serverHoursEnd').value = server.getEndTime();
            document.getElementById('cashTips').value = server.getCashTips();
            document.getElementById('creditTips').value = server.getCardTips();
            document.getElementById('grossSales').value = server.getGrossSales();
            document.getElementById('SalesTax').value = server.getSalesTax();
            saveBtn = document.getElementById('submitServer');
            serverPopover.classList.remove('d-none');
        }else if (type === 'barback') {
            const barback = this.barbacks[index];
            document.getElementById('barbackName').value = barback.getName();
            document.querySelector(`input[name="barbackShift"][value="${barback.getAmPm().toUpperCase()}"]`).checked = true;
            document.getElementById('barbackHoursStart').value = barback.getStartTime();
            document.getElementById('barbackHoursEnd').value = barback.getEndTime();
            saveBtn = document.getElementById('submitBarback');
            barbackPopover.classList.remove('d-none');
        }else if (type === 'host') {
            // CODE IS CORRECT 
            //Uses same form as barback
            const host = this.hosts[index];
            document.getElementById('barbackName').value = host.getName();
            document.querySelector(`input[name="barbackShift"][value="${host.getAmPm().toUpperCase()}"]`).checked = true;
            document.getElementById('barbackHoursStart').value = host.getStartTime();
            document.getElementById('barbackHoursEnd').value = host.getEndTime();
            saveBtn = document.getElementById('submitBarback');
            barbackPopover.classList.remove('d-none');
        }else {
            console.error('Unknown type:', type);
        }
        editEmployeePopover.classList.toggle('d-none');

        // This function will handle the edit logic for the selected employee and not just add a new one
        // Add a save button handler for editing the employee
        if (saveBtn) {
            // Remove previous event listeners to avoid stacking
            const newSaveBtn = saveBtn.cloneNode(true);
            newSaveBtn.removeEventListener('click', () => {}); // Remove any previous click handlers
            newSaveBtn.textContent = 'Save Changes'; // Change button text to indicate editing
            saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

            console.log('Editing server:', index);
            newSaveBtn.addEventListener('click', () => {
            if (type === 'server') {
                console.log('Editing server:', index);
                const server = this.servers[index];
                server.setName(document.getElementById('serverName').value);
                server.setAmPm(document.querySelector('input[name="shift"]:checked').value);
                server.setStartTime(document.getElementById('serverHoursStart').value);
                server.setEndTime(document.getElementById('serverHoursEnd').value);
                server.setCashTips(parseFloat(document.getElementById('cashTips').value) || 0);
                server.setCardTips(parseFloat(document.getElementById('creditTips').value) || 0);
                server.setGrossSales(parseFloat(document.getElementById('grossSales').value) || 0);
                server.setSalesTax(parseFloat(document.getElementById('SalesTax').value) || 0);
                this.editServer(index, server);
            } else if (type === 'barback') {
                const barback = this.barbacks[index];
                barback.setName(document.getElementById('barbackName').value);
                barback.setAmPm(document.querySelector('input[name="barbackShift"]:checked').value);
                barback.setStartTime(document.getElementById('barbackHoursStart').value);
                barback.setEndTime(document.getElementById('barbackHoursEnd').value);
                this.editBarback(index, barback);
            } else if (type === 'host') {
                // CODE IS CORRECT
                // Uses same form as barback
                const host = this.hosts[index];
                host.setName(document.getElementById('barbackName').value);
                host.setAmPm(document.querySelector('input[name="barbackShift"]:checked').value);
                host.setStartTime(document.getElementById('barbackHoursStart').value);
                host.setEndTime(document.getElementById('barbackHoursEnd').value);
                this.editHost(index, host);
            }
            this.editEmployees();    
            serverPopover.classList.add('d-none');
            barbackPopover.classList.add('d-none');
            EmployeeList.classList.add('d-none');
            editEmployeePopover.classList.toggle('d-none');
            // Reset the form fields
            newSaveBtn.parentNode.replaceChild(saveBtn, newSaveBtn);
            });
        }

    }

    drawEmployeeEditHead() {
        // Create table header
        const headerRow = `
            <thead>
                <tr style='font-size:12px'>
                    <th class="editEmployeeNameLength">Name</th>
                    <th style='font-size:10px'>AM<br/>PM</th>
                    <th>Start<br/>Time</th>
                    <th>End<br/>Time</th>
                    <th>Cash<br/>Tips</th>
                    <th>CC<br/>Tips</th>
                    <th>Gross<br/>Sales</th>
                    <th>Sales<br/>Tax</th>
                </tr>
            </thead>
        `;
        document.querySelector('#EditEmployees .popover-body > table').innerHTML = headerRow;
    }

    editEmployees() {
        // Clear existing content
        this.drawEmployeeEditHead();

        // Generate rows with edit buttons (no inline onclick, use data attributes)
        const serverRows = this.servers.map((server, i) => `
            <tr data-type="server" data-index="${i}">
            <td class="editEmployeeNameLength">${server.getName()}</td>
            <td>${server.getAmPm().charAt(0)}</td>
            <td>${server.getStartTime()}</td>
            <td>${server.getEndTime()}</td>
            <td>$${server.getCashTips().toFixed(2)}</td>
            <td>$${server.getCardTips().toFixed(2)}</td>
            <td>$${server.getGrossSales().toFixed(2)}</td>
            <td>$${server.getSalesTax().toFixed(2)}</td>
            </tr>
        `).join('');

        const barbackRows = this.barbacks.map((barback, i) => `
            <tr data-type="barback" data-index="${i}">
            <td class="editEmployeeNameLength">${barback.getName()}</td>
            <td>${barback.getAmPm().charAt(0)}</td>
            <td>${barback.getStartTime()}</td>
            <td>${barback.getEndTime()}</td>
            <td></td>
            <td></td>
            <td></td> <!-- Barbacks don't have gross sales -->
            <td></td> <!-- Barbacks don't have sales tax -->
            </tr>
        `).join('');

        const hostRows = this.hosts.map((host, i) => `
            <tr data-type="host" data-index="${i}">
            <td class="editEmployeeNameLength">${host.getName()}</td>
            <td>${host.getAmPm().charAt(0)}</td>
            <td>${host.getStartTime()}</td>
            <td>${host.getEndTime()}</td>
            <td></td>
            <td></td>
            <td></td> <!-- Hosts don't have gross sales -->
            <td></td> <!-- Hosts don't have sales tax -->
            </tr>
        `).join('');

        document.querySelector('#EditEmployees .popover-body > table').innerHTML += `
        <tbody>
            ${serverRows}
            ${barbackRows}
            ${hostRows}
        </tbody>
        `;

        // Attach event listeners to edit buttons
        
        document.querySelectorAll('#editEmployeeTable > tbody > tr').forEach(row => {
            row.addEventListener('click', (e) => {
                const type = row.getAttribute('data-type');
                const index = parseInt(row.getAttribute('data-index'), 10);
                this.handleEdit(type, index);
            });
        });
    }

}