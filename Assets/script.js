$(document).ready(function() {
    const members = [
        { 
            name: 'Amanda Sukma',
            gen: 10,
            endDate: '2024-07-26T00:00:00+07:00', 
            photo: './Assets/img/amanda.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id',
            video: "https://twitter.com/viiccc89/status/1786036199657972202?ref_src=twsrc%5Etfw"
        },
        { 
            name: 'Indira Seruni',
            gen: 10,
            endDate: '2024-07-12T00:00:00+07:00', 
            photo: './Assets/img/indira.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id',
            video: "https://twitter.com/viiccc89/status/1786036199657972202?ref_src=twsrc%5Etfw"
        },
        { 
            name: 'Callista Alifia',
            gen: 10,
            endDate: '2024-08-17T00:00:00+07:00', 
            photo: './Assets/img/callie.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1793?lang=id',
            video: "https://twitter.com/MuzziPtra/status/1791466051651453189?ref_src=twsrc%5Etfw"
        },
    ];

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', options);
    };

    members.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    members.forEach(member => {
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('countdown');
        countdownElement.innerHTML = `
            <div class="member-container">
                <img src="${member.photo}" data-src="${member.photo}" alt="${member.name}" class="member-photo lazyload">
                <span class="category-badge">Gen ${member.gen}</span>
            </div>
            <div class="member-details-container">
                <div class="member-details">
                    <h2 class="text-xl font-semibold member-name">${member.name}</h2>
                    <p class="text-gray-600">Punished until: <span class="punishment-date">${formatDate(member.endDate)}</span></p>
                    <a href="${member.newsURL}" target="_blank" class="news-button underline">NEWS</a>
                    <a href="#" class="video-button underline" data-video="${member.video}"><i class="fa-solid fa-video"></i></a>
                </div>
            </div>
            <div class="countdown-timer-container">
                <div id="countdown-${member.name}" class="text-2xl font-bold countdown-timer"></div>
            </div>
        `;
        $("#countdowns").append(countdownElement);

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

    $("img.lazyload").lazyload();

    $(document).on("click", ".video-button", function(e) {
        e.preventDefault();
        const videoUrl = $(this).data("video");
        Swal.fire({
            html: `<blockquote class="twitter-tweet" data-media-max-width="560"><a href="${videoUrl}"></a></blockquote>`,
            showCloseButton: false,
            showConfirmButton: false,
            width: '560px',
            padding: '1rem',
            didOpen: () => {
                twttr.widgets.load();
            }
        });
    });
  
});
