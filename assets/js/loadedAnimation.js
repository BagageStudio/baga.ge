import { gsap } from "gsap";
import WebGl from "./WebGL";

export default function () {
    if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }

    const tl = gsap.timeline({ paused: true });

    window.addEventListener("load", (event) => {
        tl.play();
    });

    const webglAppear = {
        typoOpacity: 0,
        typoScale: 0,
        noiseOpacity: 0,
    };

    tl.to(
        webglAppear,
        {
            typoOpacity: 1,
            duration: 1,
            onUpdate: () => WebGl.setAppearValue(webglAppear),
        },
        "start"
    )
        .to(
            webglAppear,
            {
                typoScale: 1,
                duration: 1,
                ease: "power2.inOut",
                onUpdate: () => WebGl.setAppearValue(webglAppear),
            },
            "start+=0.2"
        )
        .to(
            webglAppear,
            {
                noiseOpacity: 1,
                duration: 2,
                onUpdate: () => WebGl.setAppearValue(webglAppear),
            },
            "start+=1.1"
        )
        .to(
            "#helloMonolithWrapper",
            {
                y: 0,
                duration: 1,
                ease: "power3.out",
            },
            "start+=0.7"
        );
}