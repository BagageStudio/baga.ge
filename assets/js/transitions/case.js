import { gsap } from "gsap";

import { CreateHelloAnimation } from "~/assets/js/scroll/case";

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

export async function caseEnter(el, done = () => {}) {
    const options = await getWebGlOptions(el.dataset.id);

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

    tl.set("#overlay", { backgroundColor: "transparent" });
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
        );

    tl.play();
}

export function caseLeave(done) {
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
            "#overlay",
            {
                duration: 0.4,
                // need this to be dynamic
                backgroundColor: "#F5E8E7",
            },
            "start+=0.4"
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
