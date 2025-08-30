# 🏥 Medical Summarizer

A modern React web application that generates patient-friendly and clinician-focused medical summaries from Q&A text input.

## ✨ Features

- **Dual Summary Generation**: Create both patient-friendly and technical clinician summaries
- **File Upload Support**: Upload TXT, DOC, DOCX, and PDF files
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, medical-themed interface with smooth animations
- **Summary History**: Track and review previously generated summaries
- **Real-time Processing**: Instant AI-powered summary generation

## 🚀 Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **Font**: Inter (Google Fonts)
- **Responsive**: Mobile-first design approach

## 📱 Pages

1. **Home** - Landing page with hero section and feature cards
2. **Summarize** - Input form for Q&A text and file upload
3. **Results** - Display generated summaries with provenance accordion
4. **History** - View previously generated summaries
5. **About** - Project information and team credits

## 🎨 Design Features

- **Medical Theme**: Professional blue and green color scheme
- **Interactive Elements**: Hover effects, smooth transitions, and animations
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Responsive Layout**: Adaptive grid systems and mobile-optimized navigation

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd medical-summarizer
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
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   └── *.css           # Component-specific styles
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Summarize.jsx   # Summary generation form
│   ├── Results.jsx     # Results display
│   ├── History.jsx     # Summary history
│   ├── About.jsx       # About page
│   └── *.css           # Page-specific styles
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
├── index.css           # Global styles and CSS variables
└── App.css             # App-specific styles
```

## 🎯 Key Components

### Navbar
- Responsive navigation with mobile hamburger menu
- Active page highlighting
- Smooth mobile menu animations

### Form Components
- Textarea for Q&A input
- File upload with drag & drop support
- Radio button selection for summary types
- Form validation and error handling

### Summary Cards
- Patient-friendly summaries (green theme)
- Clinician-focused summaries (blue theme)
- Expandable accordion for original Q&A text

### History System
- Grid layout for summary history
- Date formatting and metadata display
- Quick access to previous summaries

## 🌐 Responsive Design

- **Desktop**: Full-featured layout with side-by-side cards
- **Tablet**: Adaptive grid layouts
- **Mobile**: Stacked layouts with mobile-optimized navigation
- **Breakpoints**: 480px, 768px, and 1200px

## 🎨 CSS Architecture

- **CSS Variables**: Consistent color scheme and spacing
- **Utility Classes**: Reusable button, card, and form styles
- **Component Styles**: Scoped styles for specific components
- **Media Queries**: Responsive design breakpoints

## 🔧 Customization

### Colors
Modify CSS variables in `src/index.css`:
```css
:root {
  --medical-blue-600: #0284c7;
  --health-green-600: #16a34a;
  /* ... other colors */
}
```

### Styling
- Update component-specific styles in individual CSS files
- Modify global styles in `src/index.css`
- Adjust responsive breakpoints as needed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important**: Medical Summarizer is an educational tool and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

The summaries generated are for informational purposes only and may not be comprehensive or up-to-date with the latest medical research.

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ using React and modern web technologies**
