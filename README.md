# Piedra, Papel o Tijeras

Juego web de Rock, Paper, Scissors (HTML + CSS + JavaScript).

**Despliegue actual:** https://rock-paper-scissor-puce-eight.vercel.app

## Cómo ejecutar

Abre `index.html` en un navegador (no requiere servidor ni dependencias; usa SweetAlert2 por CDN).

## Reglas

- El usuario elige **piedra**, **papel** o **tijeras**; la CPU elige al azar.
- Gana la partida quien primero alcance **3 puntos**.

## Estructura

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Estructura de la interfaz |
| `style.css` | Estilos |
| `app2.js` | Lógica del juego |
| `assets/` | Iconos de piedra, papel y tijeras |

## Diseño

Interfaz de duelo (usuario contra la CPU) con marcador "primero a 3".

- **Paleta derivada de los iconos del juego:** tinta `#0E1A1F`, panel `#16262C`, giza `#F1EFE7`, usuario (verde azulado) `#0FA396`, CPU (rojo) `#D93A2B`, empate (lima) `#A6CE39`.
- **Tipografía:** *Big Shoulders Display* (títulos, marcador y veredicto) + *Archivo* (texto de interfaz).
- **Responsivo:** a partir de 780 px los esquinos se muestran en paralelo separados por el "vs"; por debajo se apilan en columna, con los botones de jugada al alcance del pulgar.
- **Accesibilidad:** el veredicto se anuncia con `aria-live`, los botones de jugada tienen `aria-label` y foco visible; se respeta `prefers-reduced-motion`.
- Cada ronda muestra además la frase de la regla ("La piedra aplasta las tijeras.") y la partida termina con un diálogo con el marcador final.

## Lógica del juego (`app2.js`)

- `choices`: mapea cada opción con su nombre, imagen y a qué opción vence (`beats`).
- `userPlay()`: registra la jugada del usuario y obtiene la de la CPU.
- `getCpuChoice()`: elige una opción aleatoria de forma uniforme.
- `determineWinner()`: compara las jugadas y suma el punto al ganador o declara empate.
- `checkForGameWinner()`: si alguien llega a 3, deshabilita botones, muestra el ganador y resetea.
- `resetGame()`: reinicia marcadores, imágenes y estado.


