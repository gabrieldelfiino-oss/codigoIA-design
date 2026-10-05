/**
 * Tabs para elegir qué entrevista de Código IA Radio se muestra en RadioSection.
 * Acento violeta.
 */
export default function RadioTabs({ items, activeId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={[
              'border-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors sm:text-sm',
              isActive
                ? 'border-noche bg-noche font-medium text-lila'
                : 'border-noche text-noche hover:bg-noche/10',
            ].join(' ')}
          >
            {item.titulo}
          </button>
        )
      })}
    </div>
  )
}
