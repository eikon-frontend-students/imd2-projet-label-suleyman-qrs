# Deploy Checklist

- Navigation paths  
  - Click logo + Artists links from `/index.html`, `/artists/index.html`, and `/artists/ya-tseen.html` to confirm no nested `/artists/artists` paths.
- Media loading  
  - Hero video shows poster image first; iframe hides poster on load.  
  - Ya Tseen audio (`audio/iseeyou.mp3`) plays on click/tap of the shape text.
- Responsive sanity  
  - 400px mobile: hero title above CTA links; nav works; cards stack.  
  - ~768px tablet: grids at 1–2 columns; nav spacing OK.  
  - Desktop: marquee headers scroll; hover states show pink.
- Assets  
  - Below-the-fold images use `loading="lazy"` and load correctly.  
  - Dist folder keeps `artists/` subfolder with css/js/img/audio copies.
