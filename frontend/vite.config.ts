import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fullReload from "vite-plugin-full-reload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// add the beginning of your app entry

export default defineConfig({
  // Base public path when served in development or production
  base: "/static/",

  // Define entry points for your application
  build: {
    // Output directory for built files
    outDir: "../static/assets",

    // Generate manifest.json for django-vite integration
    manifest: true,

    // Clear the output directory before building
    emptyOutDir: true,

    // Configure rollup options
    rollupOptions: {
      // Define entry points - adjust these based on your needs
      input: {
        main: resolve(__dirname, "src/main.ts"),
        // Add more entry points as needed
        // styles: resolve(__dirname, 'src/style.css'),
      },

      // Configure output
      output: {
        // Ensure CSS is extracted to separate files
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") ?? [];
          const extType = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name ?? "")) {
            return `css/[name]-[hash][extname]`;
          }
          if (
            /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name ?? "")
          ) {
            return `images/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        },

        // Configure chunk file names
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },

    // Generate source maps for debugging
    sourcemap: true,
  },

  // Development server configuration
  server: {
    // Development server port
    port: 5173,

    // Enable hot module replacement
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5174,
    },

    // Configure CORS for Django integration
    cors: true,
  },

  // Define aliases for easier imports
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Add any SCSS global imports here if needed
        // additionalData: `@import "@/styles/variables.scss";`
      },
    },
  },

  // Configure plugins
  plugins: [
    // Add the full reload plugin for template changes
    fullReload(
      ["../backend/templates/**/.html", "../backend/**/templates/**/*.html"],
      {
        delay: 200,
        always: true,
      }
    ),
  ],

  // Optimize dependencies
  optimizeDeps: {
    include: ["alpinejs", "bootstrap", "htmx.org"],
  },
});
