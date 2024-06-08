import react from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        transformer: "lightningcss",
        lightningcss: {
            targets: browserslistToTargets(browserslist("last 2 years")),
        },
    },
    build: {
        cssMinify: "lightningcss",
    },
    plugins: [react()],
});
