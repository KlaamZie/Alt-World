import * as THREE from "three"
import Experience from "../Experience.js";

export default class House {
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

        this.house = this.resources.items.houseModel.scene
        this.house.material = new THREE.MeshStandardMaterial({
            envMap: this.envMap,
        })
        this.house.castShadow = true
        this.house.receiveShadow = true
        this.house.scale.set(1, 1, 1)
        this.house.position.set(this.position.x, this.height - 10.7, this.position.y)

        const geometry = new THREE.CylinderGeometry(2.5, 2.5, 7, 32)
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
        this.cylinder.position.set(this.house.position.x, this.house.position.y - 1, this.house.position.z)
        this.cylinder.name = "house"

        // this.cylinder.castShadow = true
        // this.cylinder.receiveShadow = true

        this.scene.add(this.house, this.cylinder)
    }

    setLight() {
        // add point light
        const colors = ["#fdcf58", "#f27d0c", "#f07f13"]
        const color = colors[Math.floor(Math.random() * colors.length)];

        this.pointLight = new THREE.PointLight(color, 3, 10)
        this.pointLight.position.set(this.house.position.x - 2.2, this.house.position.y, this.house.position.z)
        this.pointLight.castShadow = true
        this.scene.add(this.pointLight)

        // const helper = new THREE.PointLightHelper(this.pointLight, 1)
        // this.scene.add(helper)
    }
}