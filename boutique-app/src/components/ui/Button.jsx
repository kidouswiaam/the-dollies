import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5',
  ghost: 'border border-accent hover:border-primary hover:text-primary',
  danger: 'bg-red-400 text-white hover:bg-red-500',
  outline: 'border border-dark/30 text-dark',
}

export default function Button({ children, variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
