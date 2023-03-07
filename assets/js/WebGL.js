import {
    Renderer,
    Triangle,
    Program,
    Mesh,
    Post,
    Vec2,
    Vec3,
    Texture,
} from "ogl";

import { gsap } from "gsap";
import { SlowMo } from "gsap/EasePack";
gsap.registerPlugin(SlowMo);

import { lerp } from "./utils.js";

import planeFragment from "../shader/planeFragment.glsl";
import planeVertex from "../shader/planeVertex.glsl";
import post from "../shader/post.glsl";

import planeImage from "../img/repro-black.png";

class WebGL {
    constructor() {
        this.params = {
            post: true,
            pixelated: true,
            dithered: true,
            pixelation: 165,
            pixelRatio: 0.1,
            color: {
                r: 0.95,
                g: 0.31,
                b: 0.17,
            },
            backgroundColor: {
                r: 0.91,
                g: 0.88,
                b: 0.85,
            },
            appearTween: 1,
        };

        this.logo = {
            scaleY: 1,
            y: 0,
            scrollOut: 0,
        };

        this.appear = {
            typoOpacity: 0,
            typoScale: 0,
            noiseOpacity: 0,
        };

        this.MAX_ANGLE = Math.PI / 8;

        this.createRenderer();
        this.onResize();

        this.createFullscreenShader();

        this.createPostProcessing();

        this.onResize();

        this.update();

        this.addEventListeners();
    }

    createFullscreenShader() {
        this.fullscreenGeometry = new Triangle(this.gl);

        const texture = new Texture(this.gl);

        const program = new Program(this.gl, {
            fragment: planeFragment,
            vertex: planeVertex,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uTextGutter: { value: 0 },
                uResolution: this.resolution,
                uTime: { value: 0 },
                pixelated: { value: 0 },
                pixelation: { value: 100 },
                dithered: { value: 0 },
                pixelRatio: { value: 0.3 },
                uAppearNoiseOpacity: { value: 0 },
                uAppearTypoOpacity: { value: 0 },
                uAppearTypoScale: { value: 0 },
                uReduceScaling: { value: this.logo.scaleY },
                uVerticalTranslation: { value: this.logo.y },
                uScrollOut: { value: this.logo.scrollOut },
            },
            transparent: true,
        });

        const image = new Image();

        image.src = planeImage;
        image.onload = (_) => {
            texture.image = image;

            program.uniforms.uImageSizes.value = [
                image.naturalWidth,
                image.naturalHeight,
            ];
        };

        this.fullscreenShader = new Mesh(this.gl, {
            geometry: this.fullscreenGeometry,
            program,
        });
    }

    createPostProcessing() {
        this.post = new Post(this.gl);
        const color = new Vec3(
            this.params.color.r,
            this.params.color.g,
            this.params.color.b
        );

        const bgColor = new Vec3(
            this.params.backgroundColor.r,
            this.params.backgroundColor.g,
            this.params.backgroundColor.b
        );

        this.pass = this.post.addPass({
            fragment: post,
            uniforms: {
                uTime: { value: 0 },
                pixelated: { value: 1 },
                pixelation: { value: 100 },
                dithered: { value: 1 },
                pixelRatio: { value: 0 },
                uResolution: this.resolution,
                uColor: { value: color },
                uBgColor: { value: bgColor },
            },
        });
    }

    createRenderer() {
        this.renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            dpr: 0.5,
        });

        this.gl = this.renderer.gl;
        this.gl.clearColor(1, 1, 1, 1);

        document.getElementById("c").appendChild(this.gl.canvas);
    }
    /**
     * Events.
     */

    onMouseMove(event) {
        // this.mouse.target = {
        //     x: event.clientX,
        //     y: event.clientY,
        // };
    }

    onTouchDown(event) {}

    onTouchMove(event) {}

    onTouchUp(event) {}

    onWheel(event) {}

    /**
     * Resize.
     */
    onResize() {
        this.resolution = { value: new Vec2() };
        this.textGutter =
            parseInt(
                window
                    .getComputedStyle(document.documentElement)
                    .getPropertyValue("--gutter")
            ) * 2;

        this.screen = {
            height: window.innerHeight,
            width: window.innerWidth,
        };

        this.mouse = {
            ease: 0.4,
            current: {
                x: this.screen.width / 2,
                y: this.screen.height / 2,
            },
            target: {
                x: this.screen.width / 2,
                y: this.screen.height / 2,
            },
            last: {
                x: this.screen.width / 2,
                y: this.screen.height / 2,
            },
        };

        this.resolution.value.set(this.screen.width, this.screen.height);

        this.renderer.setSize(this.screen.width, this.screen.height);
    }

    /**
     * Update.
     */
    update() {
        this.mouse.current.x = lerp(
            this.mouse.current.x,
            this.mouse.target.x,
            this.mouse.ease
        );

        this.mouse.current.y = lerp(
            this.mouse.current.y,
            this.mouse.target.y,
            this.mouse.ease
        );

        const color = new Vec3(
            this.params.color.r,
            this.params.color.g,
            this.params.color.b
        );

        const bgColor = new Vec3(
            this.params.backgroundColor.r,
            this.params.backgroundColor.g,
            this.params.backgroundColor.b
        );

        this.fullscreenShader.program.uniforms.uResolution = this.resolution;
        this.fullscreenShader.program.uniforms.uTextGutter.value =
            this.textGutter;
        this.fullscreenShader.program.uniforms.uTime.value += 0.04;
        this.fullscreenShader.program.uniforms.uAppearNoiseOpacity.value =
            this.appear.noiseOpacity;
        this.fullscreenShader.program.uniforms.uAppearTypoOpacity.value =
            this.appear.typoOpacity;
        this.fullscreenShader.program.uniforms.uAppearTypoScale.value =
            this.appear.typoScale;

        this.fullscreenShader.program.uniforms.uScrollOut.value =
            this.logo.scrollOut;

        this.fullscreenShader.program.uniforms.uReduceScaling.value =
            this.logo.scaleY;

        this.fullscreenShader.program.uniforms.uVerticalTranslation.value =
            this.logo.y;

        this.pass.program.uniforms.uResolution = this.resolution;
        this.pass.program.uniforms.uTime.value += 0.04;
        this.pass.program.uniforms.pixelated.value = this.params.pixelated;
        this.pass.program.uniforms.dithered.value = this.params.dithered;
        this.pass.program.uniforms.pixelation.value = this.params.pixelation;
        this.pass.program.uniforms.pixelRatio.value = this.params.pixelRatio;
        this.pass.program.uniforms.uColor.value = color;
        this.pass.program.uniforms.uBgColor.value = bgColor;

        this.gl.clearColor(1, 1, 1, 1);

        const renderTarget = this.params.post ? this.post : this.renderer;

        renderTarget.render({
            scene: this.fullscreenShader,
        });

        window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Listeners.
     */
    addEventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    setLogo(logo) {
        this.logo = logo;
    }

    setAppearValue(appear) {
        this.appear = appear;
    }
}

export default new WebGL();
