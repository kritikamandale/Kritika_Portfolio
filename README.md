# Kritika's Portfolio

A modern, interactive personal portfolio website built with React and Vite. Showcasing projects, experience, skills, and achievements with smooth animations and responsive design.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Backend**: Node.js Express (for contact form API)
- **Linting**: ESLint
- **Deployment**: vercel

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

3. **(Optional) Start the backend API**
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


### Build for Production
```bash
npm run build
```
This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint



---

## 📄 License

This project is open source and available under the MIT License.

---

## 💬 Contact

For questions or feedback, feel free to reach out through the contact section or any of the social links above.
