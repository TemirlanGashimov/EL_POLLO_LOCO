El Pollo Loco 🐔🌶️
A browser-based 2D platform game built with HTML, CSS, and vanilla JavaScript, using the HTML5 Canvas API and object-oriented programming.

Play as Pepe, explore a scrolling desert, collect coins and salsa bottles, avoid or defeat chickens, and take on the final boss.
🎮 Play El Pollo Loco
About the Project
El Pollo Loco is a hands-on JavaScript game-development project created during my training at Developer Akademie. The project focuses on class-based architecture, animation, character movement, game-state management, and collision detection without a game engine or frontend framework.
Features
- Canvas-based gameplay with an animated character and scrolling desert environment
- Movement and jumping with gravity and collision detection
- Enemies and boss battle featuring regular chickens, small chickens, and a final boss
- Collectibles including coins and salsa bottles
- Throwable bottles to attack enemies and the boss
- In-game bottle shop to exchange collected coins for additional bottles
- Status bars displaying health, coins, bottles, and boss health
- Game states including start screen, pause, victory, game over, and restart
- Sound effects and music, with a mute setting saved in local storage
- Fullscreen support and touch controls for compatible mobile devices
Controls
Key	Action
← / →	Move left / right
Space	Jump
D	Throw a salsa bottle
F	Buy a bottle with collected coins
Esc	Pause / resume


On touch-enabled devices, on-screen buttons provide movement, jump, throw, and buy controls.
Technologies
- HTML5 — Game layout and Canvas element
- CSS3 — Responsive layout, menus, and overlays
- JavaScript (ES6+) — Game logic and object-oriented architecture
- Canvas 2D API — Rendering the game world and animated sprites
- JSDoc — Source-code documentation
Project Structure
EL_POLLO_LOCO/
├── index.html          # Main game page and menus
├── style.css           # Styling and responsive layout
├── js/
│   └── game.js         # Game initialization and controls
├── models/             # Character, enemies, physics, world, UI classes
├── levels/
│   └── level1.js       # Level configuration
├── img/                # Sprite sheets and visual assets
├── sounds/             # Game audio and effects
└── README_JSDOC.md     # Notes on generating code documentation
Run Locally
1. Clone the repository:
   git clone https://github.com/TemirlanGashimov/EL_POLLO_LOCO.git
2. Open the EL_POLLO_LOCO folder.
3. Serve the folder with a local development server (for example, VS Code Live Server).
4. Open index.html in your browser through the local server.
No framework build step is required.
What I Practiced
- Structuring a JavaScript application with reusable classes
- Working with animation frames and the Canvas rendering loop
- Implementing movement, gravity, collisions, and enemy interactions
- Managing keyboard and touch input
- Building UI overlays and gameplay status indicators
- Debugging browser-based game behavior
Project Credits
Game implementation: Developed by me as part of my training at Developer Akademie.

Training context and assets: This is an educational project. Visual and audio assets are included for the game; their presence in this repository does not imply that I created all of those assets or grant a separate license to reuse them.
Links
- Live Demo: https://el-pollo-loco.temirlan-gashimov.de/
- GitHub Repository: https://github.com/TemirlanGashimov/EL_POLLO_LOCO
