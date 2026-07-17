<div align="center">
  <h1>🚀 FormGen</h1>
  <p><strong>AI-Powered Resume & Marriage Biodata Generation Platform</strong></p>
  
  [![Production Ready](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://github.com/HARIHAR1406)
  [![AI Powered](https://img.shields.io/badge/AI-Powered_by_Gemini-blue?style=for-the-badge)](https://github.com/HARIHAR1406)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-Ready-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
</div>

<br />

## 🌟 1. Project Overview

**FormGen** is a modern, production-ready, full-stack web application designed to empower users with the ability to create highly customizable, ATS-friendly Resumes and culturally elegant Marriage Biodatas.

**What problem it solves:**
Crafting a professional resume or biodata from scratch is time-consuming and often lacks the structure needed to pass Applicant Tracking Systems (ATS). FormGen eliminates this friction by providing a live-preview editor, cloud storage, and powerful AI assistance that does the heavy lifting for you.

**Who can use it:**
Job seekers looking to optimize their resumes for specific job descriptions, individuals creating professional marriage biodatas, and anyone needing a quick, robust, and visually appealing document generation tool.

**Why it is useful:**
By combining modern frontend technologies, secure backend architecture, cloud services, and Artificial Intelligence, FormGen acts not just as a visual editor, but as your personal career coach and data-entry assistant.

---

## ✨ 2. Key Features

| 📄 Core Document Builders | 🤖 Advanced AI Suite | ⚙️ Platform & Security |
| :--- | :--- | :--- |
| **ATS-Friendly Resume Builder** | **AI Smart PDF Import** | **Multi-format Export** (PDF & DOCX) |
| **Marriage Biodata Builder** | **ATS Resume Checker** | **Secure Backend AI Processing** |
| **Live Preview** | **Job Description Match** | **Dashboard Analytics** |
| **Advanced Document Customization** | **AI Interview Coach** | **Firebase Authentication** (Google Sign-In) |
| **Resume & QR Code Sharing** | **AI Template Recommendation** | **Dark / Light Theme & Responsive Design** |
| **Image Upload & Crop** |  | **Search, Filter & Favorites** |

---

## 🛠️ 3. Technology Stack

### Frontend
| Technology | Description |
| --- | --- |
| **React 18** | Core UI library |
| **Vite** | Blazing fast build tool |
| **Zustand** | Global state management |

### Backend & AI
| Technology | Description |
| --- | --- |
| **Node.js & Express** | Scalable backend server architecture |
| **Google Gemini AI** | Large Language Model integration for smart features |

### Database, Storage & Authentication
| Technology | Description |
| --- | --- |
| **Firebase Authentication** | Secure Google Sign-In & Email/Password auth |
| **Firebase Firestore** | Real-time NoSQL database for project storage |
| **Supabase Storage** | Public cloud storage bucket for profile images |

---

## 🏛️ 4. Project Architecture

```mermaid
graph TD
    A[Frontend: React] -->|REST API Calls| B(Backend: Express)
    A -->|Authentication| C[Firebase Auth]
    A -->|Reads/Writes Data| D[(Firebase Firestore)]
    A -->|Uploads Images| E[Supabase Storage]
    B -->|Analyzes Text & Context| F((Google Gemini AI))
```

---

## 📂 5. Folder Structure

<details>
<summary>Click to expand folder structure</summary>

```text
FormGen/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Business logic & AI integrations
│   │   ├── middleware/         # Security & token verification
│   │   ├── routes/             # Express API routes
│   │   └── server.js           # Entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/                 # Static assets
    └── src/
        ├── components/         # Reusable UI components & modals
        ├── context/            # Global context providers
        ├── pages/              # Main application views
        ├── services/           # External API & database services
        ├── store/              # Zustand state management
        ├── utils/              # Export utilities (PDF/DOCX)
        ├── App.jsx
        └── main.jsx
```
</details>

---

## ⚙️ 6. Installation Guide

To run this project locally on your machine, follow these steps:

### Clone Repository
```bash
git clone https://github.com/HARIHAR1406/FormGen.git
cd FormGen
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Create Environment Variables
Copy the `.env.example` files to `.env` in both the `frontend` and `backend` directories and fill in your keys (see the Environment Variables section below).

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd ../frontend
npm run dev
```
The application will be running at `http://localhost:5173`.

---

## 🔑 7. Environment Variables

Never commit your actual `.env` files. Use the following structures as a guide:

### `frontend/.env.example`
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase Storage Configuration
VITE_SUPABASE_URL=https://your_project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### `backend/.env.example`
```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
```

---

## 📸 8. Screenshots

*Screenshots will be added here soon.*

### Home Page
![Home Page Placeholder](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### Dashboard
![Dashboard Placeholder](https://via.placeholder.com/800x400?text=Dashboard)

### Resume Builder
![Resume Builder Placeholder](https://via.placeholder.com/800x400?text=Resume+Builder)

### Biodata Builder
![Biodata Builder Placeholder](https://via.placeholder.com/800x400?text=Biodata+Builder)

### AI Smart Import
![AI Smart Import Placeholder](https://via.placeholder.com/800x400?text=AI+Smart+Import)

### ATS Resume Checker
![ATS Resume Checker Placeholder](https://via.placeholder.com/800x400?text=ATS+Resume+Checker)

### Job Description Match
![Job Description Match Placeholder](https://via.placeholder.com/800x400?text=Job+Description+Match)

### AI Interview Coach
![AI Interview Coach Placeholder](https://via.placeholder.com/800x400?text=AI+Interview+Coach)

### Analytics Dashboard
![Analytics Dashboard Placeholder](https://via.placeholder.com/800x400?text=Analytics+Dashboard)

### Profile Page
![Profile Page Placeholder](https://via.placeholder.com/800x400?text=Profile+Page)

---

## 🚀 9. Future Enhancements

* **AI Cover Letter Generator:** Automatically generate customized cover letters tailored to the user's resume and a specific job description.
* **Custom CSS Overrides:** Allow advanced users to inject custom CSS classes into their live templates for ultimate control.
* **Custom Domain Mapping:** Allow users to host their live public resumes on their own custom domains.
* **Multi-Language Support:** Expand the Biodata builder to support multiple regional languages natively.

---

## 🚦 10. Project Status

* ✅ **Completed**
* ✅ **Production Ready**
* ✅ **Fully Tested**
* ✅ **Responsive**
* ✅ **AI Powered**
* ✅ **Full Stack**
* ✅ **Ready for Deployment**

---

## 📜 11. License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 12. Author

**HARIHAR R**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HARIHAR1406)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/harihar-r-1401hh)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:harihar.r1406@gmail.com)

---
<div align="center">
  <sub>Built with ❤️ using React, Node.js, and Gemini AI.</sub>
</div>
