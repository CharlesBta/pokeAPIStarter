import { defineConfig } from "vite";

export default defineConfig({
  css: {
    lightningcss: {
      // normalize.css contient d'anciens hacks IE (*zoom, *display),
      // syntaxe invalide que LightningCSS refuse : on les ignore au minify.
      errorRecovery: true,
    },
  },
});
