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
    WebGl.setLogo(logo);

    return gsap.to(logo, {
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

export function CreateThingiesAnimation(thingies) {
    const tls = [];
    thingies.forEach((thingy) => {
        const values = {
            opacity: 0,
            rotate: 0,
        };
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: thingy,
                scrub: false,
                start: "top bottom-=400px",
                end: "bottom top",
            },
        });

        tl.to(
            values,
            {
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                onUpdate: () => (thingy.dataset.opacity = values.opacity),
            },
            "start"
        ).to(
            values,
            {
                rotate: 1,
                duration: 3,
                ease: "elastic.out(1, 0.3)",
                onUpdate: () => (thingy.dataset.rotate = values.rotate),
            },
            "start"
        );
        tls.push(tl);
    });
    return tls;
}

export function CreateImagesAnimation() {
    const imagesProxy = document.getElementById("imagesProxy");
    const offsetProxy = document.querySelectorAll(".image-gl-wrapper")[0];

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#imgShape",
            scrub: true,
            start: "top 80%",
            end: () => `bottom+=${window.innerWidth * 0.2}px 30%`,
            invalidateOnRefresh: true,
        },
    });

    tl.to(
        "#imgWrap2",
        {
            scale: 1.3,
            duration: 1,
            xPercent: () => {
                return getComputedStyle(imagesProxy).getPropertyValue(
                    "--horizontalOffset"
                ) === "fixed"
                    ? 0
                    : 100;
            },
            x: () => {
                return getComputedStyle(imagesProxy).getPropertyValue(
                    "--horizontalOffset"
                ) === "fixed"
                    ? 230
                    : 0;
            },
            y: () => {
                return (
                    getComputedStyle(offsetProxy)
                        .getPropertyValue("--verticalOffset")
                        .split("px")[0] * -1
                );
            },
            ease: "power3.inOut",
        },
        "start"
    )
        .to(
            "#imgWrap1",
            {
                scale: 1,
                duration: 1,
                y: () => {
                    return (
                        getComputedStyle(offsetProxy)
                            .getPropertyValue("--verticalOffset")
                            .split("px")[0] * -1
                    );
                },
                xPercent: () => {
                    return getComputedStyle(imagesProxy).getPropertyValue(
                        "--horizontalOffset"
                    ) === "fixed"
                        ? 0
                        : 100;
                },
                x: () => {
                    return getComputedStyle(imagesProxy).getPropertyValue(
                        "--horizontalOffset"
                    ) === "fixed"
                        ? 230
                        : 0;
                },
                ease: "power3.inOut",
            },
            "start"
        )
        .to(
            "#imgWrap0",
            {
                scale: 1,
                duration: 1,
                y: () => {
                    return (
                        getComputedStyle(offsetProxy)
                            .getPropertyValue("--verticalOffset")
                            .split("px")[0] * -1
                    );
                },
                xPercent: () => {
                    return getComputedStyle(imagesProxy).getPropertyValue(
                        "--horizontalOffset"
                    ) === "fixed"
                        ? 0
                        : 100;
                },
                x: () => {
                    return getComputedStyle(imagesProxy).getPropertyValue(
                        "--horizontalOffset"
                    ) === "fixed"
                        ? 230
                        : 0;
                },
                ease: "power3.inOut",
            },
            "start"
        );
    return tl;
}
