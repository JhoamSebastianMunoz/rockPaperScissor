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
| `assets/` | Imágenes de piedra, papel y tijeras |

## Lógica del juego (`app2.js`)

- `choices`: mapea cada opción con su nombre, imagen y a qué opción vence (`beats`).
- `userPlay()`: registra la jugada del usuario y obtiene la de la CPU.
- `getCpuChoice()`: elige una opción aleatoria de forma uniforme.
- `determineWinner()`: compara las jugadas y suma el punto al ganador o declara empate.
- `checkForGameWinner()`: si alguien llega a 3, deshabilita botones, muestra el ganador y resetea.
- `resetGame()`: reinicia marcadores, imágenes y estado.


