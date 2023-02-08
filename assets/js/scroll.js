import Lenis from "@studio-freight/lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlowMo } from "gsap/EasePack";

export function CreateScroll() {
    gsap.registerPlugin(ScrollTrigger, SlowMo);

    const lenis = new Lenis({ smooth: true });

    lenis.on("scroll", () => ScrollTrigger.update());

    return { lenis };
}

export function CreateProjectsAnimation() {
    // OPACITY PROJECTS
    const projects = document.querySelectorAll(".project");
    [...projects].forEach((project) => {
        gsap.to(project, {
            scrollTrigger: {
                trigger: project,
                scrub: true,
                start: "top 90%",
                end: "top 50%",
            },
            opacity: 1,
        });
    });

    // DRAWING LINES
    const lines = document.querySelectorAll(".overflow-line");
    [...lines].forEach((line) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: line,
                scrub: true,
                start: "top 80%",
                end: "top 50%",
                markers: true,
            },
            width: 0,
        });
    });

    // SMOOTH STICKY
    gsap.to("#projectsTitle", {
        scrollTrigger: {
            trigger: "#projectsTitle",
            scrub: true,
            start: "top 300px",
            end: "top -350px",
        },
        y: 400,
        ease: "sine.in",
    });
}
