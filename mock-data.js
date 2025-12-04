// ===== Mock Concert Data =====
// This file contains sample data for development and testing
// Replace this with real data from your Google Sheets CSV in production

const MOCK_CONCERTS = [
    {
        title: "Voit Voice",
        date: "2025-03-02T18:00:00",
        venue: "Holy Trinity Church, Bosham",
        description: "Evening of Ukrainian folklore",
        summary: "<i>Voit Voice</i> are a four-part Ukrainian folklore choir who will be singing a selection of traditional national songs.",
        fullDescription: "We're delighted to be joined by <b><i>Voit Voice</i></b>, a four-part Ukrainian folklore choir, who will be sharing with us a selection of traditional national songs. As we are all surely aware, the war in Ukraine reached its third year last week, so it feels particularly appropriate that this should be our opening concert of the season.<br><br>Additionally, <i>Voit Voice</i> have waived a fee, in favour of all proceeds from the concert going towards supporting the families of those displaced by the war.",
        performers: [
            {
                name: "Voit Voice",
                bio: "The Ukrainian folklore choir <i>Voit Voice</i> are pleased to introduce listeners to traditional, national songs of Ukraine at the Holy Trinity Church. The Voit Voice Choir participants are united by music and song in a difficult time for our country, because singing is an integral part of our native culture and a remembrance of the history of our ancestors.<br><br>The war in Ukraine has been going on for three years and we would like to dedicate this performance to everyone who supports our people now. We are sincerely grateful to Great Britain and all British citizens who supported and support Ukraine and Ukrainians."
            }
        ],
        image: "images/VoitVoice.png",
        poster: "pdfs/voit-voice-2025-poster.pdf",
        programme: "pdfs/voit-voice-2025-poster.pdf"
    },
    {
        title: "Chamber Music Evening",
        date: "2026-04-20T19:00:00",
        venue: "Bosham Village Hall",
        description: "An intimate chamber music performance featuring works by Mozart, Schubert, and Dvořák.",
        summary: "The Chichester String Quartet performs Mozart, Schubert, and Dvořák.",
        fullDescription: "An intimate chamber music performance featuring works by Mozart, Schubert, and Dvořák. The Chichester String Quartet brings these masterpieces to life with their renowned precision and emotional depth. Programme includes Mozart's String Quartet No. 17, Schubert's Death and the Maiden, and Dvořák's American Quartet.",
        performers: [
            {
                name: "Chichester String Quartet",
                bio: "The Chichester String Quartet has been delighting audiences for over 15 years with their dynamic performances of classical and contemporary chamber music. Based in West Sussex, they are resident ensemble at the University of Chichester."
            }
        ],
        image: "",
        poster: "pdfs/chamber-2025-poster.pdf",
        isPast: false
    },
    {
        title: "Summer Solstice Concert",
        date: "2026-06-21T20:00:00",
        venue: "St. Mary's Church, Bosham",
        description: "Celebrate the longest day with Vivaldi's Four Seasons and other baroque favorites.",
        summary: "Outdoor concert featuring Vivaldi's Four Seasons and baroque favorites.",
        fullDescription: "Celebrate the longest day of the year with a special outdoor concert featuring Vivaldi's Four Seasons and other baroque favorites. The South Coast Baroque Ensemble brings period instruments and authentic performance practices to this joyful celebration of summer.",
        performers: [
            {
                name: "South Coast Baroque Ensemble",
                bio: "Specializing in historically informed performances, the South Coast Baroque Ensemble uses period instruments and techniques to bring the music of the 17th and 18th centuries to vibrant life."
            }
        ],
        image: "",
        poster: "pdfs/summer-2025-poster.pdf",
        isPast: false
    },
    {
        title: "Autumn Gala Concert",
        date: "2026-10-15T19:30:00",
        venue: "Bosham Village Hall",
        description: "Our annual gala concert featuring local and international talent.",
        summary: "Annual gala concert supporting music education in the community.",
        fullDescription: "Our annual gala concert featuring local and international talent, with proceeds supporting music education in the community. This year's programme includes a diverse selection from classical to contemporary, performed by artists from across the South of England.",
        performers: [
            {
                name: "Various Artists",
                bio: "A showcase of talented musicians from the local community and beyond, coming together to support music education initiatives."
            }
        ],
        image: "",
        poster: "pdfs/autumn-2025-poster.pdf",
        isPast: false
    },
    {
        title: "Winter Wonderland: Christmas Concert",
        date: "2024-12-10T19:00:00",
        venue: "St. Mary's Church, Bosham",
        description: "A festive celebration featuring traditional carols and Handel's Messiah excerpts.",
        summary: "Traditional carols and festive favorites with the Bosham Community Choir.",
        fullDescription: "A festive celebration featuring traditional carols, seasonal favorites, and Handel's Messiah excerpts performed by the Bosham Community Choir. Join us for mince pies and mulled wine in the interval.",
        performers: [
            {
                name: "Bosham Community Choir",
                bio: "The Bosham Community Choir brings together singers from across the parish to celebrate music in worship and concert. Under the direction of Michael Thompson, the choir has performed throughout West Sussex."
            }
        ],
        image: "",
        programme: "pdfs/christmas-2024-programme.pdf",
        isPast: true
    },
    {
        title: "Piano Recital: Chopin & Liszt",
        date: "2024-09-22T19:30:00",
        venue: "Bosham Village Hall",
        description: "Virtuoso pianist James Chen performed romantic masterpieces.",
        summary: "James Chen performed Chopin's Nocturnes and Liszt's Hungarian Rhapsodies.",
        fullDescription: "Virtuoso pianist James Chen performed romantic masterpieces including Chopin's Nocturnes and Liszt's Hungarian Rhapsodies. His breathtaking technique and musical sensitivity made this an unforgettable evening.",
        performers: [
            {
                name: "James Chen",
                bio: "Winner of the Leeds International Piano Competition, James Chen has performed with leading orchestras worldwide. His interpretations of romantic repertoire have been praised for their emotional depth and technical brilliance."
            }
        ],
        image: "",
        programme: "pdfs/piano-2024-programme.pdf",
        isPast: true
    },
    {
        title: "Jazz by the Harbour",
        date: "2024-07-15T18:00:00",
        venue: "The Anchor Bleu Garden",
        description: "A delightful evening of jazz standards and contemporary pieces.",
        summary: "Jazz standards and contemporary pieces by the South Coast Jazz Ensemble.",
        fullDescription: "A delightful evening of jazz standards and contemporary pieces performed by the South Coast Jazz Ensemble against the stunning backdrop of Bosham Harbour. The perfect summer evening combining great music, fine wine, and spectacular views.",
        performers: [
            {
                name: "South Coast Jazz Ensemble",
                bio: "This versatile quintet performs everything from swing standards to bebop and contemporary jazz. Their relaxed style and virtuosic improvisation have made them favorites at venues across the South Coast."
            }
        ],
        image: "",
        programme: "pdfs/jazz-2024-programme.pdf",
        isPast: true
    }
];

// ===== CSV Data Structure Reference =====
// When you create your Google Sheets CSV, use these column headers:
// Title, Date, Venue, Description, Image, IsPast
//
// Example CSV format:
// Title,Date,Venue,Description,Image,IsPast
// "Spring Recital","2025-03-15T19:30:00","St. Mary's Church","Concert description","https://example.com/image.jpg",false
//
// Date format: YYYY-MM-DDTHH:MM:SS (ISO 8601)
// IsPast: true or false (or leave empty for automatic date calculation)
//
// To get your Google Sheets CSV URL:
// 1. In Google Sheets, go to File > Share > Publish to web
// 2. Select your sheet and choose "Comma-separated values (.csv)"
// 3. Click Publish and copy the URL
// 4. Replace the csvUrl in script.js CONFIG object with your URL
