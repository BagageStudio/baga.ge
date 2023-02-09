import "./assets/scss/main.scss";

import { gsap } from "gsap";

import WebGl from "./assets/js/WebGL";
import CreateGrid from "./assets/js/grid";
import {
    CreateScroll,
    CreateProjectsAnimation,
    CreateHelloAnimation,
} from "./assets/js/scroll";

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

const { lenis } = CreateScroll();
CreateHelloAnimation();
CreateProjectsAnimation();

CreateGrid();

requestAnimationFrame(raf);
