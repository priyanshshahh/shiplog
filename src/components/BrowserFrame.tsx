export function BrowserFrame({
  src,
  alt,
  url,
  className,
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-t-xl border border-b-0 border-border bg-panel ${className ?? ""}`}>
      <div className="flex items-center gap-3 border-b border-border bg-background/60 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {url && (
          <span className="truncate font-term text-[10px] text-muted">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}
