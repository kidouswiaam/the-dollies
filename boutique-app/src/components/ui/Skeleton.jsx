export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-stone-200 dark:bg-stone-700 rounded-lg ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  )
}
