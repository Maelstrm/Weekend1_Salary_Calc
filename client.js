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
    let table = $('<table id="eData" class="table table-striped table-dark"></table>');
    table.append('<thead class="thead thead-dark eDataHeader"><tr><th>First Name</th><th>Last Name</th><th>ID Number</th><th>Title</th><th>Salary</th></thead>');

    // The table where the data will be displayed on the DOM
    let tbody = $('<tbody id="eDataBody" class=""></tbody>');
    table.append(tbody);

    $('#presentation').append(table);
} // appendDom End

// this is where handlers go. Handlers will listen for events that happen on the dom elements, such as clicks.
function eventHandlers() {
    //  listen for the submit & submit button
    $('#submitButton').on('click', submitClick);
    $('#deleteButton').on('click', deleteClick);
} // eventHandlers end

// delete function, which recieves the ID number of the employee and empties the field.
function deleteClick() {
    let eDelete = Number($('#eDelete').val());
    removeEmployee(eDelete);
    emptyFields();
} // end deleteClick

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

    // pushes new employee to allEmployees array

    allEmployees.push(new Employee(newFirstName, newLastName, newId, newTitle, newSalary));

    // adds new employee to the dom
    addEmployee(newFirstName, newLastName, newId, newTitle, newSalary);

    // calls function that empties fields
    emptyFields();

    // calls salary from this new employee and adds it to the total salary
    salaryCalc(Number(newSalary));

    // uses the current totalSalary and divides by 12 to get monthly
    monthlySalary = (totalSalary / 12).toFixed(2);

    // appends monthly salary to dom to replace the previous value that was displayed
    $('#totalCalc').html('<h3 id="mSalary">' + monthlySalary + '</h3>');

    // if monthly salary is greater than 20000, turns background red
    if (monthlySalary > 20000) {
        $('#finalCalculation').removeClass('bg-dark');
        $('#finalCalculation').css('background-color', 'darkRed');
        $('#mSalary').css('color', 'white');
        $('#tMonthlyTitle').css('color', 'white');
    }

} // End submitclick

// adds a new salary to the total salary
function salaryCalc(newSalary) {
    totalSalary += newSalary;
    return totalSalary;
} //end SalaryCalc


// Adds new employee to the dom.
function addEmployee(thisFirstName, thisLastName, thisId, thisTitle, thisSalary) {
    $('#eData').append('<tr id="' + thisId + '"><td>' + thisFirstName + '</td><td>' + thisLastName + '</td><td>' + thisId + '</td><td>' + thisTitle + '</td><td>' + thisSalary + '</td></tr>')

} //end addEmployee

// function that deletes the employee by id number
function removeEmployee(eDelete) {

    // for each of the employees in allEmployees, check if the ID matches. If so, delete the employee's row
    for (i = 0; i < allEmployees.length; i++) {
        if (allEmployees[i].eId == eDelete) {

            // i used concatenation to create the jquery here because i needed the target to change based on the loop.
            // I'm very surprised this worked!
            let currentDelete = ('#' + allEmployees[i].eId)
            $(currentDelete).remove();
        }

        // This is the part that actually removes the employee from the array I could probably have this inside of the previous if statement.

        const index = allEmployees.indexOf(i);

        if (index !== -1) {
            allEmployees.splice(index, 1);
        }
    }
    return;
} //end removeEmployee


// this part handles clearing the fields. this works for both delete and submit
function emptyFields() {
    $("#eFirstName").val('');
    $("#eLastName").val('');
    $("#eId").val('');
    $("#eTitle").val('');
    $("#eSalary").val('');
    $("#eDelete").val('');
} // end emptyFields

// end code