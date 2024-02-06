import Lenis from "@studio-freight/lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlowMo } from "gsap/EasePack";

import WebGl from "../WebGL";

export let lenis;

export function CreateScroll() {
    gsap.registerPlugin(ScrollTrigger, SlowMo);

    lenis = new Lenis({ smooth: true });

    lenis.on("scroll", () => {
        ScrollTrigger.update();
        WebGl.setScroll({
            y: lenis.animatedScroll,
            velocity: lenis.velocity,
        });
    });

    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
}
