document.addEventListener('DOMContentLoaded', () => {
    const mealForm = document.getElementById('mealForm');
    const mealInput = document.getElementById('mealInput');
    const daySelect = document.getElementById('daySelect');
    const mealList = document.getElementById('mealList');
  
    function addMeal(meal, day) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${day}:</strong> ${meal} 
        <button class="delete-btn">Delete</button>
      `;
      mealList.appendChild(li);
  
      li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
      });
    }
  
    mealForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const meal = mealInput.value;
      const day = daySelect.value;
  
      addMeal(meal, day);
  
      mealInput.value = '';
    });
  });
  