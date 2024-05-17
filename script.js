document.addEventListener('DOMContentLoaded', () => {
    const members = [
        { 
            name: 'Amanda Sukma',
            gen: 10,
            endDate: '2024-07-25T00:00:00+07:00', 
            photo: 'https://telegra.ph/file/ef499ca1c37c36cc728f5.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id' 
        },
        { 
            name: 'Indira Seruni',
            gen: 10,
            endDate: '2024-07-11T00:00:00+07:00', 
            photo: 'https://telegra.ph/file/d79ddffdb978d6b85d819.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id' 
        },
        { 
            name: 'Callista Alifia',
            gen: 10,
            endDate: '2024-08-16T00:00:00+07:00', 
            photo: 'https://telegra.ph/file/bdd0033d311624f197f6a.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1793?lang=id' 
        },
    ];

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    };

    members.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    const countdownContainer = document.getElementById('countdowns');

    members.forEach(member => {
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('countdown');
        countdownElement.innerHTML = `
            <div class="member-container">
                <img src="${member.photo}" alt="${member.name}" class="member-photo">
                <span class="category-badge">Gen ${member.gen}</span>
            </div>
            <div class="member-details-container">
                <div class="member-details">
                    <h2 class="text-xl font-semibold member-name">${member.name}</h2>
                    <p class="text-gray-600">Punished until: <span class="punishment-date">${formatDate(member.endDate)}</span></p>
                    <a href="${member.newsURL}" target="_blank" class="news-button underline">NEWS</a>
                </div>
            </div>
            <div class="countdown-timer-container">
                <div id="countdown-${member.name}" class="text-2xl font-bold countdown-timer"></div>
            </div>
        `;
        countdownContainer.appendChild(countdownElement);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const endDate = new Date(member.endDate).getTime();
            const distance = endDate - now;

            if (distance <= 0) {
                clearInterval(countdownInterval);
                document.getElementById(`countdown-${member.name}`).innerText = "Punishment over";
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById(`countdown-${member.name}`).innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
    });
});
