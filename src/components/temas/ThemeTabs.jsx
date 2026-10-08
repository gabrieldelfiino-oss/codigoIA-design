/**
 * Tabs para elegir qué temática se muestra en ThemeSection.
 * Mismo patrón que RadioTabs, acento naranja.
 */
export default function ThemeTabs({ items, activeId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={[
              "border-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors sm:text-sm",
              isActive
                ? "border-noche bg-noche font-medium text-lima"
                : "border-noche text-noche hover:bg-noche/10",
            ].join(" ")}
          >
            {item.nombre}
          </button>
        );
      })}
    </div>
  );
}
