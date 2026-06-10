# JSDoc-Dokumentation für El Pollo Loco

Dieses Projekt ist nun vollständig mit standardkonformen **JSDoc-Kommentaren** dokumentiert. Dies hilft dir nicht nur bei der automatischen Code-Vervollständigung (IntelliSense) in Editoren wie VS Code, sondern ermöglicht es dir auch, eine vollwertige HTML-Dokumentations-Webseite aus deinem Code zu generieren.

---

## 📂 Dokumentierte Dateien & Klassen

Alle JavaScript-Dateien wurden dokumentiert:

| Datei | Klasse / Funktion | Beschreibung |
| :--- | :--- | :--- |
| [drawable-object.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/drawable-object.class.js) | `DrawableObject` | Basisklasse für Grafiken auf dem Canvas (Bilder, Laden, Zeichnen). |
| [movable-object.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/movable-object.class.js) | `MovableObject` | Physik-Basisklasse (Schwerkraft, Bewegung, Kollisionen, Gesundheit). |
| [character.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/character.class.js) | `Character` | Klasse für Hauptfigur Pepe (Tastatursteuerung, Animationen). |
| [chicken.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/chicken.class.js) | `Chicken` | Normales Hühnchen (Links-Bewegung, Sterbe-Zustand). |
| [small-chicken.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/small-chicken.class.js) | `SmallChicken` | Kleines Hühnchen (schnellere Links-Bewegung). |
| [endboss.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/endboss.class.js) | `Endboss` | Der finale Boss (KI-Annäherung, Attacken, Animationen). |
| [throwable-object.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/throwable-object.class.js) | `ThrowableObject` | Salsa-Flaschenwurf (Blickrichtungs-Spawning, Splash, Zerspringen). |
| [cloud.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/cloud.class.js) | `Cloud` | Dekorative Wolke im Hintergrund (Links-Drift). |
| [coin.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/coin.class.js) | `Coin` | Sammelbare Münze im Level. |
| [bottle.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/bottle.class.js) | `Bottle` | Sammelbare Salsa-Flasche auf dem Boden. |
| [statusbar-health.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/statusbar-health.class.js) | `StatusBarHealth` | Anzeige-HUD für Pepes Lebensenergie. |
| [statusbar-coin.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/statusbar-coin.class.js) | `StatusBarCoin` | Anzeige-HUD für gesammelte Münzen. |
| [statusbar-bottle.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/statusbar-bottle.class.js) | `StatusBarBottle` | Anzeige-HUD für gesammelte Flaschen. |
| [statusbar-endboss.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/statusbar-endboss.class.js) | `StatusBarEndboss` | Gesundheits-Statusleiste des Endbosses. |
| [keyboard.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/keyboard.class.js) | `Keyboard` | Modell für Tastatur- und Touch-Eingaben. |
| [level.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/level.class.js) | `Level` | Struktur eines Levels (Sammlung von Gegnern, Items, etc.). |
| [world.class.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/models/world.class.js) | `World` | Zentrale Spielwelt-Instanz (Game-Loops, Zeichnungen, Kollisionsprüfungen). |
| [game.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/js/game.js) | Globale Funktionen | Start, Game Over, Pause, Mute und Touch-Steuerung. |
| [level1.js](file:///c:/Programierung/Modul-12/EL_POLLO_LOCO/levels/level1.js) | `createLevel1()` | Generierungs-Funktion für das erste Level. |

---

## 🛠️ Generieren einer HTML-Dokumentation (Webseite)

Wenn du aus den integrierten JSDoc-Kommentaren eine strukturierte HTML-Dokumentation generieren möchtest, kannst du das über das Terminal mit Node.js tun:

1. **JSDoc installieren** (falls nicht bereits global installiert):
   ```bash
   npm install -g jsdoc
   ```
2. **Dokumentation generieren**:
   Führe folgenden Befehl im Hauptverzeichnis `EL_POLLO_LOCO` aus:
   ```bash
   jsdoc -r models/ js/ levels/ -d docs
   ```
3. **Dokumentation ansehen**:
   Es wird ein Ordner `docs/` erstellt. Mache einfach einen Doppelklick auf `docs/index.html`, um deine interaktive Dokumentation im Browser zu öffnen!
