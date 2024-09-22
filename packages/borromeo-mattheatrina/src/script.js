let expenses = [];
let totalAmount = 0;

const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');
const expenseForm = document.getElementById('expense-form');

// Add expense event listener on form submit
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    // Validation to check if category and amount are valid
    if (category && amount && !isNaN(amount) && amount > 0) {
        const expense = {
            id: Date.now(),
            category: category,
            amount: amount
        };

        expenses.push(expense);
        totalAmount += amount;

        updateUI();

        // Clear the form inputs
        expenseForm.reset();
    } else {
        alert("Please enter a valid category and amount.");
    }
});

// Update the list of expenses and total
function updateUI() {
    // Clear the current expense list
    expenseList.innerHTML = '';

    // create list items
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            💰${expense.category}: ₱${expense.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    // Update total amount display
    totalAmountDisplay.textContent = totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 });
}

// Delete expense function
function deleteExpense(id) {
    const expenseToDelete = expenses.find(expense => expense.id === id);

    if (confirm(`Are you sure you want to delete the expense: ${expenseToDelete.category} - ₱${expenseToDelete.amount.toFixed(2)}?`)) {
        totalAmount -= expenseToDelete.amount;
        expenses = expenses.filter(expense => expense.id !== id);
        
        updateUI();
    }
}
