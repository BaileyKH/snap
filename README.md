# SnapAI

<div align="center">
  <img src="/src/assets/snapai.png" alt="SnapAI Preview" width="800"/>
  <p>Generate stunning React components at the snap of a finger</p>
</div>

## About

SnapAI is an AI-powered React component generator that transforms natural language descriptions into fully-functional React components with Tailwind CSS. Simply describe what you want, and watch as SnapAI creates the code for you along with a live preview.

## Features

- **AI-Powered Generation**: Utilizes OpenAI's API to transform descriptions into React components
- **Live Preview**: See your component in action before adding it to your project
- **Tailwind Styling**: All components use Tailwind CSS for modern, responsive designs
- **One-Click Copy**: Easily copy the generated code to your clipboard
- **Syntax Highlighting**: Clear, highlighted code for better readability

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/snapai.git
   cd snapai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_SNAP_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Type a description of the React component you want in the text area
   - Example: "A card with an image, title, description, and a hover effect"

2. Click the "Create" button to generate your component

3. Use the tabs to switch between code view and live preview

4. Copy the code to your clipboard with the copy button

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- OpenAI API
- react-syntax-highlighter

## Project Structure

```
snapai/
├── api/
│   └── generate.js
├── src/
│   ├── components/
│   │   ├── magicui/
│   │   │   ├── line-shadow-text.tsx
│   │   │   └── particles.tsx
│   ├── pages
│   │   └── Home.tsx
│   └── ...
├── public/
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some sick feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request


