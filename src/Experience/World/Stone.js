import * as THREE from 'three'

export default class Stone {
    constructor(position, height) {
        this.position = position;
        this.height = height;
    }

    setMesh() {
        const px = Math.random() * 0.4
        const pz = Math.random() * 0.4

        this.geometry = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7)
        this.geometry.translate(this.position.x + px, this.height, this.position.y + pz)

        return this.geometry
    }
}