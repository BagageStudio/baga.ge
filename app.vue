<template>
    <div id="app">
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
import WebGL from "~/assets/js/WebGL";
import { CreateScroll } from "~/assets/js/scroll/home";

const showGrid = ref(false);

const nuxtApp = useNuxtApp();

if (process.client) {
    const lenis = CreateScroll();
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = "manual";
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }
    nuxtApp.$router.afterEach((to, from) => {
        window.scrollTo(0, 0);
    });
}
</script>
