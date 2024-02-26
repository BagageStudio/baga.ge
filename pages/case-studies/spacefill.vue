<template>
    <div
        class="case page"
        id="case"
        ref="caseStudy"
        style="--cs-primary: #1bd292"
        data-id="spacefill"
    >
        <Header />
        <div class="case-study-intro">
            <div class="container">
                <div class="col-intro">
                    <div class="wrapper-title" id="wrapperTitle">
                        <span class="subtitle content-pad">Challenge</span>
                        <h1 class="title title-case-study content-pad">
                            Combine two sites into one new modular website,
                            allowing landing pages to be created on the fly.
                        </h1>
                    </div>
                    <div
                        class="wrapper-intro-case-study content-pad"
                        id="wrapperIntro"
                    >
                        <p>
                            Spacefill acts as a bridge, allowing businesses to
                            find the perfect storage solution for their needs
                            while helping warehouses connect with new customers
                            and optimize their operations.
                        </p>
                        <p>
                            In 2023, we worked on the creation of their new
                            website, and have been supporting them ever since in
                            the development of new features.
                        </p>
                        <a
                            href="https://spacefill.eu/"
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
                        <span class="info-content">2023 - Present</span>
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
                        <span class="info-content"
                            >Supply chain & logistics</span
                        >
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
                        <h2>A Fully Modular Website</h2>
                        <p>
                            The main challenge in creating this new website is
                            to enable complete autonomy in the creation of new
                            pages. To achieve this, we chose to design pages as
                            assemblies of modules, selectable within the CMS.
                            This is where a headless CMS like Dato offers
                            numerous advantages. The modules and the fields that
                            compose them are entirely customizable.
                        </p>
                        <p>
                            The first step is to carefully scope the options we
                            want to provide. The idea is to position the cursor
                            in a way that offers the expected freedom in module
                            creation while preventing content creators from
                            deviating from the branding.
                        </p>
                        <p>
                            This modular creation logic, including in the code,
                            allows us to easily implement new modules as
                            Spacefill's needs evolve. This could include modules
                            with lead forms, filterable lists, and more.
                        </p>
                    </div>
                    <div class="col-fifty-fifty col-img square content-pad">
                        <video
                            type="video/mp4"
                            src="/spacefill-modular.mp4"
                            autoplay
                            muted
                            loop
                        ></video>
                    </div>
                </div>
                <div class="mod wrapper-img-full content-pad">
                    <Image
                        :url="'/spacefill-screen-3.png'"
                        :alt="'A screenshot of Spacefill for 3PL page.'"
                        :width="2880"
                        :height="1580"
                    />
                </div>
                <div class="mod wrapper-kpis">
                    <div class="col-kpi content-pad">
                        <span class="key-figure">-25%</span>
                        <span>Bounce rate</span>
                    </div>
                    <div class="col-kpi content-pad">
                        <span class="key-figure">+25%</span>
                        <span>Engagement rate</span>
                    </div>
                    <div class="col-kpi content-pad">
                        <span class="key-figure">+3.5%</span>
                        <span>Conversion rate</span>
                    </div>
                </div>
                <div class="mod wrapper-fifty-fifty">
                    <div class="col-fifty-fifty content-pad">
                        <h2>Combining Two Websites into One</h2>
                        <p>
                            In addition to the goal of creating a modular site,
                            the objective of this new website was to combine
                            Spacefill's two existing sites. One was built on
                            WordPress, and the other on Webflow.
                        </p>
                        <p>
                            The advantage of transitioning to a headless CMS is
                            to harness the best of both worlds:
                        </p>
                        <ul>
                            <li>
                                Greater scalability and code control than
                                Webflow
                            </li>
                            <li>
                                Enhanced security and better performance than
                                WordPress
                            </li>
                        </ul>
                    </div>
                    <div class="col-fifty-fifty col-img square content-pad">
                        <div class="dithered-bg">
                            <video
                                type="video/mp4"
                                src="/spacefill-integrations.mp4"
                                autoplay
                                muted
                                loop
                            ></video>
                        </div>
                    </div>
                </div>
                <div class="mod wrapper-testimonial content-pad">
                    <blockquote>
                        <p class="title-a">
                            I've been working with Adrien and Clément on
                            Spacefill's website revamp. We've migrated from a
                            Wordpress, to Dato CMS, changed the whole UX and UI.
                            Our one-shot project has evolved to an ongoing
                            partnership. I appreciate their reactivity and sense
                            of design and branding. The collaboration is
                            seamless, they understand marketers and our need.
                        </p>
                        <footer>
                            <span class="name">Philippine Breuil</span>
                            <span class="job-company"
                                >Head of marketing — Spacefill</span
                            >
                        </footer>
                    </blockquote>
                </div>
                <div class="credits">
                    <div class="col-title content-pad">
                        <h2>Credits</h2>
                    </div>
                    <div class="col-credits credits-details">
                        <div class="credits-detail content-pad">
                            <div class="detail-title">Design</div>
                            <span>Make the Grade</span>
                            <span>Philippine Breuil</span>
                        </div>
                        <div class="credits-detail content-pad">
                            <div class="detail-title">Font</div>
                            <span>Campton by René Bieder</span>
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
    title: "Spacefill — Bagage",
    meta: [
        {
            property: "og:title",
            content: "Spacefill — Bagage",
        },
        {
            name: "image",
            property: "og:image",
            content: "https://baga.ge/spacefill.jpg",
        },
        {
            name: "image",
            property: "og:image:secure_url",
            content: "https://baga.ge/spacefill.jpg",
        },
        {
            property: "og:url",
            content: "https://baga.ge/case-studies/spacefill",
        },
        {
            property: "og:description",
            content:
                "Bagage combined two sites into one new modular website, allowing landing pages to be created on the fly.",
        },
        {
            name: "description",
            content:
                "Bagage combined two sites into one new modular website, allowing landing pages to be created on the fly.",
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
        class: "case-spacefill",
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
    margin-top: 20px;
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
