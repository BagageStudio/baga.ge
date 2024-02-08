import { gsap } from "gsap";

import {
    CreateHelloAnimation,
    CreateThingiesAnimation,
    CreateImagesAnimation,
} from "~/assets/js/scroll/about";

import { lenis } from "~/assets/js/scroll/scroll";

import WebGL from "~/assets/js/WebGL";

let helloAnimation;
let thingiesAnimation;
let imagesAnimation;

export async function aboutEnter({ el, done = () => {}, firstLoad = false }) {
    const img0 = el.querySelector("#img0");
    const img1 = el.querySelector("#img1");
    const img2 = el.querySelector("#img2");

    const thingyEl1 = el.querySelector("#thingyEl1");
    const thingyEl2 = el.querySelector("#thingyEl2");
    const thingyEl3 = el.querySelector("#thingyEl3");
    const thingy1 = {
        el: thingyEl1,
        type: 1,
    };
    const thingy2 = {
        el: thingyEl2,
        type: 2,
    };
    const thingy3 = {
        el: thingyEl3,
        type: 3,
    };

    if (!firstLoad) {
        gsap.set("#overlay", {
            backgroundColor: "#191919",
        });

        await gsap.to("#overlay", {
            duration: 0.4,
            opacity: 1,
        });
    }

    await WebGL.initializeAbout({
        imgs: [img0, img1, img2],
        thingies: [thingy1, thingy2, thingy3],
    });

    aboutLoaded(() => {
        done();
        imagesAnimation = CreateImagesAnimation();
    });

    helloAnimation = CreateHelloAnimation();

    thingiesAnimation = CreateThingiesAnimation([
        thingyEl1,
        thingyEl2,
        thingyEl3,
    ]);
}

export function aboutLoaded(done) {
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
            "#heroWithImages",
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

export function aboutLeave(done) {
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
        );

    tl.play();
}

function killAnimations() {
    if (helloAnimation) helloAnimation.kill();
    if (imagesAnimation) imagesAnimation.kill();
    if (thingiesAnimation) thingiesAnimation.forEach((t) => t.kill());
}
