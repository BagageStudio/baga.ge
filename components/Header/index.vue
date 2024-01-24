<template>
    <header class="header" id="header">
        <div class="container">
            <HeaderLogo />
            <div class="links">
                <NuxtLink class="header-link" to="/">Home</NuxtLink>
                <NuxtLink class="header-link" to="/about">About</NuxtLink>
            </div>
        </div>
    </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    opacity: 0;
    > .container {
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;
    }
}
.header-link {
    color: var(--color);
    text-decoration: none;
    text-underline-offset: 2px;
    font-size: 1.4rem;
    margin-left: 30px;
    &.router-link-active,
    &:hover {
        text-decoration: underline;
    }
    &:first-child {
        margin-left: 0;
    }
}
.links {
    display: flex;
    align-items: center;
}

@media (min-width: $phone) {
    .header-link {
        color: var(--color);
        text-decoration: none;
        text-underline-offset: 2px;
        font-size: 1.6rem;
    }
}
</style>
