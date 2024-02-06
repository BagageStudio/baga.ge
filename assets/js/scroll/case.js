import { gsap } from "gsap";

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
            trigger: "#case",
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
