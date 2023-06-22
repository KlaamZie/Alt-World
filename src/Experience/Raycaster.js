import * as THREE from "three";
import Experience from "./Experience.js";
import {displayDialiog} from "./Utils/Functions.js";

export default class Raycaster {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources

        this.mouse = new THREE.Vector2()

        this.objects = []

        this.setRaycaster()
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster();

        this.raycaster.far = 20;
        this.raycaster.near = 0.1;

        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / this.experience.sizes.width) * 2 - 1;
            this.mouse.y = - (event.clientY / this.experience.sizes.height) * 2 + 1;
        })
    }

    handleDisplay(name) {
        if(this.displayed && this.displayed !== name) {
            const el = document.getElementById(this.displayed);
            if(el) {
                el.classList.remove('active');
            }
            this.displayed = null;
        } else {
            this.displayed = name;
            const el = document.getElementById(name);
            if(el) {
                el.classList.add('active');
            }
        }
    }

    update() {
        if(this.raycaster) {
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)

            this.objects = [this.experience?.world?.island?.house?.cylinder, this.experience?.world?.island?.dinner?.cylinder, this.experience?.world?.island?.furnace?.cylinder, this.experience?.world?.island?.flamingo?.cylinder]

            this.objects = this.objects.filter(object => object !== undefined)

            this.intersected = this.raycaster.intersectObjects(this.objects);

            if(this.intersected.length > 0 && this.intersected[0].distance < 15) {
                this.handleDisplay(this.intersected[0].object.name);
            } else {
                this.handleDisplay(null);
            }
        }
    }
}