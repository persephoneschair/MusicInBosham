// ===== Configuration =====
const CONFIG = {
    // Google Sheets CSV URL - replace with your published CSV URL
    csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRr0MMoNhGxJHmdmoDlYFceHgkFDPXCV1NKvfw0laZc_XcOMuK7gNsLzzLplm_hydr_SRvvmIBQXYnx/pub?output=csv',
    // Your email for form submissions
    yourEmail: 'your-email@example.com'
};

// ===== Navigation Handler =====
// Prevent scroll on load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
    // Prevent initial scroll from hash
    if (window.location.hash) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1);
    }
    
    initializeNavigation();
    loadConcertData();
    initializeContactForm();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Fade out current section
            const currentSection = document.querySelector('.content-section.active');
            if (currentSection) {
                currentSection.classList.remove('active');
            }
            
            // Fade in target section after a brief delay
            setTimeout(() => {
                const target = document.getElementById(targetSection);
                if (target) {
                    target.classList.add('active');
                    // Scroll to top smoothly
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        });
    });
}

// ===== Data Loading =====
async function loadConcertData() {
    let concerts = [];

    // Load from Google Sheets CSV
    try {
        concerts = await loadFromCSV(CONFIG.csvUrl);
        console.log('Loaded from CSV:', concerts);
    } catch (error) {
        console.error('Error loading CSV:', error);
        displayError('upcoming-concerts-list', 'Unable to load concert data. Please check your internet connection.');
        displayError('past-concerts-list', 'Unable to load concert data. Please check your internet connection.');
        return;
    }

    if (concerts.length === 0) {
        displayError('upcoming-concerts-list', 'No concerts available at this time.');
        displayError('past-concerts-list', 'No concerts available at this time.');
        return;
    }

    displayConcerts(concerts);
}

async function loadFromCSV(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch CSV data');
    }
    
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const concerts = [];
    
    // Skip header row (index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line: Title, Date, Venue, Description, Summary, FullDescription, Performers, Image, Poster, Programme, Publish
        const values = parseCSVLine(line);
        
        if (values.length >= 4 && values[0] && values[1]) {
            // Check if Publish column is TRUE (values[10])
            const shouldPublish = values[10]?.toUpperCase() === 'TRUE';
            if (!shouldPublish) continue; // Skip unpublished concerts
            
            // Parse performers if present (format: Name1|Bio1;;Name2|Bio2)
            let performers = [];
            if (values[6]) {
                const performerPairs = values[6].split(';;');
                performers = performerPairs.map(pair => {
                    const [name, bio] = pair.split('|');
                    return { name: name?.trim() || '', bio: bio?.trim() || '' };
                }).filter(p => p.name);
            }
            
            concerts.push({
                title: values[0],
                date: values[1],
                venue: values[2],
                description: values[3],
                summary: values[4] || values[3], // Fallback to description if summary empty
                fullDescription: values[5] || values[3], // Fallback to description if fullDescription empty
                performers: performers,
                image: values[7] || '',
                poster: values[8] || '',
                programme: values[9] || ''
            });
        }
    }
    
    return concerts;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"' && nextChar === '"' && inQuotes) {
            // Escaped quote - add one quote and skip next
            current += '"';
            i++;
        } else if (char === '"') {
            // Toggle quote state
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            // Field separator
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

// ===== Display Concerts =====
function displayConcerts(concerts) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingConcerts = concerts.filter(concert => {
        const concertDate = new Date(concert.date);
        return concertDate >= today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const pastConcerts = concerts.filter(concert => {
        const concertDate = new Date(concert.date);
        return concertDate < today;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    displayConcertList('upcoming-concerts-list', upcomingConcerts, 'No upcoming concerts at this time. Check back soon!');
    displayConcertList('past-concerts-list', pastConcerts, 'No past concerts to display.');
}

function displayConcertList(containerId, concerts, emptyMessage) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    if (concerts.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>${emptyMessage}</p></div>`;
        return;
    }
    
    container.innerHTML = concerts.map(concert => createConcertCard(concert)).join('');
    
    // Add click handlers for expandable cards - only one expanded at a time
    container.querySelectorAll('.concert-card').forEach(card => {
        card.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Collapse all cards in this container
            container.querySelectorAll('.concert-card').forEach(c => {
                c.classList.remove('expanded');
            });
            
            // Expand this card if it wasn't already expanded
            if (!isExpanded) {
                this.classList.add('expanded');
            }
        });
    });
}

function createConcertCard(concert) {
    const formattedDate = formatDate(concert.date);
    const imagePosition = concert.imagePosition || 'center';
    const imageSrc = concert.image && concert.image.trim() !== '' ? concert.image : 'images/Logo.png';
    const imageHTML = `<img src="${imageSrc}" alt="${concert.title}" class="concert-image" style="object-position: ${imagePosition};">`;
    
    // Build performer bios if available
    const performerBiosHTML = concert.performers && concert.performers.length > 0
        ? concert.performers.map(performer => `
            <div class="performer-bio">
                <h4>${escapeHtml(performer.name)}</h4>
                <p>${sanitizeHtml(performer.bio)}</p>
            </div>
        `).join('')
        : '';
    
    // Build PDF frames (can have both poster and programme)
    let pdfFrameHTML = '';
    if (concert.poster) {
        pdfFrameHTML += `
            <div class="pdf-frame-container">
                <a href="${escapeHtml(concert.poster)}" target="_blank" class="pdf-frame" onclick="event.stopPropagation()">
                    <div class="pdf-frame-image">📄</div>
                    <span class="pdf-frame-label">Download Poster</span>
                </a>
            </div>
        `;
    }
    if (concert.programme) {
        pdfFrameHTML += `
            <div class="pdf-frame-container">
                <a href="${escapeHtml(concert.programme)}" target="_blank" class="pdf-frame" onclick="event.stopPropagation()">
                    <div class="pdf-frame-image">📄</div>
                    <span class="pdf-frame-label">Download Programme</span>
                </a>
            </div>
        `;
    }
    
    const summaryText = concert.summary || concert.description;
    const fullText = concert.fullDescription || concert.description;
    
    return `
        <div class="concert-card">
            <div class="concert-image-column">
                ${imageHTML}
                ${pdfFrameHTML}
            </div>
            <div class="concert-content">
                <h3>${escapeHtml(concert.title)}</h3>
                <span class="concert-date">${formattedDate}</span>
                <p class="concert-venue">📍 ${escapeHtml(concert.venue)}</p>
                
                <div class="concert-summary">
                    <p class="concert-description">${sanitizeHtml(summaryText)}</p>
                </div>
                
                <div class="concert-details">
                    <p class="concert-description">${sanitizeHtml(fullText)}</p>
                    ${performerBiosHTML}
                </div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Get day with ordinal suffix
    const day = date.getDate();
    const ordinal = getOrdinal(day);
    
    // Format time as 6pm, 5:30pm, etc.
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const timeStr = minutes === 0 ? `${hours}${ampm}` : `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
    
    // Format full date
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const month = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    
    return `${weekday} ${day}${ordinal} ${month} ${year}, ${timeStr}`;
}

function getOrdinal(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeHtml(text) {
    // Allow safe HTML tags: <i>, <em>, <b>, <strong>, <u>, <br>
    // First escape everything
    const div = document.createElement('div');
    div.textContent = text;
    let escaped = div.innerHTML;
    
    // Then allow specific safe tags back
    escaped = escaped.replace(/&lt;i&gt;/g, '<i>')
                     .replace(/&lt;\/i&gt;/g, '</i>')
                     .replace(/&lt;em&gt;/g, '<em>')
                     .replace(/&lt;\/em&gt;/g, '</em>')
                     .replace(/&lt;b&gt;/g, '<b>')
                     .replace(/&lt;\/b&gt;/g, '</b>')
                     .replace(/&lt;strong&gt;/g, '<strong>')
                     .replace(/&lt;\/strong&gt;/g, '</strong>')
                     .replace(/&lt;u&gt;/g, '<u>')
                     .replace(/&lt;\/u&gt;/g, '</u>')
                     .replace(/&lt;br&gt;/g, '<br>')
                     .replace(/&lt;br\/&gt;/g, '<br/>');
    
    return escaped;
}

function displayError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="empty-state"><p>${message}</p></div>`;
    }
}

// ===== Contact Form Handler =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        statusDiv.textContent = 'Sending message...';
        statusDiv.className = 'form-status';
        statusDiv.style.display = 'block';
        
        // Get form data
        const formData = new FormData(form);
        
        try {
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                statusDiv.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                statusDiv.className = 'form-status success';
                
                // Reset form
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            statusDiv.textContent = 'Sorry, there was an error sending your message. Please try again or email us directly.';
            statusDiv.className = 'form-status error';
        }
    });
}

// ===== Utility Functions =====
// Add smooth scrolling to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
