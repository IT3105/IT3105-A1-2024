document.addEventListener('DOMContentLoaded', () => {
    let gifts = {
        toBuy: [],
        bought: [],
        ideas: []
    };

    function renderList() {
        for (const category in gifts) {
            const list = document.getElementById(`${category}List`);
            list.innerHTML = '';
            gifts[category].forEach((gift, index) => {
                const li = document.createElement('li');
                li.classList.add('gift-item');
                li.dataset.index = index;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('gift-checkbox');
                li.appendChild(checkbox);

                const giftName = document.createElement('span');
                giftName.textContent = gift.name;
                li.appendChild(giftName);

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');

                
                if (category === 'ideas') { 
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.classList.add('edit');
                    editButton.onclick = () => editGift(category, index);
                    buttonContainer.appendChild(editButton);
                }

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete');
                deleteButton.onclick = () => deleteGift(category, index);
                buttonContainer.appendChild(deleteButton);

                li.appendChild(buttonContainer);

                list.appendChild(li);
            });
        }
    }

    function addGift() {
        const input = document.getElementById('giftInput');
        if (input.value.trim() === '') return;

        const gift = { name: input.value.trim() };
        gifts.ideas.push(gift);
        input.value = '';
        renderList();
    }

    function editGift(category, index) {
        const newName = prompt('Enter new gift name:', gifts[category][index].name);
        if (newName !== null && newName.trim() !== '') {
            gifts[category][index].name = newName.trim();
            renderList();
        }
    }

    function deleteGift(category, index) {
        gifts[category].splice(index, 1);
        renderList();
    }

    function moveSelectedItems(sourceCategory, targetCategory) {
        const sourceList = document.getElementById(`${sourceCategory}List`);
        const selectedItems = sourceList.querySelectorAll('.gift-checkbox:checked');
        
        selectedItems.forEach(checkbox => {
            const li = checkbox.parentElement;
            const index = li.dataset.index;

            if (index !== undefined) {
                const [gift] = gifts[sourceCategory].splice(index, 1);
                gifts[targetCategory].push(gift);
            }
        });

        renderList();
    }

    document.getElementById('addGiftButton').addEventListener('click', addGift);

    document.getElementById('addToBoughtButton').addEventListener('click', () => {
        moveSelectedItems('toBuy', 'bought');
    });

    document.getElementById('addToBuyFromIdeasButton').addEventListener('click', () => {
        moveSelectedItems('ideas', 'toBuy');
    });

    renderList();
});
