<template>
    <div class="image" :class="{ loaded, cover, contains }">
        <nuxt-img
            :sizes="sizes"
            :width="width"
            :height="height"
            :src="url"
            :alt="alt"
            :loading="loading"
            :preload="preload"
            @load="onLoad"
        />
    </div>
</template>

<script setup>
const { image, sizes, preload, loading, contains, cover, width } = defineProps({
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    sizes: {
        type: String,
        default: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw",
    },
    preload: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: String,
        default: "lazy",
    },
    contains: {
        type: Boolean,
        default: false,
    },
    cover: {
        type: Boolean,
        default: false,
    },
    width: {
        type: Number,
        default: 0,
    },
    height: {
        type: Number,
        default: 0,
    },
});

const loaded = ref(false);

const onLoad = () => {
    loaded.value = true;
};
</script>

<style lang="scss" scoped>
.image {
    > img {
        display: block;
        width: 100%;
    }
    &.cover {
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &.contains {
        > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>
