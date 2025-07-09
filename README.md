# 🧠 Deblo – Your Personalized AI Doctor

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)
![Clerk](https://img.shields.io/badge/Clerk-Auth-orange?logo=clerk)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?logo=tailwindcss)
![Drizzle ORM](https://img.shields.io/badge/Drizzle--ORM-Full%20Type%20Safety-purple)
![License](https://img.shields.io/github/license/GitNinja36/deblo)

---

## 🚀 Project Overview

**Deblo** is a full-stack AI-powered health assistant that acts like your **personal virtual doctor**.

Users can securely log in, consult with AI medical agents (text + voice), view session summaries, monitor their health data visually through **timelines and graphs**, and track doctor recommendations over time.

> 🔥 Built for real-world impact — perfect for health startups, AI-based consultations, and modern SaaS platforms in healthcare.

---

## 🧩 Features

✅ **Clerk-based Authentication** (OAuth + email)  
✅ **Doctor AI Agents** with medical personalities  
✅ **Secure Session Storage** using PostgreSQL + Drizzle ORM  
✅ **Interactive Session Timeline**  
✅ **Bar Graph for Session Frequency**  
✅ **Framer Motion Animations**  
✅ **Voice Support with Vapi.ai**  
✅ **Dark Mode** with Next-Themes  
✅ **Modular, Scalable Folder Structure**

---

## 🎯 Problem It Solves

Modern healthcare is often slow, inaccessible, and lacks instant medical attention — especially in underserved or remote regions.

**Deblo solves this by**:

- Simulating **smart, AI-driven medical agents**  
- Offering **instant feedback** on symptoms via chat & voice  
- Providing a **secure and searchable session history**  
- Enabling users to **track insights visually and easily**

> Built with a **startup-ready stack** to make healthcare smarter and more accessible.

---

## 🛠 Tech Stack

| Category      | Stack |
|---------------|-------|
| Frontend      | **Next.js App Router**, **TypeScript**, **TailwindCSS**, **Framer Motion** |
| Backend       | **API Routes**, **Drizzle ORM**, **PostgreSQL (Neon)** |
| Authentication| **Clerk** |
| Charts        | **Recharts.js** |
| AI            | **OpenAI (text)**, **Vapi.ai (voice)** |
| UI Icons      | **Lucide**, **Tabler Icons** |
| Styling Tools | **tw-animate-css**, **clsx**, **cva** |
| Utilities     | **UUID**, **Axios**, **Moment.js** |

---

## 🖥️ Screenshots

| Profile Page with Timeline 📊 | AI Chat Session 💬 |
|------------------------------|--------------------|
| ![Profile Page](https://github.com/GitNinja36/deblo/assets/preview-profile.png) | ![Agent Chat](https://github.com/GitNinja36/deblo/assets/preview-chat.png) |

---

## 🔐 Authentication

Using **Clerk** for secure and scalable auth:

- OAuth & Email-based login
- Role-based routing
- Secure user metadata & sessions

---

## 🗂 Folder Structure

<details>
<summary>📁 Click to expand</summary>

```bash
deblo/
├── app/
│   ├── api/           # Server API Routes
│   ├── dashboard/     # Auth-protected pages
│   ├── profile/       # Timeline, stats & chart
├── config/            # DB schema + Drizzle setup
├── components/        # UI components (modals, timeline, chart, etc.)
├── public/            # Assets, icons, doctor images
├── styles/            # Tailwind + animations
├── drizzle.config.ts  # ORM config
├── tailwind.config.ts # Tailwind setup

</details>

---

## 📈 Future Improvements

- ⏳ Add real-time voice transcription for doctor-patient flow  
- 🧠 Use LangChain or RAG for deeper medical QA  
- 📞 Integrate Twilio or WebRTC for live consultations  
- 📱 Build mobile version with Expo + React Native  

---

Let me know if you'd like:

- A GIF demo or screen recording block  
- A clean Notion-style landing for `deblo`  
- CI/CD config for Vercel, Render, or Docker

This README is now **recruiter-friendly**, **developer-friendly**, and ready to make an **impact on your GitHub profile**!
