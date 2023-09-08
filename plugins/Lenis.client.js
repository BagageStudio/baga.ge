import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlowMo } from "gsap/EasePack";
import WebGL from "~/assets/js/WebGL";

gsap.registerPlugin(ScrollTrigger, SlowMo);

const lenis = new Lenis({ smooth: true });

lenis.on("scroll", () => ScrollTrigger.update());

ScrollTrigger.create({
    onUpdate: (self) => WebGL.setScroll({ velocity: self.getVelocity() }),
});

const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("lenis", lenis);

    // scroll to top on route change
    nuxtApp.$router.afterEach((to, from) => {
        if (to.path !== from.path) {
            lenis.scrollTo("#app", {
                // your container class or id
                offset: 0,
                duration: 0,
                easing: () => {},
                immediate: true,
            });
        }
    });
});
