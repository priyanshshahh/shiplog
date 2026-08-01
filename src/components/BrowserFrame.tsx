import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
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
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}
