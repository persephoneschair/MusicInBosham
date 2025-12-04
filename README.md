# Music in Bosham Website

A clean, elegant single-page website for the Music in Bosham concert series.

## Features

- **Single-page application** with smooth fade transitions between sections
- **Responsive design** that works on all devices
- **Dynamic concert data** loaded from Google Sheets CSV
- **Contact form** for visitor inquiries
- **Custom font support** for branding consistency
- **GitHub Pages hosting** with custom domain support

## Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Navigation, data loading, and form handling
├── mock-data.js        # Sample data for development
├── CNAME               # Custom domain configuration
└── README.md           # This file
```

## Setup Instructions

### 1. Add Your Logo and Font

1. Create a `fonts` folder and add your custom font files
2. Update the font reference in `styles.css` (lines 32-37)
3. Add your logo image as `logo.png` in the root directory

### 2. Configure Google Sheets CSV

1. Create a Google Sheet with these columns:
   - Title
   - Date (format: YYYY-MM-DDTHH:MM:SS, e.g., 2025-03-15T19:30:00)
   - Venue
   - Description
   - Image (URL to concert image, optional)
   - IsPast (true/false, optional - will auto-calculate from date)

2. Publish the sheet as CSV:
   - File > Share > Publish to web
   - Select your sheet and format: CSV
   - Copy the published URL

3. Update `script.js`:
   - Change `CONFIG.useMockData` to `false`
   - Replace `CONFIG.csvUrl` with your Google Sheets CSV URL

### 3. Set Up Contact Form (Optional)

The form currently logs to console. To enable email forwarding, integrate with:

- **[Formspree](https://formspree.io/)** - Free tier available, easiest setup
- **[EmailJS](https://www.emailjs.com/)** - Send emails directly from JavaScript
- **Netlify Forms** - If hosting on Netlify

Update the `simulateFormSubmission()` function in `script.js` with your chosen service.

### 4. Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Set Source to your main branch
4. GitHub will deploy your site

### 5. Configure Custom Domain

1. Purchase the domain `musicinbosham.com` from a registrar (e.g., Namecheap, GoDaddy)
2. Add these DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: YOUR-GITHUB-USERNAME.github.io
   ```
3. Wait for DNS propagation (can take up to 48 hours)
4. Enable HTTPS in GitHub Pages settings

## Development

To test locally:

1. Open `index.html` in a web browser, or
2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if you have npx)
   npx http-server
   ```
3. Visit `http://localhost:8000`

## Adding New Sections

To add a new page/section:

1. Add a new navigation link in `index.html`:
   ```html
   <li><a href="#newsection" class="nav-link" data-section="newsection">New Section</a></li>
   ```

2. Add the section content:
   ```html
   <section id="newsection" class="content-section">
       <h2>New Section Title</h2>
       <div class="section-content">
           <!-- Your content here -->
       </div>
   </section>
   ```

The JavaScript navigation will automatically handle the new section!

## Customization

### Colors
Edit CSS variables in `styles.css` (lines 2-10):
```css
:root {
    --primary-color: #2c3e50;
    --accent-color: #3498db;
    /* ... etc */
}
```

### Fonts
Replace the custom font reference in `styles.css` and add your font files to a `fonts` folder.

### Animation Speed
Change `--transition-speed` in `styles.css` to adjust fade animations.

## Support

For questions about web hosting or development, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)

## License

See LICENSE file for details.
