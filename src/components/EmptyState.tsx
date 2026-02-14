'use client'

interface EmptyStateProps {
  onAddClick: () => void
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-violet-950 mb-2 font-display">No designs validated yet</h3>
      <p className="text-violet-700/70 mb-6 max-w-md">
        Start by adding your first design specification to check against WCAG standards and mobile constraints.
      </p>
      <button
        onClick={onAddClick}
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-2xl px-6 py-3 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
      >
        Add your first design
      </button>
    </div>
  )
}