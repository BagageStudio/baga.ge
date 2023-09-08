<template>
    <div id="app">
        <div class="wrapper-animation" id="c"></div>
        <NuxtPage />
    </div>
</template>

<script setup>
import WebGL from "~/assets/js/WebGL";

onMounted(() => {
    WebGL.initialize();
});
</script>
