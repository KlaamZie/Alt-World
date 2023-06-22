import * as THREE from 'three'
import * as CANNON from 'cannon-es'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Raycaster from './Raycaster.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import Overlay from "./Loader/Overlay.js";

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        // window.experience = this

        this.maxHeight = 20

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()

        this.scene = new THREE.Scene()

        this.camera = new Camera()

        this.renderer = new Renderer()

        this.pmrem = new THREE.PMREMGenerator(this.renderer.instance)

        this.overlay = new Overlay()

        this.resources = new Resources(sources)

        this.world = new World()

        this.raycaster = new Raycaster()

        // this.stats = new Stats()
        // document.body.appendChild(this.stats.dom)

        this.resources.on('ready', () => {
            this.scene.background = this.resources.items.environmentMapTexture
        })

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        if(this.camera) {
            this.camera.update()
        }
        if(this.world) {
            this.world.update()
        }
        if(this.raycaster) {
            this.raycaster.update()
        }
        this.renderer.update()
        if (this.stats) this.stats.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}