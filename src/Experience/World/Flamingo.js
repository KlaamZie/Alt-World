import * as THREE from "three"
import Experience from "../Experience.js";

export default class Flamingo {
    constructor(position, height) {
        this.position = position
        this.height = height

        console.log(this.position, this.height)

        this.experience = new Experience()
        this.envMap = this.experience.resources.envMap

        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setModel()
        this.setLight()
    }

    setModel() {
        console.log("hey")
        const px = Math.random() * 0.4
        const pz = Math.random() * 0.4

        this.flamingo = this.resources.items.flamingoModel.scene
        this.flamingo.material = new THREE.MeshStandardMaterial({
            envMap: this.envMap,
        })
        this.flamingo.castShadow = true
        this.flamingo.receiveShadow = true
        this.flamingo.scale.set(0.013, 0.013, 0.013)
        this.flamingo.position.set(this.position.x, this.height - 15, this.position.y)

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
        this.cylinder.position.set(this.flamingo.position.x + 1, this.flamingo.position.y + 2.5, this.flamingo.position.z)
        this.cylinder.name = "flamingo"

        // this.cylinder.castShadow = true
        // this.cylinder.receiveShadow = true
        
        this.scene.add(this.flamingo, this.cylinder)
    }

    setLight() {
        // add point light
        const colors = ["#fdcf58", "#f27d0c", "#f07f13"]
        const color = colors[Math.floor(Math.random() * colors.length)];

        this.pointLight = new THREE.PointLight(color, 3, 10)
        this.pointLight.position.set(this.flamingo.position.x, this.flamingo.position.y + 4, this.flamingo.position.z + 3)
        this.pointLight.castShadow = true
        this.scene.add(this.pointLight)

        // const helper = new THREE.PointLightHelper(this.pointLight, 1)
        // this.scene.add(helper)
    }
}