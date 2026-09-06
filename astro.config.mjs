import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://helvorxy.com",
  output: "static",
  integrations: [sitemap()],
});
