export function loadAnalytics() {
  if ((window as any)._ffAnalyticsLoaded) return;
  (window as any)._ffAnalyticsLoaded = true;

  // Microsoft Clarity
  (function(c: any, l: any, a: string, r: string, i: string, t?: any, y?: any){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "w3sxusm4n2");

  // Plausible Analytics
  const s = document.createElement('script');
  s.defer = true;
  s.dataset.domain = 'formfix.pages.dev';
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
}
