import glsl from "vite-plugin-glsl";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["@/assets/scss/main.scss"],
    build: {
        transpile: ["gsap", "ogl"],
    },
    vite: {
        plugins: [glsl()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "sass:math";@import "@/assets/scss/base/_variables.scss";',
                },
            },
        },
    },
});
