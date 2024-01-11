<template>
    <div
        class="about page secondary"
        id="about"
        ref="about"
        style="--cs-primary: #0091fe"
    >
        <header class="header" id="header">
            <div class="container">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/about" class="active">About</NuxtLink>
            </div>
        </header>
        <div class="case-study container">
            <div class="mod wrapper-fifty-fifty reversed">
                <div class="col-fifty-fifty">
                    <h2>
                        Driving Seamless CRM Integration and Marketing Strategy
                        for Stuart's Growth
                    </h2>
                    <p>
                        Since the initial development of the website, we've been
                        supporting Stuart's marketing teams in the
                        implementation of their acquisition strategy.
                    </p>
                    <p>
                        This includes, of course, connecting to the APIs of the
                        various CRMs used by their teams. In this context, we
                        have migrated from Salesforce to HubSpot, and in the CMS
                        we enable the creation of forms that are linked to
                        campaigns, while maintaining a consistent graphic style.
                        At the same time, we've implemented GDPR compliance and
                        analytics, using Piwik PRO.
                    </p>
                </div>
                <div class="col-fifty-fifty col-img square">
                    <div class="dithered-bg">
                        <img
                            width="1273"
                            height="716"
                            src="~/assets/img/case-studies/stuart/stuart-screen.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="mod wrapper-img-full">
                <img
                    width="1273"
                    height="716"
                    src="~/assets/img/case-studies/stuart/stuart-screen.png"
                    alt=""
                />
            </div>
            <div class="mod wrapper-fifty-fifty">
                <div class="col-fifty-fifty col-title">
                    <h2>
                        Stuart's Courier Space Redefined with Nuxt 3 and Dato
                        CMS
                    </h2>
                </div>
                <div class="col-fifty-fifty">
                    <p>
                        In late 2022, early 2023, we worked on the
                        migration/reconstruction of the courier space on an
                        associated sub-domain. The complexity of this exercise
                        lay mainly in the fact that we had to create a new site
                        on a Nuxt 3 (stuart.com is on Nuxt 2) and on a new Dato
                        project, while reusing modules present on the B2B
                        site.<br />
                        The registration forms for the courier platform are
                        connected to the Fountain API.
                    </p>
                    <p>
                        We regularly audit both sites with the Seobility tool,
                        which gives us an overall SEO score and solutions for
                        improvement.
                    </p>
                </div>
            </div>
            <div class="mod wrapper-img-full">
                <img
                    width="1273"
                    height="716"
                    src="~/assets/img/case-studies/stuart/stuart-screen.png"
                    alt=""
                />
            </div>
            <div class="mod wrapper-fifty-fifty">
                <div class="col-fifty-fifty">
                    <h2>
                        Driving Seamless CRM Integration and Marketing Strategy
                        for Stuart's Growth
                    </h2>
                    <p>
                        Since the initial development of the website, we've been
                        supporting Stuart's marketing teams in the
                        implementation of their acquisition strategy.
                    </p>
                    <p>
                        This includes, of course, connecting to the APIs of the
                        various CRMs used by their teams. In this context, we
                        have migrated from Salesforce to HubSpot, and in the CMS
                        we enable the creation of forms that are linked to
                        campaigns, while maintaining a consistent graphic style.
                        At the same time, we've implemented GDPR compliance and
                        analytics, using Piwik PRO.
                    </p>
                </div>
                <div class="col-fifty-fifty col-img square">
                    <img
                        width="1273"
                        height="716"
                        src="~/assets/img/case-studies/stuart/stuart-screen.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="contact">
                <div class="subtitle">Contact</div>
                <a class="mail" href="mailto:hello@baga.ge">hello@baga.ge</a>
            </div>
        </div>
        <footer id="footer">
            <div class="footer container">
                <p class="internship">
                    We are not taking any internship applications
                    at&nbsp;the&nbsp;moment.
                </p>
                <div class="footer-text">
                    <div class="copyright">©2023</div>
                    <h2 class="based">Based in Nantes</h2>
                </div>
                <div class="social-links">
                    <a
                        href="https://twitter.com/BagageStudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Twitter ↗</a
                    >
                    <a
                        href="https://www.linkedin.com/company/bagagestudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >LinkedIn ↗</a
                    >
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { aboutEnter, aboutLeave } from "~/assets/js/transitions/about";

const about = ref(null);

onMounted(async () => {
    const initialLoad =
        !document.documentElement.classList.contains("already-loaded");
    if (initialLoad) {
        aboutEnter(about.value);
        document.documentElement.classList.add("already-loaded");
    }
});

useHead({
    meta: [
        {
            name: "image",
            property: "og:image",
            content: "https://baga.ge/bagage-dark.jpg",
        },
        {
            name: "image",
            property: "og:image:secure_url",
            content: "https://baga.ge/bagage-dark.jpg",
        },
    ],
    link: [
        {
            rel: "icon",
            href: "/icon-dark.svg",
            type: "image/svg+xml",
        },
        {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon-dark.png",
        },
        {
            rel: "manifest",
            href: "/manifest-dark.webmanifest",
        },
        {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg",
            color: "#000000",
        },
    ],
    htmlAttrs: {
        class: "about-page",
    },
});

definePageMeta({
    scrollToTop: true,
    pageTransition: {
        name: "about",
        mode: "out-in",
        onEnter: (el, done) => {
            aboutEnter(el, done);
        },
        onLeave: (el, done) => {
            aboutLeave(done);
        },
    },
});
</script>

<style lang="scss" scoped>
.about {
    overflow: hidden;
}
.hero-title {
    .title {
        > h1,
        > p {
            display: inline;
        }
    }
}
.hero-images {
    position: relative;
    transform: translateY(calc(100vh - 33vw));
    margin-bottom: 90vw;
}

.images {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    visibility: hidden;
    max-width: 100%;
    img {
        max-width: 100%;
        height: auto;
    }
}

.images-proxy {
    --verticalOffset: 125px;
    --horizontalOffset: fixed;
    position: absolute;
    top: -125px;
    left: 0;
    bottom: 125px;
    right: 0;
}

.images-inner {
    visibility: hidden;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-shrink: 0;
    width: 550px;
}

.image-gl-wrapper {
    flex-shrink: 0;
    padding-left: 12px;
    padding-right: 12px;
    --verticalOffset: 125px;
    width: 170px;
    &.left {
        margin-top: var(--verticalOffset);
        transform: scale(0.7);
        transform-origin: 0% 100%;
    }
    &.middle {
        transform-origin: 100% 0%;
        transform: scale(1.3);
    }
    &.right {
        margin-top: calc(var(--verticalOffset) * -1);
        transform-origin: 0% 100%;
        transform: scale(1);
    }
}

.key-value-wrapper {
    &:not(:last-child) {
        margin-bottom: 100px;
    }
}
.key-value {
    .title-a {
        margin-bottom: 30px;
    }
    p {
        position: relative;
        margin-left: 1.5em;
        &::before {
            position: absolute;
            top: 0;
            left: calc(var(--gutter) - 1.5em);
            content: "↦";
        }
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}

.thingy {
    display: none;
}

.section-keywords {
    margin-top: 100px;
}
.keywords {
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 0;
    padding: 0;
    list-style: none;
    > li {
        margin: 10px 0;
        padding: 0 var(--gutter);
        font-size: 1.8rem;
        line-height: 1;
    }
}

@media (min-width: $phone) {
    .keywords {
        margin-top: 60px;
        > li {
            font-size: 2.6rem;
        }
    }
    .key-value-wrapper {
        &:not(:last-child) {
            margin-bottom: 150px;
        }
    }
    .key-value {
        p {
            width: percentage(math.div(2, 3));
            margin-left: percentage(math.div(1, 3));
        }
    }
    .section-keywords {
        margin-top: 150px;
    }
}
@media (min-width: $tablet) {
    .key-value {
        .title-a {
            width: percentage(math.div(2, 3));
        }
    }
    .section-keywords {
        .title-a {
            width: percentage(math.div(2, 3));
        }
    }
    .wrapper-keywords {
        position: relative;
        &::before,
        &::after {
            position: absolute;
            top: 0;
            bottom: 0;
            border-right: 1px solid #343434;
        }
        &::before {
            content: "";
            left: 50%;
        }
    }
    .keywords {
        padding: 30px 0;
        > li {
            flex: 0 0 auto;
            width: 50%;
        }
    }
}
@media (min-width: $desktop-small) {
    .key-value {
        .title-a {
            width: percentage(math.div(2, 3));
        }
    }
}
@media (min-width: $desktop) {
    .thingy {
        display: block;
        visibility: hidden;
    }

    .wrapper-keywords {
        &::before {
            left: percentage(math.div(1, 3));
        }
        &::after {
            content: "";
            left: percentage(math.div(2, 3));
        }
    }
    .keywords {
        > li {
            width: percentage(math.div(1, 3));
        }
    }

    .thingy-1 {
        position: absolute;
        top: -500px;
        right: -550px;
        width: 1200px;
        height: 1200px;
    }
    .thingy-2 {
        position: absolute;
        top: 0px;
        left: -600px;
        width: 1200px;
        height: 1200px;
    }
    .thingy-3 {
        position: absolute;
        top: -500px;
        right: -550px;
        width: 1200px;
        height: 1200px;
    }
    .key-value-wrapper {
        position: relative;
        &:not(:last-child) {
            margin-bottom: 225px;
        }
        &:nth-child(2) .key-value {
            margin-left: percentage(math.div(1, 6));
        }
        &:nth-child(3) .key-value {
            margin-left: percentage(math.div(2, 6));
        }
        &:nth-child(4) .key-value {
            margin-left: percentage(math.div(1, 6));
        }
    }
    .key-value {
        width: percentage(math.div(4, 6));
        .title-a {
            width: percentage(math.div(3, 4));
            margin-bottom: 40px;
        }
        p {
            width: percentage(math.div(3, 4));
            margin-left: percentage(math.div(1, 4));
            &:not(:last-child) {
                margin-bottom: 25px;
            }
        }
    }
    .section-keywords {
        .title-a {
            width: percentage(math.div(3, 6));
        }
    }
}
@media (min-width: $desktop-3xl) {
    .key-value-wrapper {
        &:nth-child(2) .key-value {
            margin-left: percentage(math.div(1.5, 6));
        }
        &:nth-child(3) .key-value {
            margin-left: percentage(math.div(3, 6));
        }
        &:nth-child(4) .key-value {
            margin-left: percentage(math.div(1.5, 6));
        }
    }

    .key-value {
        width: percentage(math.div(3, 6));
        .title-a {
            width: percentage(math.div(2, 3));
        }
        p {
            width: percentage(math.div(2, 3));
            margin-left: percentage(math.div(1, 3));
        }
    }
    .wrapper-keywords {
        width: percentage(math.div(5, 6));
        margin-left: auto;
        margin-right: auto;
    }
}

////////////////////////////////////////////
/////////// img-shape responsive ///////////
////////////////////////////////////////////
.img-shape {
    --line-height: 26px;
    float: right;
    width: 150px;
    aspect-ratio: 1 / 1.5;
    margin-left: var(--gutter);
    shape-margin: 20px;
    margin-top: calc(var(--line-height) * 10);
    shape-outside: inset(calc(var(--line-height) * 10) 0 0 0);
}

@media (min-width: 400px) {
    .hero-images {
        margin-bottom: 80vw;
    }
    .images-inner {
        width: 150%;
    }

    .image-gl-wrapper {
        --verticalOffset: 125px;
        width: calc(33% - 10px);
    }
    .images-proxy {
        --horizontalOffset: fluid;
    }

    .img-shape {
        margin-top: calc(var(--line-height) * 8);
        shape-outside: inset(calc(var(--line-height) * 8) 0 0 0);
    }
}

@media (min-width: 430px) {
    .img-shape {
        width: 200px;
        // margin-top: 240px;
        // shape-outside: inset(240px 0 0 0);
        margin-top: calc(var(--line-height) * 6);
        shape-outside: inset(calc(var(--line-height) * 6) 0 0 0);
    }
}
@media (min-width: 450px) {
    .img-shape {
        --line-height: 30px;
        width: 200px;
        margin-top: calc(var(--line-height) * 6);
        shape-outside: inset(calc(var(--line-height) * 6) 0 0 0);
    }
}
@media (min-width: 450px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 7);
        shape-outside: inset(calc(var(--line-height) * 7) 0 0 0);
    }
}
@media (min-width: 500px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 6);
        shape-outside: inset(calc(var(--line-height) * 6) 0 0 0);
    }
}
@media (min-width: $phone) {
    .img-shape {
        --line-height: 36px;
        width: 250px;
        margin-top: calc(var(--line-height) * 7);
        shape-outside: inset(calc(var(--line-height) * 7) 0 0 0);
    }
}
@media (min-width: 620px) {
    .img-shape {
        width: calc(percentage(math.div(2, 3)) - var(--gutter));
    }
}
@media (min-width: 723px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 6);
        shape-outside: inset(calc(var(--line-height) * 6) 0 0 0);
    }
}
@media (min-width: $tablet) {
    .img-shape {
        --line-height: 42px;
        width: 50%;
        margin-top: calc(var(--line-height) * 7);
        shape-outside: inset(calc(var(--line-height) * 7) 0 0 0);
    }
}
@media (min-width: 820px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 6);
        shape-outside: inset(calc(var(--line-height) * 6) 0 0 0);
    }
}
@media (min-width: 900px) {
    .image-gl-wrapper {
        --verticalOffset: 225px;
    }
    .img-shape {
        width: calc(percentage(math.div(2, 3)) - var(--gutter));
    }
}
@media (min-width: 945px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 5);
        shape-outside: inset(calc(var(--line-height) * 5) 0 0 0);
    }
}
@media (min-width: 1021px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 4);
        shape-outside: inset(calc(var(--line-height) * 4) 0 0 0);
    }
}
@media (min-width: $desktop) {
    .image-gl-wrapper {
        width: calc(33% - 50px);
    }
    .img-shape {
        --line-height: 54px;
        width: calc(percentage(math.div(3, 6)) - (var(--gutter) * 2));
        margin-right: var(--gutter);
        margin-top: calc(var(--line-height) * 5);
        shape-outside: inset(calc(var(--line-height) * 5) 0 0 0);
    }
}
@media (min-width: 1150px) {
    .img-shape {
        margin-top: calc(var(--line-height) * 4);
        shape-outside: inset(calc(var(--line-height) * 4) 0 0 0);
    }
}
@media (min-width: $desktop-xxl) {
    .img-shape {
        width: calc(percentage(math.div(3, 6)) - (var(--gutter)));
        margin-right: 0;
    }
}
@media (min-width: $desktop-3xl) {
    .img-shape {
        margin-top: calc(var(--line-height) * 3);
        shape-outside: inset(calc(var(--line-height) * 3) 0 0 0);
    }
}
</style>
