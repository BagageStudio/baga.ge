// vite.config.js
import glsl from "vite-plugin-glsl";
import VitePluginInjectPreload from "vite-plugin-inject-preload";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        glsl(),
        VitePluginInjectPreload({
            files: [
                {
                    match: /[a-z-0-9]*.(woff2)$/,
                },
            ],
        }),
    ],
});
