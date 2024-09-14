window.addEventListener("scroll", function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollPosition < windowHeight * 0.5) {
        document.body.style.backgroundImage = "url('genshin2.jpg')";
    } else if (scrollPosition < windowHeight * 1.5) {
        document.body.style.backgroundImage = "url('Pillars.jpg')";
    } else {
        document.body.style.backgroundImage = ""; 
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
});

function createSubscriptionCards() {
    const cardsContainer = document.querySelector('.cards-container'); 
    const cardData = [
        {
            id: 'netflix',
            imageSrc: 'netflix.png',
            description: 'Enjoy unlimited movies and TV shows with Netflix.',
            buttonText: 'Subscribe to Netflix'
        },
        {
            id: 'spotify',
            imageSrc: 'spotify.png',
            description: 'Stream unlimited music and podcasts with Spotify.',
            buttonText: 'Subscribe to Spotify'
        },
        {
            id: 'youtube',
            imageSrc: 'youtube.png',
            description: 'Stream unlimited videos with YouTube.',
            buttonText: 'Subscribe to YouTube'
        },
        {
            id: 'Iwantv',
            imageSrc: 'iwantv.png',
            description: 'Stream unlimited videos with Iwantv.',
            buttonText: 'Subscribe to Iwantv'
        }
    ];
    const cardsHtml = cardData.map(data => `
        <div class="card">
            <img src="${data.imageSrc}" alt="${data.id}" class="card-image">
            <div class="card-content">
                <p class="card-description">${data.description}</p>
                <button class="subscribe-button" onclick="showSubscriptionDetails('${data.id}')">${data.buttonText}</button>
            </div>
        </div>
    `).join('');
    cardsContainer.innerHTML = cardsHtml;
}

window.onload = createSubscriptionCards;

function showSubscriptionDetails(service) {
    const tableBody = document.querySelector('#subscriptions-table tbody');
    document.getElementById('subscription-details').style.display = 'block';
    let serviceName = '';
    let description = '';

   
    switch (service) {
        case 'netflix':
            serviceName = 'Netflix';
            description = 'Unlimited movies and TV shows with Netflix.';
            break;
        case 'spotify':
            serviceName = 'Spotify';
            description = 'Unlimited music and podcasts with Spotify.';
            break;
        case 'youtube':
            serviceName = 'YouTube';
            description = 'Unlimited videos with YouTube.';
            break;
        case 'Iwantv':
            serviceName = 'Iwantv';
            description = 'Unlimited videos with Iwantv.';
            break;
        default:
            serviceName = 'Unknown Service';
            description = 'Subscription service not found.';
            break;
    }

    if (!Array.from(tableBody.rows).some(row => row.cells[0].innerText === serviceName)) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${serviceName}</td>
            <td>${description}</td>
            <td>
                <button onclick="deleteSubscription('${service}')">Unsubscribe</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    }
}
function deleteSubscription(service) {
    const tableBody = document.querySelector('#subscriptions-table tbody');
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        if (row.cells[0].innerText.toLowerCase() === service.toLowerCase()) {
            tableBody.removeChild(row);
        }
    });

    alert(`You have unsubscribed from ${service}`);
}

function editSubscriptions() {
    const tableBody = document.querySelector('#subscriptions-table tbody');

    const confirmEdit = confirm('Do you want to clear all subscriptions?');
    if (confirmEdit) {
        tableBody.innerHTML = ''; 
        alert('All subscriptions have been cleared.');
    }
}
