import { Mesh, Program } from "ogl";

import fragment from "../shader/thingyFragment.glsl";
import vertex from "../shader/thingyVertex.glsl";

export default class {
    constructor({ element, geometry, gl, scene, screen, viewport }) {
        this.element = element;

        this.geometry = geometry;
        this.gl = gl;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.scroll = 0;

        this.createMesh();
        this.createBounds();
        this.onResize();
    }

    createMesh() {
        const program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                uTime: { value: 0 },
                uAppearOpacity: { value: 1 },
                uAppearRotate: { value: 1 },
            },
            transparent: true,
        });
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program,
        });
        this.mesh.setParent(this.scene);
    }

    createBounds() {
        this.bounds = this.element.getBoundingClientRect();

        this.updateScale();
        this.updatePosition();
    }

    updateScale() {
        this.mesh.scale.x =
            (this.viewport.width * this.bounds.width) / this.screen.width;
        this.mesh.scale.y =
            (this.viewport.height * this.bounds.height) / this.screen.height;
    }

    updatePosition() {
        this.mesh.position.y =
            this.viewport.height / 2 -
            this.mesh.scale.y / 2 -
            (this.bounds.top / this.screen.height) * this.viewport.height;
        this.mesh.position.x =
            -(this.viewport.width / 2) +
            this.mesh.scale.x / 2 +
            (this.bounds.left / this.screen.width) * this.viewport.width;
    }

    update(y) {
        if (y !== this.scroll && this.mesh) {
            this.scroll = y;
            this.createBounds();
        }
    }

    onResize(sizes) {
        if (sizes) {
            const { screen, viewport } = sizes;

            if (screen) this.screen = screen;
            if (viewport) this.viewport = viewport;
        }

        this.createBounds();
    }
}
