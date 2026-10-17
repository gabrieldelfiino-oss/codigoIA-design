/**
 * Fondo decorativo suave para los héroes oscuros: tres manchas de color
 * desenfocadas (lila, azul y naranja de la paleta). Es solo adorno.
 */
export default function Orbes({ className = "" }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -right-24 -top-32 h-[440px] w-[440px] rounded-full bg-lila/35 blur-3xl" />
      <div className="absolute -left-40 top-1/3 h-[380px] w-[380px] rounded-full bg-azul/45 blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 h-[320px] w-[320px] rounded-full bg-naranja/20 blur-3xl" />
    </div>
  );
}
