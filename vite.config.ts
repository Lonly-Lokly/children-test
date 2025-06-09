import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/report': {
                target: 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/report/, '/report'),
            },
            '/upload': {
                target: 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/upload/, '/upload'),
            },
        },
    },
});
