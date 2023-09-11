<template>
    <div class="about">
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
import CreateLoadedAnimation from "~/assets/js/loadedAnimation";
import WebGL from "~/assets/js/WebGL";

const img1 = ref(null);
const img2 = ref(null);

onMounted(async () => {
    await WebGL.initializeAbout([img1.value, img2.value]);
    CreateLoadedAnimation();
});

definePageMeta({
    scrollToTop: true,
});
</script>

<style lang="scss" scoped>
.about {
    padding-bottom: 200vh;
}

.images {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 400px;
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
