import { gsap } from "gsap";

import {
    CreateHelloAnimation,
    CreateThingiesAnimation,
} from "~/assets/js/scroll/about";

import WebGL from "~/assets/js/WebGL";

let helloAnimation;
let thingiesAnimation;

export async function aboutEnter(el, done = () => {}) {
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

    await WebGL.initializeAbout({
        imgs: [img1, img2],
        thingies: [thingy1, thingy2, thingy3],
    });

    aboutLoaded(done);

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
    if (thingiesAnimation) thingiesAnimation.forEach((t) => t.kill());
}
