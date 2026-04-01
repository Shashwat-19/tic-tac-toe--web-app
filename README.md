# ❌⭕ Neon Tic Tac Toe 

![Vite](https://img.shields.io/badge/vite-v5.4.21-purple.svg?style=flat&logo=vite)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-yellow.svg)

A professional, modern, and lightning-fast **Tic Tac Toe Web Application**. Designed with a vibrant neon glassmorphism aesthetic and powered by an unbeatable Minimax algorithm for Single Player mode. 

<div align="center">
  <!-- Replace this with a working screenshot if desired -->
  <i>A high-end modern take on a timeless classic.</i>
</div>

---

## 🌟 Key Features

- **Unbeatable AI (Minimax)**: Try your best, but the computer evaluates every single possible game-tree outcome. The best you can hope for is a draw!
- **Local Multiplayer**: Play locally against a friend in classic 1v1 style.
- **Dynamic User Flow**: Seamlessly transitions between Player Name Selection, Game Mode Selection, and the live Game Board.
- **Micro-Animations & Rich Aesthetics**: Implemented a sleek Dark Theme with glowing Neon Pink (`O`) and Cyan (`X`) highlighting, pop-in animations, and dynamic win-line displays.
- **Zero UI Frameworks**: Built entirely with Semantic HTML, pure CSS3, and Vanilla JavaScript for maximum performance and a lightweight bundle.

## 🛠️ Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ESM modules)
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, Grid, UI Micro-Animations)
- **Build Tool**: [Vite](https://vitejs.dev/) for blazing fast development Server and Hot Module Replacement (HMR).

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
Make sure you have Node.js and NPM installed.
- [Node.js](https://nodejs.org/en/) (v16+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shashwat-19/tic-tac-toe--web-app.git
   cd tic-tac-toe--web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Play!**
   Open `http://localhost:5173` in your browser.

## 📂 Project Structure

```text
tictactoe-webapp/
├── index.html         # Application entry point
├── package.json       # Dependencies and build scripts
└── src/
    ├── main.js        # Main initialization loop
    ├── style.css      # Custom neon styles and animations
    ├── state.js       # Global state management
    ├── ui.js          # DOM manipulation and screen routing
    ├── game.js        # Tic Tac Toe win-condition logic
    └── ai.js          # Minimax algorithm implementation
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to push Pull Requests if you want to add difficulty levels to the AI!