document.addEventListener('DOMContentLoaded', () => {
    const members = [
        { name: 'Amanda Sukma', endDate: '2024-07-25', photo: 'https://telegra.ph/file/643e2f488bc1cd09d20f6.png' },
        { name: 'Indira Seruni', endDate: '2024-07-11', photo: 'https://telegra.ph/file/643e2f488bc1cd09d20f6.png' },
        { name: 'Callista Alifia', endDate: '2024-08-16', photo: 'https://telegra.ph/file/31cd4f79474439c34a442.png' }
    ];

    // Sorting members by endDate
    members.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    const countdownContainer = document.getElementById('countdowns');

    members.forEach(member => {
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('countdown');
        countdownElement.innerHTML = `
            <img src="${member.photo}" alt="${member.name}">
            <div>
                <h2 class="text-xl font-semibold">${member.name}</h2>
                <p class="text-gray-600">Punished until: ${member.endDate}</p>
            </div>
            <div id="countdown-${member.name}" class="text-2xl font-bold countdown-timer"></div>
        `;
        countdownContainer.appendChild(countdownElement);

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const endDate = new Date(member.endDate).getTime();
            const distance = endDate - now;

            if (distance < 0) {
                document.getElementById(`countdown-${member.name}`).innerText = "Punishment over";
                clearInterval(countdownInterval);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const months = Math.floor(days / 30);
                const remainingDays = days % 30;

                document.getElementById(`countdown-${member.name}`).innerText = 
                    `${months}m ${remainingDays}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    });
});