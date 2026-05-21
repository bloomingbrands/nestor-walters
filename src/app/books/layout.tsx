export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 pt-14 text-zinc-100 md:pt-16">
      {children}
    </div>
  );
}
