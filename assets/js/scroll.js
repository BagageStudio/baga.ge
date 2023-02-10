import Lenis from "@studio-freight/lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlowMo } from "gsap/EasePack";

import WebGl from "./WebGL";

export function CreateScroll() {
    gsap.registerPlugin(ScrollTrigger, SlowMo);

    const lenis = new Lenis({ smooth: true });

    lenis.on("scroll", () => ScrollTrigger.update());

    return { lenis };
}

export function CreateProjectsAnimation() {
    /** --- SMOOTH STICKY --- **/
    /**
     * VVO = Vertical Offset we want Visually
     *     = The offset that was initially in the CSS "top" on the "position: sticky" element ) : 150px
     *     = 150px
     *
     * ED  = Easing Distance
     *     = The distance the element should translate up to smooth the sticky. The larger the smoother
     *     = 200px
     *
     * PPT = Parent Padding Top (optionnal)
     *     = In our case we are watching the parent (#projectsMonolith) entering and leaving the screen.
     *       If it has a padding top we should keep it in mind for our calculations
     *     = 130px
     *
     * PPB = Parent Padding Bottom (optionnal)
     *     = In our case we are watching the parent (#projectsMonolith) entering and leaving the screen.
     *       If it has a padding bottom we should keep it in mind for our calculations
     *     = 200px
     *
     * H   = Sticky Element Height
     *     = Computed from javascript, we're using it like this ${stickyElement.offsetHeight} to have it dynamic (auto recalculate on resize)
     *
     * With these 3 values we can set the parameters:
     *
     * CSS "top" on the sticky element
     *     = VVO + ED
     *
     * CSS "padding-bottom" on the sticky element
     *     = ED
     *
     * scrollTrigger In "start" param
     *     = VVO + ED - PPT
     *
     * scrollTrigger In "end" param
     *     = -ED
     *
     * scrollTrigger In "y" transform
     *     = -ED
     *
     * scrollTrigger Out "start" param. Use a function to have the H dynamic (auto recalculate on resize)
     *     = VVO + ED + PPB + H
     *
     * scrollTrigger Out "end" param
     *     = PPB
     *
     * scrollTrigger Out "y" transform
     *     = ED
     *
     */

    const stickyElement =
        document.getElementById("projectsTitle").parentElement;

    /** --- SMOOTH STICKY IN --- **/
    gsap.to("#projectsTitle", {
        scrollTrigger: {
            trigger: "#projectsMonolith",
            scrub: true,
            start: "top 220px",
            end: "top -200px",
        },
        y: -200,
        ease: "sine.out",
    });

    /** --- SMOOTH STICKY OUT --- **/
    gsap.fromTo(
        "#projectsTitle",
        {
            y: -200,
        },
        {
            scrollTrigger: {
                trigger: "#projectsMonolith",
                scrub: true,
                start: () => `bottom ${550 + stickyElement.offsetHeight}px`,
                end: "bottom 200px",
            },
            y: 200,
            ease: "sine.out",
            immediateRender: false,
        }
    );

    /** --- DRAWING LINES --- **/
    const lines = document.querySelectorAll(".overflow-line");
    [...lines].forEach((line) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: line,
                scrub: true,
                start: "top 80%",
                end: "top 30%",
            },
            scaleX: 0,
            ease: "power2.inOut",
        });
    });

    /** --- BACKGROUND EXPAND --- **/
    const expandTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#projectsMonolith",
            scrub: true,
            start: "top 30%",
            end: "bottom 70%",
        },
    });
    expandTl
        .to("#projectsMonolithBg", {
            duration: 1.8,
            scaleX: 1.07,
        })
        .to("#projectsMonolithBg", {
            duration: 8,
            scaleX: 1.07,
        })
        .to("#projectsMonolithBg", {
            duration: 1.4,
            scaleX: 1,
        });
}

export function CreateHelloAnimation() {
    const logo = {
        scaleY: 1,
        y: 0,
    };

    const TOP_OFFSET = 120;

    gsap.to(logo, {
        scrollTrigger: {
            trigger: "#helloMonolith",
            scrub: true,
            start: () => `top ${(window, (innerWidth / 100) * 19)}`,
            end: `top ${TOP_OFFSET}`,
            onUpdate: () => WebGl.setLogo(logo),
        },
        scaleY: 0,
        ease: "power1.in",
    });
    gsap.to(logo, {
        scrollTrigger: {
            trigger: "#helloMonolith",
            scrub: true,
            start: `top ${TOP_OFFSET}`,
            end: "top top",
            onUpdate: () => WebGl.setLogo(logo),
        },
        y: 1,
        ease: "linear",
    });
}
