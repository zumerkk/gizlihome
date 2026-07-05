export default function ProductsLoading() {
  return (
    <section className="bg-cream py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden rounded-md border border-obsidian/10 bg-white p-5 lg:block">
          <div className="h-9 animate-pulse rounded-md bg-obsidian/10" />
          <div className="mt-6 grid gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-11 animate-pulse rounded-md bg-stone" />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-5 h-12 animate-pulse rounded-md bg-white" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-md border border-obsidian/10 bg-white p-4">
                <div className="aspect-[4/4.5] animate-pulse rounded-md bg-stone" />
                <div className="mt-5 h-8 animate-pulse rounded-md bg-obsidian/10" />
                <div className="mt-3 h-4 animate-pulse rounded-full bg-obsidian/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
