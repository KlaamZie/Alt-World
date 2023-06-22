import * as THREE from "three";
import Experience from "../Experience.js";

export default class Planet {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.envMap = this.experience.resources.envMap
        this.maxHeight = this.experience.maxHeight

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry( 70, 64, 64 );
    }

    setMaterial() {
        this.material = new THREE.MeshPhysicalMaterial({
            envMap: this.envMap,
            roughness: 0.2,
            transmission: 0.8,
            thickness: 1,
            metalness: 0,
            color: 0xffffff
        });
        // this.material.side = THREE.DoubleSide
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    update() {
       this.mesh.rotation.y += 0.001
    }
}