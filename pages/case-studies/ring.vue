<template>
    <div
        class="case page"
        id="case"
        ref="caseStudy"
        style="--cs-primary: #CD5A49"
        data-id="ring"
    >
        <Header />
        <div class="case-study-intro">
            <div class="container">
                <div class="col-intro">
                    <div class="wrapper-title" id="wrapperTitle">
                        <span class="subtitle content-pad">Challenge</span>
                        <h1 class="title title-case-study content-pad">
                            A VC website co-created to deploy a new, impactful
                            identity, and present their portfolio.
                        </h1>
                    </div>
                    <div
                        class="wrapper-intro-case-study content-pad"
                        id="wrapperIntro"
                    >
                        <p>
                            Ring Capital trusted us again for their website
                            redesign following their rebranding initiative. As
                            their long-term technical partner, we could
                            precisely target improvements while optimizing
                            resources and development time.
                        </p>
                        <a
                            href="https://ringcp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="intro-link"
                        >
                            See it live ↗
                        </a>
                    </div>
                </div>
                <div class="col-infos" id="colInfos">
                    <div class="info content-pad">
                        <span class="info-title">Date</span>
                        <span class="info-content">2021 - Present</span>
                    </div>
                    <div class="info content-pad">
                        <span class="info-title">Tech</span>
                        <span class="info-content">
                            <ul>
                                <li>Nuxt</li>
                                <li>DatoCMS</li>
                                <li>Netlify</li>
                            </ul>
                        </span>
                    </div>
                    <div class="info content-pad">
                        <span class="info-title">Industry</span>
                        <span class="info-content">Impact investing</span>
                    </div>
                    <div class="info content-pad">
                        <span class="info-title">Market</span>
                        <span class="info-content">B2B</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="case-study container" id="mainCase">
            <div class="case-study-content">
                <div class="mod wrapper-fifty-fifty reversed">
                    <div class="col-fifty-fifty content-pad">
                        <h2>Leveraging Existing Infrastructure</h2>
                        <p>
                            Since Ring Capital's core structure—focused on
                            presenting their vision, funds, and portfolio
                            companies—remained fundamentally unchanged, we
                            maximized efficiency by maintaining the proven Nuxt
                            + DatoCMS stack while:
                        </p>
                        <ul>
                            <li
                                >Restructuring content into modular
                                components</li
                            >
                            <li
                                >Preserving SEO value and performance
                                optimizations</li
                            >
                            <li
                                >Minimizing required content updates in the
                                CMS</li
                            >
                        </ul>
                        <p
                            >This strategic decision to maintain the existing
                            technical foundation while enhancing its modularity
                            allowed us to focus our efforts on implementing the
                            new brand identity and improving the user
                            experience, rather than rebuilding the entire
                            infrastructure from scratch.</p
                        >
                    </div>
                    <!-- <div class="col-fifty-fifty col-img square content-pad">
                        <video
                            type="video/mp4"
                            src="/stuart-multilingual.mp4"
                            autoplay
                            muted
                            loop
                        ></video>
                    </div> -->
                    <div class="col-fifty-fifty col-img square content-pad">
                        <Image
                            :url="'/ring-screen-1.png'"
                            :alt="`A screenshot of a modular page on Ring's DatoCMS dashboard`"
                            :width="2880"
                            :height="1582"
                        />
                    </div>
                </div>
                <div class="mod wrapper-fifty-fifty reversed">
                    <div class="col-fifty-fifty col-img square content-pad">
                        <div class="dithered-bg">
                            <video
                                type="video/mp4"
                                src="/ring-home.mp4"
                                autoplay
                                muted
                                loop
                            ></video>
                        </div>
                    </div>
                    <div class="col-fifty-fifty content-pad">
                        <h2> Bringing Brand Identity to Life </h2>
                        <p
                            >We approached the brand implementation
                            holistically, ensuring that both design and
                            development worked together to express Ring
                            Capital's values.</p
                        >
                        <p
                            >This led to discussions with Marion, the designer,
                            right from the start of the project.</p
                        >
                        <p
                            >Our technical expertise helped translate their
                            identity into an engaging digital experience
                            through:</p
                        >
                        <ul>
                            <li
                                >Purposeful animations that reinforce the
                                organic and fluid feel, to illustrate social and
                                environmental impact</li
                            >
                            <li
                                >Hover states that highlight elements of the
                                brand guidelines</li
                            >
                            <li
                                >Performance-optimized animations that fit in
                                perfectly with the proposed design</li
                            >
                        </ul>
                    </div>
                </div>
                <div class="mod wrapper-testimonial content-pad">
                    <blockquote>
                        <p class="title-a">
                            Ring Capital has chosen to call on you once again
                            for our new website for good reason: you're a
                            pleasure to work with. Your availability and
                            pedagogy make the task of redesigning a website
                            quite easy, even for people who have no experience
                            in this field, as was my case. Finally, on a human
                            level, the contact was also very pleasant.
                        </p>
                        <footer>
                            <span class="name">Victoire Cruanes-Lubrano</span>
                            <span class="job-company"
                                >Head of marketing and content strategy — Ring
                                Capital</span
                            >
                        </footer>
                    </blockquote>
                </div>
                <div class="mod wrapper-img-full content-pad">
                    <Image
                        :url="'/ring-screen-2.png'"
                        :alt="'A screenshot of the Enerdigit startup page from the Ring website portfolio.'"
                        :width="2880"
                        :height="1582"
                    />
                </div>
                <div class="mod wrapper-img-full content-pad">
                    <video
                        type="video/mp4"
                        src="/ring-portfolio.mp4"
                        autoplay
                        muted
                        loop
                    ></video>
                </div>
                <div class="mod wrapper-fifty-fifty">
                    <div class="col-fifty-fifty content-pad">
                        <h2> Long-Term Partnership Benefits </h2>
                    </div>
                    <div class="col-fifty-fifty content-pad">
                        <p>
                            Many of our collaborations extend well beyond the
                            initial project scope. Our composable architecture
                            combined with a modular approach to both framework
                            and CMS enables websites to evolve seamlessly
                            alongside growing business needs, whether they're
                            tool-related or content-focused.
                        </p>
                        <p
                            >Fun fact: Some of our partnerships have lasted for
                            several years, and we've even helped clients build
                            their in-house web development teams by assisting
                            with their first technical hires.</p
                        >
                    </div>
                </div>
                <div class="credits">
                    <div class="col-title content-pad">
                        <h2>Credits</h2>
                    </div>
                    <div class="col-credits credits-details">
                        <div class="credits-detail content-pad">
                            <div class="detail-title">Branding</div>
                            <span>Curius agency</span>
                        </div>
                        <div class="credits-detail content-pad">
                            <div class="detail-title">Design</div>
                            <span>Marion Bonvoust</span>
                        </div>
                    </div>
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
                    <div class="copyright">©2024</div>
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
import { caseEnter, caseLeave } from "~/assets/js/transitions/case";

const caseStudy = ref(null);

onMounted(async () => {
    const initialLoad =
        !document.documentElement.classList.contains("already-loaded");
    if (initialLoad) {
        caseEnter({ el: caseStudy.value, firstLoad: true });
        document.documentElement.classList.add("already-loaded");
    }
});

useHead({
    title: "Stuart — Bagage",
    meta: [
        {
            property: "og:title",
            content: "Stuart — Bagage",
        },
        {
            name: "image",
            property: "og:image",
            content: "https://baga.ge/stuart.jpg",
        },
        {
            name: "image",
            property: "og:image:secure_url",
            content: "https://baga.ge/stuart.jpg",
        },
        {
            property: "og:url",
            content: "https://baga.ge/case-studies/stuart",
        },
        {
            property: "og:description",
            content:
                "Bagage provided ongoing support for the development and evolution of two websites for Stuart, addressing significant growth challenges.",
        },
        {
            name: "description",
            content:
                "Bagage provided ongoing support for the development and evolution of two websites for Stuart, addressing significant growth challenges.",
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
        class: "case-ring",
    },
});

definePageMeta({
    scrollToTop: true,
    pageTransition: {
        name: "about",
        mode: "out-in",
        onEnter: (el, done) => {
            caseEnter({ el, done });
        },
        onLeave: (el, done) => {
            caseLeave(done);
        },
    },
});
</script>

<style lang="scss" scoped>
.case {
    padding-top: calc(25vw + 100px);
    overflow: hidden;
    --color: #fff;
    color: var(--color);
}
.wrapper-intro-case-study {
    margin-top: 30px;
    transform: translateY(200px) rotateX(-45deg);
    opacity: 0;
    p {
        font-size: 1.8rem;
        line-height: 140%;
        &:not(:last-child) {
            margin-bottom: 1em;
        }
    }
}
.intro-link {
    display: inline-flex;
    margin-top: 15px;
    text-decoration: none;
    color: var(--color);
    text-transform: uppercase;
}
.col-infos {
    margin-top: 30px;
    transform: translateY(200px) rotateX(-45deg);
    opacity: 0;
}
.info {
    font-size: 2.1rem;
    line-height: 120%;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
    > span {
        display: block;
    }
    ul {
        list-style: none;
    }
}
.info-title {
    font-feature-settings: "ss16";
    margin-bottom: 5px;
}
.case-study {
    padding-top: 120px;
    background-color: $black;
    transform: translateY(calc(100vh - 33vw));
}
.case-study-content {
    padding: 0 var(--gutter-out-monolith);
}
footer {
    background-color: $black;
}
.col-credits {
    position: relative;
    padding-bottom: 20px;
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: var(--gutter);
        right: var(--gutter);
        border-bottom: 1px solid var(--color);
    }
}
.credits-detail {
    font-size: 2.1rem;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
    > span {
        display: block;
    }
}
.detail-title {
    margin-bottom: 8px;
    font-feature-settings: "ss16";
    text-transform: uppercase;
}

.case-study-intro {
    padding: 0 0 50px 0;
}

.wrapper-title {
    transform: translateY(200px) rotateX(-45deg);
    opacity: 0;
}

@media (min-width: $tablet) {
    .col-infos {
        display: flex;
        flex-wrap: wrap;
    }
    .info {
        flex: 0 0 auto;
        width: percentage(math.div(1, 3));
    }
    .col-credits {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 40px;
    }
    .credits-detail {
        flex: 0 0 auto;
        width: 50%;
        &:not(:last-child) {
            margin-bottom: 0;
        }
        margin-bottom: 0;
        &:nth-last-child(n + 3) {
            margin-bottom: 35px;
        }
        > span {
            display: block;
        }
    }
}

@media (min-width: $desktop) {
    .case-study-intro {
        padding-bottom: 100px;
        > .container {
            display: flex;
        }
    }
    .col-intro {
        flex: 0 0 auto;
        width: percentage(math.div(4, 6));
    }
    .title-case-study {
        text-indent: calc(percentage(math.div(1, 4)) + (var(--gutter) / 2));
    }
    .col-infos {
        flex: 0 0 auto;
        width: percentage(math.div(2, 6));
        display: block;
        margin: 0;
    }
    .info {
        width: 100%;
    }
    .credits {
        display: flex;
        align-items: flex-start;
    }
    .col-title {
        flex: 0 0 auto;
        width: percentage(math.div(2, 6));
    }
    .col-credits {
        flex: 0 0 auto;
        width: percentage(math.div(4, 6));
    }
}

@media (min-width: $desktop-large) {
    .col-intro {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .wrapper-intro-case-study {
        width: percentage(math.div(3, 4));
        margin-top: 40px;
    }
    .intro-link {
        margin-top: 25px;
    }
    .info {
        &:not(:last-child) {
            margin-bottom: 25px;
        }
    }
    .info-title {
        margin-bottom: 8px;
    }
}
</style>
