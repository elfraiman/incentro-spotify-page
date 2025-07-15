# Spotify AI - Intelligent Music Discovery

My application to Incentro for the Senior engineer position.
The goal was to create a single web page that connects to spotify API and has Voice regonition.
I've added some more features since I had some time left within the time frame such as incentro specific styling
responsive design & I've integrated an AI LLM to allow the user to get some help looking for new music.

Down below is the full details of the project including technologies, features and the tools I used to create the application.

## 🎵 Features

- **AI-Powered Music Discovery**: Chat with an intelligent AI assistant to find the perfect music for any mood, activity, or occasion
- **Voice Search**: Use natural language voice commands to search for music
- **Smart Recommendations**: Get personalized music suggestions based on your descriptions
- **Real-time Search**: Instant results from Spotify's vast music library
- **Modern UI**: Clean, professional design with smooth animations and responsive layout
- **Dark/Light Theme**: Toggle between themes for optimal viewing experience

## 🚀 Tech Stack

### Frontend & Framework
- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and state management

### AI & APIs
- **Groq AI API** - High-performance AI inference for natural language processing
- **Spotify Web API** - Access to millions of tracks, artists, and albums
- **Web Speech API** - Browser-native speech recognition for voice commands

### Development Tools
- **Cursor** - My general go-to IDE these days, used it's AI agents to write this readme & the react-query hooks.
- **Claude Code** - Used for schaffolding & structure coding to allow myself to create more content within the timeframe.
- **ESLint** - For code quality - real basic configuration for this demo purpose.

### UI/UX Components
- **Custom Theme System** - Dynamic color schemes with CSS variables & Tailwind
- **Responsive Design** - Application works well on all standard mobile & desktop devices and resolutions.
- **Accessibility** - WCAG compliant with focus states and screen reader support

### State Management & Hooks
- **React Context** - Only used for our ThemeContext to switch dark mode / light mode.
- **Custom Hooks** - Reusable logic
- **Local State** - Component-level state management

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Spotify Developer Account
- Groq AI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/incentro-interview
   cd spotify-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   GROQ_API_KEY=your_groq_api_key - not a must but without it you wont be able to use the AI feature.
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 How It Works

### AI-Powered Search
The application uses Groq AI API to understand natural language queries and convert them into optimized Spotify search parameters. Users can describe their mood, activity, or preferences in plain English.

### Voice Integration
Built-in voice recognition allows users to search for music using voice commands, making the experience more intuitive and accessible.

### Real-time Results
React Query handles data fetching and caching, providing instant search results while maintaining optimal performance.

### Smart Recommendations
The AI analyzes user queries to provide contextual music suggestions, learning from interactions to improve recommendations over time ( Is the idea, if I had more time i'd hook up the query's into a database and feed it back to the AI for context)

## 📁 Project Structure

Standard NextJS NO SRC FOLDER structure.
```
spotify-ai/
├── components/          # Reusable UI components
│   ├── cards/          # Music card components
│   ├── ui/             # Base UI components
│   └── AIChat.tsx      # AI chat interface
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages
│   └── api/            # API routes
├── styles/             # Global styles and CSS
├── types/              # TypeScript type definitions
└── theme/              # Theme configuration
```

## 🔧 API Integration

### Groq AI API
- **Natural Language Processing**: Converts user queries to search parameters
- **Context Awareness**: Maintains conversation context for better recommendations (Resets on refresh)

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#ff5201) - Brand identity (Incentro)
- **Secondary**: Blue gradients for accents (Complemantry to Incentro's main color)
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, and error states

### Typography
- **Primary Font**: Work Sans - Modern and readable (Similar to Incentro's premium font, and free :)
- **Monospace**: JetBrains Mono - For code elements
- **Responsive**: Fluid typography scaling
