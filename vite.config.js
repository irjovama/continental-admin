import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: port
  }
})
