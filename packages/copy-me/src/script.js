const choreList = [];
const choreInput = document.getElementById("chore-input");
const addChoreButton = document.getElementById("add-chore");
const choreListDiv = document.getElementById("chore-list");

addChoreButton.addEventListener("click", () => {
    const choreDescription = choreInput.value.trim();
    if (choreDescription) {
        addChore(choreDescription);
        choreInput.value = ""; 
    } else {
        alert("Please enter a chore description.");
    }
});

function addChore(description) {
    const chore = {
        description: description,
        completed: false
    };
    choreList.push(chore);
    displayChores();
}

function displayChores() {
    choreListDiv.innerHTML = ""; 
    choreList.forEach((chore, index) => {
        const choreDiv = document.createElement("div");
        choreDiv.className = `chore`;
        
       
        const choreDescription = document.createElement("span");
        choreDescription.innerText = chore.description;
        choreDescription.className = chore.completed ? "completed" : "";

        choreDiv.appendChild(choreDescription);

    
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

    
        const completeButton = document.createElement("button");
        completeButton.innerText = "Complete";
        completeButton.className = "complete";
        completeButton.disabled = chore.completed; 
        completeButton.addEventListener("click", () => {
            markChoreAsCompleted(index);
        });

   
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", () => {
            deleteChore(index);
        });

        buttonGroup.appendChild(completeButton);
        buttonGroup.appendChild(deleteButton);
        choreDiv.appendChild(buttonGroup);
        choreListDiv.appendChild(choreDiv);
    });
}

function markChoreAsCompleted(index) {
    if (index >= 0 && index < choreList.length) {
        choreList[index].completed = true;
        displayChores();
    }
}

function deleteChore(index) {
    if (index >= 0 && index < choreList.length) {
        choreList.splice(index, 1);
        displayChores();
    }
}

