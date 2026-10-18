# HANDOFF — Rediseño visual de Código.IA

_Actualizado: 18/10/2026. Para el grupo Web 1 (FIC, Udelar)._

## 1. Contexto
Sitio de Código.IA (programa de streaming sobre inteligencia artificial, FIC – Udelar). Stack: React 18 + Vite 6 + Tailwind 3.4 + framer-motion, router casero (sin react-router), sin backend. La estructura, las rutas y los datos ya estaban terminados; este trabajo es **solo visual e interactivo**. Detalle de estructura y datos: `HANDOFF.md` y `CODIGO-IA-SPEC.md`. Estado vivo del proyecto: `PROJECT_STATE.md`.

## 2. Objetivo actual
Sitio fresco y divertido pero limpio, fiel a la identidad de marca, y accesible para personas no videntes. Ya está en producción; falta feedback del grupo y cerrar pendientes.

## 3. Estado
- **En producción (público, sin login): https://codigoia-design.vercel.app/**
- Rama de producción: `diseno/accesibilidad` (commit `6ff12b1` desplegado). Es la única versión vigente.
- Repo de trabajo: fork `gabrieldelfiino-oss/codigoIA-design`. El repo de la compañera (`upstream`) no se toca.
- Los previews de otras ramas piden login de Vercel; cada push crea una URL nueva (no se actualizan solas). Solo el dominio de producción es público y estable.

## 4. Decisiones tomadas
- Paleta: azul `#2400FF`, naranja `#FF6B3B`, lima `#C4FD36`, lila `#C172FF`, noche `#1A1A30`, gris `#FAFAFA`. Tipos: Diagramm (títulos), IBM Plex Sans (cuerpo), IBM Plex Mono (etiquetas `/`), serif itálica para citas.
- Mapa de temas: nodos de vidrio, temas en violeta, resaltado en lima neón, conexiones rectas, fondo tipo universo.
- Texturas de puntos y cuadrícula, suaves y con máscara (nunca sobrecargar).
- Textos de botones en voseo rioplatense cercano (Escribinos, Mandalo, ¿Qué buscás?, Mirá el programa, Meterse en el tema…).
- Todo debería reaccionar al hover, pero **la accesibilidad pesa más**: el menú abre por clic/Enter y ya no hace scroll al pasar el cursor.
- Producción se despliega a mano (no con `git push`).

## 5. Trabajo realizado
- Sistema visual limpio, transiciones entre secciones, logo con aro naranja, escala más liviana (títulos, paddings, anchos).
- **Mapa:** PC con modo inmersivo (la sección se oscurece, aura, chispas, ondas); celular con versión vertical, pantalla completa en cristal que entra entera, y lista de temas desplegable. Conexión Educación–Chatbots en el aprendizaje agregada.
- **Cabecera:** buscador que es una lupa que se abre; slogan que sale del título del hero y viaja al header (PC ≥1280 px); logo vuelve al inicio.
- **Home:** banners de celular sin recorte con gesto de deslizar; temporadas como acordeón (se cierra la otra); Contacto lila y desplegable; copyright 2026.
- **Subpáginas:** cada tema muestra sus subtemas y con qué se cruza; texturas, chips violeta y pie de página.
- **Accesibilidad:** "re perdido" legible para lectores, título de página + foco al `h1` + anuncio por ruta, `h1` en la home, "Saltar al contenido", carrusel con botón de pausa, buscador combobox, modal del mapa con foco atrapado, lista del mapa en PC, formulario con etiquetas, enlaces externos avisados, contraste subido, "reducir movimiento" respetado.

## 6. Pendientes
- **Panel del menú hamburguesa:** falta una propuesta nueva (unido al botón y translúcido; la primera versión no gustó).
- **Decidir:** ¿se saca la conexión Infancia–Chatbots en el aprendizaje? Está en el sitio, no en el boceto de referencia.
- **Datos:** Educación muestra "0 programas" (revisar `programa_tema.json`); citas con lorem en `citas.json`; "+20 programas" fijo (hay 16); temas cine/videojuegos/publicidad sin nodo; formulario de contacto sin envío real.
- **Accesibilidad:** probar con NVDA/VoiceOver y en celular real; sumar `eslint-plugin-jsx-a11y` y axe; transcripciones y subtítulos de los videos.
- **Repo:** cerrar a mano el PR #1 viejo (neo-brutalismo) del fork; abrir uno nuevo cuando haya versión final. `PENULTIMA` y `ControlesReproduccion.jsx` sin uso.

## 7. Restricciones
- Solo diseño visual: no cambiar estructura, rutas ni datos salvo acuerdo.
- No pushear a `upstream` (repo de la compañera).
- Español rioplatense en textos de interfaz.
- Respetar `prefers-reduced-motion`; mantener los links a `/temas/:id` y los datos de `mapa.json`.
- Antes de commitear: `npm run build`. Desarrollo local: `npm run dev` (puerto 5173).

## 8. Riesgos o puntos a revisar
- Producción no se actualiza sola: hay que redesplegar a mano o conectar la rama en Vercel.
- Hay dos ramas cercanas (`diseno/header-interactivo` sin accesibilidad y `diseno/accesibilidad` con ella); los arreglos se portan con cherry-pick y pueden dar conflictos.
- Todo se probó en el navegador integrado de la herramienta (frena animaciones); **no** se probó con lector real ni en un celular físico. Mirarlo en celular.
- El slogan viajero solo funciona desde 1280 px de ancho.

## 9. Próximo paso recomendado
1. Revisar https://codigoia-design.vercel.app/ en PC y celular y juntar feedback.
2. Decidir el panel del menú y la conexión Infancia–Chatbots.
3. Probar con NVDA o VoiceOver y corregir lo que aparezca.
4. Cerrar el PR #1 viejo y preparar el PR final.

## 10. Archivos y fuentes relevantes
- `PROJECT_STATE.md` (estado vivo), `HANDOFF.md` y `CODIGO-IA-SPEC.md` (estructura y datos), `tailwind.config.js`, `src/index.css` (texturas `.tx*`, vidrio `.mapa-vidrio`, animaciones del mapa).
- Mapa: `src/components/temas/{ThemeMap,ThemeMapMovil,ThemeSection,ThemePage}.jsx`; datos en `src/data/mapa.json`, `src/servicios/mapa.js`.
- Cabecera y portada: `src/components/general/{IntroHeader,Nav,SearchBar,Carousel,AllSection,ContactForm,Footer}.jsx`, `src/components/utils/{Heartbeat,PageHeader}.jsx`, `src/App.jsx`, `src/main.jsx`.
- Textos del formulario y copyright: `src/data/proyecto.json`.
- Referencia visual del mapa: artefacto `claude.ai/artifact/QPh6W9x5jJ3MhLy17DMoBx`.
- Sitio paralelo (Astro, otra línea): repo `gabrieldelfiino-oss/codigo-ia-v3`, https://codigo-ia-v3.vercel.app/.
