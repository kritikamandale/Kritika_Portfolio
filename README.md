# Kritika's Portfolio

A modern, interactive personal portfolio website built with React and Vite. Showcasing projects, experience, skills, and achievements with smooth animations and responsive design.

---

## 🚀 Features

- **Interactive Sections** – Hero, About, Experience, Skills, Projects, Achievements, and Contact sections
- **Scroll Animations** – Custom scroll reveal effects and progress tracking
- **GitHub Integration** – Embedded GitHub contributions graph
- **Interactive Graph** – Data visualization component
- **Fully Responsive** – Mobile-friendly design with CSS modules
- **Fast Performance** – Built with Vite for optimized build times
- **Contact API** – Backend integration for contact form submissions
- **Social Links** – Quick links to LinkedIn, GitHub, Hugging Face, and Twitter/X

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Backend**: Node.js Express (for contact form API)
- **Linting**: ESLint
- **Deployment**: Ready for production deployment

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kritikamandale/Kritika_Portfolio.git
   cd Kritika_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **(Optional) Start the backend API**
   ```bash
   node server/index.js
   ```

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── Preloader/
│   │   ├── ScrollReveal/
│   │   ├── SectionWrapper/
│   │   ├── Loader/
│   │   └── InteractiveGraph/
│   ├── sections/          # Page sections
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Experience/
│   │   ├── Skills/
│   │   ├── Projects/
│   │   ├── Achievements/
│   │   ├── Philosophy/
│   │   ├── Contact/
│   │   └── GithubContributions/
│   ├── hooks/             # Custom React hooks
│   │   ├── useScrollProgress.js
│   │   └── useScrollReveal.js
│   ├── utils/             # Utility functions
│   │   └── colorLerp.js
│   ├── styles/            # Global styles
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── api/
│   └── contact.js         # Contact form API endpoint
├── server/
│   └── index.js           # Backend server
├── public/                # Static assets
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── package.json           # Project dependencies
```

---

## 🎨 Customization

### Update Social Links
Edit [src/sections/Contact/Contact.jsx](src/sections/Contact/Contact.jsx) to update your social media profiles in the `SOCIALS` array.

### Modify Colors & Fonts
Update CSS variables in [src/styles/variables.css](src/styles/variables.css) to customize the design theme.

### Add Your Content
Replace placeholder content in each section with your actual:
- Projects
- Experience
- Skills
- Achievements
- Contact information

### Contact Form API
Configure the backend endpoint in [api/contact.js](api/contact.js) to handle form submissions.

---

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```
This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy
The `dist/` folder can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

---

## 📝 Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

---

## 🔗 Live Links

- **Portfolio**: [Portfolio Website](#)
- **GitHub**: [kritikamandale](https://github.com/kritikamandale)
- **LinkedIn**: [kritikamandale](https://www.linkedin.com/in/kritikamandale)
- **Hugging Face**: [Critika](https://huggingface.co/Critika)
- **Twitter/X**: [@KritikaMandale](https://x.com/KritikaMandale)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 💬 Contact

For questions or feedback, feel free to reach out through the contact section or any of the social links above.
