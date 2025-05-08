// Sample data for demonstration
const employees = [
    { 
        id: 101, 
        name: "Tiger Nixon", 
        position: "System Architect", 
        office: "Edinburgh", 
        age: 61, 
        startDate: "2011/04/25", 
        salary: "$320,800", 
        status: "Full-time" 
    },
    { 
        id: 102, 
        name: "Garrett Winters", 
        position: "Accountant", 
        office: "Tokyo", 
        age: 63, 
        startDate: "2011/07/25", 
        salary: "$170,750", 
        status: "Pending" 
    },
    { 
        id: 103, 
        name: "Ashton Cox", 
        position: "Junior Technical Author", 
        office: "San Francisco", 
        age: 66, 
        startDate: "2009/01/12", 
        salary: "$86,000", 
        status: "Part-time" 
    },
    { 
        id: 104, 
        name: "Cedric Kelly", 
        position: "Senior Javascript Developer", 
        office: "Edinburgh", 
        age: 22, 
        startDate: "2012/03/29", 
        salary: "$433,060", 
        status: "Contract" 
    },
    { 
        id: 105, 
        name: "Airi Satou", 
        position: "Accountant", 
        office: "Tokyo", 
        age: 33, 
        startDate: "2008/11/28", 
        salary: "$162,700", 
        status: "Full-time" 
    },
    { 
        id: 106, 
        name: "Brielle Williamson", 
        position: "Integration Specialist", 
        office: "New York", 
        age: 61, 
        startDate: "2012/12/02", 
        salary: "$372,000", 
        status: "Full-time" 
    },
    { 
        id: 107, 
        name: "Herrod Chandler", 
        position: "Sales Assistant", 
        office: "San Francisco", 
        age: 59, 
        startDate: "2012/08/06", 
        salary: "$137,500", 
        status: "Full-time" 
    },
    { 
        id: 108, 
        name: "Rhona Davidson", 
        position: "Integration Specialist", 
        office: "Tokyo", 
        age: 55, 
        startDate: "2010/10/14", 
        salary: "$327,900", 
        status: "Full-time" 
    },
    { 
        id: 109, 
        name: "Colleen Hurst", 
        position: "Javascript Developer", 
        office: "San Francisco", 
        age: 39, 
        startDate: "2009/09/15", 
        salary: "$205,500", 
        status: "Contract" 
    },
    { 
        id: 110, 
        name: "Sonya Frost", 
        position: "Software Engineer", 
        office: "Edinburgh", 
        age: 23, 
        startDate: "2008/12/13", 
        salary: "$103,600", 
        status: "Full-time" 
    }
];

// Document ready event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the employee table
    populateEmployeeTable(employees);
    
    // Add event listeners
    setupEventListeners();
});

// Populate the employee table with data
function populateEmployeeTable(data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No employees found</td></tr>`;
        return;
    }
    
    data.forEach(employee => {
        // Determine status badge class
        let statusClass = '';
        switch(employee.status) {
            case 'Full-time':
                statusClass = 'bg-primary';
                break;
            case 'Part-time':
                statusClass = 'bg-info';
                break;
            case 'Contract':
                statusClass = 'bg-success';
                break;
            case 'Pending':
                statusClass = 'bg-warning';
                break;
            default:
                statusClass = 'bg-secondary';
        }
        
        // Create table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.office}</td>
            <td>${employee.age}</td>
            <td>${employee.startDate}</td>
            <td>${employee.salary}</td>
            <td><span class="badge ${statusClass}">${employee.status}</span></td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" data-id="${employee.id}">
                            <i class="fas fa-edit me-2"></i>Edit
                        </a></li>
                        <li><a class="dropdown-item text-danger" href="#" data-id="${employee.id}">
                            <i class="fas fa-trash-alt me-2"></i>Delete
                        </a></li>
                    </ul>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Set up event listeners for form interactions
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Entries per page
    const entriesPerPage = document.getElementById('entriesPerPage');
    if (entriesPerPage) {
        entriesPerPage.addEventListener('change', function() {
            // Update the table with the new entries per page value
            // This would typically trigger a server request in a real app
            console.log(`Showing ${entriesPerPage.value} entries per page`);
        });
    }
    
    // Edit employee modal
    const editEmployeeModal = document.getElementById('editEmployeeModal');
    if (editEmployeeModal) {
        editEmployeeModal.addEventListener('show.bs.modal', function(event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            
            // Extract employee ID from the button's data attribute
            const employeeId = button.getAttribute('data-id');
            
            // Find the employee data
            const employee = employees.find(emp => emp.id == employeeId);
            
            if (employee) {
                // Populate the form fields
                document.getElementById('editEmployeeId').value = employee.id;
                document.getElementById('editFullName').value = employee.name;
                document.getElementById('editPosition').value = employee.position;
                document.getElementById('editOffice').value = employee.office;
                document.getElementById('editSalary').value = employee.salary.replace('$', '').replace(',', '');
                document.getElementById('editStatus').value = employee.status;
                
                // Department would need to be set based on employee data
                // This is just a placeholder as departments aren't in the sample data
                document.getElementById('editDepartment').value = 'System Development & Innovation Lab';
            }
        });
    }
    
    // Add employee form submission
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    if (addEmployeeForm) {
        const addEmployeeButton = document.querySelector('button[form="addEmployeeForm"]');
        if (addEmployeeButton) {
            addEmployeeButton.addEventListener('click', function() {
                // In a real application, this would submit the form data to the