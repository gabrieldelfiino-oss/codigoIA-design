# PROJECT_STATE — Rediseño visual Código IA

_Actualizado: 17/10/2026 16:30 (Montevideo)_

**PROYECTO:** Mejora del diseño visual del sitio de Código IA (FIC, Udelar), grupo Web 1. Estructura ya terminada; solo se toca lo visual.

**OBJETIVO:** Sitio estético, divertido y fresco, pero limpio y prolijo ("no un montón"), manteniendo la identidad del manual de marca.

**ESTADO:** Pasos 1, 2 y 3 hechos y publicados. Falta el paso 4 (mapa 3D). Gabi trabaja desde su fork; no toca el repo de su compañera.

**COMPLETADO (confirmado, probado en localhost con Playwright, build OK, sin overflow horizontal en `/`, ficha, 2 temas):**
- Paso 1 — Sistema visual limpio: hero oscuro con orbes de color, tarjetas `rounded-3xl`, botones pill, sombras suaves (`shadow-suave`), acentos lima/azul/lila en texto; sin halftone, marquee ni bloques de color. Aplicado a home, ficha de programa, página de tema, buscador, modal y footer.
- Paso 2 — Transiciones entre secciones: clase `.seccion-curva` (index.css): cada sección sube sobre la anterior con borde superior curvo; aparición suave con `animation-timeline: view()` (solo si hay soporte y no hay `prefers-reduced-motion`).
- Paso 3 — Logo: aro (primeros 40 paths del SVG) naranja `var(--naranja)`, letras en `currentColor` (blanco). Menú hamburguesa (`Nav.jsx`): se abre al pasar el mouse (`onPointerEnter/Leave` solo `pointerType==='mouse'`), cierre con 250 ms de espera; clic/teclado/Esc siguen funcionando en táctil y teclado.

**EN CURSO:** nada abierto en este momento.

**PENDIENTE:**
- Paso 4 — Mapa de Temas "3D" (`src/components/temas/ThemeMap.jsx`, datos en `src/data/mapa.json` + `src/servicios/mapa.js`): fondo oscuro, esferas de color con brillo, líneas finas, profundidad/desenfoque, inspirado en la foto que pasó Gabi (red de nodos luminosos). Mantener la paleta actual. Nodos siguen enlazando a `/temas/:id`. Respetar `prefers-reduced-motion`; en móvil ya hay chips (`lg:hidden` en `ThemeSection`). Hoy sigue con nodos cuadrados y `border-2`.
- **Cambios pedidos por Gabi (17/10/2026), anotados para después, sin urgencia:**
  1. Reducir el tamaño de títulos y subtítulos (y de algunas partes de la página): que no esté tan maximizado ni repartido por toda la pantalla, que haya aire; "sigue medio grotesco".
  2. Buscador interactivo: en reposo solo la lupa; al pasar el cursor se despliega la barra con placeholder "busca algo...".
  3. Menú hamburguesa: que se abra al pasar el cursor por arriba (ya funciona con mouse; revisar). Principio general: **todo debe reaccionar al hover**; si vale la pena, aplicarlo sin consultar.
  4. Panel del menú hamburguesa: se probó una versión unida al botón y translúcida (commit 358cb2d) y a Gabi no le gustó; se dejó como estaba. PENDIENTE: volver a pensarlo (unificar botón y panel, sensación de transparencia) con otra propuesta.
  5. Slogan "El programa que te ayuda a no estar re perdido con la IA": al bajar del hero en el home, que viaje al header, centrado entre el logo y el buscador, de forma dinámica y achicándose (scroll).
- Esperando feedback de Gabi sobre pasos 2 y 3.
- Pendientes heredados del HANDOFF (no tocados): citas lorem en `citas.json`, "+20 programas" fijo (hay 16), formulario de contacto sin envío, temas cine/videojuegos/publicidad sin nodo, `PENULTIMA` y `ControlesReproduccion.jsx` sin uso.

**DECISIONES:**
- Trabajar en el fork `gabrieldelfiino-oss/codigoIA-design` (remote `origin`); `upstream` = repo de la compañera, no se le escribe.
- Ir por partes, de lo general a lo específico (pedido explícito de Gabi).
- Rama actual: `diseno/transiciones` (contiene pasos 1–3; HEAD `364b8f1`). Antes: `diseno/limpio-fresco` (solo paso 1, `a1ef723`).
- Seguir en esta sesión para pasos 2–3; el paso 4 se puede continuar en Claude Code local para ver el mapa moverse en tiempo real (hot reload).
- Restricciones del handoff: solo diseño visual; no cambiar estructura, rutas ni datos; nada de ids de temporada hardcodeados; español rioplatense.
- Paleta: azul `#2400FF`, naranja `#FF6B3B`, lima `#C4FD36`, lila `#C172FF`, noche `#1A1A30`, gris `#FAFAFA`. Tipos: Diagramm (títulos), IBM Plex Sans (cuerpo), IBM Plex Mono (etiquetas con `/`), serif itálica para citas.

**DECISIONES DESCARTADAS:**
- Neo-brutalismo + halftone (rama `diseno/neo-brutalismo-halftone`, PR #1 en el fork): Gabi lo rechazó, "da trucho", demasiado cargado y cuadrado. No volver a proponerlo.
- Dar acceso/pushear al repo de la compañera: Gabi no quiere.

**RESTRICCIONES:**
- Sandbox sin acceso a Google Fonts ni miniaturas de YouTube (esperable que fallen en pruebas locales).
- Vercel: llamar a las tools SIN `teamId` (da 403). Deploy con `create_deployment` + `gitSource {type github, org gabrieldelfiino-oss, repo codigoIA-design, ref, sha}`, target production, proyecto `prj_r08sECYGJbG0saUD5aDlSHHFdzen`. `gh pr create` falla (GraphQL bloqueado): usar `gh api repos/.../pulls`.
- Vite dev server: levantar con `run_in_background`.
- Para cada paso: `npm run build` + chequeo de overflow (360/390/768/1280) antes de commitear.

**RIESGOS:**
- Producción `codigoia-design.vercel.app` hoy apunta a la rama `diseno/transiciones` (se actualiza solo redeployando a mano).
- SSO de Vercel activo en el proyecto: puede bloquear a la compañera (se apaga en Settings → Deployment Protection).
- La animación de aparición por scroll no se puede validar con capturas de página completa; se probó con scroll real. Navegadores sin `animation-timeline` ven el contenido sin animar (aceptable).
- PR #1 abierto en el fork con la versión rechazada: conviene cerrarlo/reemplazarlo por uno de la rama nueva.

**SUPUESTOS:**
- Gabi quiere el aro del logo naranja también en subpáginas (`PageHeader`); no lo confirmó explícitamente.
- Mantener el efecto de hover-scroll de los links del menú (no pidió quitarlo).

**FUENTES / ARCHIVOS CLAVE:**
- `HANDOFF.md`, `CODIGO-IA-SPEC.md` (estructura y datos), `tailwind.config.js` (tokens, radios, sombras), `src/index.css` (variables, foco, `.seccion-curva`).
- Componentes tocados: `general/{Carousel,AllSection,AboutSection,ContactForm,Footer,Nav}.jsx`, `temas/{ThemeSection,ThemePage,CitaCard}.jsx`, `adicional/AditionalSection.jsx`, `program/ProgramPage.jsx`, `utils/{Orbes,Imagotipo,BrandTitle,PageHeader}.jsx`.
- Foto de referencia del mapa 3D: Gabi la adjuntó en el chat (red de nodos esféricos luminosos sobre fondo oscuro, "libre de derechos generado por IA"). No está guardada en el repo; si se continúa en Code, pedirla de nuevo.

**PRÓXIMO PASO:** Construir el mapa 3D (paso 4) y publicar; luego pedir feedback global y cerrar el PR #1 / abrir uno nuevo con la rama final.

