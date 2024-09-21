
let contacts= [];
let editIndex= -1;

document.getElementById('addButton').addEventListener("click", function (){
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;

    if(!fname || !lname || !email || !number ){
        alert("FILL OUT ALL THE FIELDS");
        return;
    } 

    if (number.length !== 11) {
        alert("PHONE NUMBER MUST BE 11 DIGITS!");
         return;
    }
    if (!email.includes('@')) {
        alert("EMAIL  MUST INCLUDE '@'!");
         return;
    }       


    const person = {
        fname,
        lname,
        email,
        number
    };
    
    if (editIndex === -1){
        contacts.push(person);
    }else{
        contacts[editIndex] = person;
        editIndex = -1;
    }
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('number').value = "";
    
displayContacts();
});

    function displayContacts(){
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        

        contacts.forEach((contact, index) => {

            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${contact.fname}</td>
            <td>${contact.lname}</td>
            <td>${contact.email}</td>
            <td>${contact.number}</td>
            <td>
                <button class="edit" onclick="editContact(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
            </td>
            `;

            tableBody.appendChild(row);
        });     
}

function editContact(index){
    document.getElementById('fname').value = contacts[index].fname;
    document.getElementById('lname').value = contacts[index].lname;
    document.getElementById('email').value = contacts[index].email;
    document.getElementById('number').value = contacts[index].number;
    editIndex = index;
}

function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts();
}
