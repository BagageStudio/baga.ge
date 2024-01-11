import { gsap } from "gsap";

import { CreateHelloAnimation } from "~/assets/js/scroll/case";

import WebGL from "~/assets/js/WebGL";

let helloAnimation;

export async function caseEnter(el, done = () => {}) {
    await WebGL.initializeCase();

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
            "#heroWithImages",
            {
                y: () => `${window.innerHeight - window.innerWidth / 3}`,
                duration: 0.4,
                ease: "power3.out",
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
                backgroundColor: "#F5E8E7",
            },
            "start+=0.4"
        );

    tl.play();
}

function killAnimations() {
    if (helloAnimation) helloAnimation.kill();
}
