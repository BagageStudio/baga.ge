import {
    Renderer,
    Triangle,
    Program,
    Mesh,
    Post,
    Vec2,
    Vec3,
    Texture,
    Plane,
    Camera,
    Transform,
} from "ogl";

import { gsap } from "gsap";
import { SlowMo } from "gsap/EasePack";
gsap.registerPlugin(SlowMo);

import ImageGL from "./ImageGL";

import { lerp, getNextGenImageSupport } from "./utils.js";

import planeFragment from "../shader/planeFragment.glsl";
import imageVertex from "../shader/imageVertex.glsl";

import post from "../shader/post.glsl";

import bagageTypoPng from "../img/bagage-white.png";
import bagageTypoWebp from "../img/bagage-white.png";
import bagageTypoAvif from "../img/bagage-white.png";

import ditherTextureBayer16 from "../img/ditherTexture/bayer16.png";
import ditherTextureTiles from "../img/ditherTexture/tiles.png";

import ditherPaletteDefault from "../img/palettes/default.jpg";
import ditherPaletteGrey from "../img/palettes/grey.jpg";
import ditherPaletteEga from "../img/palettes/c_ega.jpg";

class WebGL {
    constructor() {
        this.initialized = false;
        this.ready = false;
        this.params = {
            post: true,
            pixelated: true,
            dithered: true,
            pixelation: 165,
            pixelRatio: 0.1,
            postProcessingType: "luminance",
            ditherTexture: "tiles",
            ditherPalette: "grey.jpg",
            inversedPalette: true,
            inversedTexture: false,
            rampContrast: 1,
            rampOffset: 0,
            color: {
                r: 0.95,
                g: 0.31,
                b: 0.17,
            },
            backgroundColor: {
                r: 0.961,
                g: 0.91,
                b: 0.906,
            },
            ditherFactor: 0.2,
            noiseThreshold: 0.2,
            noisePower: 1,
        };

        this.textures = {};

        this.scroll = {
            y: 0,
            velocity: 0,
        };

        this.textMasks = {
            bottom: 0,
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

        this.typoAspectRatio = 0;

        this.typoSizeInPixels = {
            width: 0,
            height: 0,
        };
    }

    initialize() {
        this.addEventListeners();
        this.createRenderer();
        this.createSceneCamera();
        this.onResize();
        this.planeGeometry = new Plane(this.gl);
        this.createFullscreenPlane();

        this.createPostProcessing();
        this.onResize();
        this.update();
        this.initialized = true;
    }

    async initializeHome() {
        const textures = await this.loadImages({
            bagageTypoPng,
            ditherTextureBayer16,
            ditherPaletteDefault,
        });
        this.addTextures(textures);

        this.ditherPalette = this.textures.ditherPaletteDefault;
        this.ditherTexture = this.textures.ditherTextureBayer16;

        if (!this.initialized) this.initialize();

        this.ditherPaletteTexture.image = this.ditherPalette;
        this.ditherTextureTexture.image = this.ditherTexture;
        this.pass.uniforms.uDitherTextureSize.value =
            this.ditherTexture.naturalWidth;

        this.onResize();
    }

    async initializeAbout(imgs) {
        return new Promise(async (resolve, reject) => {
            const textures = await this.loadImages({
                bagageTypoPng,
                ditherTextureTiles,
                ditherPaletteGrey,
            });

            this.addTextures(textures);
            this.ditherPalette = this.textures.ditherPaletteGrey;
            this.ditherTexture = this.textures.ditherTextureTiles;

            if (!this.initialized) this.initialize();

            await this.createGLImages(imgs);

            console.log("alors oui");

            this.ditherPaletteTexture.image = this.ditherPalette;
            this.ditherTextureTexture.image = this.ditherTexture;
            this.pass.uniforms.uDitherTextureSize.value =
                this.ditherTexture.naturalWidth;

            this.onResize();

            resolve();
        });
    }

    async loadImages(images) {
        return new Promise(async (resolve, reject) => {
            const imgs = Object.keys(images);
            const imgsPromises = [];

            for (let index = 0; index < imgs.length; index++) {
                const image = images[imgs[index]];
                if (!this.textures[imgs[index]]) {
                    imgsPromises.push(
                        new Promise((resolve, reject) => {
                            const imgEl = new Image();
                            imgEl.src = image;
                            imgEl.onload = (_) => {
                                resolve({ [imgs[index]]: imgEl });
                            };
                        })
                    );
                }
            }

            const loadedImage = await Promise.all(imgsPromises).then((res) => {
                return res.reduce((acc, cur) => {
                    return { ...acc, ...cur };
                }, {});
            });

            resolve(loadedImage);
        });
    }

    async createGLImages(imgs) {
        this.imageElements = [...imgs];
        const imgsPromises = [];

        this.images = this.imageElements.map((element) => {
            let media = new ImageGL({
                element,
                geometry: this.planeGeometry,
                gl: this.gl,
                scene: this.scene,
                screen: this.screen,
                viewport: this.viewport,
            });

            imgsPromises.push(media.initialize());

            return media;
        });

        return Promise.all(imgsPromises);
    }

    createSceneCamera() {
        this.scene = new Transform();
        this.camera = new Camera(this.gl, { fov: 45 });
        this.camera.position.z = 5;
    }

    async createFullscreenPlane() {
        const texture = new Texture(this.gl, {
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });

        const program = new Program(this.gl, {
            fragment: planeFragment,
            vertex: imageVertex,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uTextGutter: { value: 0 },
                uResolution: this.resolution,
                uTime: { value: 0 },
                uAppearNoiseOpacity: { value: 0 },
                uAppearTypoOpacity: { value: 0 },
                uAppearTypoScale: { value: 0 },
                uReduceScaling: { value: this.logo.scaleY },
                uVerticalTranslation: { value: this.logo.y },
                uScrollOut: { value: this.logo.scrollOut },
                uBottomMask: { value: this.textMasks.bottom },
                uNoiseThreshold: { value: this.params.noiseThreshold },
                uNoisePower: { value: this.params.noisePower },
            },
            transparent: true,
        });

        texture.image = this.textures.bagageTypoPng;

        program.uniforms.uImageSizes.value = [
            this.textures.bagageTypoPng.naturalWidth,
            this.textures.bagageTypoPng.naturalHeight,
        ];
        this.typoAspectRatio =
            this.textures.bagageTypoPng.naturalWidth /
            this.textures.bagageTypoPng.naturalHeight;
        this.onResize();
        this.ready = true;
        if (this.readyCallback) this.readyCallback();

        // getNextGenImageSupport().then((supportedImageFormats) => {
        //     let bagageTypoImage = bagageTypoPng;
        //     const { avif, webp } = supportedImageFormats;

        //     if (avif) {
        //         bagageTypoImage = bagageTypoAvif;
        //     } else if (webp) {
        //         bagageTypoImage = bagageTypoWebp;
        //     }

        //     image.src = bagageTypoImage;
        //     image.onload = (_) => {
        //         texture.image = image;
        //     };
        // });

        this.fullscreenPlane = new Mesh(this.gl, {
            geometry: this.planeGeometry,
            program,
        });

        this.fullscreenPlane.setParent(this.scene);
    }

    createPostProcessing() {
        this.post = new Post(this.gl);

        this.ditherTextureTexture = new Texture(this.gl, {
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });
        this.ditherPaletteTexture = new Texture(this.gl, {
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });

        this.pass = this.post.addPass({
            vertex: `#version 300 es
                in vec2 uv;
                in vec2 position;

                out vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 0, 1);
                }`,
            fragment: post,
            uniforms: {
                uDitherTexture: { value: this.ditherTextureTexture },
                uDitherTextureSize: { value: 0 },
                uDitherPalette: { value: this.ditherPaletteTexture },
                uTime: { value: 0 },
                pixelated: { value: 1 },
                pixelation: { value: 100 },
                dithered: { value: 1 },
                uDitherType: {
                    value: this.params.postProcessingType === "color" ? 1 : 0,
                },
                uInversedPalette: { value: 0 },
                uInversedTexture: { value: 0 },
                pixelRatio: { value: 0 },
                uResolution: this.resolution,
                uLmRampConstrast: { value: this.params.rampContrast },
                uLmRampOffset: { value: this.params.rampOffset },
                uCmDistanceFactor: { value: this.params.ditherFactor },
            },
        });

        this.ditherTextureTexture.image = this.ditherTexture;
        this.pass.uniforms.uDitherTextureSize.value =
            this.ditherTexture.naturalWidth;
        this.ditherPaletteTexture.image = this.ditherPalette;
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

    onMouseMove(event) {}

    onTouchDown(event) {}

    onTouchMove(event) {}

    onTouchUp(event) {}

    onWheel(event) {}

    onResize() {
        if (this.camera) {
            this.camera.perspective({
                aspect: this.gl.canvas.width / this.gl.canvas.height,
            });
            const fov = this.camera.fov * (Math.PI / 180);
            const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
            const width = height * this.camera.aspect;

            this.viewport = {
                height,
                width,
            };
        }

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

        this.resolution.value.set(this.screen.width, this.screen.height);

        this.renderer.setSize(this.screen.width, this.screen.height);

        if (this.fullscreenPlane) {
            this.fullscreenPlane.scale.x = this.viewport.width;
            this.fullscreenPlane.scale.y = this.viewport.height;
        }

        if (this.images) {
            this.images.forEach((image) =>
                image.onResize({
                    screen: this.screen,
                    viewport: this.viewport,
                })
            );
        }

        const currentTypoWidth = this.screen.width - this.textGutter;
        const currentTypoHeight = currentTypoWidth / this.typoAspectRatio;
        this.typoSizeInPixels = {
            width: currentTypoWidth,
            height: currentTypoHeight,
        };
    }

    update() {
        if (this.fullscreenShader) {
            this.fullscreenShader.program.uniforms.uResolution =
                this.resolution;
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

            this.fullscreenShader.program.uniforms.uBottomMask.value =
                this.textMasks.bottom;
            this.fullscreenShader.program.uniforms.uNoiseThreshold.value =
                this.params.noiseThreshold;
            this.fullscreenShader.program.uniforms.uNoisePower.value =
                this.params.noisePower;
        }

        if (this.fullscreenPlane) {
            this.fullscreenPlane.program.uniforms.uResolution = this.resolution;
            this.fullscreenPlane.program.uniforms.uTextGutter.value =
                this.textGutter;
            this.fullscreenPlane.program.uniforms.uTime.value += 0.04;
            this.fullscreenPlane.program.uniforms.uAppearNoiseOpacity.value =
                this.appear.noiseOpacity;
            this.fullscreenPlane.program.uniforms.uAppearTypoOpacity.value =
                this.appear.typoOpacity;
            this.fullscreenPlane.program.uniforms.uAppearTypoScale.value =
                this.appear.typoScale;

            this.fullscreenPlane.program.uniforms.uScrollOut.value =
                this.logo.scrollOut;

            this.fullscreenPlane.program.uniforms.uReduceScaling.value =
                this.logo.scaleY;

            this.fullscreenPlane.program.uniforms.uVerticalTranslation.value =
                this.logo.y;

            this.fullscreenPlane.program.uniforms.uBottomMask.value =
                this.textMasks.bottom;

            this.fullscreenPlane.program.uniforms.uNoiseThreshold.value =
                this.params.noiseThreshold;
            this.fullscreenPlane.program.uniforms.uNoisePower.value =
                this.params.noisePower;
        }

        this.pass.program.uniforms.uResolution = this.resolution;
        this.pass.program.uniforms.uTime.value += 0.04;
        this.pass.program.uniforms.uInversedPalette.value =
            this.params.inversedPalette;
        this.pass.program.uniforms.uInversedTexture.value =
            this.params.inversedTexture;
        this.pass.program.uniforms.pixelated.value = this.params.pixelated;
        this.pass.program.uniforms.dithered.value = this.params.dithered;
        this.pass.program.uniforms.pixelation.value = this.params.pixelation;
        this.pass.program.uniforms.pixelRatio.value = this.params.pixelRatio;
        this.pass.program.uniforms.pixelRatio.value = this.params.pixelRatio;
        this.pass.program.uniforms.uLmRampConstrast.value =
            this.params.rampContrast;
        this.pass.program.uniforms.uLmRampOffset.value = this.params.rampOffset;
        this.pass.program.uniforms.uCmDistanceFactor.value =
            this.params.ditherFactor;

        if (this.images) {
            this.images.forEach((image) => image.update(this.scroll.y));
        }

        this.gl.clearColor(0, 0, 0, 1);

        const renderTarget = this.params.post ? this.post : this.renderer;

        // renderTarget.render({
        //     scene: this.fullscreenShader,
        // });

        renderTarget.render({ scene: this.scene, camera: this.camera });

        window.requestAnimationFrame(this.update.bind(this));
    }

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

    setScroll({ velocity, y }) {
        const speedMultiplier = 5000;
        this.scroll.y = y;
        this.scroll.velocity =
            1 + Math.min(Math.abs(velocity), 500) / speedMultiplier;
    }
    setTextMasks(textMasks) {
        this.textMasks = textMasks;
    }

    setReadyCallback(callback) {
        this.readyCallback = callback;
    }

    addTextures(textures) {
        this.textures = { ...this.textures, ...textures };
    }
}

export default new WebGL();
