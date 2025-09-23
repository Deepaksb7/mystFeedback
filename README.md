# mystFeedback

![mystFeedback](https://img.shields.io/badge/mystFeedback-v1.0-blue)

A secure anonymous feedback collection platform built with **Next.js 15**, **TypeScript**, **MongoDB**, and **NextAuth.js**. Users create profiles and receive anonymous feedback via unique shareable links while maintaining privacy and control over their feedback experience.

## 🎯 Project Purpose

mystFeedback solves the need for honest, anonymous feedback in personal and professional environments. Users create accounts, get unique feedback links (e.g. `/u/username`), and share them to collect genuine, anonymous feedback without revealing the sender's identity.

### Real-world use cases

* Professional feedback
* Educational surveys
* Workplace reviews
* Personal development
* Product feedback
* Event feedback

## ✨ Core Features

* **Secure Authentication**

  * Email registration with 6-digit verification codes (1-hour expiry)
  * Password hashing (bcryptjs)
  * NextAuth.js session management and protected routes

* **Feedback Dashboard**

  * Unique feedback link for every user (`/u/username`)
  * Copy-to-clipboard and sharing controls
  * Real-time feedback display (card-based)
  * Toggle feedback reception on/off
  * View, organize, delete feedback

* **Anonymous Feedback System**

  * Send anonymous feedback via public profile link
  * Content validation (10–300 chars)
  * Instant delivery to recipient dashboard
  * No sender tracking or identification

* **AI-Enhanced Feedback**

  * Smart suggestions and prompt helpers using OpenAI
  * Content enhancement for clearer feedback

* **User Experience**

  * Responsive, accessible UI built with Tailwind + Radix UI
  * Toast notifications, loading states, smooth transitions

## 🛠️ Tech Stack

**Frontend**

* Next.js 15 (App Router + Turbopack)
* React 19 (Server & Client components)
* TypeScript
* Tailwind CSS 4
* Radix UI, Lucide React
* React Hook Form + Zod

**Backend & DB**

* MongoDB + Mongoose
* NextAuth.js
* bcryptjs
* Next.js API routes
* JWT-based sessions

**External Services**

* OpenAI
* Resend (email)
* React Email
* Axios

## 📁 Project Structure

```
mystFeedback/
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── (auth)/
│   │   ├── api/
│   │   ├── u/[username]/
│   │   └── layout.tsx
│   ├── components/
│   ├── model/
│   └── schemas/
```

## 🔧 Installation

1. Clone the repo:

```bash
git clone https://github.com/<your-username>/mystFeedback.git
cd mystFeedback
```

2. Install dependencies:

```bash
npm install
```

3. Add `.env` file (see below).

4. Run the dev server:

```bash
npm run dev
```

## ⚙️ Environment Variables

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mystFeedback
RESEND_API_KEY=your_resend_api_key
OPENAI_API_KEY=your_openai_api_key
EMAIL_FROM=no-reply@yourdomain.com
JWT_SECRET=your_jwt_secret
```

## 🔐 Security & Privacy

* No sender tracking
* Input validation with Zod
* Rate limiting on feedback endpoints
* Password hashing with bcryptjs
* Email verification required
* Secure deletion of feedback
