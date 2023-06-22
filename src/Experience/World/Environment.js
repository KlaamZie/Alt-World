import * as THREE from 'three'
import Experience from '../Experience.js'
import { Sky } from 'three/addons/objects/Sky.js';

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.island = this.experience.world.island
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        // this.setMoonLight()
    }

    setSunLight() {
        this.sunLight = new THREE.PointLight("#ffffff", 1, 200 );
        this.sunLight.castShadow = true
        this.sunLight.position.set(0, 0, 0)
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05

        this.scene.add(this.sunLight)

        // Add helper
        // const helper = new THREE.PointLightHelper(this.sunLight, 3)
        // this.scene.add(helper)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 25)
                .max(25)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 25)
                .max(25)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 25)
                .max(25)
                .step(0.001)
        }
    }

    setMoonLight() {
        this.moonLight = new THREE.PointLight( "#9c91cd", 1, 200 );
        this.moonLight.castShadow = true
        this.moonLight.position.set(0, 0, 0)
        this.moonLight.shadow.mapSize.set(1024, 1024)
        this.moonLight.shadow.normalBias = 0.05

        this.scene.add(this.moonLight)

        // Add helper
        // const helper = new THREE.PointLightHelper(this.moonLight, 3)
        // this.scene.add(helper)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.moonLight, 'intensity')
                .name('moonLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.moonLight.position, 'x')
                .name('moonLightX')
                .min(- 25)
                .max(25)
                .step(0.001)

            this.debugFolder
                .add(this.moonLight.position, 'y')
                .name('moonLightY')
                .min(- 25)
                .max(25)
                .step(0.001)

            this.debugFolder
                .add(this.moonLight.position, 'z')
                .name('moonLightZ')
                .min(- 25)
                .max(25)
                .step(0.001)
        }
    }

    update() {
        if(this.sunLight) {
            this.sunLight.position.x = Math.cos(this.experience.time.elapsed * 0.0001) * 65
            this.sunLight.position.y = Math.sin(this.experience.time.elapsed * 0.0001) * 65
        }
        if (this.moonLight) {
            this.moonLight.position.x = Math.cos(this.experience.time.elapsed * 0.0005 + Math.PI) * 60
            this.moonLight.position.y = Math.sin(this.experience.time.elapsed * 0.0005 + Math.PI) * 60
        }
    }
}