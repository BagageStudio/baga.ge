import { gsap } from "gsap";
import WebGl from "./WebGL";

export default function () {
    const tl = gsap.timeline({ paused: true });

    const webglAppear = {
        typoOpacity: 0,
        typoScale: 0,
        noiseOpacity: 0,
    };

    tl.to(
        webglAppear,
        {
            noiseOpacity: 1,
            duration: 2,
            onUpdate: () => WebGl.setAppearValue(webglAppear),
        },
        "start"
    )
        .to(
            webglAppear,
            {
                typoOpacity: 1,
                duration: 2,
                onUpdate: () => WebGl.setAppearValue(webglAppear),
            },
            "start"
        )
        .to(
            webglAppear,
            {
                typoScale: 1,
                duration: 2,
                ease: "power4.inOut",
                onUpdate: () => WebGl.setAppearValue(webglAppear),
            },
            "start"
        );

    const helloMonolithWrapper = document.getElementById(
        "helloMonolithWrapper"
    );

    if (helloMonolithWrapper) {
        tl.to(
            "#helloMonolithWrapper",
            {
                y: 0,
                duration: 1,
                ease: "power3.out",
            },
            "start+=1"
        );
    }

    tl.play();
}
