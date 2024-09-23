document.addEventListener('DOMContentLoaded', function () {
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const addExpenseButton = document.getElementById('addExpense');
    const expenseList = document.getElementById('expenseList');
    
    let expenses = [];

        addExpenseButton.addEventListener('click', () => {
        const name = expenseNameInput.value;
        const amount = expenseAmountInput.value;

        if (name === '' || amount === '') {
            alert('Please enter a valid name and amount.');
            return;
        }

        const expense = {
            id: Date.now(),
            name: name,
            amount: amount
        };

        expenses.push(expense);
        renderExpenses();
        clearInputs();
    });

        function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.name} - ₱${expense.amount}</span>
                <button class="edit" onclick="editExpense(${expense.id})">Edit</button>
                <button class="delete" onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

        function clearInputs() {
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    }

       window.deleteExpense = function (id) {
        expenses = expenses.filter(expense => expense.id !== id);
        renderExpenses();
    };

       window.editExpense = function (id) {
        const expense = expenses.find(expense => expense.id === id);
        expenseNameInput.value = expense.name;
        expenseAmountInput.value = expense.amount;
        deleteExpense(id); 
    };
});
