<template>
    <div class="about page secondary" id="about">
        <div class="hero">
            <div class="hero-about-title wrapper-title">
                <span class="subtitle content-pad">About</span>
                <div class="title content-pad">
                    <h1>
                        We are a team of two developers with an expertise in
                        website creation.
                    </h1>
                    <p>
                        Before starting Bagage, we met in a creative web agency
                        and then worked as separate freelancers. It became clear
                        that we had to create our own studio because we enjoy
                        working with our own clients to share key values and a
                        common strategy.
                    </p>
                </div>
            </div>
        </div>
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
.hero-about-title {
    .title {
        > h1,
        > p {
            display: inline;
        }
    }
}
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
