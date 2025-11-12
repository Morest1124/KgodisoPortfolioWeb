// Lightweight shim for the non-existent '@tailwindcss/vite' specifier.
// Vercel builds in some environments tried to import '@tailwindcss/vite'.
// This shim provides a harmless Vite plugin so the import succeeds and
// does not change any styling behavior (Tailwind is still handled by PostCSS).

export default function tailwindViteShim() {
  return {
    name: 'tailwind-vite-shim',
    // no-op hooks; this plugin intentionally does nothing
  };
}
