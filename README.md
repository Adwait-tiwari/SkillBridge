# 🚀 SkillBridge – Empowering Skill Exchange through Real-time Connection

SkillBridge is an **AI-enhanced MERN + Firebase-based platform** that allows users to **exchange skills** as learners or teachers. Whether you want to **learn a new skill** or **teach one**, SkillBridge connects you in real time using **chat** and **video sessions**, making learning **personalized**, **collaborative**, and **instant**.

---

## 🌟 Features

- 🔐 **Authentication**
  - Email/Password login
  - Google OAuth integration
- 👤 **User Profiles**
  - Separate onboarding for Students and Teachers
  - Editable profiles with bios, skills, and photos
- 🧑‍🏫 **Skill Request Matching**
  - Students request a skill
  - Teachers with matching skills are auto-fetched from Firebase
- 💬 **Real-Time Chat**
  - Firebase-powered instant messaging between learners and teachers
- 📹 **Live Video Sessions**
  - Seamless video calling with **LiveKit**
- 📈 **Dashboard Analytics**
  - Personalized learning history
  - Session stats and feedback

---

## 🛠️ Tech Stack

### **Frontend**
- React.js + TailwindCSS
- React Router
- LiveKit SDK (video calling)
- Firebase (Auth, Firestore, Realtime DB)

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose (User/session storage)
- Firebase Admin SDK

---

## 📌 Project Structure

SkillBridge/
├── client/ # React frontend
│ ├── components/ # Reusable UI components
│ ├── Forms/ # Teacher & Student forms
│ ├── utils/ # VideoCalling, Firebase config
│ └── pages/ # Dashboards & auth pages
├── server/ # Express backend
│ ├── routes/ # VideoCalling
├── README.md
└── .env


---

## ✨ How It Works

1. **Signup/Login**  
   Users join as either a Teacher or Student.

2. **Profile Completion**  
   Add skills, bio, and preferences.

3. **Skill Request**  
   Students request a skill. The app searches and lists Teachers who can help.

4. **Connect & Learn**  
   Students can start real-time **chat** or click **"Start Session"** to launch a **LiveKit video call**.

5. **Feedback & History**  
   Track learning sessions and give feedback for continuous improvement.

---

## 🎯 Use Cases

- 👨‍🎓 Students finding expert mentors  
- 👩‍🏫 Teachers reaching motivated learners  
- 🔁 Peer-to-peer upskilling community  
- 🌍 Remote, real-time collaboration hub  

---

## 📸 UI Screenshots

> _Add screenshots here for Student Dashboard, Teacher Dashboard, Chat Interface, and Video Session UI._

---

## 🧠 Future Enhancements

- 🧩 AI-Based Skill Recommendation  
- 🏆 Gamification & badges  
- 📅 Session Scheduling with calendar sync  
- 📱 Mobile App (React Native)

---

## 💻 Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/SkillBridge.git

# Install dependencies
cd client
npm install

cd ../server
npm install

# Add Firebase and LiveKit credentials to `.env` files

# Start the app
npm run dev

🧑‍💻 Made With ❤️ By
Adwait Tiwari
Full Stack Developer | AI/ML Enthusiast
