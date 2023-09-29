import glsl from "vite-plugin-glsl";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
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
                    property: "og:title",
                    content: "Bagage — Creative development studio",
                },
                {
                    property: "og:site_name",
                    content: "Bagage",
                },
                {
                    property: "og:url",
                    content: "https://baga.ge/",
                },
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    name: "image",
                    property: "og:image",
                    content: "https://baga.ge/bagage.jpg",
                },
                {
                    name: "image",
                    property: "og:image:secure_url",
                    content: "https://baga.ge/bagage.jpg",
                },
                {
                    property: "og:image:width",
                    content: "1200",
                },
                {
                    property: "og:image:height",
                    content: "627",
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
                {
                    property: "og:description",
                    content:
                        "Bagage is a small creative development studio that assists projects both technically and visually.",
                },
                {
                    name: "description",
                    content:
                        "Bagage is a small creative development studio that assists projects both technically and visually.",
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
