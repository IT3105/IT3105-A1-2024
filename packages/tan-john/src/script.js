
let subscriptions = [];

// Function to add a new subscription
function addSubscription(event) {

     // Prevent the form from submitting and reloading the page
     event.preventDefault();

    // Get values from the form
    const name = document.getElementById('name').value;
    const category = document.getElementById('cat').value;
    const dateSubscribed = document.getElementById('date').value;
    const frequency = document.getElementById('frequency').value;
    const renewalDate = document.getElementById('renew').value;

    // Create a subscription object
    const newSubscription = {
        id: subscriptions.length, // unique ID
        name: name,
        category: category,
        dateSubscribed: dateSubscribed,
        frequency: frequency,
        renewalDate: renewalDate
    };

    // Add to the subscriptions array
    subscriptions.push(newSubscription);

    // Call function to display the subscriptions in the table
    displaySubscriptions();

    // Reset the form
    document.querySelector('.newSubModal form').reset();

    // Close the modal
    const modalElement = document.querySelector('.newSubModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

 // Function to display subscriptions in the table
 function displaySubscriptions() {
    const tbody = document.querySelector('#datatable tbody');
    tbody.innerHTML = ''; // Clear the table body

    subscriptions.forEach(subscription => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${subscription.name}</td>
            <td>${subscription.category}</td>
            <td>${subscription.dateSubscribed}</td>
            <td>${subscription.frequency}</td>
            <td>${subscription.renewalDate}</td>
            <td>
                <div class="d-flex">
                    <button type="button" class="btn btn-primary btn-sm" onclick="openEditModal(${subscription.id})">
                        <ion-icon name="pencil-outline"></ion-icon>
                    </button>&nbsp;
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteSubscription(${subscription.id})">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Attach the event listener for form submission
document.querySelector('.newSubModal form').addEventListener('submit', addSubscription);

 // Function to delete a subscription
 function deleteSubscription(id) {
    // Filter out the deleted subscription
    subscriptions = subscriptions.filter(sub => sub.id !== id);

    // Update the display
    displaySubscriptions();
}

   // Function to open the edit modal and populate it with the current subscription data
   function openEditModal(id) {
    const subscription = subscriptions.find(sub => sub.id === id);

    // Populate the edit form
    document.querySelector('#editSubModal #name').value = subscription.name;
    document.querySelector('#editSubModal #cat').value = subscription.category;
    document.querySelector('#editSubModal #date').value = subscription.dateSubscribed;
    document.querySelector('#editSubModal #frequency').value = subscription.frequency;
    document.querySelector('#editSubModal #renew').value = subscription.renewalDate;

    // Store the ID of the subscription being edited
    document.querySelector('#editSubModal form').dataset.editId = id;

    // Show the edit modal
    const modalElement = document.getElementById('editSubModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Function to save the edited subscription
function saveSubscription() {
    const id = document.querySelector('#editSubModal form').dataset.editId;
    const subscription = subscriptions.find(sub => sub.id == id);

    // Get the new values from the edit form
    subscription.name = document.querySelector('#editSubModal #name').value;
    subscription.category = document.querySelector('#editSubModal #cat').value;
    subscription.dateSubscribed = document.querySelector('#editSubModal #date').value;
    subscription.frequency = document.querySelector('#editSubModal #frequency').value;
    subscription.renewalDate = document.querySelector('#editSubModal #renew').value;

    // Update the display
    displaySubscriptions();

    // Close the edit modal
    const modalElement = document.getElementById('editSubModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}


// Event listener for the "Save changes" button in the edit modal
document.querySelector('#editSubModal form').addEventListener('submit', function (event) {
    event.preventDefault();
    saveSubscription();
});
