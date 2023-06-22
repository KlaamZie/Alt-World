import * as THREE from 'three'
import Experience from './Experience.js'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {displayDialiog} from "./Utils/Functions.js";

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.isLocked = true;
        this.animateCamera = true;

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 800)
        this.instance.position.set(0, 10, 200)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.025
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if(this.isLocked) {
            return
        }

        if(this.animateCamera && this.instance.position.z > 60) {
            this.controls.enabled = false
            this.instance.position.z -= 0.1
        } else if(this.animateCamera) {
            this.controls.enabled = true
            this.animateCamera = false
            this.instance.position.z = 60

            const texts = ["[Yokku] Pilote automatique : Désactivé.", "[Yokku] Tous les projets ont été initialisé." ,"[Yokku] Bienvenue sur Alt World aventurier !"]
            const splitted = []
            texts.forEach((text) => {
                text.split('').forEach((letter) => {
                        splitted.push(letter)
                    })
            })
            displayDialiog(splitted)


            // displayDialiog(splitted)
        }
        this.controls.update()
    }
}