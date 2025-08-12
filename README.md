# FullDevGear Portfolio

> **Code, No-Code, AI: Your Vision, Delivered**

Professional portfolio website showcasing full-stack development capabilities and technical expertise.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/yourusername/fulldevgear-portfolio.git
cd fulldevgear-portfolio

# Install dependencies
npm install
npm run icons # generate PWA icons (one-time or when logo changes)

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
FullDevGear/
├── index.html              # Main HTML file (hash-based SPA routing)
├── styles/                 # Modular CSS (preloaded via link tags)
├── scripts/
│   └── app.js              # Interactive JavaScript
├── assets/
│   ├── icons/              # Technology icons
│   └── images/             # Profile pictures
├── manifest.webmanifest    # PWA manifest (basic)
├── terms.html              # Terms of Service
├── privacy.html            # Privacy Policy
└── package.json            # Dependencies & scripts
```

## ✨ Features

- **Interactive Tech Wave**: Dynamic technology showcase with flip animations
- **SPA Navigation**: Smooth page transitions between sections
- **Dark Mode CV**: Automatic theme switching for CV section
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and semantic HTML

## 🎯 Key Technologies

- **Vanilla JavaScript**: Clean, dependency-free code
- **CSS**: Modern styling with CSS Grid & Flexbox
- **HTML5**: Semantic markup
- **Live Server**: Development environment

## 📝 Available Scripts

```bash
npm run dev    # Start development server (port 3000)
npm start      # Start production server (port 8080)
npm run format # Format code with Prettier
npm run lint   # Lint JS
npm run build  # Build + generate PWA service worker (Workbox)
npm run icons  # Generate PWA icons (192/512 + maskable)
```

## 🔗 Deployment

- Uses hash routing (`#/cv`) to be compatible with static hosts like GitHub Pages.
- PWA enabled: run `npm run build` then deploy the `dist/` folder.

## ⚙️ Tooling

- ESLint (`.eslintrc.json`) and Prettier (`.prettierrc`) configured
- Workbox precache via build script (`workbox-build`)
- GitHub Actions CI for lint + build (`.github/workflows/ci.yml`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Issa Azegouar** - [Website](https://fulldevgear.com) | [Email](mailto:contact@fulldevgear.com) 