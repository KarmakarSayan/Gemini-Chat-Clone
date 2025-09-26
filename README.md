

# Gemini Clone - Conversational AI Chat Application

This project is a high-fidelity frontend clone of a Gemini-style conversational AI chat application. It's built with modern web technologies to be fully functional, responsive, and visually appealing. The application simulates OTP login, chatroom management, AI messaging, image uploads, and includes a variety of modern UX/UI features.

**Live Deployment URL:** **[gemini-chatclone.netlify.app](https://www.google.com/search?q=https://gemini-chatclone.netlify.app/)**

## Features

This application is packed with features designed to showcase a comprehensive understanding of modern frontend development.

### **Core Functionality**

  - **OTP-Based Authentication**: A simulated but fully functional login/signup flow using real country codes fetched from an external API.
  - **Chatroom Management**: Users can create, view, and delete their chatrooms.
  - **Real-time Chat Interface**: A responsive chat UI with user and simulated AI messages, timestamps, and a "Gemini is typing..." indicator.
  - **Simulated AI Responses**: AI replies are generated after a random delay using `setTimeout` to simulate "thinking" time.
  - **Image Uploads**: Users can upload images directly into the chat, with a local preview shown before sending (no backend needed).

### **Global UX/UI Enhancements**

  - **Mobile-First Responsive Design**: The UI is optimized for all screen sizes, from mobile phones to desktops.
  - **Dark Mode**: A sleek dark mode that can be toggled and is saved to the user's preferences.
  - **Debounced Search**: A performant search bar to instantly filter chatrooms by title without overwhelming the app.
  - **Persistent State**: User authentication and chat data are saved to `localStorage`, so your session and chats are remembered.
  - **Loading Skeletons**: Smooth loading skeletons are displayed while chat messages are being "fetched" or generated.
  - **Toast Notifications**: Informative notifications for key actions like OTP sent, chatroom deleted, or messages copied.
  - **Copy-to-Clipboard**: A convenient copy icon appears on message hover, allowing for easy sharing.

## Tech Stack

This project leverages a modern, efficient, and powerful stack:

  - **Framework**: **React 18** (with Vite for a fast development experience)
  - **State Management**: **Zustand** - for simple, fast, and scalable global state management.
  - **Form Validation**: **React Hook Form + Zod** - for performant and schema-based form validation.
  - **Styling**: **CSS Modules** - for locally scoped, conflict-free styling, combined with global CSS variables for theming.
  - **Routing**: **React Router DOM** - for seamless client-side navigation.
  - **API Calls**: **Axios** - for fetching country code data.
  - **Icons**: **Lucide React** - for a beautiful and consistent set of icons.
  - **Notifications**: **React Hot Toast** - for elegant and customizable toast notifications.
  - **Deployment**: **Netlify**

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### **Prerequisites**

You need to have [Node.js](https://nodejs.org/) (version 16 or later) and [npm](https://www.npmjs.com/) installed on your machine.

### **Installation & Setup**

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd gemini-clone
    ```

3.  **Install all the necessary dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

The application will now be running on **`http://localhost:5173`** (or the next available port).

-----
