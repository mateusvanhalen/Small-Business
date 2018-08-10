let allData = {};


fetch("http://localhost:8088/employees")
.then(response => response.json())
.then(response => {
    allData.employees = response;
    return fetch("http://localhost:8088/computers");
})
.then(response => response.json())
.then(response => {
    allData.computers = response;
    return fetch("http://localhost:8088/departments");
})
.then(response => response.json())
.then(response => {
    allData.departments = response;
    return allData;
})
.then(data => {
    let completedEmployees = [];

    
    data.employees.forEach(employee => {
        let fullEmployee = {};

        fullEmployee.name = employee.fullName;

        let computer = data.computers.find(computer => employee.computerId === computer.id);
        fullEmployee.computer = computer.serialNumber;

        let department = data.departments.find(department => employee.departmentId === department.id);
        fullEmployee.department = department.name;

        completedEmployees.push(fullEmployee);
    });

    console.log(completedEmployees);

    let completedString = completedEmployees.reduce((builtUpString, current) => {
        return builtUpString + `${current.name}, `;
    }, "");

    document.querySelector("#please").innerHTML = completedString;
});


