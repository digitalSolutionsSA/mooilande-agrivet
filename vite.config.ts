import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // The project lives on a network share, where native file watching crashes; poll instead
    watch: { usePolling: true, interval: 300 },
  },
})
