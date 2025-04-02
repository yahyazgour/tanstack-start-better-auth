import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    //preset: "vercel",
    preset: "netlify",
    //preset: "cloudflare-pages",
    //unenv: cloudflare,
  },
  tsr: {
    appDirectory: "src",
    routeFileIgnorePrefix: "-",
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
