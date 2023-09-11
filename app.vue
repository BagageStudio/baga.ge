<template>
    <div id="app">
        <div class="wrapper-animation" id="c"></div>
        <NuxtPage />
    </div>
</template>

<script setup>
import WebGL from "~/assets/js/WebGL";
import { CreateScroll } from "~/assets/js/scroll";

const nuxtApp = useNuxtApp();

if (process.client) {
    const lenis = CreateScroll();

    // nuxtApp.$router.afterEach((to, from) => {
    //     if (to.path !== from.path) {
    //         window.scrollTo(0, 0);
    //     }
    // });
}

useHead({
    title: "Bagage — Creative development studio",
    meta: [
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
            property: "og:image",
            content: "https://baga.ge/bagage.jpg",
        },
        {
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
            property: "description",
            content:
                "Bagage is a small creative development studio that assists projects both technically and visually.",
        },
    ],
});
</script>
