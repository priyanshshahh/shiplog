export function ThemeScript() {
  const code =
    "(function(){try{var t=localStorage.getItem('shiplog-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var n=t||(d?'dark':'light');document.documentElement.classList.toggle('dark',n==='dark');document.documentElement.style.colorScheme=n;}catch(e){}})();";
  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
