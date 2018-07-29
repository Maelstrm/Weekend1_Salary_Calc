// Check to make sure the Dom is ready
$(readyNow);

// stores total salaryvalues
let totalSalary = 0;

// stores all employee objects
let allEmployees = [];


// creates a new employee from constuctor, passes in values from submitClick
// pushes the new employee to allEmployeesd
class Employee {
    constructor(firstName, lastName, id, title, salary) {
        this.eFName = firstName;
        this.eLName = lastName;
        this.eId = id;
        this.eTitle = title;
        this.eSalary = salary;
    }
    //    return() {
    //        return this;
    //    }
} // end class Employee

// functions to call when the Dom is ready
// appendDom is the function that manipulates Dom
// event handlers listen for clicks and such
function readyNow() {
    appendDom();
    eventHandlers();
} // readyNow end

// creates a variable called table, which sets up the table.
// appends the header for the table, called eDataHeader.
// creates variable called tbody, which sets up the space where the submitted data will be entered.
// append: moves the variable called tbody into the table that was created at the beginning of the function.
function appendDom() {
    let table = $('<table id="eData"></table>');
    table.append('<thead class="eDataHeader"><tr><th>First Name</th><th>Last Name</th><th>ID Number</th><th>Title</th><th>Salary</th></thead>');

    let tbody = $('<tbody id="eDataBody"></tbody>');
    table.append(tbody);

    $('#presentation').append(table);
} // appendDom End

// this is where handlers go. Handlers will listen for events that happen on the dom elements, such as clicks.
function eventHandlers() {
    //  listen for the submit button
    $('#submitButton').on('click', submitClick);
    $('#deleteButton').on('click', deleteClick);
} // eventHandlers end

function deleteClick() {
    let eDelete = Number($('#eDelete').val());
    removeEmployee(eDelete);
}

// recieves the input field information & assigns them to variables
// uses the variables as input for the Employee constuctor
// pushes new employee to the array allEmployees
// adds the new employee to the Dom using the addEmployee function
function submitClick() {
    let newFirstName = $("#eFirstName").val();
    let newLastName = $("#eLastName").val();
    let newId = Number($("#eId").val());
    let newTitle = $("#eTitle").val();
    let newSalary = $("#eSalary").val();

    allEmployees.push(new Employee(newFirstName, newLastName, newId, newTitle, newSalary));
    addEmployee(newFirstName, newLastName, newId, newTitle, newSalary);

    emptyFields();

    salaryCalc(Number(newSalary));

    monthlySalary = (totalSalary/12).toFixed(2);


    $('#totalCalc').html('<h3>' + monthlySalary + '</h3>');

    if (monthlySalary > 20000) {
        $('#finalCalculation').css('background-color', 'red');
    }

} // End submitclick

function salaryCalc(newSalary) {

    totalSalary += newSalary;
    return totalSalary;

}


// Adds new employee to the dom.
function addEmployee(thisFirstName, thisLastName, thisId, thisTitle, thisSalary) {
    $('#eData').append('<tr id="' + thisId + '"><td>' + thisFirstName + '</td><td>' + thisLastName + '</td><td>' + thisId + '</td><td>' + thisTitle + '</td><td>' + thisSalary + '</td></tr>')

} //end addEmployee

function removeEmployee(eDelete) {

    for (i = 0; i < allEmployees.length; i++) {
        if (allEmployees[i].eId == eDelete) {
            let currentDelete = ('#' + allEmployees[i].eId)
            $(currentDelete).remove();
        }

        const index = allEmployees.indexOf(i);

        if (index !== -1) {
            allEmployees.splice(index, 1);
        }
    }
    return;
}

function emptyFields() {
    $("#eFirstName").val('');
    $("#eLastName").val('');
    $("#eId").val('');
    $("#eTitle").val('');
    $("#eSalary").val('');
}