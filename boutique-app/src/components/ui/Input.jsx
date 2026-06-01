export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">{label}</span>}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </label>
  )
}
