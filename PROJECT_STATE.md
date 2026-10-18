# PROJECT_STATE — Rediseño visual Código IA

_Actualizado: 18/10/2026 (Montevideo). Rama de producción: `diseno/accesibilidad` (commit `6ff12b1`)._

**PROYECTO:** Rediseño visual del sitio de Código IA (FIC, Udelar), grupo Web 1. La estructura, las rutas y los datos ya estaban terminados: solo se toca lo visual y la interacción. Repo de trabajo: fork `gabrieldelfiino-oss/codigoIA-design` (remote `origin`). `upstream` es el repo de la compañera y no se le escribe.

**OBJETIVO:** Sitio estético, fresco y divertido, pero limpio y prolijo ("no un montón"), fiel a la identidad del manual de marca, y accesible para personas no videntes.

**ESTADO:** En producción, público y sin login: **https://codigoia-design.vercel.app/** (versión accesible, deploy `dpl_8vEuTmnDjVGvjdY5u3ozJpdM1xMP`, estado READY). Es la única versión vigente. Los previews de otras ramas piden login de Vercel (protección SSO activa, excepto dominios propios).

**COMPLETADO (confirmado, probado en navegador, build OK):**
- Pasos 1–3: sistema visual limpio (hero oscuro con orbes, tarjetas redondeadas, botones pill), transiciones entre secciones con borde curvo, logo con aro naranja y menú hamburguesa.
- Paso 4 — Mapa de temas: nodos de vidrio con neón lima, temas en violeta, conexiones rectas, fondo tipo universo con paralaje y foco de luz que sigue al cursor. Conexión Educación–Chatbots en el aprendizaje agregada (dato en `mapa.json`).
- Mapa en PC: modo inmersivo (la sección se oscurece, aura, chispas y ondas al interactuar).
- Mapa en celular: versión vertical propia (`ThemeMapMovil.jsx`); el primer toque lo abre a pantalla completa en cristal con ondas y chispas, en versión compacta que entra entera en la pantalla visible; lista de temas como desplegable.
- Cabecera: buscador como lupa que se abre; slogan que sale del título del hero y viaja al header (con "re perdido" latiendo); logo vuelve al inicio.
- Textos de botones y enlaces en tono rioplatense (Escribinos, Mandalo, ¿Qué buscás?, Mirá el programa, Meterse en el tema, etc.); placeholders del formulario también; copyright 2026.
- Escala más liviana (títulos, paddings y anchos), texturas de puntos y cuadrícula, contacto en lila como desplegable, temporadas como acordeón exclusivo, banners de celular sin recorte con gesto de deslizar.
- Subpáginas: conexiones del mapa en cada tema (subtemas y "se cruza con"), texturas, isotipo con hover, chips violeta y pie de página.
- Accesibilidad (rama `diseno/accesibilidad`): "re perdido" legible para lectores, título de página + foco al `h1` + anuncio por ruta, `h1` en la home, enlace "Saltar al contenido", carrusel con botón de pausa y roles, menú por clic/Enter, buscador combobox con aviso de resultados, modal del mapa con foco atrapado, lista del mapa en PC, formulario con etiquetas visibles, enlaces externos avisados, contraste subido, "reducir movimiento" respetado en todo el sitio.

**EN CURSO:** nada abierto.

**PENDIENTE:**
- Panel del menú hamburguesa: se probó una versión unida al botón y translúcida y no gustó; quedó el panel anterior. Falta una nueva propuesta (unificar botón y panel, sensación de transparencia).
- Decidir si se saca la conexión Infancia–Chatbots en el aprendizaje (está en el sitio, no en el boceto de referencia). Hoy hace que Infancia aparezca cruzada con Chatbots.
- Educación muestra "0 programas": revisar `programa_tema.json`.
- Cerrar a mano el PR #1 viejo del fork (neo-brutalismo): https://github.com/gabrieldelfiino-oss/codigoIA-design/pull/1. No se pudo cerrar desde acá (permiso de escritura en GitHub denegado). Cuando haya versión final, abrir un PR nuevo.
- Probar con lector de pantalla real (NVDA, VoiceOver) y en celular real; sumar `eslint-plugin-jsx-a11y` y axe.
- Transcripciones de los videos y subtítulos revisados (depende de quienes producen los videos).
- Heredados del HANDOFF original: citas con lorem en `citas.json`, "+20 programas" fijo (hay 16), formulario de contacto sin envío real, temas cine/videojuegos/publicidad sin nodo, `PENULTIMA` y `ControlesReproduccion.jsx` sin uso, redirección a `index.html` en hosting para entrar directo a `/programa/...`.

**DECISIONES:**
- Trabajar en el fork; ir por partes, de lo general a lo específico. Solo diseño visual: no cambiar estructura, rutas ni datos, salvo que se pida (ya se pidió y se hizo la arista Educación–Chatbots y los textos de `proyecto.json`).
- Paleta: azul `#2400FF`, naranja `#FF6B3B`, lima `#C4FD36`, lila `#C172FF`, noche `#1A1A30`, gris `#FAFAFA`. Tipos: Diagramm (títulos), IBM Plex Sans (cuerpo), IBM Plex Mono (etiquetas con `/`), serif itálica para citas.
- Temas en violeta, resaltado y caminos en lima neón; conexiones del mapa siempre rectas (no se usan los puntos de control de `mapa.json`).
- Texturas suaves de puntos y cuadrícula (máscara que se desvanece); nunca sobrecargar.
- Voseo y jerga rioplatense cercana pero entendible por todos.
- La accesibilidad se prioriza sobre la interacción: el menú se abre por clic/Enter (el hover queda como extra) y ya no hace scroll al pasar el cursor.
- Todo lo que valga la pena debe reaccionar al hover; se aplica sin consultar.
- Producción se despliega manualmente con `create_deployment` (target production) desde la rama elegida; hoy es `diseno/accesibilidad`.
- En PC el modo inmersivo oscurece la sección del mapa, no toda la página.

**DECISIONES DESCARTADAS:**
- Neo-brutalismo con halftone (PR #1): "da trucho", demasiado cargado y cuadrado. No volver a proponerlo.
- Dar acceso o pushear al repo de la compañera: Gabi no quiere.
- Esferas opacas y brillantes en el mapa: no gustaron; se pasó a paneles de vidrio.
- Conexiones curvas que "cuelgan" en el mapa: se pasó a rectas.
- Panel de hamburguesa unido y translúcido: no gustó (queda como pendiente repensarlo).
- "← Pa'l inicio": no da. Se usó "← Volver a casa". "Conocelo/a →" se cambió por "Conocé su perfil →".
- Oscurecer toda la página al interactuar con el mapa en PC: complica el orden de capas y rompe los bordes curvos entre secciones.
- Pausar el carrusel solo con hover o foco: no cumple WCAG 2.2.2; se agregó botón de pausa.

**RESTRICCIONES:**
- No pushear a `upstream`.
- Responder y escribir en español rioplatense; textos de interfaz con voseo.
- Respetar `prefers-reduced-motion`; mantener los links a `/temas/:id` y los datos de `mapa.json`.
- Vercel: proyecto `prj_r08sECYGJbG0saUD5aDlSHHFdzen` (scope `casita3`). Cada push genera una URL de preview nueva e inmutable: solo el dominio de producción se actualiza solo al redesplegar.
- `gh pr create/close` puede estar bloqueado; usar el navegador o `gh api` con permiso.
- Vite dev: `npm run dev` (puerto 5173). Antes de commitear: `npm run build`.

**RIESGOS:**
- La producción no se actualiza sola con `git push`: hay que desplegar a mano (o conectar la rama de producción en Vercel).
- Hay dos ramas de trabajo con historiales cercanos (`diseno/header-interactivo` sin accesibilidad y `diseno/accesibilidad` con ella); los arreglos se portan con cherry-pick y pueden dar conflictos.
- Nada se probó con lector de pantalla real ni en un celular físico (solo en el navegador integrado, que frena animaciones y a veces muestra pantallas a medio animar).
- La URL del PR #1 y los previews viejos siguen publicados (los previews con login).

**SUPUESTOS:**
- Gabi quiere el aro naranja del logo también en subpáginas (no lo confirmó explícitamente).
- El año de T2 (2025) y el resto de datos de episodios vienen del sitio original y no se verificaron.

**FUENTES / ARCHIVOS CLAVE:**
- `HANDOFF.md`, `CODIGO-IA-SPEC.md` (estructura y datos), `tailwind.config.js` (tokens), `src/index.css` (variables, texturas `.tx*`, vidrio `.mapa-vidrio`, animaciones del mapa).
- Mapa: `src/components/temas/{ThemeMap,ThemeMapMovil,ThemeSection,ThemePage}.jsx`, datos en `src/data/mapa.json` y `src/servicios/mapa.js`.
- Cabecera y portada: `src/components/general/{IntroHeader,Nav,SearchBar,Carousel,AllSection,ContactForm,Footer}.jsx`, `src/components/utils/{Heartbeat,PageHeader}.jsx`, `src/App.jsx`, `src/main.jsx`.
- Textos de formulario y copyright: `src/data/proyecto.json`.
- Referencia visual del mapa: artefacto `claude.ai/artifact/QPh6W9x5jJ3MhLy17DMoBx` (conexiones en `mapa-data.js`).
- Investigación de accesibilidad: informe del agente con fuentes W3C (WCAG 2.2, guía de patrones ARIA), WebAIM, MDN y Adrian Roselli (resumido en el chat de la sesión).
- Sitio paralelo (Astro, otra línea de trabajo): repo `gabrieldelfiino-oss/codigo-ia-v3`, https://codigo-ia-v3.vercel.app/, con sus propios pendientes.

**CAMBIOS RECIENTES (18/10/2026):** ramas `diseno/mapa-3d`, `diseno/header-interactivo` y `diseno/accesibilidad` subidas al fork; producción pasó de `diseno/transiciones` a `diseno/accesibilidad`; arreglo del mapa a pantalla completa en celular; lista de temas desplegable; textos en tono rioplatense; contacto en lila y desplegable.

**PRÓXIMO PASO:** Compartir con el grupo el link de producción y el handoff; recoger feedback; decidir el panel del menú y la conexión Infancia–Chatbots; probar con NVDA o VoiceOver y en celular real.
