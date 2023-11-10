import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   loader: "jsx",
  // },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     loader: {
  //       ".js": "jsx",
  //     },
  //   },
  // },
  plugins: [vue(), react()],
});
