# Careerpath: Your AI-Powered Career & Skills Advisor

Careerpath is a web application built with Next.js that acts as a personalized guide for career growth. It leverages AI to provide users with tailored career plans, mock interview simulations, resume-building assistance, and more.

## ✨ Key Features

- **Personalized Career Plan:** AI-generated career recommendations, skill gap analysis, and an actionable roadmap based on user skills and interests.
- **Explore Careers:** Browse a curated list of careers with details on salary, market demand, and required skills.
- **AI Resume Builder:** Create a professional, ATS-friendly resume with the help of an AI assistant and export it as a PDF.
- **Mock Interview Simulation:** Practice for interviews with a conversational AI that asks relevant questions and provides feedback.
- **Interview Prep:** Generate tailored interview questions and model answers based on your specific profile and target role.
- **Skill Mapping:** Map your existing skills against a standardized taxonomy to identify strengths and areas for growth.
- **Admin Dashboard:** A dedicated section for administrators to manage application data like careers and skills.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Integration:** [Genkit (from Firebase)](https://firebase.google.com/docs/genkit) with Google's Gemini models.
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Hooks (`useState`, `useContext`)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)

## 🛠️ Getting Started: Running Locally

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- `npm`, `yarn`, or `pnpm` as your package manager.

### 1. Set Up Environment Variables

You'll need a Google AI API key for the generative AI features to work.

1.  Create a copy of the `.env.example` file and rename it to `.env`.
2.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the key to your `.env` file:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### 2. Install Dependencies

Install the project dependencies using your preferred package manager:

```bash
npm install
```

### 3. Run the Application

This project requires two separate development servers to run concurrently: one for the Next.js frontend and another for the Genkit AI flows.

1.  **Start the Next.js dev server:**
    Open a terminal and run:
    ```bash
    npm run dev
    ```
    This will start the main web application, usually on `http://localhost:9002`.

2.  **Start the Genkit dev server:**
    Open a **second terminal** and run:
    ```bash
    npm run genkit:dev
    ```
    This starts the local server that runs your AI flows. The Next.js application communicates with this server.

Once both servers are running, you can open your browser to `http://localhost:9002` to see the application in action.
