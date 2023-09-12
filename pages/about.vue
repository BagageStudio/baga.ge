<template>
    <div class="about page secondary" id="about">
        <div class="hero container">
            <div class="hero-title wrapper-title full-width">
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
        <div class="container">
            <div class="key-values">
                <div class="key-value">
                    <h2 class="title-a content-pad">
                        Involve developers in shaping the project, at the very
                        first steps
                    </h2>
                    <p class="content-pad">
                        We have a keen eye for graphic design, and we identify
                        the technical constraints imposed by the web, without
                        limiting our ideas.
                    </p>
                    <p class="content-pad">
                        AD materials such as animations and interactions always
                        serve the meaning of the content. The website is not
                        overwhelmed/saturated with animations.
                    </p>
                </div>
                <div class="key-value">
                    <h2 class="title-a content-pad">
                        Work with you as if we were part of the team
                    </h2>
                    <p class="content-pad">
                        That doesn't mean we understand exactly what you're
                        doing, but it does mean we'll do our best to deliver the
                        best possible result.
                    </p>
                    <p class="content-pad">
                        We're honest, we're looking for the best for you, not
                        the most.
                    </p>
                    <p class="content-pad">
                        Collaboration helps up developing our skills, growing
                        and going beyond our limits.
                    </p>
                </div>
                <div class="key-value">
                    <h2 class="title-a content-pad">
                        Make sure you can scale afterwards, with or without us
                    </h2>
                    <p class="content-pad">
                        We don't claim authorship for what we do. It is
                        important to us that our work is useful in the long run.
                    </p>
                </div>
                <div class="key-value">
                    <h2 class="title-a content-pad">
                        Flexibility and billing arrangements
                    </h2>
                    <p class="content-pad">
                        The team can be composed with in-house developers, other
                        freelancers or agencies, offering of variety of services
                        ranging. From redesigning a simple website to providing
                        long-term support for developing new features.
                    </p>
                    <p class="content-pad">
                        We're based in Nantes, but we can (and love to) move
                        around to meet our customers.
                    </p>
                </div>
                <div class="key-value">
                    <h2 class="title-a content-pad">
                        Taking the immersive experience a step further
                    </h2>
                    <p class="content-pad">
                        We regularly immerse in digital art, with a strong
                        desire to engage in projects of similar nature.
                    </p>
                    <p class="content-pad">
                        If your idea goes beyond a simple communication need,
                        we're here to help you translate it and make it
                        impactful.
                    </p>
                </div>
            </div>
            <div class="contact">
                <div class="subtitle">Contact</div>
                <a class="mail" href="mailto:hello@baga.ge">hello@baga.ge</a>
            </div>
        </div>
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
.hero-title {
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
.key-value {
    &:not(:last-child) {
        margin-bottom: 150px;
    }
    .title-a {
        margin-bottom: 30px;
    }
    p {
        position: relative;
        &::before {
            position: absolute;
            top: 0;
            left: calc(var(--gutter) - 1.5em);
            content: "↦";
        }
        width: percentage(math.div(2, 3));
        margin-left: percentage(math.div(1, 3));
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}

@media (min-width: $tablet) {
    .key-value {
        .title-a {
            width: percentage(math.div(2, 3));
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
    .key-value {
        width: percentage(math.div(4, 6));
        &:not(:last-child) {
            margin-bottom: 225px;
        }
        &:nth-child(2) {
            margin-left: percentage(math.div(1, 6));
        }
        &:nth-child(3) {
            margin-left: percentage(math.div(2, 6));
        }
        &:nth-child(4) {
            margin-left: percentage(math.div(1, 6));
        }
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
}
</style>
