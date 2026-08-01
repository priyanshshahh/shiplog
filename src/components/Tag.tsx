export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-term text-[11px] tracking-wide text-accent/90 border border-accent-dim bg-accent-dim/10 rounded-full px-2.5 py-1 whitespace-nowrap">
      {children}
    </span>
  );
}
