import * as THREE from "three"
import Experience from "../Experience.js";

export default class Light {
    constructor(position, height) {
        this.position = position
        this.height = height

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setLight()
    }

    setLight() {
        const colors = ["#fdcf58", "#f27d0c", "#800909", "#f07f13"]
        const color = colors[Math.floor(Math.random() * colors.length)];

        const px = Math.random() * 0.4
        const pz = Math.random() * 0.4

        this.pointLight = new THREE.PointLight(color, 3, 15)
        this.pointLight.position.set(this.position.x + px, this.height - 15, this.position.y + pz)
        this.pointLight.castShadow = true
        this.scene.add(this.pointLight)

        // const helper = new THREE.PointLightHelper(this.pointLight, 1)
        // this.scene.add(helper)
    }
}