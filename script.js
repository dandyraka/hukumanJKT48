document.addEventListener('DOMContentLoaded', () => {
    const members = [
        { name: 'Amanda Sukma', endDate: '2024-07-25T00:00:00+07:00', photo: 'https://telegra.ph/file/ef499ca1c37c36cc728f5.png', newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id' },
        { name: 'Indira Seruni', endDate: '2024-07-11T00:00:00+07:00', photo: 'https://telegra.ph/file/d79ddffdb978d6b85d819.png', newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id' },
        { name: 'Callista Alifia', endDate: '2024-08-16T00:00:00+07:00', photo: 'https://telegra.ph/file/bdd0033d311624f197f6a.png', newsURL: 'https://jkt48.com/news/detail/id/1793?lang=id' },
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
            <img src="${member.photo}" alt="${member.name}">
            <div>
                <h2 class="text-xl font-semibold member-name">${member.name}</h2>
                <p class="text-gray-600">Punished until: <span class="punishment-date">${formatDate(member.endDate)}</span></p>
                <a href="${member.newsURL}" target="_blank" class="news-button underline">NEWS</a>
            </div>
            <div id="countdown-${member.name}" class="text-2xl font-bold countdown-timer"></div>
        `;
        countdownContainer.appendChild(countdownElement);

        const countdownInterval = setInterval(() => {
            const now = new Date();
            const endDate = new Date(member.endDate);
            let distance = endDate - now;

            if (distance < 0) {
                document.getElementById(`countdown-${member.name}`).innerText = "Punishment over";
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            distance -= days * (1000 * 60 * 60 * 24);

            const hours = Math.floor(distance / (1000 * 60 * 60));
            distance -= hours * (1000 * 60 * 60);

            const minutes = Math.floor(distance / (1000 * 60));
            distance -= minutes * (1000 * 60);

            const seconds = Math.floor(distance / 1000);

            let countdownText = '';
            if (days > 0) countdownText += `${days}d `;
            if (hours > 0) countdownText += `${hours}h `;
            if (minutes > 0) countdownText += `${minutes}m `;
            countdownText += `${seconds}s`;

            document.getElementById(`countdown-${member.name}`).innerText = countdownText.trim();
        }, 1000);
    });
});
