# Kritika's Portfolio

A modern, interactive personal portfolio website built with Next.js 14 (App Router) and React 18. Showcasing projects, experience, skills, and achievements with premium 3D elements, interactive graphs, and smooth animations.

---

## 🛠️ Tech Stack

### Frontend & UI
- **Framework**: **Next.js 14 (App Router)** with Static Site Generation (SSG) for fast rendering and optimal SEO.
- **Core Library**: **React 18** (incorporating Server & Client Components dynamically).
- **Styling**: **Tailwind CSS** & **CSS Modules** for responsive utility-first layouts and scoped component styling.
- **Animations**: **Framer Motion** for smooth transitions and scroll-reveals.

### Third-Party Integrations
- **GitHub Activity Grid**: **React GitHub Calendar** for showing live contribution stats.
- **Email Delivery**: **Resend SDK** for handling message submissions via the contact form.

### Backend & API
- **Express.js (v5)**: A minimal backend server (running independently) using CORS middleware to handle server-side actions.
- **Serverless Endpoint**: Located in `/api/contact.js` for handling contact submissions in cloud/serverless deployments.

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
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
   Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

4. **(Optional) Run the backend server**
   ```bash
   node server/index.js
   ```
   This runs the local contact form server on port `5000`.

---

## 📁 Project Structure

```
Portfolio/
├── app/                  # Next.js App Router
│   ├── globals.css       # Next.js global styling
│   ├── layout.jsx        # Root HTML layout and metadata configuration
│   ├── page.jsx          # Root page (renders all portfolio sections)
│   ├── robots.js         # SEO robots.txt generation
│   └── sitemap.js        # SEO sitemap.xml generation
├── src/                  # Application source code
│   ├── components/       # Reusable UI components (InteractiveGraph, Preloader, ThemeToggle)
│   ├── sections/         # Page sections (Hero, Experience, Projects, GitHub Contributions)
│   ├── hooks/            # Custom React hooks (useScrollReveal, etc.)
│   ├── utils/            # Utility functions (color math, logic helpers)
│   └── styles/           # CSS Modules and global variables
├── api/
│   └── contact.js        # Serverless API endpoint
├── server/
│   └── index.js          # Express.js backend server
├── public/               # Static assets (images, icons, vectors)
├── next.config.js        # Next.js configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Dependencies and scripts
```

---

## 📝 Available Scripts

- `npm run dev` – Starts the Next.js development server.
- `npm run build` – Pre-renders the website via Static Site Generation (SSG) into the static `out/` folder.
- `npm run start` – Starts a production Next.js server locally.
- `npm run lint` – Runs ESLint syntax and code quality checks.

---

## 📄 License

This project is open source and available under the MIT License.


thank you 
