import "./assets/scss/main.scss";

import { gsap } from "gsap";

import CreateWebGL from "./assets/js/WebGL";
import CreateGrid from "./assets/js/grid";
import { CreateScroll, CreateProjectsAnimation } from "./assets/js/scroll";

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

const { lenis } = CreateScroll();
const gl = new CreateWebGL();
CreateProjectsAnimation();

CreateGrid();

requestAnimationFrame(raf);
