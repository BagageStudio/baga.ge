<template>
    <div class="cal secondary">
        <div class="container">
            <CalendlyInlineWidget class="calendly-wrapper" v-bind="options" />
        </div>
    </div>
</template>

<script setup>
const options = {
    url: "https://calendly.com/bagage-adrien/echange-de-30-min?text_color=191919&primary_color=f24f2b",
};
useHead({
    meta: [
        {
            property: "og:title",
            content: "Bagage — Creative development studio",
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
            property: "og:url",
            content: "https://baga.ge/cal",
        },
        {
            property: "og:description",
            content:
                "Bagage is a two man creative development studio that assists projects both technically and visually.",
        },
        {
            name: "description",
            content:
                "Bagage is a two man creative development studio that assists projects both technically and visually.",
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
});
</script>

<style lang="scss" scoped>
.cal {
    overflow: hidden;
}
.calendly-wrapper {
    height: 1110px !important;
}

@media (min-width: 1060px) {
    .calendly-wrapper {
        height: 700px !important;
    }
}
</style>
