import glsl from "vite-plugin-glsl";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        head: {
            meta: [
                {
                    charset: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0",
                },
            ],
            link: [
                {
                    rel: "icon",
                    href: "/favicon.ico",
                    sizes: "any",
                },
                {
                    rel: "icon",
                    href: "/icon.svg",
                    type: "image/svg+xml",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/apple-touch-icon.png",
                },
                {
                    rel: "manifest",
                    href: "/manifest.webmanifest",
                },
            ],
        },
    },
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
