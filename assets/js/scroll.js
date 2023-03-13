import Lenis from "@studio-freight/lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlowMo } from "gsap/EasePack";

import WebGl from "./WebGL";

export function CreateScroll() {
    gsap.registerPlugin(ScrollTrigger, SlowMo);

    const lenis = new Lenis({ smooth: true });

    lenis.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.create({
        onUpdate: (self) => WebGl.setScroll({ velocity: self.getVelocity() }),
    });

    return { lenis };
}

export function CreateProjectsAnimation() {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1100px)", () => {
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

        return () => {
            gsap.set("#projectsTitle", { y: 0 });
        };
    });

    const monolithBg = document.getElementById("projectsMonolithBg");

    const maxScaleX = function () {
        const gridGutter = parseInt(
            window
                .getComputedStyle(document.documentElement)
                .getPropertyValue("--gutter")
        );
        const currentWidth = monolithBg.offsetWidth;
        const scale = (gridGutter * 2) / currentWidth;
        return 1 + scale;
    };

    /** --- BACKGROUND EXPAND --- **/
    const expandTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#projectsMonolith",
            scrub: true,
            start: "top 30%",
            end: "bottom 70%",
            invalidateOnRefresh: true,
        },
    });
    expandTl
        .to("#projectsMonolithBg", {
            duration: 1.8,
            scaleX: maxScaleX,
        })
        .to("#projectsMonolithBg", {
            duration: 8,
            scaleX: maxScaleX,
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
        scrollOut: 0,
    };

    gsap.to(logo, {
        scrollTrigger: {
            trigger: "#home",
            scrub: true,
            start: "top -1px",
            end: `top -50%`,
            onUpdate: () => WebGl.setLogo(logo),
        },
        scrollOut: 1,
        ease: "linear",
    });
}

export function CreateManifestoTitleAnimation() {
    const titleLineWrapperOne = document.getElementById(
        "manifestoTitleLineOne"
    );
    const titleLineWrapperTwo = document.getElementById(
        "manifestoTitleLineTwo"
    );

    const tl = gsap.timeline({
        repeat: -1,
    });
    tl.to(
        titleLineWrapperOne,
        {
            x: "-=33.3333%",
            duration: 20,
            ease: "linear",
        },
        "start"
    ).to(
        titleLineWrapperTwo,
        {
            x: "+=33.3333%",
            duration: 20,
            ease: "linear",
        },
        "start"
    );

    ScrollTrigger.create({
        trigger: "#manifestoTitle",
        start: "top bottom",
        end: "bottom top",
        onUpdate: function (self) {
            const speedMultiplier = 250;
            const velocity = Math.abs(self.getVelocity()) / speedMultiplier;
            tl.timeScale(1 + velocity);
        },
    });
}

export function CreateManifestoValuesAnimation() {
    const values = document.querySelectorAll(".value");
    [...values].forEach((value, index) => {
        const innerValue = value.querySelector(".inner-value");
        const isLast = index === values.length - 1;
        const isFirst = index === 0;

        const activeTl = gsap.timeline({
            scrollTrigger: {
                trigger: value,
                scrub: true,
                start: "top 50%",
                end: "bottom 50%",
                invalidateOnRefresh: true,
                amrkers: true,
            },
        });
        activeTl
            .to(innerValue, {
                duration: 0,
                opacity: isFirst ? 1 : 0.2,
            })
            .to(innerValue, {
                duration: 0,
                opacity: 1,
            })
            .to(innerValue, {
                duration: 1,
                opacity: 1,
            })
            .to(innerValue, {
                duration: 0,
                opacity: isLast ? 1 : 0.2,
            });
    });
}

export function CreateTextMasksAnimation() {
    const textMasks = {
        bottom: 0,
    };

    gsap.to(textMasks, {
        scrollTrigger: {
            trigger: "#footer",
            scrub: true,
            start: () => "top-=156px bottom",
            end: () => `bottom bottom`,
            onUpdate: () => WebGl.setTextMasks(textMasks),
            onRefresh: () => WebGl.setTextMasks(textMasks),
            invalidateOnRefresh: true,
        },
        bottom: 1,
        ease: "linear",
    });
}
