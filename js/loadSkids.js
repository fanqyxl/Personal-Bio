// thanks ai!! :3

const modal = document.getElementById('modal');
const container = document.getElementById('skids-container');

async function loadSkids() {
    try {
        const response = await fetch('../data/skids.json');
        const data = await response.json();

        data.skids.forEach(skid => {
            const card = document.createElement('div');
            card.className = 'skid-card';
            card.innerHTML = `
                <img src="${skid.pfp}" alt="${skid.name}">
                <h2>${skid.name}</h2>
            `;
            card.addEventListener('click', () => showSkidDetails(skid));
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading skids:', error);
    }
}

function showSkidDetails(skid) {
    if (!skid || !modal) {
        console.error('Missing skid data or modal element');
        return;
    }

    // Hide modal first
    modal.style.display = 'none';
    modal.classList.remove('active');

    const modalPfp = modal.querySelector('.modal-pfp');
    const modalName = modal.querySelector('.modal-name');
    const modalDesc = modal.querySelector('.modal-description');
    const modalSocials = modal.querySelector('.modal-socials');

    if (!modalPfp || !modalName || !modalDesc || !modalSocials) {
        console.error('Missing modal elements');
        return;
    }

    // Set modal content
    modalPfp.src = skid.pfp || '';
    modalPfp.alt = skid.name || '';
    modalName.textContent = skid.name || '';
    modalDesc.textContent = skid.description || '';
    
    // Clear previous socials
    modalSocials.innerHTML = '';
    
    // Add social links if they exist
    if (skid.socials && Array.isArray(skid.socials)) {
        skid.socials.forEach(social => {
            const icon = social.platform === 'discord' ? 'fab fa-discord' : 
                        social.platform === 'github' ? 'fab fa-github' :
                        social.platform === 'website' ? 'fas fa-globe' : 'fas fa-link';
            const tooltip = social.platform === 'website' ? 'View Proof' : `View ${social.platform}`;
            modalSocials.innerHTML += `<a href="${social.url}" target="_blank" title="${tooltip}"><i class="${icon}"></i></a>`;
        });
    }

    // Show modal with slight delay to ensure smooth animation
    requestAnimationFrame(() => {
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    });
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', loadSkids);
