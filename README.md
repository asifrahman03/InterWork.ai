# AI-Powered Interview Bot

## Overview

This repository contains the code for an AI-powered interview bot named Jinny. Jinny is designed to assist users by providing sample coding questions, HR questions, and technical managerial questions for various companies. The bot also handles contextual memory, allowing it to tailor responses based on the specific company mentioned by the user.

## Features

- **Contextual Memory**: The bot remembers the company name mentioned by the user and provides questions tailored to that company.
- **In-Context Responses**: The bot generates responses only related to coding, HR, and technical managerial questions. If a question is outside these domains, Jinny politely informs the user that it cannot help with that request.
- **Dark/Light Mode Support**: The chat interface supports both dark and light modes.
- **Multi-Language Support**: The bot can handle responses in multiple languages by translating the input and output.

## Tech Stack

- **Next.js**: Frontend framework used for building the chatbot interface.
- **Groq SDK**: Used for integrating with the Groq API to generate AI-driven responses.
- **Fuse.js**: Lightweight fuzzy-search library used for matching user inputs with hard-coded responses.
- **Axios**: Used for making HTTP requests to the backend API.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/ai-interview-bot.git
    cd ai-interview-bot
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your Groq API key:

    ```env
    GROQ_API_KEY=your_groq_api_key_here
    HUGGING_FACE_API_KEY=your_groq_hf_here
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk-publishable_here
    CLERK_SECRET_KEY=your_clerk-key_here
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

    Your app should now be running on `http://localhost:3000`.

### Usage

1. **Open the Chat Interface**: 
    Visit `http://localhost:3000` to interact with Jinny.

2. **Ask Questions**:
    - Mention a company in your conversation, e.g., "I have an interview at XYZ."
    - Then ask for coding, HR, or managerial questions, e.g., "Give me coding questions."
    - Jinny will remember the company and provide questions specific to "XYZ".

3. **Switch Between Dark and Light Modes**:
    - Use the toggle button in the chat interface to switch between dark and light modes.

## Deployment

To deploy the app, follow the instructions provided by your hosting provider (e.g., Vercel, Netlify).

### Example for Vercel:

1. **Push your code to GitHub:**

    ```bash
    git add .
    git commit -m "Initial commit"
    git push origin main
    ```

2. **Connect your GitHub repository to Vercel:**

    - Log in to Vercel and select your GitHub repository.
    - Set up your environment variables in the Vercel dashboard.

3. **Deploy**:
    Vercel will automatically build and deploy your app.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.


## Contact

If you have any questions or feedback, feel free to reach out to me at [your.email@example.com](mailto:your.email@example.com).
