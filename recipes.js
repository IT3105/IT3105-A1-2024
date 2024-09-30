function addRecipe(event){
    event.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;

    const editingRecipeId = localStorage.getItem('editingRecipeId');
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    if(editingRecipeId){
        const index = recipes.findIndex(r => r.id === parseInt(editingRecipeId));
        recipes[index]={
            id: parseInt(editingRecipeId),
            name: recipeName,
            ingredients: ingredients,
            instructions: instructions
        };
        localStorage.removeItem('editingRecipeId');
        alert('Recipe updated successfully!');
    }else{
        const recipe ={
            id: Date.now(),
            name: recipeName,
            ingredients: ingredients,
            instructions: instructions
        };
        recipes.push(recipe);
        alert('Recipe added successfully!');
    }
    localStorage.setItem('recipes', JSON.stringify(recipes));
    clearForm();
    displayRecipes();
}

function clearForm(){
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-instructions').value = '';
}

function editRecipe(id){
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes.find(r => r.id === id);

    if(recipe){
        localStorage.setItem('editingRecipeId', id);
        window.location.href = 'Recipe Collection.html';
    }
}


function handleEditIfNeeded(){
    const editingRecipeId = localStorage.getItem('editingRecipeId');

    if(editingRecipeId){
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipe = recipes.find(r => r.id === parseInt(editingRecipeId));

        if(recipe){
            document.getElementById('recipe-name').value = recipe.name;
            document.getElementById('recipe-ingredients').value = recipe.ingredients;
            document.getElementById('recipe-instructions').value = recipe.instructions;
        }
    }
}

function deleteRecipe(id){
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}


function displayRecipes(){
    const recipesContainer = document.querySelector('#recipe-storage ul');
    if (!recipesContainer) return;

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe =>{
        const recipeElement = document.createElement('li');
        recipeElement.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
            <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    displayRecipes();

    const recipeForm = document.getElementById('recipe-form');
    if(recipeForm){
        recipeForm.addEventListener('submit', addRecipe);
    }

    handleEditIfNeeded();
});
