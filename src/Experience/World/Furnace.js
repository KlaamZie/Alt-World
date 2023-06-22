import * as THREE from "three"
import Experience from "../Experience.js";

export default class Furnace {
    constructor(position, height) {
        this.position = position
        this.height = height

        this.experience = new Experience()
        this.envMap = this.experience.resources.envMap

        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModel()
        this.setLight()
    }

    setModel() {
        const px = Math.random() * 0.4
        const pz = Math.random() * 0.4

        this.furnace = this.resources.items.furnaceModel.scene
        this.furnace.material = new THREE.MeshStandardMaterial({
            envMap: this.envMap,
        })
        this.furnace.castShadow = true
        this.furnace.receiveShadow = true
        this.furnace.scale.set(0.7, 0.7, 0.7)
        this.furnace.position.set(this.position.x, this.height - 15, this.position.y)

        const geometry = new THREE.CylinderGeometry(2.5, 2.5, 5, 32)
        const material = new THREE.MeshPhysicalMaterial({
            envMap: this.envMap,
            roughness: 0.01,
            transmission: 1,
            thickness: 0.01,
            metalness: 0,
            color: 0xffffff,
            transparent: true,
            opacity: 0.01,
        })

        this.cylinder = new THREE.Mesh(geometry, material)
        this.cylinder.position.set(this.furnace.position.x, this.furnace.position.y + 2.5, this.furnace.position.z)
        this.cylinder.name = "furnace"

        // this.cylinder.castShadow = true
        // this.cylinder.receiveShadow = true

        this.scene.add(this.furnace, this.cylinder)
    }

    setLight() {
        // add point light
        const colors = ["#fdcf58", "#f27d0c", "#f07f13"]
        const color = colors[Math.floor(Math.random() * colors.length)];

        this.pointLight = new THREE.PointLight(color, 3, 10)
        this.pointLight.position.set(this.furnace.position.x, this.furnace.position.y + 1.5, this.furnace.position.z)
        this.pointLight.castShadow = true
        this.scene.add(this.pointLight)

        // const helper = new THREE.PointLightHelper(this.pointLight, 2)
        // this.scene.add(helper)

        this.pointLight2 = new THREE.PointLight(color, 3, 10)
        this.pointLight2.position.set(this.furnace.position.x, this.furnace.position.y + 7, this.furnace.position.z)
        this.pointLight2.castShadow = true
        this.scene.add(this.pointLight2)

        // const helper2 = new THREE.PointLightHelper(this.pointLight2, 2)
        // this.scene.add(helper2)
    }
}