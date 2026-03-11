# Astra Forge

**Astra Forge** is a multi-page professional development studio website designed to showcase the studio's work, their flagship game *Devlok*, and attract potential clients.

## Project Structure

```
astra-forge/
│
├── index.html       # Landing page (Cinematic hero, overview)
├── devlok.html      # Flagship game showcase
├── projects.html    # Portfolio of work
├── services.html    # Service offerings (Solutions)
├── about.html       # Studio story and leadership
├── contact.html     # Contact form (Frontend logic)
│
├── assets/
│   ├── images/      # Project assets (Devlok, Plugins, Studio)
│   └── favicon.svg  # Site icon
│
├── css/
│   ├── global.css   # Variables, Reset, Typography
│   ├── components.css # Navbar, Buttons, Footer
│   └── pages.css    # Page-specific layouts and animations
│
└── js/
    └── main.js      # Navbar state, scroll animations, form logic
```

## Features

- **Cinematic Design**: Full-screen hero sections with video-game aesthetic.
- **Micro-Interactions**: Hover effects on cards and buttons.
- **Active Navigation**: Navbar automatically highlights the current page.
- **Responsive**: Fully mobile-compatible layout.
- **Performance**: Lazy-loading and optimized CSS.

## Editing Content

- **Images**: Place new images in `assets/images/` and update the `src` paths in the HTML files.
- **Services**: Edit the `div class="service-card"` blocks in `services.html`.
- **Projects**: content in `projects.html`.

## Future Improvements

- **Backend**: Connect the form in `contact.html` to an email service (e.g., EmailJS) or a custom backend.
- **Devlok**: Add a video trailer to the hero section.
