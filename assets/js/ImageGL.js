import { Mesh, Program, Texture } from "ogl";

import fragment from "../shader/imageFragment.glsl";
import vertex from "../shader/imageVertex.glsl";

export default class {
    constructor({ element, geometry, gl, scene, screen, viewport, camera }) {
        this.element = element;
        this.image = this.element.querySelector("img");

        this.geometry = geometry;
        this.camera = camera;
        this.gl = gl;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.scroll = -1;
    }

    async initialize() {
        return new Promise(async (resolve, reject) => {
            this.textureImage = await this.loadImage(this.image);
            this.createMesh();
            this.createBounds();
            this.onResize();
            resolve(this);
        });
    }

    async loadImage(image) {
        return new Promise((resolve, reject) => {
            const imgEl = new Image();
            imgEl.src = image.src;
            imgEl.onload = (_) => {
                resolve(imgEl);
            };
        });
    }

    createMesh() {
        const texture = new Texture(this.gl);

        texture.image = this.textureImage;

        const program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                tMap: { value: texture },
                uScreenSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
            },
            transparent: true,
        });

        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program,
        });

        this.plane.position.z = 1;

        this.plane.setParent(this.scene);
    }

    createBounds() {
        const fov = this.camera.fov * (Math.PI / 180);
        const height =
            2 * Math.tan(fov / 2) * this.camera.position.z -
            this.plane.position.z;

        const width = height * this.camera.aspect;
        this.viewport = {
            height,
            width,
        };

        this.bounds = this.element.getBoundingClientRect();

        this.updateScale();
        this.updatePosition();
    }

    updateScale() {
        this.plane.scale.x =
            (this.viewport.width * this.bounds.width) / this.screen.width;
        this.plane.scale.y =
            (this.viewport.height * this.bounds.height) / this.screen.height;
    }

    updatePosition() {
        this.plane.position.y =
            this.viewport.height / 2 -
            this.plane.scale.y / 2 -
            (this.bounds.top / this.screen.height) * this.viewport.height;
        this.plane.position.x =
            -(this.viewport.width / 2) +
            this.plane.scale.x / 2 +
            (this.bounds.left / this.screen.width) * this.viewport.width;
    }

    update(y) {
        if (this.plane) {
            this.scroll = y;
            this.createBounds();
        }
    }

    onResize(sizes) {
        if (sizes) {
            const { screen, viewport } = sizes;

            if (screen) this.screen = screen;
        }

        this.createBounds();
    }
}
