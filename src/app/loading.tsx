export default function Loading() {
  return (
    <div className="min-h-screen bg-cream py-24">
      <div className="site-container">
        <div className="h-5 w-40 animate-pulse rounded-full bg-bronze/25" />
        <div className="mt-6 h-16 max-w-2xl animate-pulse rounded-md bg-obsidian/10" />
        <div className="mt-5 h-5 max-w-xl animate-pulse rounded-full bg-obsidian/10" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-md border border-obsidian/10 bg-white p-4"
            >
              <div className="aspect-[4/4.5] animate-pulse rounded-md bg-stone" />
              <div className="mt-5 h-7 animate-pulse rounded-md bg-obsidian/10" />
              <div className="mt-3 h-4 animate-pulse rounded-full bg-obsidian/10" />
              <div className="mt-6 h-11 animate-pulse rounded-md bg-bronze/25" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
