import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@features': path.resolve(__dirname, './src/components/features'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@types': path.resolve(__dirname, './src/types'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@stores': path.resolve(__dirname, './src/stores'),
    },
  },
})
