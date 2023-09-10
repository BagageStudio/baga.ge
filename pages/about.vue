<template>
    <div>
        <h1>about</h1>
    </div>
</template>

<script setup>
import CreateLoadedAnimation from "~/assets/js/loadedAnimation";
import WebGL from "~/assets/js/WebGL";

onMounted(async () => {
    await WebGL.initializeAbout();

    CreateLoadedAnimation();
});
</script>

<style lang="scss" scoped></style>
