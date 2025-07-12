# Interactive 3D Resume with Particle Physics

A cutting-edge interactive resume built with React, Three.js, and modern web technologies. Features a 3D particle system that creates a hollow sphere that splatters on scroll, inspired by the Alpitronic website design.

## ✨ Features

### 🎯 Core Functionality
- **3D Particle Sphere**: Hollow sphere made of 2500+ particles using Three.js
- **Scroll-Triggered Splatter**: Particles explode outward when scrolling down
- **Physics Simulation**: Realistic particle physics with gravity and friction
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **PDF Export**: Convert the interactive resume to a professional PDF

### 🎨 Visual Effects
- **Glass Morphism**: Modern glass-effect UI components
- **Gradient Text**: Beautiful gradient text effects
- **Smooth Animations**: GSAP-powered animations and transitions
- **Floating Elements**: Subtle floating animations throughout
- **Custom Scrollbar**: Styled scrollbar with gradient colors

### 📱 User Experience
- **Smooth Navigation**: Section-based navigation with scroll indicators
- **Loading Animation**: Elegant loading screen with particle system initialization
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Progress Bar**: Visual scroll progress indicator
- **Intersection Observer**: Smooth fade-in animations on scroll

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI framework |
| **Three.js** | 3D graphics and particle rendering |
| **GSAP** | Advanced animations and transitions |
| **Framer Motion** | Component animations |
| **Tailwind CSS** | Utility-first styling |
| **jsPDF** | PDF generation |
| **html2canvas** | DOM to canvas conversion |
| **Vite** | Fast build tool and dev server |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interactive-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ParticleSphere.jsx    # 3D particle system
│   ├── ResumeContent.jsx     # Main resume content
│   ├── ScrollIndicator.jsx   # Navigation dots
│   └── PDFExporter.jsx       # PDF export functionality
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles and Tailwind
```

## 🎮 How It Works

### Particle System Architecture

The particle system creates a hollow sphere using spherical coordinates:

```javascript
// Generate hollow sphere formation
for (let i = 0; i < config.count; i++) {
  const phi = Math.acos(-1 + (2 * i) / config.count)
  const theta = Math.sqrt(config.count * Math.PI) * phi
  
  const radius = config.radius + (Math.random() - 0.5) * config.thickness
  particle.position.setFromSphericalCoords(radius, phi, theta)
}
```

### Scroll-Triggered Splatter

When the user scrolls past 15% of the page:

```javascript
useEffect(() => {
  if (scrollProgress > 0.15 && !isSplatteredRef.current) {
    isSplatteredRef.current = true
    triggerSplatterEffect()
  }
}, [scrollProgress])
```

### Physics Simulation

Particles follow realistic physics with gravity and friction:

```javascript
// Apply physics for splatter effect
particle.userData.velocity.y -= config.physics.gravity
particle.userData.velocity.multiplyScalar(config.physics.friction)
particle.position.add(particle.userData.velocity)
```

## 🎨 Customization

### Colors and Themes

Modify the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... more shades
  },
  accent: {
    50: '#fdf4ff',
    // ... more shades
  }
}
```

### Particle Configuration

Adjust particle system settings in `ParticleSphere.jsx`:

```javascript
const config = {
  count: window.innerWidth > 768 ? 2500 : 1500,
  radius: 8,
  thickness: 0.3,
  colors: ['#4F46E5', '#EC4899', '#8B5CF6'],
  physics: {
    gravity: 0.2,
    friction: 0.98,
    splatterForce: 1.8
  }
}
```

### Resume Content

Update your information in `ResumeContent.jsx`:

```javascript
// Replace with your details
<h1 className="text-5xl md:text-7xl font-bold mb-6">
  <span className="gradient-text">Your Name</span>
</h1>
```

## 📱 Performance Optimization

### Mobile Optimization
- Reduced particle count on mobile devices (1500 vs 2500)
- Disabled shadows and reflections on low-end devices
- Optimized physics calculations

### WebGL Techniques
- Instanced mesh rendering for particles
- GPU-accelerated physics calculations
- Frustum culling for off-screen particles

### Resource Management
- Automatic disposal of unused geometries
- Object pooling for particle reuse
- Lazy loading of Three.js modules

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_APP_TITLE=Interactive Resume
VITE_APP_DESCRIPTION=Professional portfolio with 3D effects
VITE_PARTICLE_COUNT=2500
VITE_ENABLE_SHADOWS=true
```

### Build Configuration

Modify `vite.config.js` for custom build settings:

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          cannon: ['cannon-es'],
          gsap: ['gsap']
        }
      }
    }
  }
})
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### GitHub Pages

1. Add to `package.json`:
   ```json
   {
     "homepage": "https://username.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. Deploy: `npm run deploy`

## 🐛 Troubleshooting

### Common Issues

**Particles not rendering:**
- Check WebGL support in browser
- Verify Three.js installation
- Check console for errors

**PDF export fails:**
- Ensure all fonts are loaded
- Check CORS settings for external resources
- Verify html2canvas configuration

**Performance issues:**
- Reduce particle count in config
- Disable shadows on mobile
- Check device capabilities

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Email: your-email@example.com
- LinkedIn: [Your LinkedIn Profile]

---

**Built with ❤️ using React, Three.js, and modern web technologies** 