export default defineNuxtPlugin({
    name: "scroll-client",
    hooks: {
        "page:transition:finished": () => {
            document.scrollingElement?.scrollTo({ left: 0, top: 0 });
            document.body?.scrollTo({ left: 0, top: 0 });
        },
    },
});
