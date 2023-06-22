import * as THREE from "three";
import Experience from "../Experience.js";

export default class Overlay {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.createOverlay()
    }

    createOverlay() {
        this.geometry = new THREE.PlaneGeometry( 2, 2, 1, 1 );
        this.material = new THREE.ShaderMaterial( {
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 },
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;
                
                void main() {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        });

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }
}