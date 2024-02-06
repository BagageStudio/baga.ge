import {
    Renderer,
    Triangle,
    Program,
    Mesh,
    Vec2,
    Texture,
    Plane,
    Camera,
    Transform,
    RenderTarget,
} from "ogl";

import { gsap } from "gsap";
import { SlowMo } from "gsap/EasePack";
gsap.registerPlugin(SlowMo);

import ImageGL from "./ImageGL";
import Thingy from "./Thingy";

import planeFragment from "../shader/planeFragment.glsl";
import planeVertex from "../shader/planeVertex.glsl";

import postFragment from "../shader/postFragment.glsl";
import postVertex from "../shader/postVertex.glsl";

import bagageTypoPng from "../img/mainTypo/bagage.png";

import ditherTextureBayer16 from "../img/ditherTexture/bayer16.png";
import ditherTextureTiles from "../img/ditherTexture/tiles.png";

import ditherPaletteDefault from "../img/palettes/default.jpg";
import ditherPaletteVision from "../img/palettes/vision.png";
import ditherPaletteDark from "../img/palettes/dark.jpg";

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
            inversedPalette: true,
            inversedTexture: false,
            rampContrast: 1,
            rampOffset: 0,
            ditherFactor: 0.2,
            noiseThreshold: 0.2,
            noisePower: 1,
        };

        this.textures = {};

        this.mainTextImageName = "";

        this.scroll = {
            y: 0,
            velocity: 0,
        };

        this.textMasks = {
            bottom: 0,
            top: 0,
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

        this.isMobile = false;
    }

    initialize() {
        this.addEventListeners();
        this.createRenderer();
        this.createSceneCamera();
        this.onResize();
        this.planeGeometry = new Plane(this.gl);
        this.createFullscreenPlane();

        this.createPost();

        this.onResize();
        this.update();
        this.isMobile = window.innerWidth < 800;
        this.initialized = true;
    }

    async initializeHome() {
        this.textMasks = { bottom: 0, top: 1 };
        const textures = await this.loadImages({
            bagageTypoPng,
            ditherTextureBayer16,
            ditherPaletteDefault,
        });
        this.addTextures(textures);
        this.setMainTextImage("bagageTypoPng");

        this.primaryDitherPalette = this.textures.ditherPaletteDefault;
        this.primaryDitherTexture = this.textures.ditherTextureBayer16;
        this.secondaryDitherPalette = this.primaryDitherPalette;
        this.secondaryDitherTexture = this.primaryDitherTexture;

        if (!this.initialized) this.initialize();

        this.fullscreenPlane.program.uniforms.uHasNoise.value = 1;

        this.primaryDitherPaletteTexture.image = this.primaryDitherPalette;
        this.primaryDitherTextureTexture.image = this.primaryDitherTexture;
        this.post.program.uniforms.uPrimaryDitherTextureSize.value =
            this.primaryDitherTexture.naturalWidth;

        this.secondaryDitherPaletteTexture.image = this.secondaryDitherPalette;
        this.secondaryDitherTextureTexture.image = this.secondaryDitherTexture;
        this.post.program.uniforms.uSecondaryDitherTextureSize.value =
            this.secondaryDitherTexture.naturalWidth;

        this.onResize();
    }

    async initializeAbout({ imgs, thingies }) {
        return new Promise(async (resolve, reject) => {
            const textures = await this.loadImages({
                bagageTypoPng,
                ditherTextureTiles,
                ditherTextureBayer16,
                ditherPaletteDark,
                ditherPaletteVision,
            });
            this.addTextures(textures);
            this.setMainTextImage("bagageTypoPng");

            this.textMasks = { bottom: 0, top: 0 };

            this.primaryDitherPalette = this.textures.ditherPaletteDark;
            this.primaryDitherTexture = this.textures.ditherTextureTiles;
            this.secondaryDitherPalette = this.textures.ditherPaletteVision;
            this.secondaryDitherTexture = this.textures.ditherTextureBayer16;

            if (!this.initialized) this.initialize();

            this.fullscreenPlane.program.uniforms.uHasNoise.value = 0;

            await this.createGLImages(imgs);

            this.primaryDitherPaletteTexture.image = this.primaryDitherPalette;
            this.primaryDitherTextureTexture.image = this.primaryDitherTexture;
            this.post.program.uniforms.uPrimaryDitherTextureSize.value =
                this.primaryDitherTexture.naturalWidth;

            this.secondaryDitherPaletteTexture.image =
                this.secondaryDitherPalette;
            this.secondaryDitherTextureTexture.image =
                this.secondaryDitherTexture;
            this.post.program.uniforms.uSecondaryDitherTextureSize.value =
                this.secondaryDitherTexture.naturalWidth;

            this.createThingies(thingies);

            this.onResize();

            resolve();
        });
    }

    async initializeCase({
        id,
        mainTypoImage,
        ditherTextureImage,
        ditherPaletteImage,
    }) {
        return new Promise(async (resolve, reject) => {
            const textures = await this.loadImages({
                [id + "TypoImage"]: mainTypoImage,
                [id + "ditherTexture"]: ditherTextureImage,
                [id + "ditherPalette"]: ditherPaletteImage,
            });
            this.addTextures(textures);
            this.setMainTextImage(id + "TypoImage");

            this.textMasks = { bottom: 0, top: 0 };

            this.primaryDitherPalette = this.textures[id + "ditherPalette"];
            this.primaryDitherTexture = this.textures[id + "ditherTexture"];
            this.secondaryDitherPalette = this.textures[id + "ditherPalette"];
            this.secondaryDitherTexture = this.textures[id + "ditherTexture"];

            if (!this.initialized) this.initialize();

            this.fullscreenPlane.program.uniforms.uHasNoise.value = 0;

            this.primaryDitherPaletteTexture.image = this.primaryDitherPalette;
            this.primaryDitherTextureTexture.image = this.primaryDitherTexture;
            this.post.program.uniforms.uPrimaryDitherTextureSize.value =
                this.primaryDitherTexture.naturalWidth;

            this.secondaryDitherPaletteTexture.image =
                this.secondaryDitherPalette;
            this.secondaryDitherTextureTexture.image =
                this.secondaryDitherTexture;
            this.post.program.uniforms.uSecondaryDitherTextureSize.value =
                this.secondaryDitherTexture.naturalWidth;

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
                camera: this.camera,
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

    createThingies(thingies) {
        this.thingies = thingies.map((options, index) => {
            let thingy = new Thingy({
                element: options.el,
                type: options.type,
                geometry: this.planeGeometry,
                gl: this.gl,
                scene: this.scene,
                screen: this.screen,
                viewport: this.viewport,
                index,
            });

            return thingy;
        });
    }

    createSceneCamera() {
        this.scene = new Transform();
        this.camera = new Camera(this.gl, { fov: 45 });
        this.camera.position.z = 5;

        this.renderTarget = new RenderTarget(this.gl, {
            color: 3,
            width: window.innerWidth,
            height: window.innerHeight,
            dpr: this.isMobile ? 1 : 0.5,
        });
    }

    async createFullscreenPlane() {
        this.mainTextTexture = new Texture(this.gl, {
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });

        const program = new Program(this.gl, {
            fragment: planeFragment,
            vertex: planeVertex,
            uniforms: {
                tMap: { value: this.mainTextTexture },
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
                uTopMask: { value: this.textMasks.top },
                uNoiseThreshold: { value: this.params.noiseThreshold },
                uNoisePower: { value: this.params.noisePower },
                uHasNoise: { value: 0 },
            },
            transparent: true,
        });

        this.mainTextTexture.image = this.textures[this.mainTextImageName];

        program.uniforms.uImageSizes.value = [
            this.textures[this.mainTextImageName].naturalWidth,
            this.textures[this.mainTextImageName].naturalHeight,
        ];
        this.typoAspectRatio =
            this.textures[this.mainTextImageName].naturalWidth /
            this.textures[this.mainTextImageName].naturalHeight;
        this.onResize();
        this.ready = true;

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

    setMainTextImage(imageName) {
        this.mainTextImageName = imageName;

        if (this.mainTextTexture) {
            this.mainTextTexture.image = this.textures[imageName];

            this.fullscreenPlane.program.uniforms.uImageSizes.value = [
                this.textures[imageName].naturalWidth,
                this.textures[imageName].naturalHeight,
            ];
            this.typoAspectRatio =
                this.textures[imageName].naturalWidth /
                this.textures[imageName].naturalHeight;
        }
    }

    createPost() {
        const geometry = new Triangle(this.gl);

        this.primaryDitherTextureTexture = new Texture(this.gl, {
            image: this.primaryDitherTexture,
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });
        this.primaryDitherPaletteTexture = new Texture(this.gl, {
            image: this.primaryDitherpalette,
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });

        this.secondaryDitherTextureTexture = new Texture(this.gl, {
            image: this.secondaryDitherTexture,
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });

        this.secondaryDitherPaletteTexture = new Texture(this.gl, {
            image: this.secondaryDitherPalette,
            magFilter: this.gl.NEAREST,
            minFilter: this.gl.NEAREST,
        });

        const program = new Program(this.gl, {
            vertex: postVertex,
            fragment: postFragment,
            uniforms: {
                tPrimaryMap: { value: this.renderTarget.textures[0] },
                tSecondaryMap: { value: this.renderTarget.textures[1] },
                tDitherType: { value: this.renderTarget.textures[2] },
                uPrimaryDitherTexture: {
                    value: this.primaryDitherTextureTexture,
                },
                uPrimaryDitherTextureSize: {
                    value: this.primaryDitherTexture.naturalWidth,
                },
                uPrimaryDitherPalette: {
                    value: this.primaryDitherPaletteTexture,
                },

                uSecondaryDitherTexture: {
                    value: this.secondaryDitherTextureTexture,
                },
                uSecondaryDitherTextureSize: {
                    value: this.secondaryDitherPaletteTexture,
                },
                uSecondaryDitherPalette: {
                    value: this.secondaryDitherPaletteTexture,
                },

                uTime: { value: 0 },
                pixelated: { value: 1 },
                uPixelation: { value: 100 },
                dithered: { value: 1 },
                uInversedPalette: { value: 0 },
                uInversedTexture: { value: 0 },
                pixelRatio: { value: 0 },
                uResolution: this.resolution,
                uLmRampConstrast: { value: this.params.rampContrast },
                uLmRampOffset: { value: this.params.rampOffset },
                uCmDistanceFactor: { value: this.params.ditherFactor },
            },
        });

        this.post = new Mesh(this.gl, { geometry, program });
    }

    createRenderer() {
        this.renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            dpr: this.isMobile ? 1 : 0.5,
        });

        this.gl = this.renderer.gl;
        this.gl.clearColor(1, 1, 1, 1);

        document.getElementById("c").appendChild(this.gl.canvas);
    }

    onResize() {
        const isMobile = window.innerWidth < 800;
        if (isMobile !== this.isMobile) {
            this.isMobile = isMobile;
            this.renderer.dpr = this.isMobile ? 1 : 0.5;
            this.renderTarget.dpr = this.isMobile ? 1 : 0.5;
        }
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

        if (this.thingies) {
            this.thingies.forEach((thingy) =>
                thingy.onResize({
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
            this.fullscreenPlane.program.uniforms.uTopMask.value =
                this.textMasks.top;

            this.fullscreenPlane.program.uniforms.uNoiseThreshold.value =
                this.params.noiseThreshold;
            this.fullscreenPlane.program.uniforms.uNoisePower.value =
                this.params.noisePower;
        }

        this.post.program.uniforms.uResolution = this.resolution;
        this.post.program.uniforms.uTime.value += 0.04;
        this.post.program.uniforms.uInversedPalette.value =
            this.params.inversedPalette;
        this.post.program.uniforms.uInversedTexture.value =
            this.params.inversedTexture;
        this.post.program.uniforms.pixelated.value = this.params.pixelated;
        this.post.program.uniforms.dithered.value = this.params.dithered;
        this.post.program.uniforms.uPixelation.value = this.params.pixelation;
        this.post.program.uniforms.pixelRatio.value = this.params.pixelRatio;
        this.post.program.uniforms.pixelRatio.value = this.params.pixelRatio;
        this.post.program.uniforms.uLmRampConstrast.value =
            this.params.rampContrast;
        this.post.program.uniforms.uLmRampOffset.value = this.params.rampOffset;
        this.post.program.uniforms.uCmDistanceFactor.value =
            this.params.ditherFactor;

        if (this.images) {
            this.images.forEach((image) => image.update(this.scroll.y));
        }

        if (this.thingies) {
            this.thingies.forEach((thingy) =>
                thingy.update(this.scroll.y, this.scroll.velocity)
            );
        }

        this.gl.clearColor(0, 0, 0, 1);

        this.renderer.render({
            scene: this.scene,
            camera: this.camera,
            target: this.renderTarget,
        });

        if (this.params.post) {
            this.renderer.render({
                scene: this.post,
            });
        } else {
            this.renderer.render({
                scene: this.scene,
                camera: this.camera,
            });
        }

        window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    setLogo(logo) {
        this.logo = logo;
    }

    setAppearValue(appear) {
        this.appear = appear;
    }

    setScroll({ velocity, y }) {
        this.scroll.y = y;
        const maxSpeed = 70;
        this.scroll.velocity =
            Math.min(Math.abs(velocity), maxSpeed) / maxSpeed;
    }
    setTextMasks(textMasks) {
        this.textMasks = textMasks;
    }

    addTextures(textures) {
        this.textures = { ...this.textures, ...textures };
    }
}

export default new WebGL();
