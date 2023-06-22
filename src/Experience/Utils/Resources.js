import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import EventEmitter from './EventEmitter.js'
import {FloatType} from "three";
import Experience from "../Experience.js";
import gsap from "gsap";

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.experience = new Experience()

        this.overlay = this.experience.overlay
        this.loadingBar = document.querySelector('.loading-bar')
        this.blocker = document.querySelector('#blocker')

        this.loaderManager = new THREE.LoadingManager(
            () => {
                this.envMap = this.experience.pmrem.fromEquirectangular(this.items.environmentMap).texture
                this.trigger('ready')
                gsap.delayedCall(1, () => {
                    gsap.to(this.overlay.material.uniforms.uAlpha, { duration: 3, value: 0 })
                    this.loadingBar.classList.add('ended')
                    this.loadingBar.style.transform = ``
                })
                gsap.delayedCall(2, () => {
                    this.blocker.style.opacity = 1
                })
            },
            (itemUrl, itemsLoaded, itemsTotal) => {
                const progressRatio = itemsLoaded / itemsTotal
                this.loadingBar.style.transform = `scaleX(${progressRatio})`
            },
        )

        this.sources = sources

        this.items = {}

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loaderManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loaderManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loaderManager)
        this.loaders.hdrLoader = new RGBELoader(this.loaderManager).setDataType(FloatType)
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'hdr')
            {
                this.loaders.hdrLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
    }
}