$(document).ready(function() {
    const members = [
        { 
            name: 'Amanda Sukma',
            gen: 10,
            endDate: '2024-07-26T00:00:00+07:00', 
            photo: './assets/img/amanda.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id',
            video: "https://twitter.com/viiccc89/status/1786036199657972202?ref_src=twsrc%5Etfw",
            proofs: ['./assets/img/proof/Amanda/bukti1.png', './assets/img/proof/Amanda/bukti2.jpg']
        },
        { 
            name: 'Indira Seruni',
            gen: 10,
            endDate: '2024-07-12T00:00:00+07:00', 
            photo: './assets/img/indira.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1784?lang=id',
            video: "https://twitter.com/viiccc89/status/1786036199657972202?ref_src=twsrc%5Etfw",
            proofs: ['./assets/img/proof/Indira/bukti1.jpg', './assets/img/proof/Indira/bukti2.webp']
        },
        { 
            name: 'Callista Alifia',
            gen: 10,
            endDate: '2024-08-17T00:00:00+07:00', 
            photo: './assets/img/callie.png', 
            newsURL: 'https://jkt48.com/news/detail/id/1793?lang=id',
            video: "https://twitter.com/MuzziPtra/status/1791466051651453189?ref_src=twsrc%5Etfw",
            proofs: ['./assets/img/proof/Callie/bukti1.jpg', './assets/img/proof/Callie/bukti2.jpg']
        },
        { 
            name: 'Flora Shafiq',
            gen: 8,
            endDate: '2025-02-11T00:00:00+07:00', 
            photo: './assets/img/flora.jpg', 
            newsURL: 'https://jkt48.com/news/detail/id/1874?lang=id',
            video: false,
            proofs: ['./assets/img/proof/Flora/bukti1.jpg']
        },
        { 
            name: 'Gabriela Abigail',
            gen: 10,
            endDate: '2025-11-01T00:00:00+07:00', 
            photo: './assets/img/ella.jpg', 
            newsURL: 'https://jkt48.com/news/detail/id/1949?lang=id',
            video: false,
            proofs: ['./assets/img/proof/Ella/bukti1.webp']
        },
        { 
            name: 'Gendis Mayrannisa',
            gen: 11,
            endDate: '2026-05-18T00:00:00+07:00', 
            photo: './assets/img/gendis.jpg', 
            newsURL: 'https://jkt48.com/news/detail/id/1995?lang=id',
            video: false,
            proofs: ['./assets/img/proof/Gendis/bukti1.jpg', './assets/img/proof/Gendis/bukti2.jpg', './assets/img/proof/Gendis/bukti3.jpg', './assets/img/proof/Gendis/bukti4.jpg']
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

        const proofBtn = (member.proofs && member.proofs.length > 0) 
        ? `<a href="#" class="proof-button w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-gray-700 transition-all shadow-sm" data-name="${member.name}" data-proofs='${JSON.stringify(member.proofs)}' title="Lihat Bukti"><i class="fa-solid fa-camera text-xs"></i></a>` 
        : ``;

        const klarifVid = (member.video) 
            ? `<a href="#" class="video-button w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-gray-700 transition-all shadow-sm" data-video="${member.video}" title="Watch Video"><i class="fa-solid fa-play text-xs"></i></a>` 
            : ``;

        countdownElement.className = 'glass-card rounded-2xl md:rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 relative overflow-hidden group transition-all hover:bg-white/60';

        countdownElement.innerHTML = `
            <div class="relative shrink-0">
                <div class="w-24 h-24 sm:w-24 sm:h-24 rounded-full sm:rounded-2xl overflow-hidden shadow-md border-2 border-white/80 mx-auto">
                    <img src="${member.photo}" loading="lazy" alt="${member.name}" class="member-photo w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                </div>
                <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-2 sm:-bottom-2 bg-gray-900 text-white text-[10px] font-bold px-1 py-0.5 sm:py-1 rounded-lg border border-white shadow-sm z-20">
                    Gen ${member.gen}
                </span>
            </div>

            <div class="flex-grow w-full z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
                
                <h2 class="text-xl sm:text-xl font-bold text-gray-800 leading-tight mb-2">${member.name}</h2>
                
                <div class="flex gap-2 justify-center sm:justify-start mb-4">
                    ${proofBtn}
                    ${klarifVid}
                    <a href="${member.newsURL}" target="_blank" class="w-9 h-9 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-gray-700 transition-all shadow-sm border border-white/50" title="Read News">
                        <i class="fa-solid fa-newspaper text-xs"></i>
                    </a>
                </div>

                <p class="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Hukuman Selesai: <span class="text-gray-600">${formatDate(member.endDate)}</span>
                </p>
                
                <div id="countdown-${member.name.replace(/\s+/g, '')}" class="text-xl sm:text-2xl font-mono font-bold text-gray-600 bg-white/60 rounded-xl py-2 px-4 border border-white/50 backdrop-blur-sm shadow-inner w-full sm:w-auto">
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

    $(document).on("click", ".proof-button", function(e) {
        e.preventDefault();
        const name = $(this).data("name");
        const proofs = $(this).data("proofs");

        let imagesHtml = `
            <div class="flex overflow-x-auto gap-4 p-2 pb-4 snap-x snap-mandatory scrollbar-hide">
        `;
        
        proofs.forEach(img => {
            imagesHtml += `
                <div class="flex-none w-64 md:w-80 snap-center rounded-2xl overflow-hidden shadow-sm border border-white/50">
                    <img src="${img}" 
                        class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
                        alt="Bukti ${name}">
                </div>`;
        });
        
        imagesHtml += '</div>';
        imagesHtml += '<p class="text-[10px] text-gray-400 mt-2 italic text-center uppercase tracking-widest">← Geser untuk melihat lainnya →</p>';

        Swal.fire({
            title: `Bukti - ${name}`,
            html: imagesHtml,
            showCloseButton: true,
            showConfirmButton: false,
            width: 'auto',
            maxWidth: '90vw',
            customClass: {
                popup: 'glass-panel rounded-[2rem]',
                title: 'text-xl font-bold text-gray-800 pt-6'
            }
        });
    });
});