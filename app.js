
// --- 1. THE DATA ---
// (In a real app, this comes from a database)
const tenantData = {
  "apt-101": { 
    name: "John Smith", 
    status: "Paid", 
    due_date: "Nov 1st" 
  },
  "apt-102": { 
    name: "Jane Doe",   
    status: "Pending", 
    due_date: "Nov 1st" 
  },
  "apt-103": { 
    name: "Bob Johnson", 
    status: "Paid", 
    due_date: "Nov 1st" 
  },
  "apt-201": { 
    name: "Maria Garcia", 
    status: "Late", 
    due_date: "Nov 1st" 
  }
};

// --- 2. STATUS CHECKER DOM ELEMENTS ---
// Get all the HTML elements we need to work with
const checkBtn = document.getElementById('check-btn');
const aptInput = document.getElementById('apt-number');
const statusDisplay = document.getElementById('status-display');
const errorMessage = document.getElementById('error-message');
const tenantNameEl = document.getElementById('tenant-name');
const paymentStatusEl = document.getElementById('payment-status');
const dueDateEl = document.getElementById('due-date');

// --- 3. STATUS CHECKER EVENT LISTENER ---
// Run a function when the "Check Status" button is clicked
checkBtn.addEventListener('click', () => {
    // Get the value from the input box and remove extra spaces
    const aptNumber = aptInput.value.trim().toLowerCase();

    // Look up the tenant in our data object
    const tenant = tenantData[aptNumber];

    // --- THE LOGIC ---
    if (tenant) {
        // If we find the tenant:
        // 1. Show the hidden status-display section
        statusDisplay.classList.remove('hidden');

        // 2. Clear any old error messages
        errorMessage.textContent = '';
        errorMessage.className = '';

        // 3. Fill the <span> tags with the tenant's data
        tenantNameEl.textContent = tenant.name;
        paymentStatusEl.textContent = tenant.status;
        dueDateEl.textContent = tenant.due_date;

        // 4. (Bonus!) Add a class to the status for styling
        paymentStatusEl.className = tenant.status.toLowerCase(); // 'paid', 'pending', or 'late'

    } else {
        // If we don't find the tenant:
        // 1. Hide the status display
        statusDisplay.classList.add('hidden');

        // 2. Show an error message
        errorMessage.textContent = 'Apartment not found. Please check the number and try again.';
        errorMessage.className = 'error'; // Add the .error class
    }
});


// --- 4. MAINTENANCE FORM DOM ELEMENTS ---
const maintForm = document.getElementById('maintenance-form');
const maintAptEl = document.getElementById('maint-apt');
const maintCategoryEl = document.getElementById('maint-category');
const maintDetailsEl = document.getElementById('maint-details');
const maintPermissionEl = document.getElementById('maint-permission');

// --- 5. MAINTENANCE FORM EVENT LISTENER ---
maintForm.addEventListener('submit', (event) => {
    // Prevent the form from trying to submit normally
    event.preventDefault(); 
    
    // --- Get the values ---
    const email = "your-email@yourbusiness.com"; // <-- IMPORTANT: Change this
    const subject = `Maintenance Request: ${maintAptEl.value} - ${maintCategoryEl.value}`;
    
    // --- Build the email body ---
    let body = `
        --- Maintenance Request ---
        Apartment: ${maintAptEl.value}
        Category: ${maintCategoryEl.value}
        Details: ${maintDetailsEl.value}
        Permission to Enter: ${maintPermissionEl.checked ? "YES" : "NO"}
    `;
    
    // --- Create and open the mailto link ---
    // We must 'encode' the text to make it safe for a URL
    let mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's email client
    window.location.href = mailtoLink;
});