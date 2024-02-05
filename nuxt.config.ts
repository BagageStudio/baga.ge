import glsl from "vite-plugin-glsl";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/image", "nuxt-calendly"],
    app: {
        head: {
            title: "Bagage — Creative development studio",
            htmlAttrs: {
                lang: "en",
            },
            meta: [
                {
                    charset: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0",
                },
                {
                    property: "og:site_name",
                    content: "Bagage",
                },
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    property: "og:image:width",
                    content: "1200",
                },
                {
                    property: "og:image:height",
                    content: "630",
                },
                {
                    property: "twitter:card",
                    content: "summary_large_image",
                },
                {
                    property: "twitter:site",
                    content: "BagageStudio",
                },
                {
                    property: "twitter:creator",
                    content: "BagageStudio",
                },
            ],
            link: [
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
                {
                    rel: "mask-icon",
                    href: "/safari-pinned-tab.svg",
                    color: "#f24f2b",
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
