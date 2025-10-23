# Analytics & AI Engineer Portfolio

A professional personal website showcasing the work and expertise of an Analytics and AI Engineer, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean, professional interface with black and green color scheme
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ✨ **Scroll Animations**: Smooth, engaging animations using Framer Motion
- 🎯 **Interactive UI**: Hover effects, transitions, and micro-interactions
- 🧭 **Smooth Navigation**: Sticky header with active section tracking
- 👤 **Professional Profile**: Integrated profile photos with animated badges
- 🛠️ **Tools & Technologies**: Comprehensive tech stack showcase with skill levels
- 💼 **Portfolio Showcase**: Project cards with technology stacks
- 📊 **Experience Timeline**: Visual timeline of professional experience
- 🌐 **Social Links**: Integrated social media and contact options

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Sections

1. **Hero Section**: Eye-catching introduction with profile photo and call-to-action buttons
2. **About Section**: Personal introduction, profile photo, and key skills
3. **Tools & Technologies**: Tech stack showcase with animated skill bars
   - Row 1: Data Science & ML tools (right-to-left animation)
   - Row 2: Development & DevOps tools (left-to-right animation)
   - Additional tools grid with hover effects
4. **Projects Portfolio**: Showcase of featured projects with tech stacks
5. **Experience Timeline**: Professional work history
6. **Contact Section**: Contact information and social links

## Animation Features

### Scroll Animations
- **Hero Section**: Staggered fade-in animations with scaling
- **About Section**: Slide-in animations from opposite directions
- **Tools Section**: 
  - Row 1: Right-to-left slide animation
  - Row 2: Left-to-right slide animation
  - Progress bars with animated fill
- **Projects**: Fade-in with upward motion
- **Experience**: Timeline with staggered animations
- **Contact**: Scale and fade animations

### Interactive Elements
- Hover effects on all cards and buttons
- Animated skill progress bars
- Social icon rotations on hover
- Smooth scroll navigation
- Active section highlighting

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information
Update the following sections in `src/app/page.tsx`:
- Profile photo: Replace `/profile.jpg` and `/logo.png` in `public/`
- Personal information in the hero section
- About section content
- Tools and skill levels
- Projects and their descriptions
- Experience timeline
- Contact information and social links

### Color Scheme
The website uses a black and green color scheme. To modify:
- Update Tailwind color classes in components
- Modify gradient colors for different effects
- Tool cards use varied gradient colors for visual interest

### Animations
Animations are powered by Framer Motion. Customize:
- Animation durations and delays
- Easing functions
- Animation directions (left-to-right, right-to-left)
- Animation triggers and viewport settings

### Tools Section
The tools section features:
- **Row 1**: Data Science tools (Python, TensorFlow, PyTorch, etc.) with continuous right-to-left seamless looping animation
- **Row 2**: Development tools (React, Node.js, Docker, etc.) with continuous left-to-right seamless looping animation
- **Additional Tools Grid**: Comprehensive tech stack with hover effects
- Clean card design without progress bars
- Perfect seamless infinite looping with exact width calculations (1456px)
- No empty spaces, no stopping, no jarring transitions - truly continuous movement
- Fixed width containers with proper overflow handling for smooth performance

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS