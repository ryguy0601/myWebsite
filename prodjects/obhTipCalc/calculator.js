class calculator {
    constructor() {
        console.log('Calculator initialized');

        // this.servers = []

        this.serversAM = [];
        this.barbacksAM = [];
        this.hostsAM = [];
        this.amBBPool = 0;
        this.amHostPool = 0;

        this.serversPM = [];
        this.barbacksPM = [];
        this.hostsPM = [];
        this.pmBBPool = 0;
        this.pmHostPool = 0;

        this.servers = [];
        this.barbacks = [];
        this.hosts = [];

        
        // this.addServer(new ServerBartender('Casey', 'AM', '11:30', '16:00', 54, 60, 784.06, 34.07, 'bartender'));           //45          55.32
        // this.addServer(new ServerBartender('Caleigh', 'AM', '11:30', '16:00', 36, 50.65, 482.73, 34.76, 'server'));         //45          55.32
        // this.addServer(new ServerBartender('Casey', 'PM', '16:00', '17:00', 0, 60, 784.06, 34.07, 'bartender'));            //33          16.45
        // this.addServer(new ServerBartender('Caleigh', 'PM', '16:00', '21:30', 365, 95.65, 2607.43, 202.09, 'server'));      //183         90.47
        // this.addServer(new ServerBartender('Mike', 'PM', '17:00', '21:30', 86, 35, 1438.71, 83.84, 'bartender'));           //150(140)    74.02
        // this.addServer(new ServerBartender('Ariana', 'PM', '16:00', '22:00', 114, 238.21, 2326.44, 164.94, 'server'));      //199         98.78
        // //test barback
        // this.addBarback(new BarbackHost('Lucas', 'PM', '16:00', '21:00', 'barback'));                                      //40          41.33
        // this.addBarback(new BarbackHost('Caua', 'PM', '17:00', '22:00', 'barback'));                                     //40          41.33
        // //test host
        // this.addHost(new BarbackHost('Rhianna', 'PM', '16:00', '21:00', 'host'));                                          //19

        // this.addServer(new ServerBartender('caleigh', 'PM', '16:00', '21:00', 124+24, 130, 1427.88, 104.43, 'server'));           
        // this.addServer(new ServerBartender('mike', 'PM', '16:00', '21:00', 152+30,  155.39, 1494.78, 107.96, 'bartender'));       
        // this.addServer(new ServerBartender('Ari', 'PM', '16:00', '21:00', 239+28, 129, 1652.05, 122.55, 'server'));           

       
        // this.addBarback(new BarbackHost('Ryan', 'PM', '16:00', '21:00', 'barback'));                                      
        // this.addBarback(new BarbackHost('Caua', 'PM', '17:00', '22:00', 'barback'));  

        // this.addHost(new BarbackHost('shannon', 'PM', '16:00', '21:00', 'host'));                                          



        this.bbTipPercent = 0.04; // Default barback tip percentage
        this.hostTipPercent = 0.01; // Default host tip percentage
    }

    addServer(server) {
        this.servers = this.serversAM.concat(this.serversPM);
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
        if (server.getAmPm() === 'AM') {
            this.serversAM.push(server);
        } 
        if (server.getAmPm() === 'PM') {
            this.serversPM.push(server);
        }
        this.servers = this.serversAM.concat(this.serversPM);
    }
    addBarback(barback) {
        if( barback.getAmPm() === 'AM') {
            this.barbacksAM.push(barback);
        } 
        if (barback.getAmPm() === 'PM') {
            this.barbacksPM.push(barback);
        }
        this.barbacks = this.barbacksAM.concat(this.barbacksPM);
    }
    addHost(host) {
        if( host.getAmPm() === 'AM') {
            this.hostsAM.push(host);
        }
        if (host.getAmPm() === 'PM') {
            this.hostsPM.push(host);
        }
        this.hosts = this.hostsAM.concat(this.hostsPM);
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
            if (server.getAmPm() === 'AM') {
                this.serversAM[index] = server;
            }
            if (server.getAmPm() === 'PM') {
                this.serversPM[index] = server;
            }
        } else {
            console.error('Index out of bounds for servers array');
        }
        this.servers = this.serversAM.concat(this.serversPM);
    }
    editBarback(index, barback) {
        if (barback.getType() === 'host') {
            if (barback.getAmPm() === 'AM') {
                this.hostsAM[index] = barback;
            }
            if (barback.getAmPm() === 'PM') {
                this.hostsPM[index] = barback;
            }
            let hostIndex = this.hostsAM.findIndex(h => h.getName().toUpperCase() === barback.getName().toUpperCase());
            if (hostIndex !== -1) {
                this.hostsAM.splice(hostIndex, 1);
            }
            hostIndex = this.hostsPM.findIndex(h => h.getName().toUpperCase() === barback.getName().toUpperCase());
            if (hostIndex !== -1) {
                this.hostsPM.splice(hostIndex, 1);
            }
        } else {
            if (barback.getAmPm() === 'AM') {
                this.barbacksAM[index] = barback;
            }
            if (barback.getAmPm() === 'PM') {
                this.barbacksPM[index] = barback;
            }
        }
        this.barbacks = this.barbacksAM.concat(this.barbacksPM);
        this.hosts = this.hostsAM.concat(this.hostsPM);
    }
    editHost(index, host) {
        if (host.getType() === 'host') {
            if (host.getAmPm() === 'AM') {
                this.hostsAM[index] = host;
            }
            if (barback.getAmPm() === 'PM') {
                this.hostsPM[index] = bahostrback;
            }
            let bbtIndex = this.barbacksAM.findIndex(b => b.getName().toUpperCase() === host.getName().toUpperCase());
            if (bbtIndex !== -1) {
                this.barbacksAM.splice(bbtIndex, 1);
            }
            bbtIndex = this.barbacksPM.findIndex(b => b.getName().toUpperCase() === host.getName().toUpperCase());
            if (bbtIndex !== -1) {
                this.barbacksPM.splice(bbtIndex, 1);
            }
        } else {
            if (barback.getAmPm() === 'AM') {
                this.barbacksAM[index] = host;
            }
            if (barback.getAmPm() === 'PM') {
                this.barbacksPM[index] = host;
            }
        }
        this.barbacks = this.barbacksAM.concat(this.barbacksPM);
        this.hosts = this.hostsAM.concat(this.hostsPM);
    }


    calcBBTotalTips() {
        if(this.barbacksAM.length) {
            //split the tip pool in to cash and credit
            let amBBcashPool = Math.floor(this.amBBPool/2);
            let amBBcardPool = this.amBBPool - amBBcashPool;

            // let barbackTotalCashTipsAM = this.serversAM.reduce((sum, server) => sum + server.getBarbackCashTips(this.bbTipPercent), 0);
            // let barbackTotalCardTipsAM = this.serversAM.reduce((sum, server) => sum + server.getBarbackCardTips(this.bbTipPercent), 0);
            
            let bbTotalHoursAM = this.barbacksAM.reduce((sum, b) => sum + b.getTotalHours(), 0);
            
            let bbTipCashPerHourAM = amBBcashPool / bbTotalHoursAM;
            let bbTipCardPerHourM = amBBcardPool / bbTotalHoursAM;

            this.barbacksAM.forEach(barback => {
                let cashTipOutAM = bbTipCashPerHourAM * barback.getTotalHours();
                let ccTipOutAM = bbTipCardPerHourM * barback.getTotalHours();
                barback.setCashtipOut(cashTipOutAM.toFixed(2));
                barback.setCardtipOut(ccTipOutAM.toFixed(2));
            });
        }
        
        if(this.barbacksPM.length) {
            //split the tip pool in to cash and credit
            let pmBBcashPool = Math.floor(this.pmBBPool/2);
            let pmBBcardPool = this.pmBBPool - pmBBcashPool;
            
            let bbTotalHoursPM = this.barbacksPM.reduce((sum, b) => sum + b.getTotalHours(), 0);
            
            let bbTipCashPerHourPM = pmBBcashPool / bbTotalHoursPM;
            let bbTipCardPerHourPM = pmBBcardPool / bbTotalHoursPM;

            this.barbacksPM.forEach(barback => {
                let cashTipOutPM = bbTipCashPerHourPM * barback.getTotalHours();
                let ccTipOutPM = bbTipCardPerHourPM * barback.getTotalHours();
                barback.setCashtipOut(cashTipOutPM.toFixed(2));
                barback.setCardtipOut(ccTipOutPM.toFixed(2));
            });
        }


    }

    calcHostTotalTips() {
        if (this.hostsAM.length) {
            // Split the tip pool into cash and credit, but hosts only get cash tips
            let amHostcashPool = this.amHostPool; // All to cash
            let hostTotalHoursAM = this.hostsAM.reduce((sum, h) => sum + h.getTotalHours(), 0);
            let hostTipCashPerHourAM = hostTotalHoursAM > 0 ? amHostcashPool / hostTotalHoursAM : 0;

            this.hostsAM.forEach(host => {
                let cashTipOutAM = hostTipCashPerHourAM * host.getTotalHours();
                host.setCashtipOut(cashTipOutAM.toFixed(2));
                host.setCardtipOut('0.00');
            });
        }
        if (this.hostsPM.length) {
            let pmHostcashPool = this.pmHostPool; // All to cash
            let hostTotalHoursPM = this.hostsPM.reduce((sum, h) => sum + h.getTotalHours(), 0);
            let hostTipCashPerHourPM = hostTotalHoursPM > 0 ? pmHostcashPool / hostTotalHoursPM : 0;

            this.hostsPM.forEach(host => {
                let cashTipOutPM = hostTipCashPerHourPM * host.getTotalHours();
                host.setCashtipOut(cashTipOutPM.toFixed(2));
                host.setCardtipOut('0.00');
            });
        }
    }


    calcServerTotalTips() {
        this.serversAM.forEach(server => {
            this.amBBPool += server.getBBCashTips(this.bbTipPercent);
            this.amBBPool += server.getBBCardTips(this.bbTipPercent);
            if (server.getType() === 'server') {
                this.amHostPool += server.getHostCashTips(this.hostTipPercent);
            }
        });
        let serverTotalHoursAM = this.serversAM.reduce((sum, s) => sum + s.getTotalHours(), 0);
        let totalCashTipsAM = this.serversAM.reduce((sum, s) => sum + s.getCashTips(), 0);
        let totalCardTipsAM = this.serversAM.reduce((sum, s) => sum + s.getCardTips(), 0);

        totalCashTipsAM -= Math.floor(this.amBBPool/2);
        totalCashTipsAM -= this.amHostPool;
        totalCardTipsAM -= this.amBBPool - Math.floor(this.amBBPool/2);


        // Calculate total tips for AM servers
        let serverTipCashPerHourAM = serverTotalHoursAM > 0 ? totalCashTipsAM / serverTotalHoursAM : 0;
        let serverTipCardPerHourAM = serverTotalHoursAM > 0 ? totalCardTipsAM / serverTotalHoursAM : 0;

        serverTipCashPerHourAM = parseFloat(parseFloat(serverTipCashPerHourAM).toFixed(2)); //makes it not round to 2 decimals and just cuts it off
        serverTipCardPerHourAM = parseFloat(parseFloat(serverTipCardPerHourAM).toFixed(2)); //makes it not round to 2 decimals and just cuts it off
        this.serversAM.forEach(server => {
            server.setCashtipOut((serverTipCashPerHourAM * server.getTotalHours()).toFixed(2));
            server.setCardtipOut((serverTipCardPerHourAM * server.getTotalHours()).toFixed(2));
        });


        this.serversPM.forEach(server => {
            this.pmBBPool += server.getBBCashTips(this.bbTipPercent);
            this.pmBBPool += server.getBBCardTips(this.bbTipPercent);
            if (server.getType() === 'server') {
                this.pmHostPool += server.getHostCashTips(this.hostTipPercent);
            }
        });
        let serverTotalHoursPM = this.serversPM.reduce((sum, s) => sum + s.getTotalHours(), 0);
        let totalCashTipsPM = this.serversPM.reduce((sum, s) => sum + s.getCashTips(), 0);
        let totalCardTipsPM = this.serversPM.reduce((sum, s) => sum + s.getCardTips(), 0);
        totalCashTipsPM -= Math.floor(this.pmBBPool/2);
        totalCashTipsPM -= this.pmHostPool;
        totalCardTipsPM -= this.pmBBPool - Math.floor(this.pmBBPool/2);
        // Calculate total tips for PM servers
        let serverTipCashPerHourPM = serverTotalHoursPM > 0 ? totalCashTipsPM / serverTotalHoursPM : 0;
        let serverTipCardPerHourPM = serverTotalHoursPM > 0 ? totalCardTipsPM / serverTotalHoursPM : 0;

        serverTipCashPerHourPM = parseFloat(parseFloat(serverTipCashPerHourPM).toFixed(2));
        serverTipCardPerHourPM = parseFloat(parseFloat(serverTipCardPerHourPM).toFixed(2));
        this.serversPM.forEach(server => {
            server.setCashtipOut((serverTipCashPerHourPM * server.getTotalHours()).toFixed(2));
            server.setCardtipOut((serverTipCardPerHourPM * server.getTotalHours()).toFixed(2));
        });





        if(this.barbacks.length > 0) {
            this.calcBBTotalTips();
        }
        if(this.hosts.length > 0) {
            this.calcHostTotalTips();
        }
        console.log('AM Barback Pool:', this.amBBPool);
        console.log('AM Host Pool:', this.amHostPool);
        console.log('PM Barback Pool:', this.pmBBPool);
        console.log('PM Host Pool:', this.pmHostPool);

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

            newSaveBtn.addEventListener('click', () => {
            if (type === 'server') {
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