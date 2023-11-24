<template>
    <div class="cal secondary">
        <div class="container">
            <div
                class="calendly-inline-widget"
                data-url="https://calendly.com/bagage-adrien/echange-de-30-min?text_color=191919&primary_color=f24f2b"
                style="min-width: 320px; height: 700px"
            ></div>
        </div>
    </div>
</template>

<script setup>
useHead({
    meta: [
        {
            name: "image",
            property: "og:image",
            content: "https://baga.ge/bagage-dark.jpg",
        },
        {
            name: "image",
            property: "og:image:secure_url",
            content: "https://baga.ge/bagage-dark.jpg",
        },
    ],
    link: [
        {
            rel: "icon",
            href: "/icon-dark.svg",
            type: "image/svg+xml",
        },
        {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon-dark.png",
        },
        {
            rel: "manifest",
            href: "/manifest-dark.webmanifest",
        },
        {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg",
            color: "#000000",
        },
    ],
    script: [
        {
            type: "text/javascript",
            innerHTML: "https://assets.calendly.com/assets/external/widget.js",
            async: true,
        },
    ],
});
</script>

<style lang="scss" scoped>
.cal {
    overflow: hidden;
}
</style>
