import * as THREE from "three";
import Experience from "../Experience.js";
import {mergeGeometries} from "three/addons/utils/BufferGeometryUtils.js";

export default class Water {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.envMap = this.experience.resources.envMap
        this.maxHeight = this.experience.maxHeight
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('water')
        }

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.CylinderGeometry(68, 65, 10, 50);
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.waterColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.waterNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping

        this.textures.roughness = this.resources.items.waterRoughnessTexture
        this.textures.roughness.repeat.set(1.5, 1.5)
        this.textures.roughness.wrapS = THREE.RepeatWrapping
        this.textures.roughness.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        this.material = new THREE.MeshPhysicalMaterial({
            envMap: this.envMap,
            map: this.textures.color,
            normalMap: this.textures.normal,
            roughnessMap: this.textures.roughness,
            transmission: 0.8,
            transparent: true,
            thickness: 1.5,
            roughness: 0.3,
            metalness: 0,
            envMapIntensity: 0.1,
            opacity: 0.6,
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.translateY(-18)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}