import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), viteTsconfigPaths({ parseNative: false })],
    server: {    
        open: true,
        port: 3000, 
    },
})
