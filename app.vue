<template>
    <div id="app">
        <div class="overlay" id="overlay"></div>
        <div class="wrapper-animation" id="c"></div>
        <NuxtPage />
        <div class="container" v-if="showGrid">
            <div class="grid" id="grid">
                <div class="container">
                    <div class="column-block">
                        <div class="column-text"></div>
                    </div>
                    <div class="column-block">
                        <div class="column-text"></div>
                    </div>
                    <div class="column-block">
                        <div class="column-text"></div>
                    </div>
                    <div class="column-block">
                        <div class="column-text"></div>
                    </div>
                    <div class="column-block">
                        <div class="column-text"></div>
                    </div>
                    <div class="column-block">
                        <div class="column-text"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CreateScroll } from "~/assets/js/scroll/home";

const showGrid = ref(false);

const nuxtApp = useNuxtApp();

if (process.client) {
    const { lenis } = CreateScroll();
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = "manual";
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }
    nuxtApp.$router.afterEach((to, from) => {
        lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    });
}
</script>

<style lang="scss" scoped>
.overlay {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5e8e7;
    opacity: 0;
}
</style>
