


var Employee;
function loadTable(){
    
    
    if(localStorage.getItem("Employee")){
        Employee = localStorage.getItem("Employee");
        
        Employee = JSON.parse(Employee);
        console.log(Employee);
        
        showTable();
        
        for( let i = 0; i<Employee.length; i++){
          
            
            const tableBody = document.getElementById('employeeRows');
            const newRow = tableBody.insertRow();
            const nameCell = newRow.insertCell(0);
            const positionCell = newRow.insertCell(1);
            const salaryCell = newRow.insertCell(2);
            const actionCell = newRow.insertCell(3);
            
            const name = Employee[i].name;
            const position = Employee[i].position;
            const salary = Employee[i].salary;

            nameCell.textContent = name;
            positionCell.textContent = position;
            salaryCell.textContent = salary;
            actionCell.innerHTML = '<button onclick="editEmployee(this), hideAddEmpForm(), hideTable(), hideAddEmp()">Edit</button> <button onclick="deleteEmployee(this), hideEditEmpForm()">Delete</button>';
            

        }
        
        
    }
    else{
        Employee =[];
    }
}

function showForm() {
    const form = document.getElementById('employeeForm');
    form.style.display = 'block';
    
}

const hide = document.getElementById('addemp1');
hide.addEventListener('click', ()=> document.getElementById('editForm').style.display='none');
function hideAddEmpForm(){
    document.getElementById('employeeForm').style.display='none !important';
}

function hideEditEmpForm(){
    document.getElementById('editForm').style.display='none';
}

function showTable(){
    document.getElementById('employeeTable').style.display="table";
}
function hideTable(){
    document.getElementById('employeeTable').style.display="none";
}
function showaddemp(){
    const add2 = document.getElementById('addemp1').style.display='block';
}
function hideAddEmp(){
    document.getElementById('addemp1').style.display='none';
}
const form = document.getElementById('employeeForm');
form.addEventListener('submit', addEmployee);



function addEmployee(event) {
    event.preventDefault();
    const tableBody = document.getElementById('employeeRows');
    const newRow = tableBody.insertRow();

    const nameCell = newRow.insertCell(0);
    const positionCell = newRow.insertCell(1);
    const salaryCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const salary = document.getElementById('salary').value;

    nameCell.textContent = name;
    positionCell.textContent = position;
    salaryCell.textContent = salary;
    actionCell.innerHTML = '<button onclick="editEmployee(this), hideAddEmpForm(), hideTable(), hideAddEmp()">Edit</button> <button onclick="deleteEmployee(this), hideEditEmpForm()">Delete</button>';
    
    const temparr= {"name":name,"position": position, "salary":salary };
    Employee.push(temparr);
    console.log(Employee);
    Employee = JSON.stringify(Employee);
    localStorage.setItem("Employee", Employee);
    Employee = JSON.parse(Employee);
    

    form.reset();
    form.style.display = 'none'; 
    showaddemp();
}


var row;
function editEmployee(button) {
    document.getElementById('employeeForm').style.display='none';
    row = button.parentNode.parentNode;
    const name = row.cells[0].textContent;
    const position = row.cells[1].textContent;
    const salary = row.cells[2].textContent;
    
    document.getElementById("editName").value = name;
    document.getElementById("editPosition").value = position;
    document.getElementById("editSalary").value = salary;

    document.getElementById("editForm").style.display = "block";
}
const forms = document.getElementById('editForm');
forms.addEventListener('submit', saveEditedEmployee);

function saveEditedEmployee(event) {
    event.preventDefault();
    const names = document.getElementById("editName").value;
    const positions = document.getElementById("editPosition").value;
    const salary = document.getElementById("editSalary").value;

    const rowindex= row.rowIndex;
    
    const temparr = {"name": names, "position": positions, "salary": salary};
    Employee[rowindex-1] = temparr;
    console.log(Employee);
    Employee = JSON.stringify(Employee);
    localStorage.setItem("Employee", Employee);
    Employee = JSON.parse(Employee);

    
    row.cells[0].textContent= names ;
    row.cells[1].textContent= positions;
    row.cells[2].textContent = salary;
    document.getElementById("editForm").style.display = "none";
    document.getElementById('employeeTable').style.display="table";
    showaddemp();
}


function cancelEdit() {
    document.getElementById("editForm").style.display = "none";
    showaddemp();
}



function deleteEmployee(button) {
    const row = button.parentNode.parentNode;
    
    const rowindex= row.rowIndex;
    
    if (Employee.length == 1){

        Employee.pop();
        Employee= [];
        console.log(Employee);
        Employee = JSON.stringify(Employee);
        localStorage.setItem("Employee", Employee);
        Employee = JSON.parse(Employee);
        localStorage.removeItem("Employee");

    }
    else{
    delete Employee[rowindex-1];
    Employee = Employee.filter((value) => value != null);
    console.log(Employee);
    Employee = JSON.stringify(Employee);
    localStorage.setItem("Employee", Employee);
    Employee = JSON.parse(Employee); 
    
    }
    row.remove();
}




