import { gsap } from "gsap";

import { CreateHelloAnimation } from "~/assets/js/scroll/case";

import { lenis } from "~/assets/js/scroll/scroll";

import WebGL from "~/assets/js/WebGL";

import cases from "~/assets/data/cases";

let helloAnimation;

async function getWebGlOptions(id) {
    const caseData = cases[id];

    const mainTypoImage = await import(
        `../../img/mainTypo/${caseData.mainTypoImage}.png`
    );
    const ditherPaletteImage = await import(
        `../../img/palettes/${caseData.ditherPaletteImage}.png`
    );
    const ditherTextureImage = await import(
        `../../img/ditherTexture/${caseData.ditherTextureImage}.png`
    );

    return {
        id,
        mainTypoImage: mainTypoImage.default,
        ditherPaletteImage: ditherPaletteImage.default,
        ditherTextureImage: ditherTextureImage.default,
    };
}

export async function caseEnter({ el, done = () => {}, firstLoad = false }) {
    const options = await getWebGlOptions(el.dataset.id);

    if (!firstLoad) {
        gsap.set("#overlay", {
            backgroundColor: "#00249C",
        });
        await gsap.to("#overlay", {
            duration: 0.4,
            opacity: 1,
        });
    }

    await WebGL.initializeCase(options);

    caseLoaded(() => {
        done();
    });

    helloAnimation = CreateHelloAnimation();
}

export function caseLoaded(done) {
    const webglAppear = { typoOpacity: 0, typoScale: 0, noiseOpacity: 0 };

    const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
            done();
        },
    });

    tl.set("#overlay", { opacity: 0 });

    if (lenis && lenis.isStopped) lenis.start();
    document.documentElement.classList.remove("no-scroll");

    tl.set(["#wrapperTitle", "#wrapperIntro", "#colInfos"], {
        y: 200,
        rotateX: -45,
    });

    tl.to(
        webglAppear,
        {
            typoOpacity: 1,
            duration: 2,
            onUpdate: () => WebGL.setAppearValue(webglAppear),
        },
        "start"
    )
        .to(
            webglAppear,
            {
                typoScale: 1,
                duration: 2,
                ease: "power4.inOut",
                onUpdate: () => WebGL.setAppearValue(webglAppear),
            },
            "start"
        )
        .to(
            "#header",
            {
                duration: 1,
                opacity: 1,
            },
            "start+=1"
        )
        .to(
            "#wrapperTitle",
            {
                duration: 1.4,
                opacity: 1,
                y: 0,
                rotateX: 0,
                ease: "power4.inOut",
            },
            "start+=0.3"
        )
        .to(
            "#wrapperIntro",
            {
                duration: 1.4,
                opacity: 1,
                y: 0,
                rotateX: 0,
                ease: "power4.inOut",
            },
            "start+=0.4"
        )

        .to(
            "#colInfos",
            {
                duration: 1.4,
                opacity: 1,
                y: 0,
                rotateX: 0,
                ease: "power4.inOut",
            },
            "start+=0.5"
        )
        .to(
            "#mainCase",
            {
                y: 0,
                duration: 1,
                ease: "power3.out",
            },
            "start+=0.8"
        );

    tl.play();
}

export function caseLeave(done) {
    if (lenis) lenis.stop();
    document.documentElement.classList.add("no-scroll");
    killAnimations();

    const webglAppear = { typoOpacity: 1, typoScale: 1, noiseOpacity: 0 };

    const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
            done();
        },
    });

    tl.to(
        webglAppear,
        {
            typoOpacity: 0,
            duration: 0.4,
            onUpdate: () => WebGL.setAppearValue(webglAppear),
        },
        "start"
    )
        .to(
            "#header",
            {
                duration: 0.4,
                opacity: 0,
            },
            "start"
        )
        .to(
            "#wrapperTitle",
            {
                duration: 0.4,
                opacity: 0,
            },
            "start"
        )
        .to(
            "#mainCase",
            {
                y: () => `${window.innerHeight - window.innerWidth / 3}`,
                duration: 0.4,
                ease: "power3.out",
            },
            "start"
        )
        .to(
            "#wrapperIntro",
            {
                duration: 0.4,
                opacity: 0,
            },
            "start"
        )
        .to(
            "#colInfos",
            {
                duration: 0.4,
                opacity: 0,
            },
            "start"
        );

    tl.play();
}

function killAnimations() {
    if (helloAnimation) helloAnimation.kill();
}
