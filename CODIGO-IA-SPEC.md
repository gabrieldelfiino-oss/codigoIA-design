# Código IA — Especificación del sitio web

> Documento para que una IA (o un dev) pueda entender y reconstruir el sitio. Describe el estado **real actual del código**: qué hay montado, cómo se conectan los datos y qué cosas siguen pendientes o provisorias.

---

## 1. Resumen del proyecto

Sitio web tipo blog/catálogo para **Código IA**, un programa de streaming/divulgación transmedia de la **Facultad de Información y Comunicación (FIC) de la Udelar** (Uruguay) sobre Inteligencia Artificial. Los episodios están en YouTube; el sitio los organiza por temporada y por tema, los muestra con miniaturas/embeds y ofrece una ficha por programa, una página por tema y un modal por invitado.

- **Idioma:** español rioplatense (voseo: "Empezá", "contás", "Abrí").
- **Tono:** joven, directo, algo irreverente ("re perdido con la IA", "preguntas incómodas").
- **SPA** con una Home y tres vistas de detalle: ficha de programa (`/programa/:id`), página de tema (`/temas/:id`) y un modal de persona (sin ruta propia).
- **Sin backend.** Todo el contenido sale de JSON locales normalizados en `src/data`.

## 2. Stack técnico

| Pieza | Tecnología |
|---|---|
| Framework | React 18.3 (JSX) |
| Bundler | Vite 6 + `@vitejs/plugin-react` |
| Estilos | Tailwind CSS 3.4 + PostCSS/Autoprefixer + utilidades custom en `src/index.css` |
| Animación | `framer-motion` 11 (más SVG `<animate>` en el mapa de temas) |
| Routing | **Router casero** (`src/servicios/router.js`), sin react-router |
| Datos | JSON relacionales en `src/data/` (importados estáticamente) |
| Video | Miniaturas `img.youtube.com/vi/{id}/{calidad}.jpg` y embeds `youtube.com/embed/{id}` |
| Scripts | `npm run dev`, `npm run build`, `npm run preview` |

`index.html`: `lang="es"`, título "Código.IA", favicon `/favicon.svg` (isotipo oscuro `#1A1A30` sobre fondo transparente), `<body class="bg-noche">`, carga IBM Plex Mono desde Google Fonts (las demás fuentes son locales).

## 3. Estructura de archivos

```
index.html · tailwind.config.js · postcss.config.js · vite.config.js
public/favicon.svg
src/
  main.jsx                  # monta <App/> en #root (StrictMode) e importa index.css
  App.jsx                   # elige entre Home, ProgramPage y ThemePage según la URL
  index.css                 # @font-face, variables CSS, utilidades de motivos (grid/checker)
  data/                     # ver §5
    programas.json · temporadas.json · temas.json · programa_tema.json
    personas.json · participacion.json · recursos.json · citas.json
    proyecto.json · mapa.json
  servicios/                # toda la lógica JS (sin JSX): acceso a datos, router, búsqueda
    router.js               # useRoute() + navigate()
    programas.js            # TEMPORADAS, getTemporada, getProgramas*, getRecursos, getBajada
    temas.js                # TEMAS, getTema, getProgramasDeTema, getTemasDePrograma
    mapa.js                 # CENTRO, NODOS, ARISTAS (con path SVG), getVecinos
    personas.js             # getParticipantes, getInvitados, getProgramasDePersona
    citas.js                # getCitasDeTema, formatTiempo, iniciales
    buscar.js               # buscar(consulta) sobre temas, programas e invitados
    texto.js                # partirInline, quitarMarcas, formatFecha
    youtube.js              # getYoutubeId / Thumbnail / EmbedUrl
  utils/
    Logos/{PNG,SVG}/        # logos oficiales
    Tipografías/            # fuentes originales (Diagramm, IBM Plex Sans)
  assets/fonts/             # TTF usados por @font-face
  components/
    general/    IntroHeader, Nav, SearchBar, Carousel, AllSection, AboutSection, ContactForm, Footer
    adicional/  AditionalSection
    temas/      ThemeSection, ThemeMap, ThemePage, CitaCard
    program/    ProgramPage
    personas/   PersonasPage (modal)
    utils/      BrandTitle, Imagotipo, Isotipo, Heartbeat, Spin, PersonBadge, RouterLink,
                PageHeader, Texto, VideoFlotante, ControlesReproduccion
```

## 4. Sistema de diseño

### 4.1 Paleta (Tailwind `colors`)
| Token | Hex | Uso |
|---|---|---|
| `azul` | `#2400FF` | Contacto, grillas, botón "Reproducir", acentos |
| `naranja` | `#FF6B3B` | Números de episodio, acentos |
| `lima` | `#C4FD36` | Acento principal: CTAs, tags, líneas del mapa, hover |
| `lila` | `#C172FF` | Nodos de tema del mapa, avatares |
| `noche` | `#1A1A30` | Fondo base oscuro / texto sobre claros |
| `gris` | `#FAFAFA` | Texto sobre oscuros / fondo "Sobre el proyecto" |

Alias legacy: `verde`=lima, `violeta`=lila, `negro`=noche, `blanco`=gris, `azul-oscuro`=noche. Selección de texto: fondo lima, texto noche.

### 4.2 Tipografías
- **Títulos (`font-display`):** *Diagramm*, `letter-spacing: -0.02em`.
- **Cuerpo (`font-sans`):** *IBM Plex Sans*.
- **Etiquetas/botones (`font-mono`):** *IBM Plex Mono*, **MAYÚSCULAS**, `tracking-wider/widest`, `text-xs`. Las etiquetas de sección llevan prefijo `/` (`/Temporada 3`, `/Citas destacadas sobre Arte`).
- **Citas:** `font-serif` itálica.

### 4.3 Motivos gráficos
- **Esquinas rectas:** `borderRadius` en 0 salvo `full`. Excepciones puntuales con valores arbitrarios (`rounded-[22px]`) en el menú desplegable.
- **Bordes de 2px** en botones, tags y tarjetas.
- **Sombras duras offset** sin blur (`shadow-[6px_6px_0_0_#1A1A30]`); sobre fondo oscuro se usan en lima translúcido.
- **Grillas finas (48×48px):** `bg-grid-azul`, `bg-grid-noche`, `bg-grid-gris`, `bg-grid-naranja`. Checker (`bg-checker-*`) definido, sin uso.
- **Logo:** `Isotipo` e `Imagotipo` son SVG inline (con `?raw`, `fill="white"` → `currentColor`), se colorean con `text-*`.

### 4.4 Patrones de UI repetidos
- **Botón outline:** `border-2 border-gris` + mono uppercase; hover → `border-lima bg-lima text-noche`.
- **Tag de sección:** bloque con texto mono uppercase `/Nombre`.
- **Desplegable** (`<details>`): línea superior/inferior de 2px y botón cuadrado lima con "+" dibujado con pseudo-elementos que pasa a "−" al abrir (usado en `AboutSection`, `AllSection` y `ProgramPage`).
- **Contenedores:** `mx-auto max-w-7xl`, padding `px-6 sm:px-10`.

## 5. Modelo de datos (`src/data/`)

Datos **normalizados**: las relaciones van en tablas aparte y se unen con los helpers de `servicios/`.

| Archivo | Contenido | Registros |
|---|---|---|
| `programas.json` | Un programa: `id` (slug), `temporadaId`, `titulo`, `subtitulo`, `pregunta`, `resumen`, `descripcion`, `linkYoutube`, `linkInstagram`, `fechaPublicacion`, `duracion`, `formato`, `destacado`, `imagen` | 16 |
| `temporadas.json` | `id`, `titulo`, `subtitulo`, `descripcion`, `orden`, `color` | 4 |
| `temas.json` | Temas y subtemas: `id`, `nombre`, `descripcion`, `color`, `orden`, `tipo` (`tema`/`subtema`), `mapa` `{x,y}` en % (opcional) | 22 |
| `programa_tema.json` | Relación muchos-a-muchos `{programaId, temaId}` | 41 |
| `personas.json` | `id`, `nombre`, `profesion`, `biografia`, `institucion`, `actividadActual`, `relacionIA`, `foto`, `links` `{instagram,linkedin,web}` | 28 |
| `participacion.json` | `{programaId, personaId, rol}` con `rol` = `invitado` o `conduccion` | 28 |
| `recursos.json` | `{id, programaId, tipo, titulo, url, plataforma, orden}` (youtube, drive, unir-radio) | 22 |
| `citas.json` | `{id, programaId, personaId, texto, inicio}` (`inicio` en segundos) — **provisorias** | 16 |
| `proyecto.json` | Textos institucionales, redes, campos del contacto, copyright | — |
| `mapa.json` | `centro` (IA) y `aristas` `{de, a, control:[x,y]}` entre nodos | 18 aristas |

**Temporadas** (ordenadas por `orden`): `t1` Código IA 2023 · `radio` Código IA Radio · `t2` Temporada 2 · `t3` Temporada 3 (la última). 4 programas por temporada.

**Temas del mapa:** 8 temas (Infancia, Educación, Chatbots, Música, Arte, Amor, Salud mental, Fraudes digitales) y 11 subtemas con coordenadas. Existen además `cine`, `videojuegos` y `publicidad` como `tipo: "tema"` sin `mapa`: tienen programas pero no aparecen en el mapa.

### Helpers
- `servicios/programas.js`:
  - `TEMPORADAS = { ULTIMA, PENULTIMA }`: ids calculados desde el final de `temporadas.json` (por `orden`). Las demás temporadas (Radio, 2023) no tienen clave; se piden por id (`"radio"`, `"t1"`).
  - `getTemporada(id)`, `getTemporadasRecientesPrimero()`, `getProgramasPorTemporada(id)`, `getProgramas()`, `getProgramaPorId(id)`, `getRecursos(programaId)`, `getBajada(programa)` (subtítulo → pregunta → resumen sin marcas).
- `servicios/temas.js`: `TEMAS`, `getTema`, `getProgramasDeTema`, `getTemasDePrograma`.
- `servicios/mapa.js`: `CENTRO`, `NODOS`, `ARISTAS` (IA→cada tema + `mapa.json`, con `d` de SVG), `getVecinos(id)`.
- `servicios/personas.js`: `getParticipantes(programaId)` (con `rol`), `getInvitados()`, `getProgramasDePersona(id)`.
- `servicios/citas.js`: `getCitasDeTema(temaId)` (citas de los programas que tocan el tema), `formatTiempo(seg)`, `iniciales(nombre)`.
- `servicios/buscar.js`: `buscar(consulta, limite=8)`, sin distinguir mayúsculas ni tildes, mínimo 2 letras, sobre temas, programas (título, subtítulo, pregunta) e invitados.
- `servicios/texto.js`: `partirInline` (**negrita**, *cursiva*, links), `quitarMarcas`, `formatFecha`.

## 6. Routing y estructura de página

### Router casero
- `useRoute()` devuelve `window.location.pathname` y escucha `popstate`.
- `navigate(path)` hace `pushState`, dispara `PopStateEvent` y `scrollTo(0,0)`.
- `RouterLink`: `<a href>` real; en click normal llama a `navigate`; con ctrl/cmd/shift abre normal. Acepta `onClick` y el resto de props.
- Rutas (`App.jsx`): `/programa/:id` → `ProgramPage`; `/temas/:id` → `ThemePage`; cualquier otra → Home. Los ids son slugs (`decodeURIComponent`). En producción hace falta un rewrite a `index.html` (Vercel) para entrar directo a una ruta.

### Orden de secciones del Home
Dentro de `<main className="pt-20 sm:pt-24">`:
1. `IntroHeader` (fixed, fuera de `<main>`) — con `SearchBar` y `Nav`
2. `SeasonCarousel` — id `carrusel`
3. `ThemeSection` — id `temas`
4. `AditionalSection` — id `cuarta-temporada` (muestra la última temporada)
5. `AllSection` — id `todos-los-programas`
6. `AboutSection` — id `sobre-el-proyecto`
7. `ContactForm` — id `contacto`
8. `Footer`

Todo aparece **solo después** de terminar la intro. No quedan secciones comentadas ni componentes sin montar en la Home.

---

## 7. Secciones en detalle

### 7.1 Intro animada + Header fijo (`IntroHeader`, `BrandTitle`)
- Al cargar, pantalla completa `bg-noche` con grilla azul y el imagotipo grande centrado (lima). Tras **2200 ms** se encoge y viaja al header (`layoutId="brand"` de Framer Motion) y recién ahí se monta el resto.
- **Header fijo:** `fixed top-0 z-50 bg-noche`; imagotipo chico a la izquierda y, a la derecha, `SearchBar` + `Nav` (fade-in 0.5s, delay 0.3s).
- **Una sola vez por carga:** la variable de módulo `introYaVista` (en `App.jsx`) evita repetirla al volver desde otra página.

### 7.2 Buscador (`SearchBar`)
- Combobox en el header: ícono de lupa, campo mono uppercase (`w-28` móvil / `sm:w-64`), borde que pasa a lima en foco.
- Resultados (desplegable `w-80`) con etiqueta `/Tema`, `/Programa` o `/Invitado`, vía `buscar()`. Un invitado lleva a la ficha de su primer programa.
- Teclado: ↑↓ para moverse, Enter abre (el primero si no hay selección), Esc cierra; se cierra al tocar fuera. Sin coincidencias: "Sin resultados para «…»".

### 7.3 Menú (`Nav`)
- **Botón hamburguesa** (2 líneas de 2px → X al abrir). Abre un **panel chico** bajo el botón, pegado a la derecha (`w-64`, translúcido con desenfoque, esquinas redondeadas), con animación de escala/opacidad.
- **Links** (un tab por sección, en orden de página): Temas (`#temas`) · Última temporada (`#cuarta-temporada`) · Todos los programas (`#todos-los-programas`) · Sobre el proyecto (`#sobre-el-proyecto`) · Contacto (`#contacto`).
- **Interacción:** al pasar el cursor (o enfocar con teclado) por un link, tras 140 ms la página hace **scroll suave** a esa sección (queda bajo el header de 72px) y el link se resalta en lima con "↓". Clic: va a la sección y cierra el panel. Esc o clic fuera: cierra. Con `prefers-reduced-motion` el scroll es directo.
- Solo existe en la Home; las fichas y páginas de tema muestran solo el isotipo.

### 7.4 Carousel (`Carousel.jsx`, export `SeasonCarousel`) — id `carrusel`
- Alto `70vh` móvil / `85vh` desktop (mín. 420px). Slides: `[hero, ...episodios de TEMPORADAS.ULTIMA]` → 1 + 4 = 5.
- **Auto-avance:** 10 s en el hero, 6 s en episodios, en loop; los puntos permiten saltar. Transición `AnimatePresence mode="wait"` (opacity + scale, 0.9s).
- **Slide hero:** fondo `bg-noche bg-grid-azul`, dos `Isotipo` girando (`Spin`), h2 "El programa que te ayuda a no estar **re perdido** con la IA" (con `Heartbeat`), badges `/ Un programa de FIC · Udelar` y `+20 programas`, y CTA "Ver programas" al canal de YouTube.
- **Slides de episodio:** miniatura `maxresdefault` a pantalla completa con degradé, `titulo`, bajada (`getBajada`) y botón "Ver en YouTube".

### 7.5 Temas (`ThemeSection` + `ThemeMap`) — id `temas`
- **Sección sobre fondo blanco** (`bg-white`): tag `/Mapa de temas`, h2 "Todo se conecta con la **IA**" y una bajada. El mapa se muestra **solo en pantallas `lg` o más grandes** (en móvil la sección no ofrece acceso a los temas: pendiente).
- **Mapa (`ThemeMap`):** panel oscuro `bg-noche` con borde, proporción 1200×720.
  - Núcleo **IA** central (círculo lima con aro blanco y brillo); nodos de **tema** (lila, mayúsculas) y **subtema** (contorno, sin relleno) posicionados en % según `temas.json`.
  - **Aristas:** SVG con curvas cuadráticas (puntos de control de `mapa.json`; IA→tema rectas). Al pasar el cursor o enfocar un nodo, se encienden en **lima con trazo punteado animado** (`<animate stroke-dashoffset>`) el camino IA → tema → subtema y los vecinos (`getVecinos`); el resto se atenúa. Respeta `prefers-reduced-motion`.
  - Cada nodo es un `RouterLink` a `/temas/:id`.

### 7.6 Última temporada (`AditionalSection`) — id `cuarta-temporada`
- Fondo `bg-white`. Texto tomado de los datos de la temporada `TEMPORADAS.ULTIMA`.
- **Columna izquierda (sticky en desktop):** tag `/{título de la temporada}`, h2 con el `subtitulo` de la temporada ("¿Qué ocurre cuando la IA se mete en tu vida privada?"), la `descripcion` (con `Texto`) y el link "Ver todos →" a `#todos-los-programas`.
- **Columna derecha:** grilla de 2 columnas con una tarjeta por episodio: cuadrado de número (01–04) en color de la paleta (naranja, lila, lima, azul), título del programa en mono, la `pregunta` como título grande, el `resumen` y "VER PROGRAMA →". Toda la tarjeta lleva a `/programa/:id`; borde oscuro y sombra dura que crece en hover.

### 7.7 Todos los programas (`AllSection`) — id `todos-los-programas`
- Fondo `bg-noche`. Tag `/Temporadas`, h2 "Todos los programas", bajada y título `/Explorador de temporadas`.
- **Un acordeón por temporada**, de la más nueva a la más vieja (`getTemporadasRecientesPrimero`), con la más reciente abierta. Cada acordeón: tira lateral de color de acento (lima, lila, naranja, azul), título en mayúsculas, contador "N EPs" y flecha.
- Dentro, **una fila por programa** con su título (hover lima) y una flecha; lleva a `/programa/:id`. Sin numeración, subtítulo de temporada ni nombres de invitados.

### 7.8 Página de tema (`ThemePage`) — ruta `/temas/:id`
- Fondo `bg-noche`, `PageHeader` sin botón volver (solo isotipo a `/`).
- **Título** y descripción del tema.
- **/Citas destacadas sobre {tema}** (si hay): grilla de dos columnas de `CitaCard` (avatar con iniciales, nombre, profesión, botón **"▶ Reproducir mm:ss"**, la cita en serif itálica y pie `Temporada · Programa`). Al reproducir se abre un `VideoFlotante` abajo a la derecha, **solo el video** con una ✕ para cerrarlo (también con Esc), que arranca en el segundo de la cita (`?start=…&autoplay=1`).
- **/Programas que tocan este tema · N:** tarjetas con etiqueta de temporada, fecha, miniatura con play (link a la ficha), título, bajada y botones "Ver ficha completa" y "▶ Ver en YouTube".
- `ControlesReproduccion` (−15 / play / +15, tiempo, velocidad, ficha) existe como componente presentacional pero **no está montado**.

### 7.9 Ficha de programa (`ProgramPage`) — ruta `/programa/:id`
- Página aparte (sin intro, menú ni footer): `bg-noche`; `PageHeader` sin botón volver.
- **Título:** etiqueta `/Programa NN · {temporada}`, h1 en mayúsculas con la última palabra en lima, pregunta, subtítulo y recuadro con fecha y duración si existen.
- **Contenido (grilla 9 + 3 columnas):**
  - **Izquierda:** el **video grande** (embed, con sombra lima suave), el `resumen` en tamaño grande y desplegables: "Sobre la entrevista" (`descripcion`), "Más material" (recursos embebibles, cerrado) y un bloque simple "Tema/Temas" con etiquetas que llevan a `/temas/:id`.
  - **Derecha:** `/Invitados` — tarjetas con **iniciales** (sin foto) que abren el modal `PersonasPage`; y `/Conducción` con `PersonBadge`.
- Sin "Dónde verlo", sin biografías en la ficha (van en el modal) y sin "Más Código.IA".
- Id inexistente: `/No encontrado` con botón "Volver al inicio".

### 7.10 Modal de persona (`PersonasPage`)
- Se abre desde las tarjetas de invitados de la ficha. Panel translúcido con desenfoque sobre un velo oscuro; se cierra con la ✕, Esc o clic fuera; bloquea el scroll de fondo.
- Contenido: foto (o iniciales), nombre, profesión, institución, actividad actual, "Relación con la IA", biografía completa, links (Instagram, LinkedIn, sitio web) y lista de programas en los que participó (cada uno con link a su ficha). Los campos vacíos no se muestran.

### 7.11 Sobre el proyecto (`AboutSection`) — id `sobre-el-proyecto`
- Fondo `bg-gris`. Acordeón nativo (`<details>`): título "Sobre el proyecto" con el botón cuadrado lima "+/−". Cerrado por defecto; al abrir muestra `sobre.proyecto` y `sobre.efi` de `proyecto.json`.

### 7.12 Contacto (`ContactForm`) — id `contacto`
- Fondo `bg-azul`, `max-w-2xl`. Los campos salen de `proyecto.json` (`contacto.campos`): nombre, correo, asunto y mensaje (opcional, textarea). Botón "Enviar" lima.
- ⚠️ **Solo UI:** `handleSubmit` hace `preventDefault()` con un `TODO` para conectar un servicio (EmailJS, Formspree o backend). Sin validación ni mensaje de éxito.

### 7.13 Footer (`Footer`)
- Fondo `bg-noche`: imagotipo, links `/YouTube` y `/Instagram` y el copyright, todo desde `proyecto.json` ("Copyright © 2025").

---

## 8. Observaciones y pendientes conocidos

1. **Citas provisorias:** `citas.json` tiene texto de relleno (lorem ipsum) y minutos inventados; hay que reemplazarlos por las citas reales.
2. **Mapa solo en escritorio:** por debajo de `lg` no hay forma de llegar a los temas desde la Home (se quitó la lista de nodos).
3. **Temas sin nodo en el mapa:** `cine`, `videojuegos` y `publicidad`; por eso no se llega desde el mapa a, por ejemplo, Diego Parker ni Álvaro Moré.
4. **Asignación programa→tema:** la de los nodos nuevos (Música, Amor, etc.) es criterio provisorio; revisar `programa_tema.json`.
5. **"+20 programas"** del carrusel es un texto fijo; hay 16 programas.
6. **`PENULTIMA`** en `TEMPORADAS` no se usa en ningún componente.
7. **`ControlesReproduccion`** existe sin montar.
8. **`App.jsx`** conserva un efecto que hace scroll al `hash` de la URL; casi no se usa desde que `ThemePage` no enlaza a `/#temas`.
9. **Formulario de contacto** sin envío real.
10. **Fotos de personas:** el campo `foto` existe y se usa en el modal; en las tarjetas de la ficha se muestran iniciales a propósito.
11. **Sin rewrite en el hosting:** para abrir `/programa/...` o `/temas/...` directo hace falta configurar el redirect a `index.html`.
12. La carpeta incluye `.backup-pre-identidad.tgz` (respaldo previo al rediseño de identidad).

## 9. Guía rápida para reconstruir

1. `npm create vite` (React) + `tailwindcss@3`, `postcss`, `autoprefixer`, `framer-motion`.
2. Tokens en `tailwind.config.js` (§4.1–4.2), `borderRadius` en 0 y utilidades `bg-grid-*` en `index.css`.
3. Fuentes: `@font-face` Diagramm + IBM Plex Sans locales, IBM Plex Mono vía Google Fonts.
4. Crear los JSON de §5 y los helpers de `servicios/`.
5. Router casero + `RouterLink`.
6. Construir en este orden: logos SVG inline → IntroHeader/BrandTitle/Nav/SearchBar → Carousel → ThemeSection/ThemeMap → AditionalSection → AllSection → About → Contact → Footer → ProgramPage → ThemePage (+ CitaCard, VideoFlotante) → PersonasPage.
7. Respetar: esquinas rectas (salvo las excepciones de §4.3), bordes de 2px, sombras duras, etiquetas mono con `/`, intro de ~2.2s antes de montar el resto.
