import "./assets/scss/main.scss";

import { gsap } from "gsap";

import WebGl from "./assets/js/WebGL";
import CreateGrid from "./assets/js/grid";
import CreateLoadedAnimation from "./assets/js/loadedAnimation";

import {
    CreateScroll,
    CreateProjectsAnimation,
    CreateHelloAnimation,
    CreateManifestoTitleAnimation,
    CreateManifestoValuesAnimation,
} from "./assets/js/scroll";

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

// CreateLoadedAnimation();
const { lenis } = CreateScroll();
CreateHelloAnimation();
CreateProjectsAnimation();
CreateManifestoTitleAnimation();
CreateManifestoValuesAnimation();

CreateGrid();

requestAnimationFrame(raf);
