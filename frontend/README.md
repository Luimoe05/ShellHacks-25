Moola – Your AI Financial Coach

### 📌 Overview

This is Moola, a financial services web application + our AI-powered financial coach that help users manage their money, set actionable goals, and receive personalized financial advice. We turn complex money choices into simple, personalized actions, helping you budget, build credit, pay off debt, and invest with clarity.

The platform leverages Auth0 for authentication and Google Gemini API for AI-driven insights, wrapped inside an engaging and interactive React + Material UI experience.

#### ⭐ Our Mission

**_We created Moola to solve a problem that affects nearly everyone._**

Despite how critical money is to our daily lives, financial literacy is rarely taught in schools. From young adults navigating their first paycheck to families managing long-term goals, people are left to figure it out on their own.

Moola bridges that gap by making financial guidance clear, adaptive, and goal-oriented so anyone, at any stage of life, can make smarter financial decisions with confidence.

### 🚀 Features

✅ Secure login & signup using Auth0
✅ Personalized onboarding stepper with Material UI
✅ User financial interests selection (Investing, Budgeting, Credit, Debt payoff, Retirement, etc.)
✅ Financial input form (income, expenses, credit score, debts, goals, timeframe, etc.)  
✅ PDF upload for deeper AI analysis  
✅ AI-powered financial advice using Google Gemini API  
✅ Interactive dashboard showing revenue, expenses, and suggestions
✅ Modern, responsive design with Material UI

### 🛠️ Tech Stack

**Frontend:** React, React Router, Material UI (MUI)
**Backend:** Node.js / Express / Supabase (Database)
**Authentication:** Auth0
**AI:** Google Gemini API  
**Version Control:** Git + GitHub  
**Deployment:** Render

### 🖥️ Frontend (React + MUI)

##### Built with React 19, React Router v7, and Material UI (custom dark theme).

- **Onboarding flow:** 3-step stepper for Personal Info, Interests, and Financial Inputs (incl. PDF upload) the first time you sign in.

- **Chatbox (“Meet Our AI Coach Moola”):** real-time, personalized financial guidance.

- **Advice panel + dashboard tiles:** actionable insights and progress tracking.

- **Homepage:** bold hero tagline with call to action buttons (Try Moola | Watch Demo), impact metrics (2M+ users, $50B+ transactions), and a “Why Choose Moola?” section highlighting smart investing, security, and accessibility.

### ⚙️ Backend (API Integration)

- **Secure authentication** powered by Auth0, using JWT for protected routes.

- **Google Gemini** API generates personalized, conversational financial guidance.

- **PDF parsing service** processes uploaded bank statements to extract key financial data.

- **Custom API endpoints** combine user inputs + parsed data to deliver tailored recommendations and insights.

- **Supabase** used for storing user profiles, financial inputs, and parsed statement data securely.

### 🔑 APIs Used

**Auth0** – User authentication, login, and session management.

**Google Gemini API** – Natural language AI model powering Moola’s financial coaching.

### 📊 Example User Flow

- User logs in with Auth0 to sign in with either Google, Github, or Email.

- Redirected to homepage → two buttons:

  - Try Moola → Launches onboarding stepper.
  - Watch Demo → Shows demo mode.

- User fills in onboarding slides.

- Uploads _required_ financial PDF.

- User will be greeted by Moola's chatbox to the left and personalized financial advice card + dashboard metrics.

- On subsequent logins → AI provides new financial advice (e.g., cancel unused subscriptions, increase emergency fund, optimize credit card usage).

### 🏃 How to Run Locally

#### 1. Clone the repository

```
$ git clone https://github.com/Luimoe05/ShellHacks-25
```

#### 2. Install dependencies

```
$ cd frontend
$ npm install
```

#### 3. Run frontend (React + Vite)

```
$ npm run dev
```

Runs on: ------------------------

#### 4. Setup environment variables

Create a .env file in both frontend/ and backend/:

#### Auth0:

AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id

#### Google Gemini:

GEMINI_API_KEY=your-gemini-api-key

#### 5. Run backend

```
cd backend
npm install
node server.js
```

## Built with ❤️ at ShellHacks 2025 by **The Moola-67 Team**!
