<template>
    <div
        class="case page secondary"
        id="case"
        ref="case"
        style="--cs-primary: #0091fe"
    >
        <Header />
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
import { caseEnter, caseLeave } from "~/assets/js/transitions/case";

const about = ref(null);

onMounted(async () => {
    const initialLoad =
        !document.documentElement.classList.contains("already-loaded");
    if (initialLoad) {
        caseEnter(about.value);
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
            caseEnter(el, done);
        },
        onLeave: (el, done) => {
            caseLeave(done);
        },
    },
});
</script>

<style lang="scss" scoped>
.case {
    overflow: hidden;
}
</style>
