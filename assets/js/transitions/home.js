import { gsap } from "gsap";

import WebGL from "~/assets/js/WebGL";

import {
    CreateHelloAnimation,
    CreateProjectsAnimation,
    CreateManifestoTitleAnimation,
    CreateManifestoValuesAnimation,
    CreateTextMasksAnimation,
} from "~/assets/js/scroll/home";

import { lenis } from "~/assets/js/scroll/scroll";

let textMasksAnimation;
let helloAnimation;
let projectsAnimation;
let manifestoTitleAnimation;
let manifestoValuesAnimation;

export async function homeEnter({ done = () => {}, firstLoad = false }) {
    if (!firstLoad) {
        gsap.set("#overlay", {
            backgroundColor: "#F5E8E7",
        });

        await gsap.to("#overlay", {
            duration: 0.4,
            opacity: 1,
        });
    }

    await WebGL.initializeHome();
    homeLoaded(done);
    helloAnimation = CreateHelloAnimation();
    projectsAnimation = CreateProjectsAnimation();
    manifestoTitleAnimation = CreateManifestoTitleAnimation();
    manifestoValuesAnimation = CreateManifestoValuesAnimation();
    textMasksAnimation = CreateTextMasksAnimation();
}

export function homeLoaded(done) {
    const webglAppear = { typoOpacity: 0, typoScale: 0, noiseOpacity: 0 };

    const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
            done();
        },
    });

    tl.set("#overlay", { opacity: 0 });

    document.documentElement.classList.remove("no-scroll");
    if (lenis && lenis.isStopped) lenis.start();
    lenis.resize();

    tl.to(
        webglAppear,
        {
            noiseOpacity: 1,
            duration: 2,
            onUpdate: () => WebGL.setAppearValue(webglAppear),
        },
        "start"
    )
        .to(
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
            "#helloMonolithWrapper",
            {
                y: 0,
                duration: 1,
                ease: "power3.out",
            },
            "start+=1"
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

export function homeLeave(done) {
    if (lenis) lenis.stop();
    document.documentElement.classList.add("no-scroll");

    const webglAppear = { typoOpacity: 1, typoScale: 1, noiseOpacity: 1 };

    const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
            killAnimations();
            done();
        },
    });

    tl.to(
        webglAppear,
        {
            noiseOpacity: 0,
            duration: 0.4,
            onUpdate: () => WebGL.setAppearValue(webglAppear),
        },
        "start"
    )
        .to(
            webglAppear,
            {
                typoOpacity: 0,
                duration: 0.4,
                onUpdate: () => WebGL.setAppearValue(webglAppear),
            },
            "start"
        )
        .to(
            "#helloMonolithWrapper",
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
        );

    tl.play();
}

function killAnimations() {
    const { mm, tl } = projectsAnimation;
    if (tl) tl.kill();
    if (mm) mm.revert();

    if (helloAnimation) helloAnimation.kill();

    const { title, speed } = manifestoTitleAnimation;
    if (title) title.kill();
    if (speed) speed.kill();

    if (manifestoValuesAnimation)
        manifestoValuesAnimation.forEach((t) => t.kill());

    const { footerTween, headerTween } = textMasksAnimation;
    if (footerTween) footerTween.kill();
    if (headerTween) headerTween.kill();
}
