# NG Braider – Premium Hair Styling Solutions

A production-ready luxury e-commerce landing page built with React, TypeScript, and Tailwind CSS. Optimized for performance, accessibility, and user engagement.

## Features

- 🎨 Modern, responsive design with smooth animations
- 📱 Mobile-first approach with full responsive support
- ♿ Accessibility-focused with semantic HTML
- ⚡ Optimized performance (lazy loading, CSS-in-JS optimizations)
- 🎭 Interactive hero section with parallax effects
- 🛒 Product showcase and dynamic pricing tiers
- 📋 Integrated order management system
- 💬 Real-time social proof notifications

## Project Structure

```
src/
├── app/
│   ├── components/        # Reusable UI components
│   │   ├── HeroSection.tsx
│   │   ├── PricingBundles.tsx
│   │   ├── OrderForm.tsx
│   │   └── ...
│   └── App.tsx            # Main application component
├── styles/                # Global styles and theme
│   ├── index.css
│   ├── theme.css         # CSS variables and theme definitions
│   └── fonts.css
└── main.tsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Deployment

This is a static React application and can be deployed to any hosting platform:

- **Vercel**: `vercel`
- **Netlify**: Connect your Git repository
- **GitHub Pages**: Follow Vite's deployment guide
- **Traditional VPS**: Copy contents of `dist/` folder

## Browser Support

- Chrome (latest)
- Safari (latest)  
- Firefox (latest)
- Edge (latest)
- iOS Safari 14+

## Technologies

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom themes
- **Animations**: Motion (Framer Motion alternative)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Performance

- ✓ All animations use GPU acceleration
- ✓ Lazy loading for media assets
- ✓ CSS critical path optimized
- ✓ Minimal JavaScript bundle size

## License

Private project – All rights reserved.
