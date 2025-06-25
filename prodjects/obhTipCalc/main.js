const serverPopover = document.getElementById('AddServer');
const barbackPopover = document.getElementById('AddBarback');
const EmployeeList = document.getElementById('EmployeeTipList');
const editEmployeePopover = document.getElementById('EditEmployees');

let employeeList = new calculator();

document.getElementById('addServerBtn').addEventListener('click', function () {
    serverPopover.classList.remove('d-none');
    barbackPopover.classList.add('d-none');
    EmployeeList.classList.add('d-none');
    editEmployeePopover.classList.add('d-none');
});

document.getElementById('addBarbackBtn').addEventListener('click', function (event) {
    serverPopover.classList.add('d-none');
    barbackPopover.classList.remove('d-none');
    EmployeeList.classList.add('d-none');
    editEmployeePopover.classList.add('d-none');
});

document.getElementById('employeeTipsBtn').addEventListener('click', function (event) {
    serverPopover.classList.add('d-none');
    barbackPopover.classList.add('d-none');
    EmployeeList.classList.remove('d-none');
    editEmployeePopover.classList.add('d-none');
    employeeList.getEmployeeTips(); // Update the employee list display
});

// Edit button handler
document.getElementById('editEmployeeBtn').addEventListener('click', function (event) {
    serverPopover.classList.add('d-none');
    barbackPopover.classList.add('d-none');
    EmployeeList.classList.add('d-none');
    editEmployeePopover.classList.remove('d-none');
    employeeList.editEmployees(); // Update the employee list display
});

document.querySelectorAll('.btn-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
        serverPopover.classList.add('d-none');
        barbackPopover.classList.add('d-none');
        EmployeeList.classList.add('d-none');
        editEmployeePopover.classList.add('d-none');

    });
});

document.getElementById('addServerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const serverName = document.getElementById('serverName').value;
    const serverShift = document.querySelector('input[name="shift"]:checked').value;
    const serverHoursStart = document.getElementById('serverHoursStart').value;
    const serverHoursEnd = document.getElementById('serverHoursEnd').value;
    const cashTips = parseFloat(document.getElementById('cashTips').value) || 0;
    const creditTips = parseFloat(document.getElementById('creditTips').value) || 0;
    const grossSales = parseFloat(document.getElementById('grossSales').value) || 0;
    const salesTax = parseFloat(document.getElementById('SalesTax').value) || 0;
    const type = document.querySelector('input[name="serverType"]:checked').value;

    // Call the function to add the server
    // allServers.push( new ServerBartender(serverName, serverShift, serverHoursStart, serverHoursEnd, cashTips, creditTips, grossSales, salesTax));
    if(document.getElementById('submitServer').textContent == 'Add Server'){
        employeeList.addServer(new ServerBartender(serverName, serverShift, serverHoursStart, serverHoursEnd, cashTips, creditTips, grossSales, salesTax, type));
        document.getElementById('addServerForm').reset();

    }
    // Clear the form fields
    document.getElementById('addServerForm').reset();
});

document.getElementById('addBarbackForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const barbackName = document.getElementById('barbackName').value;
    const barbackShift = document.querySelector('input[name="barbackShift"]:checked').value;
    const barbackType = document.querySelector('input[name="barbackType"]:checked').value;
    const barbackHoursStart = document.getElementById('barbackHoursStart').value;
    const barbackHoursEnd = document.getElementById('barbackHoursEnd').value;

    // Call the function to add the barback
    if (barbackType === 'host') {
        // allHosts.push(new Barback(barbackName, barbackShift, barbackHoursStart, barbackHoursEnd, barbackType));
        employeeList.addHost(new BarbackHost(barbackName, barbackShift, barbackHoursStart, barbackHoursEnd, barbackType));
    } else {
        // allBarbacks.push(new Barback(barbackName, barbackShift, barbackHoursStart, barbackHoursEnd, barbackType));
        employeeList.addBarback(new BarbackHost(barbackName, barbackShift, barbackHoursStart, barbackHoursEnd, barbackType));
    }

    // Clear the form fields
    document.getElementById('addBarbackForm').reset();
});

//grey out submit button until all fields are filled
document.querySelectorAll('#addServerForm, #addBarbackForm').forEach(function (form) {
    form.addEventListener('change', function () {
        console.log(form.id);
        const inputs = document.querySelectorAll(`#${form.id} input`);
        const serverSubmitButton = document.getElementById('submitServer');
        const barbackSubmitButton = document.getElementById('submitBarback');
        let allFilled = true;
        if (form.id === 'addBarbackForm') {
            inputs.forEach(input => {
                if (input.type !== 'radio' && input.value === '') {
                    allFilled = false;
                }
            });
            barbackSubmitButton.disabled = !allFilled;
            return; // Exit early for barback form
        }else{
            inputs.forEach(input => {
                if (input.type !== 'radio' && input.value === '') {
                    allFilled = false;
                }
            });

            serverSubmitButton.disabled = !allFilled;

        }
    });
});