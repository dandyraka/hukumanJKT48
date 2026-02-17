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
        { 
            name: 'Flora Shafiq',
            gen: 8,
            endDate: '2025-02-11T00:00:00+07:00', 
            photo: './Assets/img/flora.jpg', 
            newsURL: 'https://jkt48.com/news/detail/id/1874?lang=id',
            video: false
        },
        { 
            name: 'Gabriela Abigail',
            gen: 10,
            endDate: '2025-11-01T00:00:00+07:00', 
            photo: './Assets/img/ella.jpg', 
            newsURL: 'https://jkt48.com/news/detail/id/1949?lang=id',
            video: false
        },
        { 
            name: 'Gendis Mayrannisa',
            gen: 11,
            endDate: '2026-05-18T00:00:00+07:00', 
            photo: './Assets/img/gendis.jpg', 
            newsURL: 'https://jkt48.com/news/detail/id/1995?lang=id',
            video: false
        },
    ];

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', options);
    };

    members.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    members.forEach(member => {
        const countdownElement = document.createElement('div');

        const klarifVid = (member.video) 
            ? `<a href="#" class="video-button w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-gray-700 transition-all shadow-sm" data-video="${member.video}" title="Watch Video"><i class="fa-solid fa-play text-xs"></i></a>` 
            : ``;

        countdownElement.className = 'glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden group transition-all hover:bg-white/60';
        
        countdownElement.innerHTML = `
            <div class="relative shrink-0">
                <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full sm:rounded-2xl overflow-hidden shadow-md border-2 border-white/80 mx-auto">
                    <img src="${member.photo}" loading="lazy" alt="${member.name}" class="member-photo w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                </div>
                <span class="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-full sm:rounded-lg border border-white shadow-sm">Gen ${member.gen}</span>
            </div>

            <div class="flex-grow w-full text-center sm:text-left z-10 flex flex-col justify-center">
                
                <div class="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start mb-2">
                    <h2 class="text-lg sm:text-xl font-bold text-gray-800 leading-tight mb-2 sm:mb-0">${member.name}</h2>
                    
                    <div class="flex gap-2 shrink-0">
                        ${klarifVid}
                        <a href="${member.newsURL}" target="_blank" class="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-gray-700 transition-all shadow-sm" title="Read News">
                            <i class="fa-solid fa-newspaper text-xs md:text-sm"></i>
                        </a>
                    </div>
                </div>
                
                <p class="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Selesai Hukuman: <span class="text-gray-700">${formatDate(member.endDate)}</span></p>
                
                <div id="countdown-${member.name.replace(/\s+/g, '')}" class="text-lg sm:text-2xl font-mono font-bold text-gray-600 bg-white/60 rounded-xl py-1.5 px-3 sm:py-2 sm:px-4 inline-block border border-white/50 backdrop-blur-sm shadow-inner w-full sm:w-auto">
                    Loading...
                </div>
            </div>
        `;
        
        $("#countdowns").append(countdownElement);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const endDate = new Date(member.endDate).getTime();
            const distance = endDate - now;
            const elementId = `countdown-${member.name.replace(/\s+/g, '')}`;
            const el = document.getElementById(elementId);

            if (!el) return;

            if (distance <= 0) {
                clearInterval(countdownInterval);
                el.innerText = "Selesai";
                el.classList.remove("text-gray-600", "font-mono");
                el.classList.add("text-green-600", "bg-green-100/80", "font-bold");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                const fmt = (n) => n < 10 ? `0${n}` : n;
                
                el.innerHTML = `<span class="tracking-tighter">${days}h ${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}</span>`;
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); 
    });

    $(document).on("click", ".video-button", function(e) {
        e.preventDefault();
        const videoUrl = $(this).data("video");
        Swal.fire({
            html: `<div class="rounded-xl overflow-hidden"><blockquote class="twitter-tweet" data-media-max-width="560"><a href="${videoUrl}"></a></blockquote></div>`,
            showCloseButton: false,
            showConfirmButton: false,
            background: 'transparent',
            customClass: {
                popup: 'glass-panel'
            },
            width: '560px',
            padding: '0',
            didOpen: () => {
                if(window.twttr) {
                    twttr.widgets.load();
                }
            }
        });
    });
});