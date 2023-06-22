import * as THREE from 'three';

export default class Tree {
    constructor(position, height) {
        this.position = position;
        this.height = height;
    }

    setMesh() {
        const treeHeight = Math.random() * 1 + 1.25

        this.geometry = new THREE.CylinderGeometry(0, 1.5, treeHeight, 3)
        this.geometry.translate(this.position.x, this.height + treeHeight * 0 + 1, this.position.y)

        this.geometry2 = new THREE.CylinderGeometry(0, 1.15, treeHeight, 3)
        this.geometry2.translate(this.position.x, this.height + treeHeight * 0.6 + 1, this.position.y)

        this.geometry3 = new THREE.CylinderGeometry(0, 0.8, treeHeight, 3)
        this.geometry3.translate(this.position.x, this.height + treeHeight * 1.25 + 1, this.position.y)

        return [this.geometry, this.geometry2, this.geometry3]
    }

}