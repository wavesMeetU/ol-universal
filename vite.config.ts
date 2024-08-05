import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            name: 'MyLibrary',
            fileName: (format) => `my-library.${format}.js`, // This will be overridden by the output configuration
        },
        rollupOptions: {
            external: ['ol'], // Specify external dependencies
            output: [
                {
                    format: 'es',
                    entryFileNames: 'index.es.js',
                    // dir: 'dist/es',
                    globals: {
                        ol: 'ol',
                    },
                    // sourcemap: true,
                    // preserveModules:true
                },
                {
                    format: 'cjs',
                    entryFileNames: 'index.cjs.js',
                    // dir: 'dist/cjs',
                    globals: {
                        ol: 'ol',
                    },
                    // sourcemap: true,
                    // preserveModules:true
                },
            ],
        },
    },
    server: {
        port: 3000,
        open: true,
        watch: {
            usePolling: true,
        },
    },
});
