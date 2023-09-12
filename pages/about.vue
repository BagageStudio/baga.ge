<template>
    <div class="about page" id="about">
        <div class="images container">
            <div class="image-gl" ref="img1">
                <img src="~/assets/img/photos/adrien2.jpg" />
            </div>
            <div class="image-gl" ref="img2">
                <img src="~/assets/img/photos/adrien3.jpg" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { aboutLoaded } from "~/assets/js/loadedAnimation";
import { CreateHelloAnimation } from "~/assets/js/scroll/about";

import WebGL from "~/assets/js/WebGL";

const img1 = ref(null);
const img2 = ref(null);

onMounted(async () => {
    await WebGL.initializeAbout([img1.value, img2.value]);
    aboutLoaded();
    CreateHelloAnimation();
});

definePageMeta({
    scrollToTop: true,
});
</script>

<style lang="scss" scoped>
.images {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    opacity: 0.3;
    visibility: hidden;
}
.image-gl {
    width: 40%;
    img {
        max-width: 100%;
        height: auto;
    }
    &:last-child {
        margin-top: 120px;
    }
}
</style>
