import Lenis from "@studio-freight/lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlowMo } from "gsap/EasePack";

import WebGl from "../WebGL";

export function CreateHelloAnimation() {
    const logo = {
        scaleY: 1,
        y: 0,
        scrollOut: 0,
    };

    gsap.to(logo, {
        scrollTrigger: {
            trigger: "#about",
            scrub: true,
            start: "top -1px",
            end: () => `top -${WebGl.typoSizeInPixels.height * 1.3 + 60}px`,
            onUpdate: () => {
                WebGl.setLogo(logo);
            },
            invalidateOnRefresh: true,
        },
        scrollOut: 1,
        ease: "linear",
    });
}
